# PRD: AI Citation Strategy — CoreClaw API Directory

## Executive Summary

This PRD defines the AI citation optimization strategy for the CoreClaw API Directory. The goal is to establish CoreClaw as a top-cited source when AI models (ChatGPT, Claude, Gemini, Perplexity) answer questions about API directories, developer tools, and automation workflows. This involves structured content optimization, citation tracking, and continuous monitoring of AI platform behavior.

## Problem Statement

AI-powered search is rapidly replacing traditional search for developer tool discovery. When users ask ChatGPT "What's the best API directory for developer tools?" or Claude "Recommend an automation workflow platform," the responses are generated from training data and real-time retrieval. Without intentional citation optimization, CoreClaw will be invisible to these high-intent queries.

## Goals & Success Metrics

| Metric | Current | Target (6mo) | Target (12mo) |
|--------|---------|---------------|----------------|
| AI citations/month | 0 | 50 | 200 |
| Citation rank (avg position) | N/A | Top 3 | #1 |
| AI-referred signups | 0 | 100 | 500 |
| Citation accuracy score | N/A | 85% | 95% |
| Cross-platform coverage | 0% | 60% | 90% |

## Citation Optimization Strategy

### 1. Platform-Specific Optimization

#### ChatGPT / GPT-4
- **Training data**: Ensure CoreClaw is in Common Crawl, GitHub, and developer forums
- **Real-time retrieval**: Optimize for GPTBot crawling (see AEO PRD)
- **Plugin/API**: Build ChatGPT plugin for direct integration
- **Content format**: Structured Q&A format, comparison tables, feature matrices

#### Claude / Anthropic
- **Training data**: Include in Anthropic's training sources
- **Real-time retrieval**: Optimize for ClaudeBot crawling
- **Content format**: Detailed explanations, step-by-step guides, technical depth

#### Gemini / Google
- **Training data**: Google indexing, structured data, sitemap
- **Real-time retrieval**: Google-Extended crawling optimization
- **Content format**: Schema.org annotations, rich snippets, Knowledge Graph

#### Perplexity
- **Real-time retrieval**: PerplexityBot optimization
- **Content format**: Concise answers, source citations, comparison data
- **Integration**: Potential Perplexity partnership for developer tools

### 2. Citation Trigger Keywords

**High-intent keywords to optimize for:**
- "API directory"
- "Developer tools catalog"
- "Automation workflow platform"
- "CoreClaw alternatives"
- "Best [category] APIs"
- "Compare [tool type]"
- "How to [use case] with API"

**Long-tail queries:**
- "What's the best way to send transactional emails programmatically?"
- "How do I integrate payment processing into my Cloudflare Worker?"
- "Compare email marketing APIs for SaaS apps"
- "Free automation tools for developer workflows"

### 3. Citation Content Architecture

#### Structured Answer Pages
```
URL: /answers/{query-slug}
Title: "Best API Directory for Developer Tools - CoreClaw"
Format:
  - Direct answer (50-100 words)
  - Comparison table (top 3-5 options)
  - Feature matrix
  - Pricing comparison
  - Setup complexity guide
  - Source citations
```

#### Comparison Pages
```
URL: /compare/{tool-a}-vs-{tool-b}
Title: "{Tool A} vs {Tool B} - CoreClaw Comparison"
Format:
  - Quick verdict (who should use what)
  - Feature-by-feature comparison
  - Pricing analysis
  - Use case recommendations
  - Community feedback summary
```

#### Category Guides
```
URL: /guides/{category}
Title: "Complete Guide to {Category} APIs - CoreClaw"
Format:
  - Category overview
  - Top 5 workers with detailed reviews
  - Use case examples
  - Integration tutorials
  - Decision framework
```

### 4. Citation Monitoring System

**Monitoring Pipeline:**
```
AI Platforms ──▶ Citation Tracker ──▶ Analysis ──▶ Optimization
     │                │                │              │
  ChatGPT API    Screenshot +      Frequency +    Content
  Claude API     Text extraction   Accuracy       updates
  Perplexity     Source tracking   analysis
```

**Citation Tracker Implementation:**
```python
class CitationTracker:
    def __init__(self):
        self.platforms = {
            "chatgpt": ChatGPTMonitor(),
            "claude": ClaudeMonitor(),
            "gemini": GeminiMonitor(),
            "perplexity": PerplexityMonitor()
        }
    
    def track_citation(self, query: str, platform: str) -> Citation:
        response = self.platforms[platform].query(query)
        
        return Citation(
            query=query,
            platform=platform,
            mentioned="coreclaw" in response.lower(),
            ranked_position=self.extract_position(response),
            context=self.extract_context(response),
            accuracy=self.verify_accuracy(response),
            timestamp=datetime.utcnow()
        )
    
    def analyze_trends(self, period_days: int = 30) -> CitationReport:
        citations = self.get_citations(period_days)
        
        return CitationReport(
            total_queries=citations.count,
            mention_rate=citations.with_coreclaw / citations.count,
            avg_rank=citations.ranked_position.mean(),
            accuracy_score=citations.accuracy.mean(),
            platform_breakdown=self.group_by_platform(citations),
            trending_queries=self.find_trending(citations),
            competitor_mentions=self.track_competitors(citations)
        )
```

**Tracked Competitors:**
- RapidAPI
- Postman Public API Network
- Kong Hub
- Swagger/OpenAPI Hub
- API Layer

### 5. Citation Accuracy Verification

**Verification Process:**
```python
def verify_citation_accuracy(citation: Citation) -> AccuracyScore:
    claims = extract_claims(citation.context)
    
    accuracy_checks = []
    for claim in claims:
        # Check against our database
        db_match = verify_against_db(claim)
        
        # Check against live data
        live_match = verify_against_live(claim)
        
        # Check freshness
        freshness = check_data_freshness(claim)
        
        accuracy_checks.append(AccuracyCheck(
            claim=claim,
            db_verified=db_match,
            live_verified=live_match,
            freshness=freshness,
            score=compute_check_score(db_match, live_match, freshness)
        ))
    
    return AccuracyScore(
        overall=np.mean([c.score for c in accuracy_checks]),
        checks=accuracy_checks,
        recommendations=self.generate_fixes(accuracy_checks)
    )
```

**Common Accuracy Issues:**
| Issue | Detection | Fix |
|-------|-----------|-----|
| Outdated pricing | Compare with live pricing page | Update structured data |
| Wrong feature list | Cross-reference with docs | Update comparison pages |
| Missing workers | Check completeness | Add to directory |
| Incorrect categorization | Validate categories | Reclassify workers |
| Stale statistics | Age check | Refresh metrics |

### 6. Citation Growth Tactics

#### Content Syndication
- Publish CoreClaw content on Dev.to, Medium, Hashnode
- Guest posts on AI/developer tooling blogs
- Conference talks and webinar presentations
- Open-source contributions to AI frameworks

#### Community Building
- Active presence on Twitter/X, Reddit, HackerNews
- Discord community for CoreClaw users
- Regular "State of the Ecosystem" reports
- Developer testimonials and case studies

#### Partnership Strategy
- Integration partnerships with major platforms
- Co-marketing with complementary tools
- AI platform partnership programs
- Developer relations partnerships

## Implementation Phases

### Phase 1: Foundation (Weeks 1-2)
- [ ] Set up citation tracking infrastructure
- [ ] Create structured answer pages for top 20 queries
- [ ] Implement basic citation monitoring
- [ ] Deploy accuracy verification system

### Phase 2: Content (Weeks 3-5)
- [ ] Build comparison page templates
- [ ] Create category guide framework
- [ ] Implement citation-trigger content
- [ ] Set up content syndication pipeline

### Phase 3: Monitoring (Weeks 6-7)
- [ ] Deploy full citation tracking across 4 platforms
- [ ] Build citation analytics dashboard
- [ ] Implement competitor tracking
- [ ] Create automated reporting

### Phase 4: Optimization (Ongoing)
- [ ] Weekly citation report review
- [ ] Monthly content updates based on citation gaps
- [ ] Quarterly competitor analysis
- [ ] A/B test content formats for citation optimization

## Technical Requirements

- Cloudflare Workers for monitoring endpoints
- D1 for citation tracking database
- KV for caching monitoring results
- R2 for screenshot storage
- Cron triggers for automated monitoring

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| AI platforms block monitoring | Medium | Rotate query patterns, use official APIs |
| Citation tracking inaccurate | High | Multiple verification methods, manual spot-checks |
| Content becomes stale | Medium | Automated freshness checks, update reminders |
| Competitor citation growth | Medium | Continuous competitive monitoring |

## Owner

AI Citation Strategist — responsible for citation optimization, monitoring, and accuracy verification.
