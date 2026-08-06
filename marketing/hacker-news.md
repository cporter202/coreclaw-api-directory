# Hacker News Post

---

## Title Options (pick one):
1. Show HN: I built a free directory of 118 web scraping APIs with health scores
2. Show HN: 130 static pages generated from one JSON file — an API directory
3. Show HN: API directory with llms.txt for AI agents — affiliate-funded, $0/month

---

## Post Body:

I built a directory of 118 web scraping and data extraction APIs. It's free to use and costs $0/month to run.

**Features:**
- Instant search across names, descriptions, and keywords
- 11 category pages, 118 per-worker detail pages
- 12 in-depth guides (best scraping APIs 2026, no-code scraping, platform-specific how-tos) with FAQ schema
- Health scores showing which APIs are working
- llms.txt + sitemap.xml for AI crawlers and Google
- Click tracking via localStorage (no backend)

**Tech:**
- Static HTML/CSS/JS — no framework, no bundler
- One JSON file (`data.json`) with all 118 APIs
- Node script generates 130 HTML pages from that JSON
- Hosted on Netlify free tier
- Repo is public and deployable anywhere

**Categories:**
E-Commerce (17), Social (21), Search/Maps (8), Jobs (11), Leads (12), AI/Research (8), DevTools (11), Finance (8), Real Estate (5), Education (5), News (12)

**The interesting part:** I added llms.txt so AI agents (ChatGPT, Claude, Perplexity) can discover and recommend the directory. AI crawlers are becoming a real traffic source, and directories are well-positioned for it.

**Revenue model:** Affiliate links. Every tool link has a referral tag. Free directory, commission on signups. Transparently marked (`rel="sponsored"`).

Live: https://coreclaw.netlify.app/
Source: https://github.com/marouanedaouyny-prog/coreclaw-api-directory

Would love feedback on the architecture and any tools I'm missing.

---

## Comments Strategy (if people ask):

**Q: Why not just use the APIs directly?**
A: The directory helps you discover which API fits your use case. There are 100+ options — the directory saves time with summaries and health scores.

**Q: How do you handle API changes?**
A: Health scores track API availability. Workers that go down get flagged in the data and updated on rebuild.

**Q: What about rate limiting?**
A: The directory doesn't call the APIs — it links to them. Rate limits are per-provider.

**Q: Is this just a link farm?**
A: It has structured metadata, per-worker pages, token-optimized summaries, and llms.txt for AI crawlers — it's a directory with actual curation (health scores, categories, descriptions).

**Q: How does it make money?**
A: Affiliate links to CoreClaw, marked as sponsored. Free for users.
