# PRD: AI Engine Features — CoreClaw API Directory

## Executive Summary

This PRD defines the AI-powered features for the CoreClaw API Directory, transforming it from a static catalog into an intelligent recommendation engine. The system will use RAG (Retrieval-Augmented Generation), semantic search, and anomaly detection to help developers find the right CoreClaw Workers for their use cases, predict emerging tool needs, and detect quality issues across the 118-worker catalog.

## Problem Statement

With 118 CoreClaw Workers across 11 categories, developers face decision fatigue when selecting tools. Manual browsing is inefficient, keyword search misses semantic relationships, and there's no automated quality monitoring. The directory needs intelligence layers that understand worker capabilities, developer intent, and ecosystem health.

## Goals & Success Metrics

| Metric | Current | Target (6mo) | Target (12mo) |
|--------|---------|---------------|----------------|
| Recommendation accuracy | N/A | 85% | 92% |
| Search relevance (nDCG@10) | N/A | 0.75 | 0.85 |
| Anomaly detection precision | N/A | 80% | 90% |
| Time-to-find (avg) | 15min | 3min | 1min |
| User satisfaction (NPS) | N/A | 40 | 60 |

## AI Features Architecture

### 1. RAG-Based Recommendation Engine

**Data Pipeline:**
```
GitHub Repos ──▶ Crawler ──▶ Embeddings ──▶ Vector DB ──▶ RAG API
     │              │            │              │            │
 118 Workers    Extract     OpenAI       Cloudflare    Recommendation
 + metadata     metadata   text-embed    Vectorize     responses
```

**Worker Metadata Extraction:**
- README content and documentation
- Package.json dependencies and scripts
- Source code structure and patterns
- GitHub stars, forks, issues, and activity
- Community contributions and PRs

**Embedding Strategy:**
```python
# Worker description embedding
worker_embedding = embed(
    text=f"{worker.name}: {worker.description}\n"
         f"Use cases: {worker.use_cases}\n"
         f"Category: {worker.category}\n"
         f"Dependencies: {worker.dependencies}",
    model="text-embedding-3-small",
    dimensions=1536
)

# Query embedding
query_embedding = embed(
    text=user_query,
    model="text-embedding-3-small",
    dimensions=1536
)
```

**Recommendation API:**
```
POST /v1/ai/recommend
{
  "query": "I need to send transactional emails with templates",
  "context": {
    "project_type": "SaaS app",
    "tech_stack": ["TypeScript", "Cloudflare"],
    "budget": "free tier"
  },
  "top_k": 5
}

Response: {
  "recommendations": [
    {
      "worker": "email-sender",
      "score": 0.94,
      "reasoning": "Best match for transactional email with template support. "
                   "TypeScript-native, runs on Cloudflare Workers, free tier available.",
      "alternatives": ["email-marketing", "notification-hub"],
      "setup_complexity": "simple",
      "estimated_integration_time": "30 minutes"
    }
  ],
  "related_queries": [
    "email template engines",
    "transactional email providers",
    "Cloudflare Workers email APIs"
  ]
}
```

### 2. Semantic Search

**Search Architecture:**
```
User Query ──▶ Query Parser ──▶ Hybrid Search ──▶ Re-ranker ──▶ Results
                    │                │                │
              Intent +         BM25 + Vector     Cross-encoder
              Entities         (Reciprocal       re-ranking
                               Rank Fusion)
```

**Query Understanding:**
```python
class QueryParser:
    def parse(self, query: str) -> ParsedQuery:
        return ParsedQuery(
            raw=query,
            intent=self.extract_intent(query),  # search, compare, recommend
            entities=self.extract_entities(query),  # worker names, categories
            filters=self.extract_filters(query),  # price, complexity, platform
            embedding=self.embed(query)
        )
```

**Hybrid Search Implementation:**
```sql
-- BM25 lexical search
SELECT worker_id, bm25(workers_fts) as score
FROM workers_fts
WHERE workers_fts MATCH ?
ORDER BY score
LIMIT 20;

-- Vector similarity search (via Vectorize)
SELECT worker_id, distance
FROM vectorize.query(
  embedding := ?,
  top_k := 20,
  metric := 'cosine'
);

-- Reciprocal Rank Fusion
SELECT worker_id,
  (0.7 / (k + bm25_rank)) + (0.3 / (k + vector_rank)) as fused_score
FROM combined_results
ORDER BY fused_score DESC
LIMIT 10;
```

**Search Features:**
- Auto-complete with worker names and categories
- Faceted filtering (category, complexity, price, platform)
- "Did you mean?" for typos
- Related searches and suggestions
- Search history and personalization

### 3. Anomaly Detection System

**Detection Categories:**

| Anomaly Type | Detection Method | Response |
|-------------|-----------------|----------|
| Deprecation risk | GitHub activity analysis | Flag in directory |
| Quality degradation | Issue/PR ratio monitoring | Warning badge |
| Security vulnerability | Dependency scanning alerts | Immediate alert |
| Performance regression | Benchmark comparison | Notification |
| Popularity shift | Download/star trends | Trend indicator |
| Documentation drift | README vs code comparison | Update reminder |

**Monitoring Pipeline:**
```
GitHub API ──▶ Metrics Collector ──▶ Anomaly Detector ──▶ Alerting
     │              │                    │                  │
  Activity       Statistical         Isolation Forest    Slack/Email
  + deps         analysis            + rules             + Dashboard
```

**Anomaly Scoring:**
```python
def compute_health_score(worker: Worker) -> HealthScore:
    factors = {
        "activity": github_activity_score(worker),      # 0-100
        "quality": issue_resolution_score(worker),       # 0-100
        "security": dependency_security_score(worker),   # 0-100
        "performance": benchmark_score(worker),          # 0-100
        "documentation": docs_completeness_score(worker),# 0-100
        "community": contributor_diversity_score(worker),# 0-100
    }
    
    weights = {
        "activity": 0.20,
        "quality": 0.25,
        "security": 0.30,  # Highest weight for security
        "performance": 0.10,
        "documentation": 0.10,
        "community": 0.05,
    }
    
    return HealthScore(
        total=sum(factors[k] * weights[k] for k in factors),
        factors=factors,
        trend=compute_trend(worker.history)
    )
```

**Alert Thresholds:**
- **Critical**: Security score < 50, activity score < 20
- **Warning**: Quality score < 60, performance regression > 20%
- **Info**: Documentation staleness > 30 days, low contributor diversity

### 4. Usage Analytics & Insights

**Analytics Pipeline:**
```
API Requests ──▶ ClickHouse ──▶ Analytics API ──▶ Dashboard
     │              │               │                │
  Structured     Real-time       Aggregated       Visual
  logging        ingestion       queries          insights
```

**Insights API:**
```
GET /v1/ai/insights/trending
GET /v1/ai/insights/popular-searches
GET /v1/ai/insights/category-growth
GET /v1/ai/insights/worker-comparison-trends
```

**Trending Algorithm:**
```python
def compute_trending(window_hours=24) -> List[TrendingWorker]:
    recent = get_recent_activity(window_hours)
    baseline = get_historical_baseline(window_hours * 7)
    
    return sorted([
        TrendingWorker(
            worker=w,
            growth_rate=(recent[w] - baseline[w]) / baseline[w],
            momentum=compute_momentum(w, window_hours),
            velocity=recent[w] / window_hours
        )
        for w in recent
        if recent[w] > baseline[w] * 1.5  # 50% above baseline
    ], key=lambda x: x.momentum, reverse=True)
```

## Implementation Phases

### Phase 1: Foundation (Weeks 1-3)
- [ ] Set up Vectorize index for worker embeddings
- [ ] Build metadata extraction pipeline
- [ ] Implement basic RAG recommendation
- [ ] Deploy health scoring system

### Phase 2: Search (Weeks 4-6)
- [ ] Implement hybrid search (BM25 + Vector)
- [ ] Build query parser and intent classifier
- [ ] Add re-ranking with cross-encoder
- [ ] Implement faceted filtering

### Phase 3: Intelligence (Weeks 7-9)
- [ ] Deploy anomaly detection system
- [ ] Build trending and insights API
- [ ] Implement usage analytics pipeline
- [ ] Create analytics dashboard

### Phase 4: Optimization (Weeks 10-12)
- [ ] A/B test recommendation algorithms
- [ ] Fine-tune embedding model for domain
- [ ] Optimize search latency
- [ ] Implement personalization

## Technical Requirements

- **Vector DB**: Cloudflare Vectorize (1536-dim embeddings)
- **Search**: D1 FTS5 + Vectorize hybrid
- **ML Pipeline**: Python workers for embedding generation
- **Analytics**: ClickHouse for real-time metrics
- **Monitoring**: Grafana + Prometheus for anomaly alerts

## Costs Estimate

| Component | Monthly Cost | Notes |
|-----------|-------------|-------|
| OpenAI Embeddings | $10 | 1M tokens, batch processing |
| Vectorize | $5 | 1M vectors, 10M queries |
| ClickHouse | $50 | Real-time analytics |
| Monitoring | $20 | Grafana Cloud |
| **Total** | **$85/mo** | Scales with usage |

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Embedding quality insufficient | High | Domain fine-tuning, hybrid search |
| Anomaly false positives | Medium | Threshold tuning, manual review |
| Search latency > 500ms | High | Caching, pre-computed indexes |
| Recommendation bias | Medium | Diverse training data, fairness metrics |

## Owner

AI Engineer — responsible for recommendation engine, search intelligence, and anomaly detection systems.
