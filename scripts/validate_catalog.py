from __future__ import annotations

import csv
import re
import sys
import xml.etree.ElementTree as ET
from collections import Counter
from pathlib import Path

from generate_category_pages import CATEGORIES


ROOT = Path(__file__).resolve().parents[1]
CSV_PATH = ROOT / "data" / "workers.csv"
README_PATH = ROOT / "README.md"
BANNER_PATH = ROOT / "assets" / "coreclaw-api-directory-banner.svg"
CATEGORY_ROOT = ROOT
CATEGORY_SLUGS = {name: slug for name, slug, _emoji, _summary in CATEGORIES}

REQUIRED_FIELDS = {
    "title",
    "path",
    "url",
    "category",
    "source",
    "platform",
    "author",
    "description",
}
AFFILIATE_URL = re.compile(
    r"^https://www\.coreclaw\.com/[^/?]+/[^/?]+\?fpr=chris69$"
)


def fail(message: str) -> None:
    print(f"ERROR: {message}", file=sys.stderr)
    raise SystemExit(1)


def main() -> None:
    if not CSV_PATH.is_file():
        fail(f"missing {CSV_PATH.relative_to(ROOT)}")
    if not README_PATH.is_file():
        fail("missing README.md")
    if not BANNER_PATH.is_file():
        fail(f"missing {BANNER_PATH.relative_to(ROOT)}")

    with CSV_PATH.open(encoding="utf-8", newline="") as handle:
        reader = csv.DictReader(handle)
        fields = set(reader.fieldnames or [])
        missing_fields = REQUIRED_FIELDS - fields
        if missing_fields:
            fail(f"CSV is missing fields: {', '.join(sorted(missing_fields))}")
        rows = list(reader)

    if not rows:
        fail("catalog is empty")

    paths = [row["path"].strip() for row in rows]
    duplicate_paths = sorted(path for path, count in Counter(paths).items() if count > 1)
    if duplicate_paths:
        fail(f"duplicate Worker paths: {', '.join(duplicate_paths)}")

    for index, row in enumerate(rows, start=2):
        empty = sorted(field for field in REQUIRED_FIELDS if not row[field].strip())
        if empty:
            fail(f"CSV row {index} has empty fields: {', '.join(empty)}")
        if not AFFILIATE_URL.fullmatch(row["url"].strip()):
            fail(f"CSV row {index} has an invalid affiliate URL: {row['url']}")

    readme = README_PATH.read_text(encoding="utf-8")
    missing_from_readme = [path for path in paths if path not in readme]
    if missing_from_readme:
        fail(f"README is missing {len(missing_from_readme)} Worker paths")

    for row in rows:
        category_slug = CATEGORY_SLUGS.get(row["category"])
        if category_slug is None:
            fail(f"unknown category: {row['category']}")
        category_page = CATEGORY_ROOT / category_slug / "README.md"
        if not category_page.is_file():
            fail(f"missing category page: {category_page.relative_to(ROOT)}")
        if row["path"] not in category_page.read_text(encoding="utf-8"):
            fail(
                f"{category_page.relative_to(ROOT)} is missing Worker path: "
                f"{row['path']}"
            )

    try:
        root = ET.parse(BANNER_PATH).getroot()
    except ET.ParseError as error:
        fail(f"banner SVG is invalid: {error}")
    if not root.tag.endswith("svg"):
        fail("banner asset is not an SVG document")

    category_counts = Counter(row["category"].strip() for row in rows)
    source_count = len({row["source"].strip() for row in rows})
    print(
        f"Catalog valid: {len(rows)} Workers, "
        f"{len(category_counts)} categories, {source_count} sources."
    )
    for category, count in sorted(category_counts.items()):
        print(f"  {count:>3}  {category}")


if __name__ == "__main__":
    main()
