#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const SITE_URL = "https://coreclaw.netlify.app";
const DOCS_DIR = path.join(__dirname, "..", "docs");
const WORKERS_DIR = path.join(DOCS_DIR, "workers");
const CATEGORIES_DIR = path.join(DOCS_DIR, "categories");
const DATA_FILE = path.join(DOCS_DIR, "data.json");

const CATEGORIES = [
  { slug: "e-commerce", name: "E-Commerce & Marketplaces", icon: "🛍️" },
  { slug: "social", name: "Social & Creator Data", icon: "🌐" },
  { slug: "search", name: "Search, Maps & SEO", icon: "🔎" },
  { slug: "jobs", name: "Jobs & Recruiting", icon: "💼" },
  { slug: "leads", name: "Lead Generation", icon: "🎯" },
  { slug: "ai-research", name: "AI & Research", icon: "✨" },
  { slug: "devtools", name: "Developer Utilities", icon: "🧰" },
  { slug: "finance", name: "Finance & Markets", icon: "📈" },
  { slug: "real-estate", name: "Real Estate", icon: "🏠" },
  { slug: "education", name: "Education & Knowledge", icon: "📚" },
  { slug: "news", name: "News & Media", icon: "📰" },
];

const GUIDES = [
  {
    slug: "best-web-scraping-apis",
    title: "Best Web Scraping APIs in 2026",
    metaTitle: "Best Web Scraping APIs in 2026 (Free Directory)",
    metaDesc: "Compare the best web scraping APIs for 2026: Amazon, Instagram, TikTok, LinkedIn, Google Maps and more. 118 APIs, health scores, free to browse.",
    h1: "Best Web Scraping APIs in 2026",
    intro:
      "Looking for the best web scraping API? The right one depends on the site you need data from and the shape of the data you want out. This directory tracks 118 production-ready scraping and data-extraction APIs across 11 categories — e-commerce, social media, jobs, lead generation, finance and more — each with a live health score so you can see what is actually working before you commit.",
    sections: [
      {
        h2: "How to choose a scraping API",
        paras: [
          "Start with the source. Scraping an Amazon product page and scraping LinkedIn profiles are completely different engineering problems — different anti-bot systems, different data shapes, different rate limits. A directory entry that lists the exact inputs (URL, keyword, ASIN) and outputs saves hours of trial and error.",
          "Second, check health. A scraper that breaks when the target site changes is worthless. Every worker in this directory carries a health score (0-100%) so you can avoid dead tools and pick ones that are actively maintained.",
        ],
      },
      {
        h2: "The most-used scraping APIs right now",
        paras: [
          "Amazon price and review scrapers lead because e-commerce price tracking is the most common scraping use case. Social platforms (Instagram, TikTok, YouTube) follow — creators and marketers want engagement data. Job boards and lead-generation sources (LinkedIn, Indeed, Glassdoor, Apollo, Hunter) round out the top tier because they feed sales and recruiting workflows.",
          "Browse the category pages below to see every worker in each space, or jump straight to the recommended workers at the end of this guide.",
        ],
      },
      {
        h2: "Scraping APIs vs. building your own scraper",
        paras: [
          "Building your own scraper means owning proxy rotation, browser fingerprints, captcha handling and HTML parsing — easily weeks of work per site. A scraping API does all of that for you and returns clean JSON or CSV. The trade-off is cost per call; for light or one-off jobs, your own scraper can be cheaper.",
          "For anything that needs to run reliably at scale — price monitoring, lead generation, competitor research — a managed scraping API is almost always the faster, more reliable route.",
        ],
      },
    ],
    faqs: [
      { q: "What is the best free web scraping API?", a: "There is no single best API — it depends on the target site. The strongest free-to-browse directory here covers Amazon, social media, jobs and lead-gen sources, and every API is free to discover with transparent health scores." },
      { q: "Are scraping APIs legal?", a: "Scraping public data is generally legal, but you must respect each site's terms of service, robots.txt, and local privacy laws (GDPR, CCPA) when the data contains personal information." },
      { q: "How much does a scraping API cost?", a: "Pricing is usually per request or per result. The exact plans vary by provider — check each worker's page and the CoreClaw platform for current pricing." },
    ],
    relatedSlugs: ["google-search-scraper", "amazon-product-scraper", "instagram-profile-scraper", "linkedin-jobs-scraper", "seo-audit-tool"],
  },
  {
    slug: "instagram-scraper-api",
    title: "Instagram Scraper API — How to Extract Instagram Data",
    metaTitle: "Instagram Scraper API: Extract Profiles, Posts & Reels",
    metaDesc: "Scrape Instagram profiles, posts, comments and reels without an official API. Compare the best Instagram scraper APIs, with health scores and setup guides.",
    h1: "Instagram Scraper API — Extract Profiles, Posts & Reels",
    intro:
      "Instagram scraper APIs pull public Instagram data — profiles, posts, comments, reels, hashtags — without you needing Meta's official API approval. This guide covers the main scraping use cases and the ready-to-use Instagram workers in this directory.",
    sections: [
      {
        h2: "What you can scrape on Instagram",
        paras: [
          "Profile data: username, bio, follower count, post counts. Post data: caption, engagement, media URLs. Comments: content, commenter info, likes. Reels: view counts, likes, shares, hashtags. This is the data influencers, brands and market researchers use for benchmarking and campaign analysis.",
          "For influencer research, start with profile scraping by username or URL — follower count and engagement are the two numbers that matter most for vetting a creator.",
        ],
      },
      {
        h2: "Profile scraping by username vs. URL",
        paras: [
          "You can look up Instagram profiles either by username (no URL needed, great for batch lists) or by profile URL. The username-based route is usually the most convenient for building a research list of dozens or hundreds of accounts.",
          "After profile data, the highest-value next step is post or reel scraping — that gives you the engagement metrics (likes, comments, views) that actually predict whether an audience is real.",
        ],
      },
      {
        h2: "Hashtag and comment scraping",
        paras: [
          "Hashtag scraping finds posts and accounts around a topic — useful for trend discovery and audience building. Comment scraping powers sentiment analysis and community research. Both are bulk-friendly: one keyword or post URL in, structured rows out.",
        ],
      },
    ],
    faqs: [
      { q: "Do I need Meta's official Instagram API?", a: "No. For public data, a scraping API works without official API approval and without rate-limit surprises." },
      { q: "Can I scrape Instagram without logging in?", a: "Public profile, post and reel data can be extracted without an account in most cases; the workers in this directory handle the technical details for you." },
      { q: "Is Instagram scraping against the rules?", a: "Only collect public data, respect the platform's terms, and never store personal data without a lawful basis — see GDPR/CCPA guidance." },
    ],
    relatedSlugs: ["instagram-profile-scraper", "instagram-post-scraper", "instagram-reel-scraper", "instagram-hashtag-scraper"],
  },
  {
    slug: "tiktok-scraper-api",
    title: "TikTok Scraper API — Extract TikTok Data Without Official API",
    metaTitle: "TikTok Scraper API: Profiles, Videos & Search Data",
    metaDesc: "Scrape TikTok profiles, videos, search results and shop data without the official API. Compare TikTok scraper APIs with health scores in this directory.",
    h1: "TikTok Scraper API — Profiles, Videos & Search",
    intro:
      "TikTok scraper APIs extract public TikTok data — creator profiles, video metrics, search results, and TikTok Shop products — without building your own anti-bot stack. Here are the use cases and the ready-to-use TikTok workers in the directory.",
    sections: [
      {
        h2: "Creator and video analytics",
        paras: [
          "Profile scraping gives you bio, follower count, and content performance. Video scraping by URL or list URL gives views, likes, comments, shares, and audio info — the raw material for viral-trend analysis and influencer vetting.",
          "For competitor monitoring, scrape a set of creator profiles weekly and track follower growth and engagement deltas.",
        ],
      },
      {
        h2: "Search and keyword scraping",
        paras: [
          "Keyword and search-URL scraping surfaces videos and creators around a topic. It's the TikTok equivalent of a SERP scraper — useful for trend research, content ideation and identifying rising creators early.",
        ],
      },
      {
        h2: "TikTok Shop data",
        paras: [
          "TikTok Shop scraping extracts store details, product info, pricing, sales data and reviews from shop URLs. E-commerce teams use it to monitor competitor catalogs and pricing in the rapidly growing social-commerce channel.",
        ],
      },
    ],
    faqs: [
      { q: "Can I scrape TikTok without an API key?", a: "Yes — the workers in this directory handle public-data extraction without you managing a key or an anti-bot pipeline." },
      { q: "How do I scrape a creator's video list?", a: "Use a profile-URL or list-URL scraper: pass the profile URL and get the recent video metadata, including views, likes, and audio." },
      { q: "What can I use TikTok data for?", a: "Trend research, influencer outreach, competitor monitoring, content strategy, and e-commerce product research via TikTok Shop." },
    ],
    relatedSlugs: ["tiktok-posts-scraper", "tiktok-profile-scraper", "tiktok-search-scraper", "tiktok-shop-scraper"],
  },
  {
    slug: "amazon-price-tracking-api",
    title: "Amazon Price Tracking API — Monitor Prices Automatically",
    metaTitle: "Amazon Price Tracking API: Track Prices & Competitors",
    metaDesc: "Track Amazon prices automatically with a scraping API. Compare Amazon product, review and bestseller scrapers, with health scores and use cases.",
    h1: "Amazon Price Tracking API — Monitor Prices Automatically",
    intro:
      "An Amazon price tracking API fetches current product data — price, rank, ratings, availability — on a schedule so you can monitor competitor pricing, build price alerts, or feed a marketplace dashboard. This guide covers the common setups and the Amazon workers in the directory.",
    sections: [
      {
        h2: "Product-level price tracking",
        paras: [
          "Give the scraper a product URL, ASIN or keyword and it returns structured price, title, brand, rating, reviews, ranking and image data. Running it on a cron schedule gives you a clean price history without writing a single scraper yourself.",
          "For sellers, tracking your own listings catches price undercutting; for buyers, it powers deal alerts on the products you care about.",
        ],
      },
      {
        h2: "Best sellers and category monitoring",
        paras: [
          "Best Sellers page URLs can be scraped in bulk for market-trend data — which products are moving, in which niches. Combined with keyword scraping, this is the standard research stack for private-label sellers choosing what to sell next.",
        ],
      },
      {
        h2: "Reviews and ASIN lookup",
        paras: [
          "Review scraping gives you structured sentiment and rating data for reputation monitoring. ASIN lookup is the fastest way to pull a product record when you already know the identifier.",
        ],
      },
    ],
    faqs: [
      { q: "How often can I track Amazon prices?", a: "It depends on the provider's plan and rate limits. For daily monitoring most plans are fine; check the individual worker's CoreClaw page for details." },
      { q: "Can I track prices without an API key?", a: "Yes — the scraping workers here handle extraction for you; you only supply the product URL, ASIN or keyword." },
      { q: "What data does an Amazon scraper return?", a: "Typically title, price, currency, brand, ratings, review count, ASIN, BSR ranking, images and availability." },
    ],
    relatedSlugs: ["amazon-product-scraper", "amazon-global-product-scraper", "amazon-reviews-scraper", "amazon-bestsellers-scraper"],
  },
  {
    slug: "google-maps-scraper-lead-generation",
    title: "Google Maps Scraper for Lead Generation",
    metaTitle: "Google Maps Scraper: Generate Local Business Leads",
    metaDesc: "Scrape Google Maps for local business leads: names, phones, websites, reviews. Compare Google Maps scraper APIs with health scores and outreach playbooks.",
    h1: "Google Maps Scraper for Lead Generation",
    intro:
      "A Google Maps scraper turns the map into a lead list: business name, phone, website, address, category, reviews and more — filtered by keyword and location. It's one of the fastest ways to build a local-business outbound list. Here's how to use it well.",
    sections: [
      {
        h2: "What data you get from a Maps scrape",
        paras: [
          "Typical fields: business name, address, phone, website, email (via enrichment), rating, review count, category, and coordinates. That's a complete outbound row: contact channel, context, and a trust signal (reviews) to personalize with.",
          "The Google Maps Lead Finder worker in this directory goes further and returns verified contacts and decision-maker emails where available.",
        ],
      },
      {
        h2: "The outreach playbook",
        paras: [
          "1) Define your ICP as a search term + city list. 2) Run the scraper per term/location. 3) Deduplicate and enrich with email-finder tools. 4) Personalize each first touch with a real detail from the listing (e.g. review count, years in business). Volume without personalization is how lists die.",
        ],
      },
      {
        h2: "Reviews as a separate dataset",
        paras: [
          "Google Maps reviews scraping gives you star ratings, review text, reviewer details and owner responses. Use it for reputation monitoring, competitor teardowns, and identifying unhappy customers at competitor businesses — a classic list-build angle.",
        ],
      },
    ],
    faqs: [
      { q: "Is scraping Google Maps allowed?", a: "Public business-listing data is widely used for outreach; follow Google's terms, respect opt-out/unsubscribe requests, and comply with GDPR/CCPA when contacting individuals." },
      { q: "Can I scrape business email addresses?", a: "Maps listings usually have phone/website; email is added via enrichment (email finder APIs) — this directory includes those workers too." },
      { q: "How do I scrape multiple cities?", a: "Run the scraper per keyword and city combination; each run returns a fresh batch of listings you can merge and deduplicate." },
    ],
    relatedSlugs: ["google-maps-scraper", "google-maps-reviews-scraper", "google-maps-lead-finder", "yelp-scraper"],
  },
  {
    slug: "linkedin-scraper-api",
    title: "LinkedIn Scraper API — Jobs, Companies & Profiles",
    metaTitle: "LinkedIn Scraper API: Jobs, Companies & People Data",
    metaDesc: "Scrape LinkedIn jobs, companies and people profiles without the official API. Compare LinkedIn scraper APIs with health scores in this directory.",
    h1: "LinkedIn Scraper API — Jobs, Companies & People",
    intro:
      "LinkedIn scraper APIs extract public LinkedIn data: job listings, company profiles, and people profiles. Recruiters use them to build candidate pipelines, sales teams use them for account research, and analysts use them for labor-market data.",
    sections: [
      {
        h2: "Job scraping (keyword, URL or listing)",
        paras: [
          "Scrape job listings by keyword + location, by job URL, or by a search/listing page URL. Output: title, company, location, salary range, description, application link, post date. Recruiters and job-board aggregators use this to build feeds without scraping LinkedIn directly.",
        ],
      },
      {
        h2: "Company and people profiles",
        paras: [
          "Company scraping returns name, industry, size, description, and page link. People-profile scraping returns name, headline, location, current company, experience, education and skills — the building blocks of account-based research.",
          "Note: personal data requires a lawful processing basis. Use people data for B2B outreach where you have a legitimate interest, and honor opt-outs.",
        ],
      },
      {
        h2: "Candidate search without cookies",
        paras: [
          "Some workers in this directory find candidates without logins, cookies or bans — verified names, titles and profile URLs for a role + city. That's the fastest recruiter workflow: search, export, engage on LinkedIn.",
        ],
      },
    ],
    faqs: [
      { q: "Is LinkedIn scraping against the rules?", a: "LinkedIn restricts automated access in its terms. Keep to public data, low volumes, and lawful business use; many scraping APIs throttle responsibly to reduce ban risk." },
      { q: "Can I scrape LinkedIn without logging in?", a: "Public job listings and company pages can be scraped without a session in most cases; people profiles vary. Several directory workers are designed around no-cookie operation." },
      { q: "What's the best LinkedIn data for recruiting?", a: "Start with candidate search (role + city → profile URLs), then company scraping for employer branding and market mapping." },
    ],
    relatedSlugs: ["linkedin-jobs-scraper", "linkedin-jobs-scraper-tool", "linkedin-company-scraper", "linkedin-people-profile-scraper", "linkedin-sales-navigator-scraper"],
  },
  {
    slug: "youtube-scraper-api",
    title: "YouTube Scraper API — Video, Channel & Comment Data",
    metaTitle: "YouTube Scraper API: Videos, Channels & Comments",
    metaDesc: "Extract YouTube video metadata, channel stats, comments and search results with scraping APIs. Compare YouTube scraper APIs with health scores.",
    h1: "YouTube Scraper API — Videos, Channels & Comments",
    intro:
      "YouTube scraper APIs pull public video metadata, channel statistics, comments and search results — no official API quota juggling required. They're the backbone of competitor research, content analytics, and YouTube SEO tooling.",
    sections: [
      {
        h2: "Video and channel metadata",
        paras: [
          "By URL or video ID you get title, description, channel info, views, likes, comments and duration. By channel URL you get subscriber count, video count, view count and popular videos — everything needed to benchmark a niche.",
        ],
      },
      {
        h2: "Keyword search scraping",
        paras: [
          "Search scraping by keywords returns the ranking of videos for a query — the raw data for YouTube keyword research and content gap analysis. Filter by upload date, content type, duration and features to narrow the signal.",
        ],
      },
      {
        h2: "Comments for sentiment",
        paras: [
          "Comment scraping by video ID gives content, commenter details, likes and replies — usable for sentiment analysis and community research. It's the most underused YouTube dataset for creators who want to know what their audience actually thinks.",
        ],
      },
    ],
    faqs: [
      { q: "Can I scrape YouTube without the official API?", a: "Yes — scraping workers handle public data extraction and output JSON/CSV without API quotas." },
      { q: "What is the best way to benchmark a channel?", a: "Channel scraping for subscriber/view counts, then video scraping on the top videos for engagement rates." },
      { q: "How do I find video keywords?", a: "Use search-result scraping for your topic, then mine the ranking videos' titles and tags for keyword patterns." },
    ],
    relatedSlugs: ["youtube-scraper", "youtube-channel-scraper", "youtube-comments-scraper", "youtube-search-scraper"],
  },
  {
    slug: "reddit-scraper-api",
    title: "Reddit Scraper API — Posts, Comments & Subreddits",
    metaTitle: "Reddit Scraper API: Posts, Comments & Subreddit Data",
    metaDesc: "Scrape Reddit posts, comments and subreddit data for market research, trend monitoring and community analysis. Compare Reddit scraper APIs here.",
    h1: "Reddit Scraper API — Posts, Comments & Subreddits",
    intro:
      "Reddit is one of the richest sources of unfiltered consumer opinion on the web. A Reddit scraper API extracts posts, comments, votes and media by URL or keyword — perfect for market research, brand monitoring and trend spotting.",
    sections: [
      {
        h2: "Post and comment scraping",
        paras: [
          "Scrape a post URL or a subreddit and get structured rows: title, content, score, comment counts, votes, media, timestamps, author. Comment scraping by URL extracts the full thread — the part that holds the actual opinions.",
        ],
      },
      {
        h2: "Keyword and subreddit monitoring",
        paras: [
          "Search Reddit by keyword to find every mention of your product, competitor or topic. Filter by time range and sort. Teams run this weekly as a lightweight social-listening layer before investing in enterprise tools.",
        ],
      },
      {
        h2: "Use cases that actually convert",
        paras: [
          "Market research (what do users complain about), content ideation (what questions keep being asked), lead sourcing (who is asking for a solution), and community intelligence for product teams.",
        ],
      },
    ],
    faqs: [
      { q: "Does Reddit scraping work without an API key?", a: "Yes — public post and comment data is extracted by the workers here without you managing keys." },
      { q: "Can I monitor brand mentions automatically?", a: "Yes, run keyword scraping on a schedule (e.g. weekly) and diff the results to catch new mentions." },
      { q: "Is Reddit data useful for research?", a: "It's among the highest-signal public opinion data — real users, real complaints, real questions." },
    ],
    relatedSlugs: ["reddit-scraper", "reddit-subreddit-scraper"],
  },
  {
    slug: "shopify-product-data-scraper",
    title: "Shopify Product Data Scraper — Extract Store Catalogs",
    metaTitle: "Shopify Product Scraper: Extract Store Catalog Data",
    metaDesc: "Scrape Shopify stores: product titles, prices, SKUs, variants, images and inventory. Compare Shopify scraper APIs with health scores and use cases.",
    h1: "Shopify Product Data Scraper — Store Catalog Extraction",
    intro:
      "Shopify product scrapers extract the entire catalog of any Shopify store — titles, prices, SKUs, variants, images, inventory status and metadata — from just a store URL. It's the standard tool for competitive retail intelligence.",
    sections: [
      {
        h2: "Single store scraping",
        paras: [
          "Feed a store URL and the scraper handles sitemap discovery and page traversal, returning the full product catalog as structured data. Price changes, new SKUs, sold-out variants — all captured.",
        ],
      },
      {
        h2: "Price and assortment monitoring",
        paras: [
          "Run competitor stores on a schedule to track pricing strategy and assortment changes. Combined with Amazon and eBay workers, it gives you a multi-channel retail picture from one directory.",
        ],
      },
      {
        h2: "Use it with other marketplaces",
        paras: [
          "Shopify data pairs naturally with Amazon and eBay scrapers for omnichannel analysis: the same product, priced differently per channel, is exactly the kind of insight retail teams pay for.",
        ],
      },
    ],
    faqs: [
      { q: "Can I scrape any Shopify store?", a: "Public stores yes — the scraper discovers product URLs from the store's sitemap and parses each page." },
      { q: "What fields do I get?", a: "Title, price, SKU, variants, images, inventory status and product metadata." },
      { q: "How is this different from a generic web scraper?", a: "It's purpose-built: sitemap discovery, Shopify-specific parsing and clean structured output out of the box." },
    ],
    relatedSlugs: ["shopify-scraper", "shopify-store-scraper", "amazon-product-scraper", "ebay-scraper-tool"],
  },
  {
    slug: "email-finder-api",
    title: "Email Finder API — Find Business Emails for Lead Gen",
    metaTitle: "Email Finder API: Find Business Email Addresses",
    metaDesc: "Find professional email addresses with email finder APIs: Hunter, Snovio, Apollo, Clearbit. Compare the best email finder APIs with health scores.",
    h1: "Email Finder API — Find Business Email Addresses",
    intro:
      "An email finder API resolves a person's or company's professional email from a domain or name — the missing piece between a lead list and an outbound campaign. This guide covers the main players and how to combine them for maximum deliverability.",
    sections: [
      {
        h2: "How email finder APIs work",
        paras: [
          "Given a company domain (or name + company), the API returns verified email addresses with sources and confidence scores. Domain email finders crawl contact pages and check public sources; people finders match names to address patterns.",
        ],
      },
      {
        h2: "Build a complete lead pipeline",
        paras: [
          "The classic stack: Google Maps scraper (business list) → company website scraper (domain + context) → email finder (addresses) → outreach. This directory contains every step as a ready worker — no code required.",
        ],
      },
      {
        h2: "Deliverability best practices",
        paras: [
          "Only send to verified addresses (the APIs return confidence scores — use them), personalize every first line, warm up sending domains, and honor unsubscribes immediately. List quality beats list size every time.",
        ],
      },
    ],
    faqs: [
      { q: "Are email finder APIs legal?", a: "Finding business emails for B2B outreach is standard practice; follow CAN-SPAM/GDPR, verify consent where required, and always provide an unsubscribe." },
      { q: "What's the accuracy of found emails?", a: "Varies by provider — quality APIs return confidence scores and source attribution so you can filter to verified addresses only." },
      { q: "How is an email finder different from a data provider?", a: "Data providers sell prebuilt lists; email finders build fresh, targeted lists from your own account selection — higher quality, more compliant." },
    ],
    relatedSlugs: ["hunter-scraper", "snovio-scraper", "apollo-scraper", "clearbit-scraper", "domain-whois-scraper"],
  },
  {
    slug: "job-board-scraper-api",
    title: "Job Board Scraper API — Indeed, Glassdoor & More",
    metaTitle: "Job Board Scraper API: Indeed, Glassdoor, LinkedIn & More",
    metaDesc: "Scrape job listings from Indeed, Glassdoor, LinkedIn, ZipRecruiter, RemoteOK and We Work Remotely. Compare job board scraper APIs with health scores.",
    h1: "Job Board Scraper API — Aggregate Jobs From Any Board",
    intro:
      "A job board scraper API pulls job listings from Indeed, Glassdoor, LinkedIn, ZipRecruiter, RemoteOK and We Work Remotely — titles, companies, locations, salaries, descriptions and post dates — into one structured feed. It's how job aggregators and labor-market analysts stay complete.",
    sections: [
      {
        h2: "Indeed and Glassdoor scraping",
        paras: [
          "Keyword and industry-based scraping returns listings with company info, salary ranges and employee reviews. Glassdoor adds the salary/company-review layer that job seekers actually care about.",
        ],
      },
      {
        h2: "Remote and niche boards",
        paras: [
          "RemoteOK, We Work Remotely, ZipRecruiter and Dice cover the remote and tech segments. Scraping several boards in parallel and merging gives you coverage no single board provides.",
        ],
      },
      {
        h2: "What to build with job data",
        paras: [
          "Job aggregator sites, salary benchmarking, skills-demand analysis (which keywords appear in which markets), and career-site analytics. The data is structured the same way across boards, so downstream analysis is uniform.",
        ],
      },
    ],
    faqs: [
      { q: "Can I scrape Indeed without being blocked?", a: "Purpose-built job board scrapers handle anti-bot measures; health scores in this directory show which ones are currently working." },
      { q: "How do I combine multiple boards?", a: "Run one scraper per board for your keywords and merge on normalized fields (title, company, location)." },
      { q: "Is salary data included?", a: "Yes for boards that show it — Indeed and Glassdoor listings usually include salary ranges when published." },
    ],
    relatedSlugs: ["indeed-job-scraper", "glassdoor-scraper", "ziprecruiter-scraper", "remoteok-scraper", "weworkremotely-scraper"],
  },
  {
    slug: "web-scraping-without-code",
    title: "Web Scraping Without Code — Complete Beginner Guide",
    metaTitle: "Web Scraping Without Code: Beginner's Guide (2026)",
    metaDesc: "Learn how to scrape websites without writing code: ready-made scraping APIs, screenshot tools, PDF extractors and content converters. Free directory inside.",
    h1: "Web Scraping Without Code — A Complete Beginner Guide",
    intro:
      "You don't need to write code to scrape the web. Ready-made scraping tools — and the 118 API workers in this directory — handle everything from extracting text to screenshotting pages. Here's the no-code path, step by step.",
    sections: [
      {
        h2: "The no-code toolkit",
        paras: [
          "Start with a universal content extractor: paste a URL, get clean text, markdown or HTML. For pages that render with JavaScript, use a browser-rendering worker. For PDFs, use a PDF extractor. For visual records, use a screenshot API. Each is a one-URL input, structured output — zero code.",
        ],
      },
      {
        h2: "When you need a purpose-built scraper",
        paras: [
          "If your target is a specific site (Amazon, Instagram, LinkedIn), a purpose-built worker beats a generic one: it already handles that site's layout and anti-bot systems, and returns clean fields (price, followers, salary) instead of raw HTML. The category pages in this directory group them by site.",
        ],
      },
      {
        h2: "Export and automate",
        paras: [
          "Every worker in the directory exports CSV or JSON — import straight into spreadsheets or dashboards. For automation, schedule the workers on CoreClaw and wire the output into your tools. That's the entire pipeline, no code involved.",
        ],
      },
    ],
    faqs: [
      { q: "Can I really scrape without code?", a: "Yes — modern scraping tools accept a URL (or keyword) and return structured data; this directory's workers are built exactly that way." },
      { q: "What's the easiest first scrape?", a: "Try a content extractor on a simple article page, then a purpose-built scraper for a site you care about." },
      { q: "What formats can I export?", a: "CSV and JSON from most workers, and images/PDFs from the media tools." },
    ],
    relatedSlugs: ["html-to-markdown", "pdf-extractor", "javascript-renderer", "screenshot-api"],
  },
];

const CSS = `*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#F5F7FA;--surface:#FFFFFF;--surface2:#EDF1F7;--surface3:#E2E8F2;--ink:#0C1526;--ink2:#3E4A5C;--ink3:#76839A;--line:#E3E9F1;--line2:#C6D0DE;--accent:#0D9488;--accent2:#06B6D4;--accent-ink:#0F766E;--accent-soft:rgba(13,148,136,.1);--ok:#10B981;--warn:#F59E0B;--bad:#EF4444;--shadow-s:0 1px 2px rgba(12,21,38,.05),0 1px 3px rgba(12,21,38,.06);--shadow-m:0 4px 16px rgba(12,21,38,.08);--shadow-l:0 16px 44px rgba(12,21,38,.16);--radius:14px;--radius-s:9px;--font-d:"Space Grotesk","Inter",system-ui,sans-serif;--font-b:"Inter",system-ui,-apple-system,sans-serif;--font-m:"JetBrains Mono",ui-monospace,SFMono-Regular,Consolas,monospace;--grad:linear-gradient(135deg,#0D9488,#06B6D4)}
@media(prefers-color-scheme:dark){:root{--bg:#0A0F1C;--surface:#101826;--surface2:#182234;--surface3:#22304A;--ink:#EFF4FB;--ink2:#A9B6CC;--ink3:#6E7C96;--line:#1E2A3F;--line2:#2C3B55;--accent:#2DD4BF;--accent2:#22D3EE;--accent-ink:#5EEAD4;--accent-soft:rgba(45,212,191,.12);--ok:#34D399;--warn:#FBBF24;--bad:#F87171;--shadow-s:0 1px 2px rgba(0,0,0,.4);--shadow-m:0 4px 16px rgba(0,0,0,.4);--shadow-l:0 16px 44px rgba(0,0,0,.55)}}
[data-theme="dark"]{--bg:#0A0F1C;--surface:#101826;--surface2:#182234;--surface3:#22304A;--ink:#EFF4FB;--ink2:#A9B6CC;--ink3:#6E7C96;--line:#1E2A3F;--line2:#2C3B55;--accent:#2DD4BF;--accent2:#22D3EE;--accent-ink:#5EEAD4;--accent-soft:rgba(45,212,191,.12);--ok:#34D399;--warn:#FBBF24;--bad:#F87171;--shadow-s:0 1px 2px rgba(0,0,0,.4);--shadow-m:0 4px 16px rgba(0,0,0,.4);--shadow-l:0 16px 44px rgba(0,0,0,.55)}
[data-theme="light"]{--bg:#F5F7FA;--surface:#FFFFFF;--surface2:#EDF1F7;--surface3:#E2E8F2;--ink:#0C1526;--ink2:#3E4A5C;--ink3:#76839A;--line:#E3E9F1;--line2:#C6D0DE;--accent:#0D9488;--accent2:#06B6D4;--accent-ink:#0F766E;--accent-soft:rgba(13,148,136,.1);--ok:#10B981;--warn:#F59E0B;--bad:#EF4444;--shadow-s:0 1px 2px rgba(12,21,38,.05),0 1px 3px rgba(12,21,38,.06);--shadow-m:0 4px 16px rgba(12,21,38,.08);--shadow-l:0 16px 44px rgba(12,21,38,.16)}
html{scroll-behavior:smooth}
body{font-family:var(--font-b);background:var(--bg);color:var(--ink);line-height:1.7;-webkit-font-smoothing:antialiased;transition:background .25s,color .25s}
a{color:var(--accent);text-decoration:none}
::selection{background:var(--accent);color:#fff}
:focus-visible{outline:2px solid var(--accent);outline-offset:2px;border-radius:4px}
.container{max-width:860px;margin:0 auto;padding:0 20px}
header{background:color-mix(in srgb,var(--surface) 88%,transparent);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border-bottom:1px solid var(--line);position:sticky;top:0;z-index:100}
.header-inner{display:flex;align-items:center;justify-content:space-between;padding:12px 20px;max-width:1200px;margin:0 auto;gap:12px}
.logo{font-family:var(--font-d);font-weight:700;font-size:1.02rem;color:var(--ink);display:flex;align-items:center;gap:9px;letter-spacing:-.01em}
.logo svg{width:24px;height:24px;color:var(--accent)}
.logo b{color:var(--accent)}
.header-nav{display:flex;align-items:center;gap:10px}
.header-visit{font-family:var(--font-m);font-size:.7rem;font-weight:600;color:var(--accent-ink);border:1px solid var(--line2);border-radius:99px;padding:6px 13px;transition:all .2s}
.header-visit:hover{border-color:var(--accent);background:var(--accent-soft)}
.theme-toggle{background:var(--surface2);border:1px solid var(--line);width:36px;height:36px;border-radius:9px;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--ink2);transition:all .2s}
.theme-toggle:hover{color:var(--ink);border-color:var(--line2)}
.theme-toggle svg{width:16px;height:16px}
.ic-sun{display:none}
[data-theme="dark"] .ic-moon{display:none}
[data-theme="dark"] .ic-sun{display:block}
.crumb{font-family:var(--font-m);font-size:.72rem;color:var(--ink3);padding:26px 0 0;text-transform:uppercase;letter-spacing:.12em}
.crumb a{color:var(--ink3)}
.crumb a:hover{color:var(--accent)}
.crumb span{color:var(--line2);margin:0 6px}
main{padding:10px 0 44px}
h1{font-family:var(--font-d);font-size:clamp(1.7rem,4vw,2.3rem);font-weight:700;margin:12px 0 6px;line-height:1.2;letter-spacing:-.02em}
.sub{font-family:var(--font-m);font-size:.8rem;color:var(--ink3);margin-bottom:22px;display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.desc{font-size:1.02rem;color:var(--ink2);margin-bottom:20px}
.token{background:var(--surface2);border:1px solid var(--line);border-left:3px solid var(--accent);border-radius:var(--radius-s);padding:14px 16px;margin-bottom:22px;font-family:var(--font-m);font-size:.85rem;color:var(--ink2);line-height:1.65}
.token strong{display:block;font-size:.66rem;text-transform:uppercase;letter-spacing:.24em;color:var(--ink);margin-bottom:6px}
.meter{display:inline-flex;align-items:flex-end;gap:2.5px;height:13px}
.meter i{width:3.5px;border-radius:1.5px;background:var(--line2);height:25%}
.meter i:nth-child(2){height:50%}
.meter i:nth-child(3){height:75%}
.meter i:nth-child(4){height:100%}
.meter i.on{background:currentColor}
.meter-ok{color:var(--ok)}.meter-warn{color:var(--warn)}.meter-bad{color:var(--bad)}
.meter-num{font-family:var(--font-m);font-size:.72rem;font-weight:600;color:var(--ink2)}
.cta-wrap{margin:4px 0 34px}
.cta{display:inline-flex;align-items:center;gap:8px;background:var(--grad);color:#fff;padding:13px 28px;border-radius:var(--radius-s);font-weight:700;font-size:.95rem;transition:transform .2s,box-shadow .2s;box-shadow:0 3px 12px rgba(13,148,136,.25)}
.cta:hover{transform:scale(1.02);box-shadow:0 6px 20px rgba(13,148,136,.4);color:#fff}
.cta-note{font-family:var(--font-m);font-size:.68rem;color:var(--ink3);margin-top:10px}
h2{font-family:var(--font-d);font-size:1.15rem;font-weight:700;margin:30px 0 14px;letter-spacing:-.01em}
.related{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:10px}
.rel-card{background:var(--surface);border:1px solid var(--line);border-radius:var(--radius-s);padding:14px;transition:all .2s;box-shadow:var(--shadow-s)}
.rel-card:hover{transform:translateY(-2px);box-shadow:var(--shadow-m);border-color:var(--accent)}
.rel-card .rc-name{font-weight:600;font-size:.88rem;color:var(--ink);display:block;margin-bottom:4px}
.rel-card .rc-cat{font-family:var(--font-m);font-size:.62rem;color:var(--accent-ink);text-transform:uppercase;letter-spacing:.12em}
.cat-workers{display:flex;flex-direction:column;gap:10px}
.cat-worker{display:flex;align-items:center;gap:14px;background:var(--surface);border:1px solid var(--line);border-radius:var(--radius-s);padding:13px 16px;transition:all .2s;box-shadow:var(--shadow-s)}
.cat-worker:hover{transform:translateY(-2px);box-shadow:var(--shadow-m);border-color:var(--accent)}
.cw-icon{font-size:1.15rem;flex-shrink:0;width:38px;height:38px;display:flex;align-items:center;justify-content:center;background:var(--surface2);border-radius:9px;border:1px solid var(--line)}
.cw-main{display:flex;flex-direction:column;flex:1;min-width:0}
.cw-name{font-weight:600;font-size:.9rem;color:var(--ink)}
.cw-desc{font-size:.76rem;color:var(--ink3);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.cw-health{display:inline-flex;align-items:center;gap:7px;flex-shrink:0}
.cat-nav{display:flex;justify-content:space-between;gap:10px;margin-top:30px;font-family:var(--font-m);font-size:.76rem}
.cat-nav a{color:var(--ink3)}
.cat-nav a:hover{color:var(--accent)}
.back{margin-top:30px;font-size:.88rem}
footer{background:var(--surface);border-top:1px solid var(--line);padding:28px 20px;text-align:center;color:var(--ink3);font-size:.8rem}
footer a{color:var(--accent)}
.footer-mono{font-family:var(--font-m);font-size:.66rem;letter-spacing:.08em;text-transform:uppercase;color:var(--ink3);margin-bottom:8px}
@media(max-width:640px){.header-inner{padding:10px 16px}.crumb{padding-top:20px}}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;scroll-behavior:auto!important}}`;

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function catMeta(slug) {
  for (const c of CATEGORIES) if (c.slug === slug) return c;
  return { slug, name: slug, icon: "📦" };
}

function healthTone(s){return s>=80?"ok":s>=65?"warn":"bad"}
function meterBars(s){return s>=85?4:s>=75?3:s>=65?2:1}
function meterHtml(s){
  const n=meterBars(s);
  let html=`<span class="meter meter-${healthTone(s)}" aria-label="${s}% health">`;
  for(let i=1;i<=4;i++)html+=`<i${i<=n?' class="on"':''}></i>`;
  return html+`</span><span class="meter-num">${s}%</span>`;
}

function truncate(s, n) {
  if (s.length <= n) return s;
  return s.slice(0, n - 1).replace(/\s+\S*$/, "") + "…";
}

const HEAD_FONTS = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">`;

const HEADER = `<header>
  <div class="container header-inner">
    <a class='logo' href='/'><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v9M7.5 12h9"/></svg><span>CoreClaw <b>API</b> Directory</span></a>
    <div class="header-nav">
      <a class="header-visit" href="https://www.coreclaw.com/?fpr=chris69" target="_blank" rel="noopener nofollow sponsored" data-aff="1">Visit CoreClaw ↗</a>
      <button class="theme-toggle" id="themeToggle" aria-label="Toggle dark mode">
        <svg class="ic-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>
        <svg class="ic-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
      </button>
    </div>
  </div>
</header>`;

const FOOTER = `<footer>
  <div class="container">
    <p class="footer-mono">CoreClaw API Directory · Free · Affiliate-supported</p>
    <p><a href="https://www.coreclaw.com/?fpr=chris69" target="_blank" rel="noopener nofollow sponsored">Visit CoreClaw</a> · <a href="../llms.txt">llms.txt</a> · <a href="../sitemap.xml">sitemap</a></p>
  </div>
</footer>`;

function pageSnippets() {
  return `<script>
(function(){
  var saved=localStorage.getItem("cc-theme");
  if(saved==="dark"||saved==="light"){document.documentElement.setAttribute("data-theme",saved)}
  var btn=document.getElementById("themeToggle");
  if(btn){btn.addEventListener("click",function(){
    var cur=document.documentElement.getAttribute("data-theme");
    if(!cur){cur=(window.matchMedia&&window.matchMedia("(prefers-color-scheme:dark)").matches)?"dark":"light"}
    var next=cur==="dark"?"light":"dark";
    document.documentElement.setAttribute("data-theme",next);
    localStorage.setItem("cc-theme",next);
  })}
  document.querySelectorAll("a[data-aff][data-slug]").forEach(function(a){
    a.addEventListener("click",function(){
      try{
        var clicks=JSON.parse(localStorage.getItem("cc-clicks")||"[]");
        clicks.push({slug:a.getAttribute("data-slug"),name:a.getAttribute("data-name"),category:a.getAttribute("data-cat"),ts:new Date().toISOString()});
        if(clicks.length>200)clicks=clicks.slice(-200);
        localStorage.setItem("cc-clicks",JSON.stringify(clicks));
      }catch(e){}
    });
  });
})();
</script>`;
}

function workerPage(w, all) {
  const cat = catMeta(w.category);
  const title = `${w.name} API | Web Scraping API for ${cat.name}`;
  const desc = truncate(w.token_summary, 158);
  const url = `${SITE_URL}/workers/${w.slug}.html`;
  const related = all
    .filter((x) => x.category === w.category && x.slug !== w.slug)
    .sort((a, b) => b.health_score - a.health_score)
    .slice(0, 6);

  const relatedHtml = related
    .map(
      (r) =>
        `<a class='rel-card' href='/workers/${r.slug}'><span class="rc-name">${esc(r.name)}</span><span class="rc-cat">${esc(
          catMeta(r.category).name
        )}</span></a>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="google-site-verification" content="4cSehcUsHcNcNCeQ0DFm3XfXHawbhuy1zE4PxC52bUo">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="index, follow">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(desc)}">
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": ${JSON.stringify(w.name)},
  "description": ${JSON.stringify(w.description)},
  "applicationCategory": "DeveloperApplication",
  "url": ${JSON.stringify(url)},
  "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD"},
  "aggregateRating": {"@type": "AggregateRating", "ratingValue": ${(w.health_score / 20).toFixed(1)}, "bestRating": "5", "worstRating": "1", "ratingCount": "1"}
}
</script>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "CoreClaw API Directory", "item": ${JSON.stringify(SITE_URL + "/")}},
    {"@type": "ListItem", "position": 2, "name": ${JSON.stringify(cat.name)}, "item": ${JSON.stringify(SITE_URL + "/")}},
    {"@type": "ListItem", "position": 3, "name": ${JSON.stringify(w.name)}}
  ]
}
</script>
${HEAD_FONTS}
<style>${CSS}</style>
</head>
<body>

${HEADER}

<main class="container">
  <div class="crumb"><a href='/'>Home</a><span>›</span><a href='/categories/${cat.slug}'>${esc(cat.name)}</a><span>›</span>${esc(w.name)}</div>
  <h1>${esc(w.name)}</h1>
  <div class="sub">${esc(cat.icon)} ${esc(cat.name)} · ${meterHtml(w.health_score)} health</div>
  <p class="desc">${esc(w.description)}</p>
  <div class="token"><strong>What it does</strong>${esc(w.token_summary)}</div>
  <div class="cta-wrap">
    <a class="cta" data-aff="1" data-slug="${esc(w.slug)}" data-name="${esc(w.name)}" data-cat="${esc(w.category)}" href="${esc(w.affiliate_url)}" target="_blank" rel="noopener nofollow sponsored">Try on CoreClaw →</a>
    <div class="cta-note">No signup required to browse. Affiliate link — supports this directory.</div>
  </div>
  ${related.length ? `<h2>Related ${esc(cat.name)} APIs</h2><div class="related">${relatedHtml}</div>` : ""}
  <div class="back"><a href='/'>← Back to all 118 APIs</a></div>
</main>

${FOOTER}

${pageSnippets()}
</body>
</html>
`;
}

function categoryPage(cat, workers, allCats) {
  const members = workers.filter((w) => w.category === cat.slug);
  const title = `${cat.name} APIs | Web Scraping & Data Extraction`;
  const names = members.map((w) => w.name).slice(0, 8).join(", ");
  const desc = truncate(
    `Production-ready ${cat.name.toLowerCase()} scraping and data extraction APIs. ${members.length} workers including ${names}.`,
    158
  );
  const url = `${SITE_URL}/categories/${cat.slug}.html`;
  const idx = allCats.findIndex((c) => c.slug === cat.slug);
  const prev = allCats[(idx - 1 + allCats.length) % allCats.length];
  const next = allCats[(idx + 1) % allCats.length];

  const workerCards = members
    .sort((a, b) => b.health_score - a.health_score)
    .map(
      (w) =>
        `<a class='cat-worker' href='/workers/${w.slug}'><span class="cw-icon">${cat.icon}</span><span class="cw-main"><span class="cw-name">${esc(
          w.name
        )}</span><span class="cw-desc">${esc(truncate(w.token_summary, 110))}</span></span><span class="cw-health">${meterHtml(
          w.health_score
        )}</span></a>`
    )
    .join("");

  const itemList = members.map((w, i) =>
    JSON.stringify({
      "@type": "ListItem",
      position: i + 1,
      name: w.name,
      url: `${SITE_URL}/workers/${w.slug}.html`,
    })
  );

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="google-site-verification" content="4cSehcUsHcNcNCeQ0DFm3XfXHawbhuy1zE4PxC52bUo">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="index, follow">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(desc)}">
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": ${JSON.stringify(title)},
  "description": ${JSON.stringify(desc)},
  "url": ${JSON.stringify(url)},
  "mainEntity": {"@type": "ItemList", "itemListElement": [${itemList.join(",")}]}
}
</script>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "CoreClaw API Directory", "item": ${JSON.stringify(SITE_URL + "/")}},
    {"@type": "ListItem", "position": 2, "name": ${JSON.stringify(cat.name)}}
  ]
}
</script>
${HEAD_FONTS}
<style>${CSS}</style>
</head>
<body>

${HEADER}

<main class="container">
  <div class="crumb"><a href='/'>Home</a><span>›</span>${esc(cat.name)}</div>
  <h1>${esc(cat.icon)} ${esc(cat.name)} APIs</h1>
  <div class="sub">${members.length} production-ready scraping &amp; data extraction workers</div>
  <p class="desc">${esc(desc)}</p>
  <div class="cta-wrap">
    <a class="cta" data-aff="1" data-slug="${esc(cat.slug)}" data-name="${esc(cat.name)}" data-cat="${esc(cat.slug)}" href="https://www.coreclaw.com/?fpr=chris69" target="_blank" rel="noopener nofollow sponsored">Browse all APIs on CoreClaw →</a>
    <div class="cta-note">Affiliate link — supports this directory.</div>
  </div>
  <h2>All ${members.length} ${esc(cat.name)} APIs</h2>
  <div class="cat-workers">${workerCards}</div>
  <div class="cat-nav">
    <a href='/categories/${prev.slug}'>← ${esc(prev.name)}</a>
    <a href='/categories/${next.slug}'>${esc(next.name)} →</a>
  </div>
  <div class="back"><a href='/'>← Browse all categories</a></div>
</main>

${FOOTER}

${pageSnippets()}
</body>
</html>
`;
}

function guidePage(g, workers) {
  const url = `${SITE_URL}/guides/${g.slug}.html`;
  const related = g.relatedSlugs
    .map((s) => workers.find((w) => w.slug === s))
    .filter(Boolean)
    .slice(0, 6);
  const relatedHtml = related
    .map(
      (r) =>
        `<a class='rel-card' href='/workers/${r.slug}'><span class="rc-name">${esc(r.name)}</span><span class="rc-cat">${esc(
          catMeta(r.category).name
        )}</span></a>`
    )
    .join("");
  const sectionsHtml = g.sections
    .map(
      (s) =>
        `<h2>${esc(s.h2)}</h2>${s.paras.map((p) => `<p>${esc(p)}</p>`).join("")}`
    )
    .join("");
  const faqHtml = g.faqs
    .map(
      (f) =>
        `<details class="faq-item"><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`
    )
    .join("");
  const faqSchema = g.faqs.map((f) => `{"@type":"Question","name":${JSON.stringify(f.q)},"acceptedAnswer":{"@type":"Answer","text":${JSON.stringify(f.a)}}}`).join(",");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="google-site-verification" content="4cSehcUsHcNcNCeQ0DFm3XfXHawbhuy1zE4PxC52bUo">
<title>${esc(g.metaTitle)}</title>
<meta name="description" content="${esc(g.metaDesc)}">
<meta name="robots" content="index, follow">
<link rel="canonical" href="${url}">
<meta property="og:type" content="article">
<meta property="og:title" content="${esc(g.metaTitle)}">
<meta property="og:description" content="${esc(g.metaDesc)}">
<meta property="og:url" content="${url}">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${esc(g.metaTitle)}">
<meta name="twitter:description" content="${esc(g.metaDesc)}">
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": ${JSON.stringify(g.title)},
  "description": ${JSON.stringify(g.metaDesc)},
  "url": ${JSON.stringify(url)},
  "datePublished": "2026-08-05",
  "dateModified": "2026-08-05",
  "author": {"@type": "Organization", "name": "CoreClaw API Directory", "url": ${JSON.stringify(SITE_URL + "/")}}
}
</script>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [${faqSchema}]
}
</script>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "CoreClaw API Directory", "item": ${JSON.stringify(SITE_URL + "/")}},
    {"@type": "ListItem", "position": 2, "name": "Guides", "item": ${JSON.stringify(SITE_URL + "/#guides")}},
    {"@type": "ListItem", "position": 3, "name": ${JSON.stringify(g.title)}}
  ]
}
</script>
${HEAD_FONTS}
<style>${CSS}
.faq-item{background:var(--surface);border:1px solid var(--line);border-radius:var(--radius-s);padding:14px 18px;margin-bottom:10px;box-shadow:var(--shadow-s)}
.faq-item summary{cursor:pointer;font-weight:600;font-size:.92rem;color:var(--ink)}
.faq-item p{margin-top:10px;font-size:.9rem;color:var(--ink2)}
.guide-byline{font-family:var(--font-m);font-size:.72rem;color:var(--ink3);text-transform:uppercase;letter-spacing:.1em;margin-bottom:18px}
.guide-intro{font-size:1.02rem;color:var(--ink2);margin-bottom:26px}
.guide-cta{margin:26px 0 8px}
</style>
</head>
<body>

${HEADER}

<main class="container">
  <div class="crumb"><a href='/'>Home</a><span>›</span><a href='/#guides'>Guides</a><span>›</span>${esc(g.title)}</div>
  <h1>${esc(g.h1)}</h1>
  <div class="guide-byline">Updated August 2026 · CoreClaw API Directory</div>
  <p class="guide-intro">${esc(g.intro)}</p>
  <div class="cta-wrap">
    <a class="cta" href="https://www.coreclaw.com/?fpr=chris69" target="_blank" rel="noopener nofollow sponsored">Browse all APIs on CoreClaw →</a>
    <div class="cta-note">Affiliate link — supports this free directory.</div>
  </div>
  ${sectionsHtml}
  <h2>Recommended workers</h2>
  <p class="desc">Ready-to-use scraping APIs from this directory — each with a live health score.</p>
  <div class="related">${relatedHtml}</div>
  <h2>Frequently asked questions</h2>
  ${faqHtml}
  <div class="guide-cta">
    <a class="cta" href="https://www.coreclaw.com/?fpr=chris69" target="_blank" rel="noopener nofollow sponsored">Explore all 118 APIs →</a>
  </div>
  <div class="back"><a href='/#guides'>← All guides</a> · <a href='/'>Browse all categories</a></div>
</main>

${FOOTER}

${pageSnippets()}
</body>
</html>
`;
}

function buildSitemap(workers) {
  const today = new Date().toISOString().slice(0, 10);
  let out = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
`;
  for (const c of CATEGORIES) {
    out += `  <url>
    <loc>${SITE_URL}/categories/${c.slug}.html</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
`;
  }
  for (const w of workers) {
    out += `  <url>
    <loc>${SITE_URL}/workers/${w.slug}.html</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
  }
  for (const g of GUIDES) {
    out += `  <url>
    <loc>${SITE_URL}/guides/${g.slug}.html</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;
  }
  out += `</urlset>
`;
  return out;
}

function buildRobots() {
  return `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
}

function buildLlmstxt(workers) {
  const lines = [
    "# CoreClaw API Directory",
    "",
    `> ${workers.length} production-ready API workers for web scraping, data extraction, and automation.`,
    "> Browse by category: E-Commerce, Social Media, Search/Maps, Jobs, Lead Generation, AI/Research, Developer Tools, Finance, Real Estate, Education, News.",
    "",
    "## Categories",
  ];
  for (const c of CATEGORIES) {
    const names = workers
      .filter((w) => w.category === c.slug)
      .map((w) => w.name.replace(/ Scraper$/, "").replace(/ API$/, ""))
      .join(", ");
    lines.push(`- ${c.name}: ${names} scrapers`);
  }
  lines.push("", "## Category Pages");
  for (const c of CATEGORIES) {
    lines.push(`- ${c.name}: ${SITE_URL}/categories/${c.slug}.html`);
  }
  lines.push("", "## Workers");
  for (const w of workers) {
    lines.push(`- ${w.name}: ${SITE_URL}/workers/${w.slug}.html`);
  }
  lines.push("", "## Guides");
  for (const g of GUIDES) {
    lines.push(`- ${g.title}: ${SITE_URL}/guides/${g.slug}.html`);
  }
  lines.push("", "## API Usage", "");
  lines.push(
    "All workers are available via the CoreClaw platform. Visit https://www.coreclaw.com/?fpr=chris69 for API access and documentation."
  );
  lines.push("", "## Contact", "");
  lines.push("Visit https://www.coreclaw.com/?fpr=chris69");
  lines.push("");
  return lines.join("\n");
}

function updateIndexCanonical() {
  const file = path.join(DOCS_DIR, "index.html");
  let html = fs.readFileSync(file, "utf8");
  html = html.replace(
    /<link rel="canonical" href="[^"]*">/,
    `<link rel="canonical" href="${SITE_URL}/">`
  );
  fs.writeFileSync(file, html);
}

function main() {
  const workers = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  fs.mkdirSync(WORKERS_DIR, { recursive: true });
  fs.mkdirSync(CATEGORIES_DIR, { recursive: true });
  fs.mkdirSync(path.join(DOCS_DIR, "guides"), { recursive: true });

  for (const w of workers) {
    fs.writeFileSync(path.join(WORKERS_DIR, `${w.slug}.html`), workerPage(w, workers));
  }

  for (const c of CATEGORIES) {
    fs.writeFileSync(path.join(CATEGORIES_DIR, `${c.slug}.html`), categoryPage(c, workers, CATEGORIES));
  }

  for (const g of GUIDES) {
    fs.writeFileSync(path.join(DOCS_DIR, "guides", `${g.slug}.html`), guidePage(g, workers));
  }

  fs.writeFileSync(path.join(DOCS_DIR, "sitemap.xml"), buildSitemap(workers));
  fs.writeFileSync(path.join(DOCS_DIR, "robots.txt"), buildRobots());
  fs.writeFileSync(path.join(DOCS_DIR, "llms.txt"), buildLlmstxt(workers));
  updateIndexCanonical();

  console.log(`Generated ${workers.length} worker pages in docs/workers/`);
  console.log(`Generated ${CATEGORIES.length} category pages in docs/categories/`);
  console.log(`Generated ${GUIDES.length} guide pages in docs/guides/`);
  console.log(`Updated sitemap.xml, robots.txt, llms.txt, index.html canonical`);
  console.log(`Site URL: ${SITE_URL}`);
}

main();
