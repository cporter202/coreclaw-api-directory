# Contributing to the CoreClaw API Directory

Thanks for helping keep the directory accurate, useful and easy to browse.

## Quick rules

- Match Workers by their stable `owner/name` path, not by title.
- Keep titles and descriptions faithful to the public CoreClaw Store.
- Use one concise description focused on the data returned by the Worker.
- Preserve `?fpr=chris69` on public Worker URLs.
- Keep the affiliate disclosure visible in the README.
- Do not add private, unlisted or inaccessible Workers.

## Adding or updating a Worker

Every CSV record must include:

| Field | Requirement |
|---|---|
| `title` | Public Worker title |
| `path` | Stable `owner/name` path |
| `url` | Direct Worker URL ending in `?fpr=chris69` |
| `category` | One of the directory categories below |
| `source` | Human-friendly website or data source |
| `platform` | Platform label returned by CoreClaw |
| `author` | Worker publisher |
| `description` | One clear sentence describing the output |

## Categories

- E-Commerce & Marketplaces
- Social & Creator Data
- Search, Maps & SEO
- Jobs & Recruiting
- Lead Generation & Company Intelligence
- AI & Research
- Developer & Web Utilities
- Finance & Markets
- Real Estate
- Education & Knowledge
- News & Media

Choose the category that best describes the Worker’s primary use case. Use `source` for the website or service being queried.

## Validation

From the repository root:

```bash
python scripts/generate_category_pages.py
python scripts/generate_category_pages.py --check
python scripts/validate_catalog.py
```

Regenerate the category pages after changing `data/workers.csv`. The checks verify required CSV fields, unique Worker paths, affiliate URLs, main README coverage, category-page coverage and the SVG banner.

## Pull-request checklist

- [ ] The Worker is publicly accessible.
- [ ] The path is unique.
- [ ] The direct URL contains `?fpr=chris69`.
- [ ] The CSV, main README and generated category pages are updated.
- [ ] The category and source are accurate.
- [ ] Both category-page and catalog validation commands pass.
