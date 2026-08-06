# Reddit Posts — Copy & Paste

> Honest posts matching what the site actually is: a free static directory of 118 scraping/data APIs,
> with search, category pages, health scores, and per-worker detail pages. No fake features.

---

## Post 1: r/webdev

**Title:** I built a directory of 118 web scraping APIs — free, searchable, with health scores

**Body:**
Hey r/webdev,

I put together a directory of 118 web scraping and data extraction APIs across 11 categories — Amazon, Instagram, LinkedIn, Google Maps, TikTok, job boards, finance, and more.

What it does:
- **Instant search** across name, description, and keywords ("amazon price", "linkedin jobs")
- **11 category pages** (e-commerce, social, search, jobs, leads, finance, real estate...)
- **Health scores** on every API so you can see what's actually working
- **118 individual detail pages**, each with a description, token summary, and direct link
- **12 in-depth guides** (best scraping APIs of 2026, scraping without code, Instagram/TikTok/LinkedIn scraper guides) with FAQ schemas — great for picking the right tool without guessing

It's a static site, completely free, no account needed. Built with plain HTML/JS and a tiny Node script that generates all 130 pages from a JSON file.

Link: https://coreclaw.netlify.app/

Would love feedback on the UI and any APIs I'm missing!

---

## Post 2: r/Python

**Title:** Free directory of 118 scraping APIs — searchable, with health scores

**Body:**
For anyone building data pipelines in Python, I made a directory of 118 web scraping APIs.

It covers:
- Amazon, eBay, Walmart, Shopify product data
- Instagram, TikTok, Twitter, YouTube, Reddit
- Job boards (LinkedIn, Indeed, Glassdoor)
- Leads (Crunchbase, Apollo, Hunter.io, Google Maps)
- Finance (stocks, crypto, SEC filings)

Every API has a short summary, a health score, and a direct link. Search works across names and descriptions, and each API has its own detail page.

All data is in a single JSON file (`data.json` in the repo), so it's easy to consume programmatically: https://github.com/marouanedaouyny-prog/coreclaw-api-directory

Live site: https://coreclaw.netlify.app/

---

## Post 3: r/automation

**Title:** 118 automation APIs organized in a free directory — with health scores

**Body:**
Built a free directory of 118 automation-ready APIs (web scraping, data extraction, lead gen, social media, job boards, finance).

You can:
- Search by what you want to do ("scrape amazon prices", "find company emails")
- Browse 11 category pages
- Check each API's health score before committing
- Open individual detail pages with token summaries

Everything is static and free — no account, no API key, no signup. The data file is on GitHub if you want to build on it.

Link: https://coreclaw.netlify.app/

---

## Post 4: r/datascience

**Title:** Curated directory of 118 data extraction APIs — free and searchable

**Body:**
For data scientists who need external data, I built a free directory of 118 extraction APIs.

What's there:
- Amazon, eBay, Walmart product data
- Social media (Instagram, TikTok, Twitter, YouTube, Reddit)
- Job boards (LinkedIn, Indeed, Glassdoor)
- Company intelligence (Crunchbase, Apollo, Hunter.io)
- Finance (stocks, crypto, SEC filings)
- Google Maps and SEO tools

Search by keyword or browse by category. Every API has a health score and its own page with a summary. No signup needed.

Link: https://coreclaw.netlify.app/

---

## Post 5: r/Entrepreneur

**Title:** I built a free API directory and monetized it with affiliate links — honest breakdown

**Body:**
I built a directory of 118 web scraping APIs and monetized it through affiliate links. Sharing the honest breakdown:

**How it works:**
1. Free directory with search and category pages
2. Every "Try on CoreClaw" link has my affiliate tag
3. Traffic comes from SEO (130 indexable pages), Reddit, and AI agents (llms.txt)
4. When someone signs up, I earn a commission (CoreClaw pays $2-15 per conversion)

**Cost: $0/month** — static site hosted on Netlify free tier. Node script generates all pages from one JSON file.

**Reality check:** I'm 3 weeks in. SEO traffic takes months to compound. Reddit posts are my main traffic right now. The numbers in most "passive income" posts are inflated — expect $0-50/month for the first few months if you do this.

Link: https://coreclaw.netlify.app/

Happy to answer questions about the model.

---

## Post 6: r/SaaS

**Title:** Built an API directory — sharing the stack and the (honest) revenue model

**Body:**
Built a directory of 118 web scraping APIs. Breakdown:

**Stack:**
- Static HTML/CSS/JS — no framework, no build step for the site itself
- Node script (`build-site.js`) generates 130 pages from `data.json`
- Hosted on Netlify free tier
- Repo is public: https://github.com/marouanedaouyny-prog/coreclaw-api-directory

**Revenue model:**
- Affiliate links to CoreClaw ($2-15/conversion)
- Potential for sponsored listings later

**SEO strategy:**
- 118 worker detail pages + 11 category pages
- sitemap.xml for Google
- llms.txt for AI crawlers (ChatGPT, Claude, Perplexity)

**What I learned:**
- Long-tail keywords ("instagram profile scraper api") beat generic ones
- llms.txt is a real, new traffic channel — AI agents do cite directories
- Reddit drives the first visitors; SEO compounds later

Would love to hear from others building directory products.

---

## Post 7: r/microsaas

**Title:** Micro-SaaS: API directory with affiliate revenue — $0 hosting cost

**Body:**
Built a micro-SaaS: a directory of 118 web scraping APIs.

**Model:** Free directory, affiliate revenue
**Cost:** $0/month (static site on Netlify)
**Tech:** Plain HTML/JS + a Node generator script

**Features:**
- Instant search
- 11 category pages, 118 detail pages
- Health scores per API
- llms.txt for AI-agent discovery

**Growth plan:**
- SEO (130 pages)
- AI optimization (llms.txt + sitemap)
- Community posts like this one
- Product Hunt launch later

Anyone else building directory products? What's working for distribution?

---

## Post 8: r/selfhosted

**Title:** Open source API directory — 118 web scraping tools, deploy anywhere

**Body:**
Built an open source directory of 118 web scraping APIs.

**Features:**
- Search by keyword
- 11 category pages, 118 detail pages
- Health scores on every API
- llms.txt for AI crawlers

**Deploy it anywhere (it's static):**
```bash
git clone https://github.com/marouanedaouyny-prog/coreclaw-api-directory
cd coreclaw-api-directory
npm install
npm run build:pages   # regenerates all 130 pages from docs/data.json
```
Then host the `docs/` folder on Netlify, GitHub Pages, Cloudflare Pages, S3, or nginx — whatever you like.

Live demo: https://coreclaw.netlify.app/

GitHub: https://github.com/marouanedaouyny-prog/coreclaw-api-directory
