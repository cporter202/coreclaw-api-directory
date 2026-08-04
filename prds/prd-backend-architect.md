# PRD: Backend Architecture — CoreClaw API Directory

## Executive Summary

This PRD defines the backend architecture for the CoreClaw API Directory, a scalable, performant, and cost-effective system serving 118 CoreClaw Workers across 11 categories. The architecture leverages Cloudflare's edge computing platform (Workers, D1, KV, R2, Vectorize) to deliver sub-100ms response times globally while maintaining a minimal operational footprint.

## Problem Statement

The CoreClaw directory needs a backend that can:
1. Serve 50,000+ API requests/day with <100ms P95 latency
2. Support full-text search across 118 worker descriptions
3. Provide vector-based semantic search for AI-powered recommendations
4. Scale to 100,000+ workers without architectural changes
5. Cost less than $100/month at current scale

## Goals & Success Metrics

| Metric | Current | Target (6mo) | Target (12mo) |
|--------|---------|---------------|----------------|
| P95 response time | N/A | <100ms | <50ms |
| Uptime | N/A | 99.9% | 99.95% |
| Daily API requests | 0 | 50,000 | 200,000 |
| Storage cost/worker | N/A | $0.05 | $0.02 |
| Cold start time | N/A | <50ms | <25ms |

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        CDN Layer                             │
│                   (Cloudflare Edge)                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │   API Worker │  │  Search Wkr  │  │  AI Worker   │       │
│  │   (REST)     │  │  (Hybrid)    │  │  (RAG)       │       │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘       │
│         │                 │                 │                │
│  ┌──────▼─────────────────▼─────────────────▼───────┐       │
│  │              Service Layer                        │       │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ │       │
│  │  │WorkerSvc│ │SearchSvc│ │ RecSvc  │ │Analytics│ │       │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘ │       │
│  └───────────────────────┬───────────────────────────┘       │
│                          │                                   │
│  ┌───────────────────────▼───────────────────────────┐       │
│  │              Data Layer                            │       │
│  │  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐    │       │
│  │  │ D1  │  │ KV  │  │ R2  │  │Vec  │  │DO   │    │       │
│  │  │ DB  │  │Cache│  │Files│  │Index│  │State│    │       │
│  │  └─────┘  └─────┘  └─────┘  └─────┘  └─────┘    │       │
│  └───────────────────────────────────────────────────┘       │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Data Models

### Workers Table (D1)
```sql
CREATE TABLE workers (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  token_summary TEXT,  -- AI-optimized 100-token summary
  parameters JSON,     -- Input/output schema
  examples JSON,       -- Usage examples
  dependencies JSON,   -- Required dependencies
  metadata JSON,       -- GitHub stars, forks, etc.
  health_score REAL,   -- 0-100 quality score
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX idx_workers_category ON workers(category);
CREATE INDEX idx_workers_health ON workers(health_score DESC);
CREATE INDEX idx_workers_slug ON workers(slug);
```

### Categories Table (D1)
```sql
CREATE TABLE categories (
  slug TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  worker_count INTEGER DEFAULT 0,
  icon TEXT,
  metadata JSON
);
```

### Search Index (D1 FTS5)
```sql
CREATE VIRTUAL TABLE workers_fts USING fts5(
  name,
  description,
  token_summary,
  content=workers,
  content_rowid=rowid
);
```

### Vector Index (Vectorize)
```typescript
interface WorkerVector {
  id: string;           // worker slug
  values: number[];     // 1536-dim embedding
  metadata: {
    name: string;
    category: string;
    health_score: number;
  };
}
```

### Cache Structure (KV)
```
Key Pattern                          TTL        Purpose
─────────────────────────────────────────────────────────
worker:{slug}                        1 hour     Worker detail
category:{slug}                      1 hour     Category detail
search:{hash}                        15 min     Search results
recommend:{hash}                     30 min     Recommendations
directory:page:{n}                   1 hour     Directory listing
stats:daily                          24 hours   Daily statistics
```

## API Endpoints

### Worker Endpoints
```typescript
// GET /v1/workers/:slug
router.get("/v1/workers/:slug", async (c) => {
  const slug = c.req.param("slug");
  
  // Check KV cache first
  const cached = await c.env.KV.get(`worker:${slug}`, "json");
  if (cached) return c.json(cached);
  
  // Query D1
  const worker = await c.env.DB.prepare(
    "SELECT * FROM workers WHERE slug = ?"
  ).bind(slug).first();
  
  if (!worker) {
    return c.json({ error: "Worker not found" }, 404);
  }
  
  // Cache and return
  await c.env.KV.put(`worker:${slug}`, JSON.stringify(worker), {
    expirationTtl: 3600
  });
  
  return c.json(worker);
});
```

### Search Endpoints
```typescript
// GET /v1/search?q=:query&category=:cat&limit=:limit
router.get("/v1/search", async (c) => {
  const query = c.req.query("q");
  const category = c.req.query("category");
  const limit = parseInt(c.req.query("limit") || "10");
  
  // Check search cache
  const cacheKey = `search:${hashQuery(query, category, limit)}`;
  const cached = await c.env.KV.get(cacheKey, "json");
  if (cached) return c.json(cached);
  
  // Hybrid search: BM25 + Vector
  const bm25Results = await BM25Search(c.env.DB, query, category, limit * 2);
  const vectorResults = await VectorSearch(c.env.VECTORIZE, query, limit * 2);
  
  // Reciprocal Rank Fusion
  const fusedResults = reciprocalRankFusion(
    bm25Results,
    vectorResults,
    { bm25Weight: 0.6, vectorWeight: 0.4 }
  ).slice(0, limit);
  
  // Cache and return
  await c.env.KV.put(cacheKey, JSON.stringify(fusedResults), {
    expirationTtl: 900
  });
  
  return c.json(fusedResults);
});
```

### Recommendation Endpoint
```typescript
// POST /v1/recommend
router.post("/v1/recommend", async (c) => {
  const { use_case, tech_stack, budget } = await c.req.json();
  
  // Check recommendation cache
  const cacheKey = `recommend:${hashRecommend(use_case, tech_stack, budget)}`;
  const cached = await c.env.KV.get(cacheKey, "json");
  if (cached) return c.json(cached);
  
  // Embed query
  const queryEmbedding = await embed(use_case);
  
  // Vector search for similar workers
  const similarWorkers = await c.env.VECTORIZE.query(queryEmbedding, {
    topK: 20,
    filter: { category: { $in: getRelevantCategories(use_case) } }
  });
  
  // Rerank with cross-encoder
  const reranked = await crossEncoderRerank(
    use_case,
    similarWorkers.matches
  );
  
  // Apply filters
  const filtered = reranked.filter(worker => {
    if (budget === "free" && worker.metadata.price !== "free") return false;
    if (tech_stack && !worker.metadata.compatibleWith?.some(t => tech_stack.includes(t))) return false;
    return true;
  });
  
  // Generate recommendations
  const recommendations = filtered.slice(0, 5).map(worker => ({
    worker,
    score: worker.score,
    reasoning: generateReasoning(worker, use_case),
    setup_complexity: worker.metadata.complexity,
    estimated_integration_time: worker.metadata.setupTime
  }));
  
  // Cache and return
  await c.env.KV.put(cacheKey, JSON.stringify({ recommendations }), {
    expirationTtl: 1800
  });
  
  return c.json({ recommendations });
});
```

## Performance Optimizations

### 1. Edge Caching Strategy
```
Request ──▶ CDN Cache ──▶ Worker Cache ──▶ KV Cache ──▶ D1 Query
   │           │              │              │            │
   │        Hit: 0ms      Hit: 10ms     Hit: 20ms    50-100ms
   │        Return         Return         Return       Return
   │
   └── Miss: Proceed to next layer
```

### 2. Connection Pooling
```typescript
// Reuse D1 connections across requests
let dbPool: D1Database | null = null;

function getDB(env: Env): D1Database {
  if (!dbPool) {
    dbPool = env.DB;
  }
  return dbPool;
}
```

### 3. Batch Operations
```typescript
// Batch multiple D1 queries
const statements = [
  db.prepare("SELECT * FROM workers WHERE category = ?").bind("communication"),
  db.prepare("SELECT * FROM workers WHERE category = ?").bind("data"),
  db.prepare("SELECT * FROM workers WHERE category = ?").bind("automation")
];

const results = await db.batch(statements);
```

### 4. Response Compression
```typescript
// Enable Brotli compression
c.res.headers.set("Content-Encoding", "br");
c.res.headers.set("Cache-Control", "public, max-age=3600");
```

## Cost Optimization

### Storage Tiering
```
Hot Data (0-1 hour):    KV Cache
Warm Data (1-24 hours): D1 + KV
Cold Data (>24 hours):  D1 only
Archived Data:          R2 (if needed)
```

### Compute Optimization
- Lazy loading of non-critical data
- Parallel execution of independent queries
- Edge computing to reduce latency
- Automatic scaling based on demand

## Monitoring & Alerting

### Key Metrics
```typescript
const METRICS = {
  // Performance
  "api.response_time": histogram,
  "api.error_rate": gauge,
  "api.throughput": counter,
  
  // Storage
  "d1.read_latency": histogram,
  "kv.hit_rate": gauge,
  "vectorize.query_latency": histogram,
  
  // Cost
  "compute.ms_used": counter,
  "d1.rows_read": counter,
  "kv.operations": counter
};
```

### Alert Thresholds
```typescript
const ALERTS = {
  "high_latency": { metric: "api.response_time_p95", threshold: 200 },
  "error_spike": { metric: "api.error_rate", threshold: 0.05 },
  "cache_miss": { metric: "kv.hit_rate", threshold: 0.7 },
  "cost_anomaly": { metric: "compute.ms_used", threshold: "2x_daily_avg" }
};
```

## Implementation Phases

### Phase 1: Core Backend (Weeks 1-2)
- [ ] Set up Cloudflare Workers project
- [ ] Create D1 schema and migrations
- [ ] Implement basic CRUD endpoints
- [ ] Set up KV caching layer

### Phase 2: Search (Weeks 3-4)
- [ ] Implement FTS5 search
- [ ] Set up Vectorize index
- [ ] Build hybrid search with RRF
- [ ] Add search caching

### Phase 3: AI Features (Weeks 5-6)
- [ ] Implement recommendation engine
- [ ] Add vector search
- [ ] Build cross-encoder reranking
- [ ] Deploy AI optimization

### Phase 4: Production (Weeks 7-8)
- [ ] Set up monitoring and alerting
- [ ] Implement rate limiting
- [ ] Add API key authentication
- [ ] Performance optimization

## Technical Requirements

- Cloudflare Workers (paid plan)
- D1 Database
- KV Storage
- R2 Storage (for static assets)
- Vectorize (for semantic search)
- Durable Objects (for complex state)
- Cron Triggers (for scheduled tasks)

## Costs Estimate

| Component | Monthly Cost | Notes |
|-----------|-------------|-------|
| Workers | $5 | 10M requests included |
| D1 | $5 | 5GB storage, 10M reads |
| KV | $5 | 1GB storage, 10M reads |
| R2 | $0 | Free tier (10GB) |
| Vectorize | $5 | 1M vectors, 10M queries |
| Durable Objects | $5 | 1M API calls |
| **Total** | **$25/mo** | Scales with usage |

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| D1 latency spikes | High | KV caching, read replicas |
| Vectorize query slow | Medium | Index optimization, filtering |
| KV cache stampede | Medium | Lock patterns, stale-while-revalidate |
| Cost overrun | Low | Budget alerts, usage monitoring |

## Owner

Backend Architect — responsible for system design, API architecture, and infrastructure optimization.
