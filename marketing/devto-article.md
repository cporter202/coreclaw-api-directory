# Dev.to Article — Copy & Publish

---

# How I Built a Free Directory of 118 Web Scraping APIs (and How It Makes Money)

## The Problem

There are 100+ web scraping APIs out there. Amazon scrapers, Instagram scrapers, LinkedIn scrapers, Google Maps scrapers — the list goes on.

But there's no good way to:
1. **Discover** which API fits your use case
2. **Know** which ones are actually working right now
3. **Compare** tools without visiting 20 websites

So I built one.

## What I Built

A free directory of 118 web scraping APIs with:

- **Instant search** across names, descriptions, and keywords
- **11 category pages** (e-commerce, social media, jobs, finance, real estate, ...)
- **Health scores** on every API
- **118 individual detail pages**, each with a summary and direct link
- **llms.txt** so AI agents can discover the directory

Live: https://coreclaw.netlify.app/

## The Tech Stack

Everything runs on free hosting — a static site with no backend:

```
Netlify free tier (hosting)
├── docs/index.html (homepage — search, categories, modals)
├── docs/data.json (all 118 APIs in one file)
├── docs/workers/{slug}.html (118 detail pages)
├── docs/categories/{slug}.html (11 category pages)
├── docs/llms.txt (AI-agent discovery)
├── docs/sitemap.xml (SEO)
└── scripts/build-site.js (Node generator — data.json → 130 HTML pages)
```

Total cost: **$0/month**.

## The Generator Script

The key insight: don't hand-write pages. Keep everything in one JSON file and generate:

```js
// scripts/build-site.js
// reads docs/data.json → writes docs/workers/*.html, docs/categories/*.html,
// sitemap.xml, robots.txt, llms.txt, and updates the canonical URL
// run with: npm run build:pages
```

Each worker gets its own page with:
- Unique `<title>` and meta description (targets "amazon price scraper api" etc.)
- Canonical URL, Open Graph tags
- JSON-LD schema (`SoftwareApplication` + breadcrumbs)
- Description, token summary, health score, affiliate CTA
- Related APIs from the same category

Adding a new API = add one entry to `data.json`, run one command, done.

## SEO + AEO

**SEO:** 130 static pages, each targeting a long-tail keyword. Sitemap submitted to Google.

**AEO (AI Engine Optimization):** `llms.txt` tells AI crawlers what the site is, and lists every worker with its URL. ChatGPT, Claude, and Perplexity can now cite the directory when users ask about scraping APIs — that's a traffic channel most directories ignore.

## The Revenue Model

**Affiliate links.**

Every "Try on CoreClaw" button has a referral tag. When someone signs up through the directory, I earn a commission ($2-15 per conversion).

The directory is free. The tools have affiliate programs. I'm the middleman — and that's the whole business.

## What I Learned

### 1. AI Agents Are a Real Traffic Source
`llms.txt` + structured data means AI chatbots recommend the directory. New channel, most people aren't optimizing for it.

### 2. Long-Tail Keywords Convert Better
"Instagram profile scraper API" converts better than "web scraping API." One page per keyword, not one page per product.

### 3. Static Sites Are Underrated
No backend, no database, no bills. A Node script generates the entire site from one JSON file in under a second.

### 4. Reddit Drives the First Visitors
SEO compounds over months. Reddit and communities give you the first 100 visitors this week.

## Try It

Live: https://coreclaw.netlify.app/

GitHub (all data + generator, open source): https://github.com/cporter202/coreclaw-api-directory

## What's Next

- [ ] Add category pages to sitemap (done — 130 URLs total)
- [ ] Add email signup for a weekly "top APIs" newsletter
- [ ] Build a click dashboard (currently tracking clicks in localStorage)
- [ ] Launch on Product Hunt
- [ ] Add 5-10 new APIs per month

---

*Static site on Netlify free tier. Node generator script. Total cost: $0/month.*
