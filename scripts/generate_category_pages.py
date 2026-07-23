#!/usr/bin/env python3
"""Generate browsable category pages from the canonical Worker CSV."""

from __future__ import annotations

import argparse
import csv
import re
import sys
from collections import defaultdict
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
CSV_PATH = ROOT / "data" / "workers.csv"
CATEGORY_ROOT = ROOT

CATEGORIES = (
    (
        "E-Commerce & Marketplaces",
        "e-commerce-marketplaces",
        "🛍️",
        "Products, pricing, reviews, stores, suppliers and marketplace intelligence.",
    ),
    (
        "Social & Creator Data",
        "social-creator-data",
        "🌐",
        "Profiles, posts, comments, creators, events and audience signals.",
    ),
    (
        "Search, Maps & SEO",
        "search-maps-seo",
        "🔎",
        "SERPs, maps, local business data, keywords and SEO intelligence.",
    ),
    (
        "Jobs & Recruiting",
        "jobs-recruiting",
        "💼",
        "Job listings, candidate discovery, employers, salaries and recruiting data.",
    ),
    (
        "Lead Generation & Company Intelligence",
        "lead-generation-company-intelligence",
        "🎯",
        "Companies, decision-makers, suppliers, business emails and sales prospects.",
    ),
    (
        "AI & Research",
        "ai-research",
        "✨",
        "AI answers, cited sources and structured research workflows.",
    ),
    (
        "Developer & Web Utilities",
        "developer-web-utilities",
        "🧰",
        "Browser automation, extraction, screenshots, parsing and data utilities.",
    ),
    (
        "Finance & Markets",
        "finance-markets",
        "📈",
        "Public-market, company and financial time-series data.",
    ),
    (
        "Real Estate",
        "real-estate",
        "🏠",
        "Property listings, valuations, history and location data.",
    ),
    (
        "Education & Knowledge",
        "education-knowledge",
        "📚",
        "Courses, books, metadata and learning catalog intelligence.",
    ),
    (
        "News & Media",
        "news-media",
        "📰",
        "News articles, media pages and publication monitoring.",
    ),
)


def table_text(value: str) -> str:
    return " ".join(value.split()).replace("|", "\\|")


def link_text(value: str) -> str:
    return table_text(value).replace("[", "\\[").replace("]", "\\]")


def anchor_slug(value: str) -> str:
    return re.sub(r"-+", "-", re.sub(r"[^a-z0-9]+", "-", value.lower())).strip("-")


def load_workers() -> list[dict[str, str]]:
    with CSV_PATH.open(encoding="utf-8", newline="") as handle:
        workers = list(csv.DictReader(handle))
    workers.sort(key=lambda row: (row["category"], row["source"], row["title"].casefold()))
    return workers


def render_category(
    name: str,
    emoji: str,
    summary: str,
    workers: list[dict[str, str]],
) -> str:
    sources: dict[str, list[dict[str, str]]] = defaultdict(list)
    for worker in workers:
        sources[worker["source"]].append(worker)

    lines = [
        '<p align="center"><a href="../README.md#categories">← All categories</a> · '
        '<a href="../README.md">Main directory</a></p>',
        "",
        f"# {emoji} {name}",
        "",
        summary,
        "",
        f"**{len(workers)} APIs** across **{len(sources)} data sources**",
        "",
        "## Sources",
        "",
        " · ".join(
            f"[{source}](#{anchor_slug(source)})"
            for source in sorted(sources, key=str.casefold)
        ),
        "",
    ]

    for source in sorted(sources, key=str.casefold):
        source_workers = sorted(sources[source], key=lambda row: row["title"].casefold())
        lines.extend(
            [
                f'<a id="{anchor_slug(source)}"></a>',
                f"## {source} ({len(source_workers)})",
                "",
                "| API | Worker ID | What it does |",
                "|---|---|---|",
            ]
        )
        for worker in source_workers:
            lines.append(
                f'| [**{link_text(worker["title"])}**]({worker["url"]}) '
                f'| `{table_text(worker["path"])}` '
                f'| {table_text(worker["description"])} |'
            )
        lines.append("")

    lines.extend(
        [
            "> [!NOTE]",
            "> Links open the exact CoreClaw Worker page and include the maintainer’s "
            "affiliate attribution. See the main README for the full disclosure.",
            "",
            '<p align="center"><a href="../README.md#categories">← Browse all categories</a> · '
            '<a href="../README.md#directory">Complete API directory</a></p>',
            "",
        ]
    )
    return "\n".join(lines)


def expected_pages() -> dict[Path, str]:
    workers = load_workers()
    grouped: dict[str, list[dict[str, str]]] = defaultdict(list)
    for worker in workers:
        grouped[worker["category"]].append(worker)

    known = {name for name, *_rest in CATEGORIES}
    unknown = sorted(set(grouped) - known)
    if unknown:
        raise SystemExit(f"Unknown categories in CSV: {', '.join(unknown)}")

    pages = {}
    for name, slug, emoji, summary in CATEGORIES:
        pages[CATEGORY_ROOT / slug / "README.md"] = render_category(
            name, emoji, summary, grouped[name]
        )
    return pages


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--check",
        action="store_true",
        help="fail when generated category pages are missing or stale",
    )
    args = parser.parse_args()

    stale = []
    for path, content in expected_pages().items():
        content = content.replace("\r\n", "\n")
        if args.check:
            if not path.is_file() or path.read_text(encoding="utf-8").replace("\r\n", "\n") != content:
                stale.append(path.relative_to(ROOT))
            continue
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(content, encoding="utf-8", newline="\n")

    if stale:
        print("Generated category pages are stale:", file=sys.stderr)
        for path in stale:
            print(f"  {path}", file=sys.stderr)
        print("Run: python scripts/generate_category_pages.py", file=sys.stderr)
        raise SystemExit(1)

    action = "Verified" if args.check else "Generated"
    print(f"{action} {len(expected_pages())} category pages.")


if __name__ == "__main__":
    main()
