# CoreClaw Launch Plan — Marketing + SEO Workflow

> Goal: maximum visibility in 24–72h. Ranking #1 overnight is not realistic (Google needs days-weeks to index and rank new pages), but we CAN: get every page indexed fast, get thousands of eyeballs from communities, and build the link signals that make rankings compound.

**Live site:** https://coreclaw.netlify.app/ · **Repo:** https://github.com/marouanedaouyny-prog/coreclaw-api-directory (fork)
**Affiliate URL:** `https://www.coreclaw.com/?fpr=chris69`

---

## STEP 0 — DEPLOY THE NEW SEO CONTENT (do this first, 5 min)

The new 12 guide pages, og-card.svg, homepage guides section, and schema are **in git but NOT live yet** (verified: `https://coreclaw.netlify.app/guides/best-web-scraping-apis` returns 404).

**How to deploy (pick one):**
- **Drag & drop (easiest):** open https://app.netlify.com/drop → drag the **`docs/`** folder (from `C:\Users\hp\Desktop\New folder\coreclaw-api-directory\docs`) → deploy. Site keeps the same name since you'll be re-deploying to the existing site if connected; otherwise re-drag over the existing site and confirm "Replace site".
- **Netlify CLI:** `npm i -g netlify-cli` then `netlify deploy --prod --dir=docs` (after `netlify login`).

**Verify after deploy:**
- https://coreclaw.netlify.app/guides/best-web-scraping-apis → 200
- https://coreclaw.netlify.app/assets/og-card.svg → 200
- Homepage shows "Guides & How-To" section

---

## STEP 1 — SEO INDEXING (Day 0, after deploy, 15 min)

### Google Search Console (already verified + sitemap submitted)
1. GSC → Sitemaps → re-submit `sitemap.xml` (now 142 URLs: 130 + 12 guides)
2. URL Inspection → paste each of the 12 guide URLs → click **"Request Indexing"** (do all 12; you can do a few per day)
   - guides/best-web-scraping-apis
   - guides/instagram-scraper-api, guides/tiktok-scraper-api, guides/youtube-scraper-api
   - guides/linkedin-scraper-api, guides/amazon-price-tracking-api
   - guides/google-maps-scraper-lead-generation, guides/email-finder-api
   - guides/reddit-scraper-api, guides/job-board-scraper-api
   - guides/shopify-product-data-scraper, guides/web-scraping-without-code
3. Also request indexing for the homepage (it changed: new section + schema)

### Bing Webmaster Tools (free, fast indexing, feeds ChatGPT)
1. Sign in: https://www.bing.com/webmasters → add site `coreclaw.netlify.app` (import from GSC with one click)
2. Submit `sitemap.xml`
3. Optional: use **IndexNow** (https://www.indexnow.org) — paste the 12 guide URLs, one key, done. Bing indexes within minutes-hours.

### Structural (already done — no action)
- 118 worker pages: unique titles/descriptions, SoftwareApplication JSON-LD, canonical, breadcrumbs ✅
- 12 guide pages: Article + FAQPage + BreadcrumbList JSON-LD ✅
- Homepage: WebSite + Organization schema, og:image social card ✅
- llms.txt with Guides section ✅ (AI agents: ChatGPT/Claude/Perplexity can cite the site)

---

## STEP 2 — LAUNCH DAY POSTING SCHEDULE (pick a Tue/Wed/Thu; times UTC)

| Time (UTC) | Channel | Asset | Effort |
|---|---|---|---|
| 08:00 | **r/webdev** | reddit-posts.md Post 1 | copy-paste |
| 09:30 | **r/Python** | reddit-posts.md Post 2 | copy-paste |
| 12:00 | **Hacker News** | hacker-news.md (title 1) | copy-paste + reply to comments |
| 15:00 | **Dev.to** | devto-article.md | copy-paste, add cover image |
| 17:00 | **X/Twitter** | twitter-thread.md (7-tweet thread) | copy-paste |
| 19:00 | **r/automation** or **r/datascience** | reddit-posts.md Post 3/4 | copy-paste |
| next day | **Product Hunt** | product-hunt.md | launch at 00:01 PT, answer every comment |

**Rules for Reddit/HN/Dev.to (don't get banned):**
- Post the content, not just a link. Every draft above is content-first ✅
- Reply to every comment within 1–2 hours (this is what drives HN/Reddit visibility)
- r/Entrepreneur, r/SaaS, r/microsaas, r/selfhosted posts are "evergreen" — save for a day with less engagement, or answer questions about the revenue model honestly
- Never post the same title to multiple subs same day

### Bonus distribution (Day 1–2)
- **GitHub:** update fork README with guides links + screenshots (it's public, acts as a backlink)
- **Directory listings (free backlinks, fast):** Submit to:
  - https://github.com/ossu — no. Use: **alternativeTo.net** (add "CoreClaw API Directory"), **producthunt alternatives lists**, **Free for developers** (https://free-for.dev — PR with the project), **startup directories**: F6S, BetaList, Uneed
- **Hacker News + Lobste.rs:** Lobste.rs invite needed, skip if none
- **Discord/Slack:** post in web scraping / automation communities (e.g., Scraping Club, Web Scraping Community, r/scraping)

---

## STEP 3 — LINK BUILDING + AUTHORITY (Days 2–7)

1. **Free-for-dev PR** — the best backlink: add the site to https://github.com/ripienaar/free-for-dev (open source list, 100K+ stars). A PR listing it as "API directories" gets a strong link + real traffic.
2. **AlternativeTo listing** — add the site as an alternative to paid scrapers; one profile, one link.
3. **Blog/guest posts** — expand guides into 2–3 medium-length posts (1,000+ words) on Medium/Dev.to with links back to guides. Each post = another indexed page pointing at the site.
4. **Answer questions** — Stack Overflow / Quora questions about "how to scrape Instagram/X" with genuine answers + occasional link (only where it truly helps).
5. **README of the fork** — make the fork the canonical source; add badges + guides table. (Repo README update included in the PR.)

---

## STEP 4 — MEASURE (5 min/day)

| Metric | Where | Target by Day 7 |
|---|---|---|
| GSC indexed pages | GSC → Pages | 100+ of 142 |
| GSC impressions | GSC → Performance | 500+/day |
| Clicks on affiliate links | localStorage click counter / CoreClaw dashboard | any > 0 |
| Visitors | Netlify Analytics (free) or Cloudflare | 1,000+ total |

**Week 2:** check GSC → Performance → filter position 50–68 → write 1 blog post per 3 keywords (the guide system already generates these; just add more guides in `GUIDES` array in `scripts/build-site.js`).

---

## Files that matter

- `marketing/reddit-posts.md`, `hacker-news.md`, `twitter-thread.md`, `devto-article.md`, `product-hunt.md` — updated with fork links + guides mention
- `docs/guides/*.html` — 12 SEO guide pages (in git, need deploy)
- `docs/assets/og-card.svg` — social sharing card
- `scripts/build-site.js` — generator (add guides via `GUIDES` array)
