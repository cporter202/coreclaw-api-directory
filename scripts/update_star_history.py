#!/usr/bin/env python3
"""Record the repository's daily star count and render its README chart."""

from __future__ import annotations

import json
import math
from datetime import datetime, timezone
from pathlib import Path
from urllib.request import Request, urlopen


ROOT = Path(__file__).resolve().parents[1]
DATA_PATH = ROOT / "data" / "star-history.json"
SVG_PATH = ROOT / "assets" / "star-history.svg"
REPOSITORY = "cporter202/coreclaw-api-directory"


def fetch_star_count() -> int:
    request = Request(
        f"https://api.github.com/repos/{REPOSITORY}",
        headers={
            "Accept": "application/vnd.github+json",
            "User-Agent": "coreclaw-api-directory-star-history",
            "X-GitHub-Api-Version": "2022-11-28",
        },
    )
    with urlopen(request, timeout=20) as response:
        return int(json.load(response)["stargazers_count"])


def update_history(stars: int) -> dict:
    history = json.loads(DATA_PATH.read_text(encoding="utf-8"))
    today = datetime.now(timezone.utc).date().isoformat()
    points = history.setdefault("points", [])

    if points and points[-1]["date"] == today:
        points[-1]["stars"] = stars
    else:
        points.append({"date": today, "stars": stars})

    points.sort(key=lambda point: point["date"])
    DATA_PATH.write_text(json.dumps(history, indent=2) + "\n", encoding="utf-8")
    return history


def render_svg(history: dict) -> str:
    points = history["points"]
    width, height = 1200, 430
    left, right, top, bottom = 92, 1135, 132, 340
    current = int(points[-1]["stars"])
    max_value = max(int(point["stars"]) for point in points)
    max_y = max(4, int(math.ceil(max_value / 4.0) * 4))

    def x_at(index: int) -> float:
        if len(points) == 1:
            return (left + right) / 2
        return left + (right - left) * index / (len(points) - 1)

    def y_at(value: int) -> float:
        return bottom - (bottom - top) * value / max_y

    coordinates = [
        (x_at(index), y_at(int(point["stars"])))
        for index, point in enumerate(points)
    ]
    polyline = " ".join(f"{x:.1f},{y:.1f}" for x, y in coordinates)
    area = (
        f"M {coordinates[0][0]:.1f} {bottom} "
        + " ".join(f"L {x:.1f} {y:.1f}" for x, y in coordinates)
        + f" L {coordinates[-1][0]:.1f} {bottom} Z"
    )
    grid = []
    for step in range(5):
        y = top + (bottom - top) * step / 4
        label = round(max_y * (4 - step) / 4)
        grid.append(
            f'<line x1="{left}" y1="{y:.1f}" x2="{right}" y2="{y:.1f}" '
            'stroke="#A5B4FC" stroke-opacity=".12"/>'
            f'<text x="{left - 18}" y="{y + 5:.1f}" text-anchor="end" '
            f'fill="#818CF8" font-size="14">{label}</text>'
        )
    dots = "".join(
        f'<circle cx="{x:.1f}" cy="{y:.1f}" r="4" fill="#22D3EE" '
        'stroke="#07101F" stroke-width="2"/>'
        for x, y in coordinates[-30:]
    )
    end_label = points[-1]["date"] if len(points) > 1 else "Tracking started"

    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}" role="img" aria-labelledby="title desc">
  <title id="title">CoreClaw API Directory star history</title>
  <desc id="desc">Daily GitHub star count, currently {current} stars.</desc>
  <defs>
    <linearGradient id="background" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#070B1D"/><stop offset=".55" stop-color="#111B46"/><stop offset="1" stop-color="#0B3A4A"/>
    </linearGradient>
    <linearGradient id="line" x1="0" y1="0" x2="1" y2="0">
      <stop stop-color="#8B5CF6"/><stop offset=".5" stop-color="#6366F1"/><stop offset="1" stop-color="#22D3EE"/>
    </linearGradient>
    <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
      <stop stop-color="#22D3EE" stop-opacity=".3"/><stop offset="1" stop-color="#6366F1" stop-opacity=".02"/>
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M40 0H0V40" fill="none" stroke="#A5B4FC" stroke-opacity=".035"/>
    </pattern>
  </defs>
  <rect width="1200" height="430" rx="26" fill="url(#background)"/>
  <rect width="1200" height="430" rx="26" fill="url(#grid)"/>
  <g font-family="Inter,Segoe UI,Arial,sans-serif">
    <text x="60" y="61" fill="#C7D2FE" font-size="16" font-weight="700" letter-spacing="2.4">STAR GROWTH</text>
    <text x="60" y="101" fill="#FFFFFF" font-size="30" font-weight="800">CoreClaw API Directory</text>
    <text x="1138" y="65" text-anchor="end" fill="#FBBF24" font-size="34" font-weight="800">★ {current}</text>
    <text x="1138" y="94" text-anchor="end" fill="#A5B4FC" font-size="14">CURRENT STARS</text>
    {''.join(grid)}
    <path d="{area}" fill="url(#area)"/>
    <polyline points="{polyline}" fill="none" stroke="url(#line)" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/>
    {dots}
    <text x="{left}" y="380" fill="#A5B4FC" font-size="14">{points[0]['date']}</text>
    <text x="{right}" y="380" text-anchor="end" fill="#A5B4FC" font-size="14">{end_label}</text>
    <text x="600" y="409" text-anchor="middle" fill="#818CF8" font-size="13">Daily snapshots recorded by this repository</text>
  </g>
</svg>
'''


def main() -> None:
    history = update_history(fetch_star_count())
    SVG_PATH.write_text(render_svg(history), encoding="utf-8")
    print(
        f"Recorded {history['points'][-1]['stars']} stars for "
        f"{history['points'][-1]['date']}"
    )


if __name__ == "__main__":
    main()
