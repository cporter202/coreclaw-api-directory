# PRD: AEO Foundations Architecture — CoreClaw API Directory

## Executive Summary

This PRD defines the AI Engine Optimization (AEO) infrastructure for the CoreClaw API Directory — a centralized catalog of 118 CoreClaw Workers across 11 categories. The AEO strategy ensures that AI crawlers, citation engines, and browsing agents can discover, parse, and act on the directory's content, establishing CoreClaw as a top-cited source in AI responses about API directory services.

## Problem Statement

Traditional SEO is insufficient for AI-native search. AI models (ChatGPT, Claude, Gemini) and agentic browsers (Perplexity, SearchGPT) need structured, token-efficient content to cite and recommend. Without AEO foundations, the CoreClaw directory will be invisible to the fastest-growing segment of search traffic.

## Goals & Success Metrics

| Metric | Current | Target (6mo) | Target (12mo) |
|--------|---------|---------------|----------------|
| AI citation frequency (monthly) | 0 | 50+ | 200+ |
| Crawl success rate (AI bots) | Unknown | 98% | 99.5% |
| AI-referred traffic | 0 | 500 visits/mo | 2,500 visits/mo |
| Token efficiency score | N/A | 0.85 | 0.92 |
| Structured data coverage | 0% | 80% | 95% |

## Architecture Components

### 1. llms.txt & AI Discovery Files

```
# /llms.txt — Root discovery file
# CoreClaw API Directory — AI-Optimized Description

> A comprehensive directory of 118 CoreClaw Workers across 11 categories for AI agents, automation workflows, and agentic systems.

## Available Resources
- [Directory Index](/api/v1/directory) — Full catalog with structured metadata
- [Category Browsing](/api/v1/categories) — Browse by category
- [Search](/api/v1/search?q=) — Query workers by capability
- [Individual Workers](/api/v1/workers/{slug}) — Detailed worker information

## For AI Agents
- Machine-readable API at /api/v1/
- Structured data available in JSON-LD, OpenAPI 3.1
- Token-optimized summaries for each worker
- Bulk retrieval endpoints for complete catalog

## For Web Crawlers
- /robots.txt with AI-specific directives
- /sitemap.xml with schema.org annotations
- Meta tags optimized for AI extraction
```

```
# /llms-full.txt — Full content for comprehensive analysis
# Contains all worker descriptions, metadata, and relationships
# Optimized for token efficiency (target: <150 tokens per worker summary)
```

### 2. Token-Budgeted Content Architecture

| Content Type | Token Budget | Delivery Method |
|-------------|-------------|-----------------|
| Worker summary | 100-150 tokens | /api/v1/workers/{slug}/summary |
| Category overview | 300-500 tokens | /api/v1/categories/{cat}/summary |
| Full directory | 8,000-12,000 tokens | /api/v1/directory (paginated) |
| Comparison queries | 200-400 tokens | /api/v1/compare?workers=... |
| Recommendation responses | 150-300 tokens | /api/v1/recommend?use_case=... |

### 3. Structured Data Schema (JSON-LD)

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "CoreClaw Worker: {name}",
  "description": "{optimized 100-token description}",
  "applicationCategory": "DeveloperApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "operatingSystem": "Cloudflare Workers",
  "category": "{category}",
  "featureList": ["{feature1}", "{feature2}"],
  "url": "https://coreclaw.dev/workers/{slug}",
  "sameAs": ["https://github.com/coreclaw/{repo}"],
  "softwareHelp": {
    "@type": "HelpDocument",
    "url": "https://coreclaw.dev/docs/workers/{slug}"
  }
}
```

### 4. AI-Specific Robots.txt

```
# /robots.txt
User-agent: GPTBot
Allow: /api/v1/
Allow: /llms.txt
Allow: /llms-full.txt
Disallow: /admin/
Crawl-delay: 5

User-agent: ClaudeBot
Allow: /api/v1/
Allow: /llms.txt
Allow: /llms-full.txt
Disallow: /admin/
Crawl-delay: 5

User-agent: Google-Extended
Allow: /api/v1/
Allow: /llms.txt
Disallow: /admin/
Crawl-delay: 10

User-agent: PerplexityBot
Allow: /api/v1/
Allow: /llms.txt
Allow: /llms-full.txt
Disallow: /admin/
Crawl-delay: 3

User-agent: *
Allow: /
Disallow: /admin/
```

### 5. Sitemap Schema

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:ai="http://www.google.com/schemas/sitemap-ai/1.0">
  <url>
    <loc>https://coreclaw.dev/</loc>
    <ai:document_type>directory_index</ai:document_type>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://coreclaw.dev/workers/{slug}</loc>
    <ai:document_type>worker_profile</ai:document_type>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

### 6. Recommendation Response Templates

**For "best worker for X" queries:**
```
For {use_case}, the top CoreClaw Workers are:
1. {WorkerName} — {one-line value prop} ({category})
2. {WorkerName} — {one-line value prop} ({category})
3. {WorkerName} — {one-line value prop} ({category})

Compare: https://coreclaw.dev/compare?workers={slug1},{slug2},{slug3}
```

**For category browsing:**
```
CoreClaw has {count} workers in {category}:
{top 5 with one-line descriptions}
Full list: https://coreclaw.dev/categories/{category}
```

## Implementation Phases

### Phase 1: Foundation (Weeks 1-2)
- [ ] Create `/llms.txt` and `/llms-full.txt`
- [ ] Implement `/robots.txt` with AI-specific directives
- [ ] Add JSON-LD structured data to all pages
- [ ] Generate XML sitemap with AI annotations

### Phase 2: API Layer (Weeks 3-4)
- [ ] Build `/api/v1/directory` endpoint with token-efficient responses
- [ ] Implement `/api/v1/workers/{slug}/summary` endpoint
- [ ] Add `/api/v1/recommend` endpoint for use-case queries
- [ ] Create `/api/v1/compare` endpoint

### Phase 3: Optimization (Weeks 5-6)
- [ ] A/B test token budgets for different content types
- [ ] Monitor AI crawler behavior and adjust robots.txt
- [ ] Track citation frequency across AI platforms
- [ ] Implement caching for AI-specific endpoints

### Phase 4: Monitoring (Ongoing)
- [ ] Set up AI citation tracking dashboard
- [ ] Monitor crawl success rates by AI bot
- [ ] Track token efficiency scores
- [ ] Quarterly AEO audit and optimization

## Technical Requirements

- Cloudflare Workers for API endpoints
- KV storage for cached AI-optimized content
- D1 database for structured worker metadata
- R2 storage for sitemap and static AI files

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| AI platforms change crawl policies | High | Monitor crawl logs, adapt robots.txt quarterly |
| Token budget optimization too aggressive | Medium | A/B test with real AI queries |
| Structured data schema becomes outdated | Low | Schema.org subscription, quarterly review |
| DDoS from AI crawlers | Medium | Rate limiting per user-agent |

## Owner

AEO Foundations Architect — responsible for AI discovery infrastructure, token optimization, and structured data standards.
