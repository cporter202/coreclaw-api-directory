# Session Checkpoint — CoreClaw API Directory

Save date: Mon Aug 03 2026 (updated Tue Aug 04 2026)
Repo: https://github.com/cporter202/coreclaw-api-directory.git
Live site: https://coreclaw.netlify.app/

## State: COMPLETE + COMMITTED (push pending)
- Site redesigned (teal/cyan instrument-panel theme, Space Grotesk, signal-bar health meters, dark mode toggle)
- 118 worker pages + 11 category pages + homepage, all regenerated
- Local `docs/` now matches the DEPLOYED Netlify site **byte-for-byte** (verified all 129 pages against live URLs, 0 mismatches)
- Modal-index bug fixed in `docs/index.html` renderWorkers() (uses `workersData.indexOf(w)`)
- Git history (main): `4e4f326` (latest, link-style parity) → `32f7647` (redesign) → `818bfd9` → `df8ca9b`
- Working tree clean (only `SESSION_CHECKPOINT.md` untracked)

## Next steps (in order)

### 1. Push to GitHub (BLOCKED — needs user action)
Run `gh auth login` — log in as **cporter202** (currently authed as marouanedaouyny-prog → 403).
After that: `git push origin main` (HEAD is `4e4f326`).

### 2. Google Search Console
Resubmit `https://coreclaw.netlify.app/sitemap.xml` (130 URLs).

### 3. Marketing
Post drafts in `marketing/` when ready.

## Key commands
- Build: `npm run build:pages` (regenerates docs/workers, docs/categories, sitemap, robots, llms.txt)
- Verify local == deployed: compare local files with https://coreclaw.netlify.app/{path} (extensionless works)

## Notes
- Deployed pages use root-relative clean URLs: `/`, `/workers/{slug}`, `/categories/{slug}` (no .html), single-quoted attrs — generator matches this now
- Netlify serves extensionless URLs natively (200, no redirect)
- Affiliate links: `https://www.coreclaw.com/coreclaw/{slug}?fpr=chris69` with `rel="noopener nofollow sponsored"`; click tracking in `localStorage["cc-clicks"]`
- Stale copy at `C:\Users\hp\Desktop\coreclaw-api-directory` (HEAD `4e70261`) — NOT the deploy source, ignore
- `SITE_URL` at `scripts/build-site.js:7`
