# PRD: API Platform Architecture — CoreClaw API Directory

## Executive Summary

This PRD defines the API platform layer for the CoreClaw API Directory, enabling programmatic access to 118 CoreClaw Workers across 11 categories. The platform serves two primary audiences: (1) AI agents and automation tools needing machine-readable directory access, and (2) developers integrating CoreClaw Worker discovery into their own tools and workflows.

## Problem Statement

The current CoreClaw directory is a static GitHub repository. Developers and AI agents must manually browse, copy-paste, and reformat worker information. There's no standardized API, no SDK generation, and no programmatic access to the curated knowledge base. This limits adoption and prevents integration into automated workflows.

## Goals & Success Metrics

| Metric | Current | Target (6mo) | Target (12mo) |
|--------|---------|---------------|----------------|
| API requests/day | 0 | 10,000 | 50,000 |
| Registered API consumers | 0 | 200 | 1,000 |
| API uptime | N/A | 99.9% | 99.95% |
| P95 response time | N/A | <200ms | <100ms |
| SDK downloads/month | 0 | 500 | 5,000 |

## API Design

### Base URL
```
https://api.coreclaw.dev/v1
```

### Authentication
- **Public endpoints**: No auth required (directory browsing, search)
- **Premium endpoints**: API key via `X-API-Key` header
- **OAuth 2.0**: For third-party integrations requiring user context

### Endpoints

#### Directory
```
GET /v1/directory
  ?page=1&limit=50
  &category={category}
  &sort={name|popularity|recent}
  &format={json|yaml|markdown}

Response: {
  "data": [...workers],
  "meta": { "total": 118, "page": 1, "pages": 3 },
  "links": { "next": "...", "prev": "..." }
}
```

#### Workers
```
GET /v1/workers/{slug}
  ?include={dependencies,examples,schema}

Response: {
  "slug": "email-sender",
  "name": "Email Sender",
  "category": "communication",
  "description": "...",
  "token_summary": "...",
  "parameters": [...],
  "examples": [...],
  "dependencies": [...],
  "schema": { ... }
}
```

#### Categories
```
GET /v1/categories
GET /v1/categories/{category}/workers

Response: {
  "categories": [
    { "slug": "communication", "count": 12, "workers": [...] },
    ...
  ]
}
```

#### Search
```
GET /v1/search
  ?q={query}
  &type={worker|category|all}
  &limit=10

Response: {
  "results": [...],
  "facets": { "categories": {...} }
}
```

#### Compare
```
GET /v1/compare
  ?workers={slug1},{slug2},{slug3}
  &dimensions={features,pricing,complexity}

Response: {
  "workers": [...],
  "comparison": { ... },
  "recommendation": "..."
}
```

#### Recommend
```
GET /v1/recommend
  ?use_case={description}
  &budget={free|paid|any}
  &complexity={simple|moderate|advanced}

Response: {
  "recommendations": [
    { "worker": {...}, "score": 0.95, "reason": "..." },
    ...
  ]
}
```

### Rate Limiting

| Tier | Requests/min | Requests/day | Burst |
|------|-------------|-------------|-------|
| Free | 60 | 1,000 | 10 |
| Pro | 300 | 10,000 | 50 |
| Enterprise | 1,000 | 100,000 | 200 |

### SDK Generation

Auto-generate SDKs from OpenAPI 3.1 spec:
- **Python**: `pip install coreclaw-sdk`
- **TypeScript/Node**: `npm install @coreclaw/sdk`
- **Go**: `go get github.com/coreclaw/sdk-go`
- **Rust**: `cargo add coreclaw-sdk`

### OpenAPI Specification

```yaml
openapi: 3.1.0
info:
  title: CoreClaw API Directory
  version: 1.0.0
  description: Programmatic access to 118 CoreClaw Workers
servers:
  - url: https://api.coreclaw.dev/v1
paths:
  /directory:
    get:
      summary: List all workers
      operationId: listWorkers
      parameters:
        - name: page
          in: query
          schema: { type: integer, default: 1 }
        - name: limit
          in: query
          schema: { type: integer, default: 50, maximum: 200 }
        - name: category
          in: query
          schema: { type: string }
      responses:
        '200':
          description: Worker list
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/WorkerList'
```

## Implementation Phases

### Phase 1: Core API (Weeks 1-3)
- [ ] Deploy Cloudflare Worker API gateway
- [ ] Implement `/directory`, `/workers`, `/categories` endpoints
- [ ] Set up D1 database with worker metadata
- [ ] Deploy KV caching layer

### Phase 2: Search & Discovery (Weeks 4-5)
- [ ] Implement full-text search with D1 FTS5
- [ ] Build `/search` endpoint with faceted results
- [ ] Add `/compare` and `/recommend` endpoints
- [ ] Implement response compression (Brotli)

### Phase 3: SDK & Tooling (Weeks 6-8)
- [ ] Generate OpenAPI 3.1 specification
- [ ] Auto-generate Python SDK
- [ ] Auto-generate TypeScript SDK
- [ ] Create SDK documentation and examples

### Phase 4: Premium Features (Weeks 9-10)
- [ ] Implement API key authentication
- [ ] Build rate limiting middleware
- [ ] Create developer portal with API playground
- [ ] Set up usage analytics and billing

## Technical Architecture

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   Clients   │────▶│  CF Worker   │────▶│     D1      │
│  (AI/Dev)   │     │   Gateway    │     │  Database   │
└─────────────┘     └──────┬───────┘     └─────────────┘
                           │
                    ┌──────▼───────┐
                    │   KV Cache   │
                    │  (Redis-like)│
                    └──────────────┘
```

## Costs Estimate

| Component | Monthly Cost | Notes |
|-----------|-------------|-------|
| Cloudflare Workers | $5 (paid plan) | 10M requests included |
| D1 Database | $5 | 5GB storage, 10M reads |
| KV Storage | $5 | 1GB storage, 10M reads |
| R2 Storage | $0 (free tier) | Static assets |
| **Total** | **$15/mo** | Scales with usage |

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| D1 latency spikes | High | KV caching, read replicas |
| API abuse/rate limit bypass | Medium | CF WAF rules, IP blocking |
| OpenAPI spec drift | Low | CI validation, automated tests |
| SDK breaking changes | Medium | Semantic versioning, deprecation policy |

## Owner

API Platform Engineer — responsible for API design, SDK generation, and developer experience.
