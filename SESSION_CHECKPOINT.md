# Session Checkpoint — CoreClaw API Directory

Save date: Mon Aug 03 2026 (updated Tue Aug 04 2026 and Wed Aug 05 2026)
Repo: https://github.com/cporter202/coreclaw-api-directory.git
Live site: https://coreclaw.netlify.app/

## State: COMPLETE + COMMITTED + PR OPEN (Aug 04)
- Site redesigned (teal/cyan instrument-panel theme, Space Grotesk, signal-bar health meters, dark mode toggle)
- 118 worker pages + 11 category pages + homepage, all regenerated
- Local `docs/` now matches the DEPLOYED Netlify site **byte-for-byte** (verified all 129 pages against live URLs, 0 mismatches)
- Modal-index bug fixed in `docs/index.html` renderWorkers() (uses `workersData.indexOf(w)`)
- Git history (main): `4e4f326` (latest, link-style parity) → `32f7647` (redesign) → `818bfd9` → `df8ca9b`
- Working tree clean (only `SESSION_CHECKPOINT.md` untracked)

## Aug 04 2026 — pushed to GitHub via fork + PR
- Auth: user owns **marouanedaouyny-prog** (NOT cporter202) → push to origin denied (403); repo owner is cporter202
- Remote `cporter202/coreclaw-api-directory` has **unrelated history** (old Python-catalog project, root `76f0448`, main `981831a`) — GitHub blocks PRs between unrelated histories
- Solution:
  - Forked → `marouanedaouyny-prog/coreclaw-api-directory`; local main force-pushed there (`+981831a...4e4f326`)
  - Built mergeable branch `pr-new` on top of original history (`git switch -c pr-new origin/main`, replaced tree with local content, commit `c5320ae`)
  - **PR: https://github.com/cporter202/coreclaw-api-directory/pull/1** (head `marouanedaouyny-prog:pr-new` → base `main`)
  - Remotes: `origin` = cporter202 (read-only), `fork` = marouanedaouyny-prog (writable)

## Aug 05 2026 — Google Search Console VERIFIED + GSC meta tag added
- GSC property `https://coreclaw.netlify.app/` **validated** (Balise HTML method) ✓
- Meta tag `4cSehcUsHcNcNCeQ0DFm3XfXHawbhuy1zE4PxC52bUo` added to:
  - `docs/index.html` (homepage, static file)
  - `scripts/build-site.js` templates (worker + category pages) → all 130 pages regenerated with tag at line 6
  - Netlify dashboard **Snippet injection** (before `</head>`) as belt-and-suspenders for live site
- Netlify: Pretty URLs enabled; no folder redeploy needed (snippet applied live)

## Next steps (in order)

### 1. GSC sitemap ✔ DONE
`/sitemap.xml` submitted Aug 05 — status Réussi, 130 pages découvertes. Property verified via Balise HTML meta tag + Netlify snippet injection.

### 2. PR review/merge (BLOCKED — needs cporter202)
PR #1 replaces old catalog with the redesigned deploy source. If never merged, fork main IS the backup of the work.

### 3. Marketing
Post drafts in `marketing/` when ready.

## Aug 05 2026 — SEO content layer added (guides + schema + og card)
- 12 programmatic SEO guide pages added to `scripts/build-site.js` (`GUIDES` array + `guidePage(g)` renderer):
  - Generated into `docs/guides/{slug}.html` — e.g. best-web-scraping-apis, instagram-scraper-api, amazon-price-tracking-api, google-maps-scraper-lead-generation, linkedin-scraper-api, web-scraping-without-code, etc.
  - Each page: Article + FAQPage + BreadcrumbList JSON-LD, meta/canonical/og/twitter, related-worker cards, affiliate CTA
- `sitemap.xml` now includes 12 guide URLs (142 total); `robots.txt` disallows nothing new; `llms.txt` has a Guides section
- Homepage (`docs/index.html`): new "Guides & How-To" section with 8 guide link cards, `og:image` + `twitter:image` (assets/og-card.svg), WebSite + Organization JSON-LD
- New `docs/assets/og-card.svg` (1200×630, brand gradient) for social sharing
- `npm run build:pages` verified: 118 worker + 11 category + 12 guide pages, sitemap/robots/llms regenerated (worker/category pages now include GSC meta tag — uncommitted on main until this session)
- Note: worker/category page diffs vs last main commit = GSC meta tag line only

## Key commands
- Build: `npm run build:pages` (regenerates docs/workers, docs/categories, sitemap, robots, llms.txt)
- Verify local == deployed: compare local files with https://coreclaw.netlify.app/{path} (extensionless works)

## Notes
- Deployed pages use root-relative clean URLs: `/`, `/workers/{slug}`, `/categories/{slug}` (no .html), single-quoted attrs — generator matches this now
- Netlify serves extensionless URLs natively (200, no redirect)
- Affiliate links: `https://www.coreclaw.com/coreclaw/{slug}?fpr=chris69` with `rel="noopener nofollow sponsored"`; click tracking in `localStorage["cc-clicks"]`
- Stale copy at `C:\Users\hp\Desktop\coreclaw-api-directory` (HEAD `4e70261`) — NOT the deploy source, ignore
- `SITE_URL` at `scripts/build-site.js:7`
