# PRD: Monetization Strategy for CoreClaw API Directory

## Overview

The [coreclaw-api-directory](https://github.com/cporter202/coreclaw-api-directory) is a community-maintained directory of **118 CoreClaw Workers** (web scraping/automation APIs) across 11 categories. It has **35 stars, 12 forks, 9 commits**, and contains affiliate links (`fpr=chris69`). This document maps out actionable ways to generate revenue from this asset.

---

## Revenue Stream #1: Affiliate Commissions (Immediate)

**Status:** Already enabled in the repo

Every link in the directory contains `?fpr=chris69` — affiliate tracking. CoreClaw pays per sign-up or usage.

### How to maximize:
- **SEO the repo** — Title, description, and README are already keyword-rich for "CoreClaw API directory"
- **Drive traffic** — Share on Reddit (r/webdev, r/automation, r/NoCode), Hacker News, Twitter/X, dev communities
- **Write blog posts** — "118 Web Scraping APIs You Can Use Today" on Medium, dev.to, Hashnode
- **YouTube content** — "I Found 118 Free Web Scraping APIs" tutorial视频
- **Email outreach** — Send to newsletter creators in the automation/nocode space

### Estimated revenue:
- CoreClaw affiliate programs typically pay $5-50 per sign-up
- If 500 developers sign up through your links: **$2,500 - $25,000**

---

## Revenue Stream #2: Premium Curated Version (Medium-term)

Build a **paid enhanced version** of the directory:

### Tier 1: Free (existing repo)
- Basic directory listing
- No code examples
- No comparisons

### Tier 2: Pro ($9-29/month or $99-299/year)
- **API comparison tables** — response times, pricing, rate limits
- **Code snippets** — ready-to-use examples in Python, JS, Go
- **Use-case tutorials** — "How to scrape Amazon legally", "LinkedIn lead gen workflow"
- **Zapier/Make integrations** — pre-built automation templates
- **Priority updates** — new workers added within 24 hours
- **Slack/Discord community** — direct access to other users

### How to build:
- Use the existing repo as free content
- Build a simple Next.js/Astro site with gated content
- Stripe for payments, Lemon Squeezy for easy setup

---

## Revenue Stream #3: SaaS Wrapper (High-value)

Build a **no-code API orchestration tool** on top of CoreClaw:

### Concept: "APIFlow"
- Visual workflow builder that chains multiple CoreClaw workers
- Example: Google Maps Scraper → LinkedIn Company Scraper → Email Finder → CRM push
- Target: sales teams, marketers, recruiters who can't code

### Monetization:
- Free tier: 100 API calls/month
- Starter: $29/month (5,000 calls)
- Pro: $99/month (25,000 calls + multi-step workflows)
- Enterprise: Custom pricing

### Why this works:
- CoreClaw handles the hard part (scraping infrastructure)
- You add the UX layer that non-technical users need
- Stickiness increases with saved workflows

---

## Revenue Stream #4: Consulting & Implementation (Quick cash)

Offer **done-for-you services** using the APIs in the directory:

### Services:
1. **Lead Generation Setup** — Build automated lead scraping pipelines ($500-2,000/project)
2. **Competitor Monitoring** — Automated price/product tracking dashboards ($1,000-5,000)
3. **Market Research Automation** — Custom data collection workflows ($2,000-10,000)
4. **E-commerce Intelligence** — Amazon/Walmart/TikTok Shop product monitoring ($1,500-7,000)

### How to sell:
- Create a simple landing page: "We build data automation pipelines using 118+ APIs"
- Post on Upwork, Fiverr, LinkedIn
- Use the repo as a portfolio piece

---

## Revenue Stream #5: Course & Content (Passive income)

### Course idea: "Web Data Automation Mastery"
- Platform: Udemy ($19.99-199), Gumroad ($49-299), or self-hosted
- Content: 20-30 videos teaching how to use the top 20 APIs
- Include: downloadable scripts, templates, workflows
- Price: $99-299

### Content flywheel:
- YouTube tutorials (free, drives traffic)
- Blog posts (SEO, long-tail keywords)
- Newsletter (builds email list for course launches)
- Twitter/X threads (viral potential in dev community)

---

## Revenue Stream #6: Sponsorship & Partnerships

### Sponsorship tiers:
- **Featured Worker** — $200-500/month to be highlighted at top of category
- **Category Sponsor** — $500-1,000/month for branded category section
- **Homepage Sponsor** — $1,000-2,000/month for banner placement

### Target sponsors:
- CoreClaw itself (they benefit from directory traffic)
- Competitor APIs (ScrapingBee, ScraperAPI, Bright Data)
- CRM tools (HubSpot, Pipedrive)
- Automation platforms (Zapier, Make, n8n)

---

## Revenue Stream #7: API Aggregator (Long-term play)

Build a **unified API** that wraps multiple CoreClaw workers:

### Concept: "OneKey API"
- Single API endpoint that routes to the best worker for each use case
- Developers pay you, you pay CoreClaw (margin on usage)
- Value: simplified auth, consistent response format, failover between workers

### Pricing:
- Pay-as-you-go: $0.01-0.05 per call (you pay CoreClaw less)
- Monthly plans: $49-499 with included calls
- Enterprise: Custom SLA + dedicated support

---

## Implementation Roadmap

### Week 1-2: Quick Wins
- [x] Fork the repo
- [ ] Add your own affiliate links if not already done
- [ ] Share on 5+ social platforms
- [ ] Write 2-3 blog posts with affiliate links

### Month 1: Foundation
- [ ] Build simple landing page for consulting services
- [ ] Set up email list (ConvertKit/Mailchimp)
- [ ] Create 5 YouTube tutorials using top APIs
- [ ] Reach out to 10 potential sponsors

### Month 2-3: Product
- [ ] Build Pro directory site (Next.js + Stripe)
- [ ] Create first course module
- [ ] Launch SaaS MVP (APIFlow concept)
- [ ] Start outreach for consulting gigs

### Month 4-6: Scale
- [ ] Grow email list to 1,000+
- [ ] Close 3-5 consulting clients
- [ ] Launch course publicly
- [ ] Secure first sponsorship deal

---

## Revenue Projections (Conservative)

| Stream | Month 3 | Month 6 | Month 12 |
|---|---|---|---|
| Affiliate commissions | $200 | $800 | $3,000 |
| Pro directory | $0 | $500 | $2,000 |
| SaaS wrapper | $0 | $300 | $3,000 |
| Consulting | $1,000 | $3,000 | $8,000 |
| Course sales | $0 | $500 | $2,000 |
| Sponsorships | $0 | $500 | $2,000 |
| **Total** | **$1,200** | **$5,600** | **$20,000** |

---

## Key Risks & Mitigations

| Risk | Mitigation |
|---|---|
| CoreClaw changes affiliate terms | Diversify revenue streams early |
| Repo gets taken down | Fork + maintain your own version |
| Competition replicates directory | Build community & brand, not just content |
| API rate limits change | Build relationships with CoreClaw team |
| Legal issues with scraping | Only promote ethical/legal use cases |

---

## Autonomous Optimization & Cost Governance

This section defines the machine-driven infrastructure that monitors, optimizes, and self-heals the CoreClaw directory and SaaS wrapper across all revenue streams. Every external API call, every dollar spent, and every dollar earned is subject to continuous automated evaluation.

### 1. Continuous Shadow-Testing of API Performance

Every CoreClaw Worker in the directory (118 total) is subject to a background performance audit running on a **5-minute cron cycle**:

| Metric | Collection Method | Alert Threshold |
|---|---|---|
| **Latency** (P50/P95/P99) | Synthetic calls to each worker endpoint with a fixed payload (10-row scrape of a known-stable test page) | P95 > 8s or 3× rolling 7-day median |
| **Uptime** | HTTP status code monitoring (expect `200`); non-200 response = failure | < 3 consecutive successes out of 5 probes |
| **Accuracy** | LLM-as-a-Judge comparison of worker output against a golden reference dataset (10 pre-validated scrape results per category) | > 10% field-level divergence from golden set |
| **Response consistency** | Schema validation of JSON output against declared format | Missing required fields = 1 failure event |

**Implementation:**
- A lightweight Node.js/cron worker (Cloudflare Cron Trigger or Railway scheduled job) executes synthetic probe calls to each endpoint every 5 minutes.
- Results are written to a SQLite or Turso database with schema: `probe_id, worker_id, category, timestamp, latency_ms, status_code, accuracy_score, error_message`.
- A rolling 7-day window is used for baseline calculations. Any metric crossing its threshold generates a `WORKER_DEGRADED` event to the alerting channel (Discord webhook or email via Resend).
- **No production user traffic is used in testing.** All probes are synthetic with clearly marked test payloads that comply with each worker's rate limits.

### 2. Financial Guardrails — Cost Monitoring & Revenue Tracking

**Per-Call Cost Tracking:**

Every SaaS wrapper (APIFlow) API call is logged with:
```
{
  "call_id": "uuid",
  "user_id": "stripe_sub_id",
  "worker_id": "coreclaw-worker-12",
  "tier": "pro",                     // free | starter | pro | enterprise
  "coreclaw_cost_usd": 0.003,        // what CoreClaw charges us
  "user_charge_usd": 0.01,           // what we charge the user
  "margin_usd": 0.007,               // computed margin
  "latency_ms": 1240,
  "timestamp": "2026-07-24T14:00:00Z"
}
```

**Affiliate Revenue Tracking:**

- A server-side webhook listener (if CoreClaw provides conversion webhooks) or daily cron-scrape of the affiliate dashboard captures sign-ups attributed to `?fpr=chris69`.
- Revenue events are logged: `{ date, stream: "affiliate", source_worker_id, sign_ups, commission_usd }`.
- A weekly reconciliation job cross-references affiliate dashboard totals against logged click-throughs (tracked via a lightweight redirect proxy on your own domain, e.g., `go.yourdomain.com/api/worker-id`) to detect discrepancies > 5%.

**Hard Cost Limits:**

| Parameter | Value | Enforcement |
|---|---|---|
| Max cost per individual API call (SaaS wrapper) | $0.05 | Pre-flight check before routing; calls exceeding this are blocked and user sees "unavailable for this worker" |
| Daily SaaS cost ceiling | $50.00 | Summed `coreclaw_cost_usd` across all calls; when hit, SaaS returns HTTP 429 with `Retry-After` header |
| Monthly affiliate dependency cap | 40% of total revenue | If affiliate income > 40% of total MRR, a flag is raised to accelerate diversification |

### 3. Automated Budget Alerts & Spend Optimization

**Alert Escalation Ladder:**

| Condition | Action | Channel |
|---|---|---|
| Single worker cost > $0.05/call (5× baseline) | Log warning, continue | Slack/Discord log channel |
| Daily SaaS spend > $30 (60% of ceiling) | Email alert to owner | Email (Resend) |
| Daily SaaS spend > $45 (90% of ceiling) | Page owner + auto-throttle non-enterprise users to 1 call/10s | SMS (Twilio) + email |
| Monthly total spend > 120% of projected budget | Auto-pause new free-tier sign-ups, downgrade experimental features | All channels |

**Spend Optimization Automation:**

- A weekly `spend_optimizer` job analyzes the 7-day rolling cost-per-worker matrix. Any worker where `coreclaw_cost_usd / margin_usd` ratio exceeds 0.7 (i.e., margin < 30%) is flagged for:
  1. **Price adjustment** — recommend increasing user-facing price for that worker's tier.
  2. **Alternative routing** — if a lower-cost worker in the same category exists with equivalent accuracy (per shadow-testing data), automatically update the routing table to prefer the cheaper worker.
  3. **Deprecation notice** — if no viable alternative exists and margin remains < 20% for 14 consecutive days, the worker is marked `DEPRECATED` in the SaaS wrapper with user notification.

### 4. Security Guardrails Against Runaway Costs in SaaS Wrapper

| Threat Vector | Guardrail |
|---|---|
| **Bot abuse of free tier** | Rate limit: 10 calls/hour per IP + 100 calls/day per account. If an IP exceeds 500 calls/hour, auto-block IP and require CAPTCHA on next request. |
| **Account sharing / credential sharing** | Fingerprint requests by `API key + IP range + User-Agent`. If > 3 distinct IPs use the same key within 1 hour, lock key and require re-verification. |
| **Runaway workflow loops** | Each SaaS workflow (APIFlow multi-step) has a **max-step cap of 50** and a **max-runtime of 300 seconds**. If exceeded, the workflow is killed with partial results returned. |
| **Affiliate click fraud** | Redirect proxy (`go.yourdomain.com`) logs referer + IP. If > 20 clicks from the same IP in 24 hours are flagged as unique sign-ups, those clicks are quarantined from affiliate reporting and not forwarded with `?fpr=chris69`. |
| **CoreClaw API key compromise** | API keys are rotated every 30 days via automation. Keys are stored in Cloudflare Workers KV or Vault, never in environment variables. A `key_usage_anomaly` alert fires if a key makes > 2× its 7-day rolling average calls in any 1-hour window. |

**Circuit Breaker Implementation:**

```typescript
// Simplified circuit breaker for every CoreClaw worker call
interface CircuitState {
  failures: number;
  lastFailure: number;
  state: "closed" | "open" | "half-open";
}

const circuitBreakers: Map<string, CircuitState> = new Map();

async function callWithGuardrails(workerId: string, payload: object) {
  const cb = circuitBreakers.get(workerId) ?? { failures: 0, lastFailure: 0, state: "closed" };

  if (cb.state === "open" && Date.now() - cb.lastFailure < 300_000) { // 5-min cooldown
    return { error: "Circuit open", fallback: getCheapestAlternative(workerId) };
  }

  const cost = getWorkerCost(workerId);
  if (cost > COST_CEILING_PER_CALL) {
    throw new Error(`Cost ceiling exceeded for ${workerId}: $${cost}`);
  }

  const result = await callWorker(workerId, payload, { timeout: 10_000 });

  if (result.ok) {
    cb.failures = 0;
    cb.state = "closed";
  } else {
    cb.failures += 1;
    cb.lastFailure = Date.now();
    cb.state = cb.failures >= 5 ? "open" : "half-open";
    if (cb.state === "open") {
      alertAdmin(`Circuit breaker tripped on ${workerId} after ${cb.failures} consecutive failures`);
    }
  }
  circuitBreakers.set(workerId, cb);
  return result;
}
```

### 5. Self-Healing Infrastructure — Automatic Failover

**Worker Health States:**

| State | Criteria | Behavior |
|---|---|---|
| `HEALTHY` | Last 10 synthetic probes succeeded, P95 latency < 5s | Normal routing |
| `DEGRADED` | > 3 of last 10 probes failed OR P95 latency > 5s but < 15s | Route 50% of traffic to alternative worker (A/B split), log alert |
| `DOWN` | > 7 of last 10 probes failed OR P95 latency > 15s OR HTTP 5xx on last 3 probes | Route 100% to cheapest alternative in same category, auto-remediation attempt every 10 minutes |
| `UNSTABLE` | Flips between HEALTHY and DEGRADED > 3× in 1 hour | Route 100% to alternative, disable until 30 consecutive healthy probes achieved |

**Failover Routing Table:**

The system maintains a per-category preference list derived from shadow-testing data:

```
category: "LinkedIn Scraping"
  1. worker-47  (cost: $0.003, accuracy: 97%, latency: 800ms)  ← primary
  2. worker-83  (cost: $0.005, accuracy: 95%, latency: 1200ms) ← fallback #1
  3. worker-12  (cost: $0.008, accuracy: 93%, latency: 600ms)  ← fallback #2
```

When the primary is `DOWN`, all traffic shifts to fallback #1 within 60 seconds. The routing table is recomputed every 6 hours by a background job that re-ranks workers in each category by: `score = (0.5 × accuracy) + (0.3 × inverse_latency_normalized) + (0.2 × inverse_cost_normalized)`.

### 6. Performance Benchmarking Dashboards

A real-time dashboard (built with Grafana Cloud free tier, or a lightweight custom UI via Chart.js) exposes the following views:

**Dashboard 1: Worker Health**
- Live heatmap: 118 workers × color-coded health state (green/yellow/red)
- 24-hour latency sparklines per worker
- Failover event log (last 50 events with timestamps)

**Dashboard 2: Cost & Margin**
- Daily cost vs. revenue bar chart (stacked by revenue stream)
- Per-worker margin table (sortable), with red highlighting for margin < 30%
- 30-day rolling burn rate trendline with budget ceiling line overlay

**Dashboard 3: Affiliate Performance**
- Clicks-through-redirect vs. confirmed sign-ups conversion funnel
- Commission earned per worker (top 10 earners)
- Source channel breakdown (referral domains driving affiliate clicks)

**Dashboard 4: User Engagement**
- Active users by tier (free / starter / pro / enterprise)
- API calls per user histogram
- Workflow completion rate (for APIFlow multi-step workflows)

**Data Retention:** Raw probe logs retained for 90 days. Aggregated daily summaries retained indefinitely. All dashboards refresh every 60 seconds.

### 7. ROI Tracking Per Revenue Stream with Automated Reporting

**Weekly automated report** generated every Monday at 09:00 UTC and emailed to the operator:

```
=== CORECLAW DIRECTORY — WEEKLY OPTIMIZATION REPORT ===
Period: 2026-07-17 to 2026-07-23

REVENUE BREAKDOWN
  Affiliate Commissions:  $327.40  (↑ 12% WoW)
  Pro Directory MRR:      $189.00  (↑ 8% WoW)
  SaaS Wrapper MRR:       $412.00  (↑ 23% WoW)
  Consulting Revenue:      $0.00    (—)
  Course Sales:            $99.00   (—)
  Sponsorships:           $200.00  (—)
  TOTAL:                $1,227.40

COST ANALYSIS
  CoreClaw API Costs:      $47.23
  Infrastructure:          $12.00
  TOTAL COSTS:             $59.23
  NET MARGIN:            $1,168.17 (95.2%)

ROI BY STREAM
  Affiliate:  ∞ (zero cost, pure margin)
  Pro Dir:    98% (hosting only)
  SaaS:       87% (CoreClaw costs deducted)
  Course:     94% (platform fees deducted)

TOP 5 WORKERS BY VOLUME
  worker-47: 1,240 calls | cost: $3.72 | margin: $8.68
  worker-12:  980 calls  | cost: $7.84 | margin: $1.96
  ...

ALERTS THIS WEEK
  ⚠ worker-83: DEGRADED for 4.2 hours (latency spike, auto-failover to worker-47)
  ⚠ Free-tier bot activity: 2,340 blocked requests from 3 IPs
```

**Monthly ROI rollup** auto-generated on the 1st of each month, comparing actual vs. projected revenue against the PRD's revenue projections table. Variance > 20% in either direction triggers a detailed drill-down report identifying which streams over- or under-performed and why.

### 8. Anomaly Detection for Usage Patterns & Revenue Metrics

**Statistical Baseline:**
Each metric (daily API calls, daily revenue, conversion rate, latency distribution) maintains a 30-day rolling mean (μ) and standard deviation (σ). Anomalies are detected when a value falls outside **μ ± 2.5σ** for any 24-hour period.

**Anomaly Categories & Responses:**

| Anomaly Type | Detection Logic | Automated Response |
|---|---|---|
| **Revenue spike** | Daily revenue > μ + 3σ | Investigate for organic virality; if sustained > 48 hours, scale infrastructure preemptively |
| **Revenue drop** | Daily revenue < μ - 2.5σ | Check for affiliate tracking failures, payment processor outages, or CoreClaw API changes; alert owner |
| **Usage spike** | Daily calls > μ + 3σ | Check for bot activity; if organic, auto-scale worker concurrency; if bot-like, activate CAPTCHA + IP rate limits |
| **Conversion rate anomaly** | Sign-up-to-paid conversion < μ - 2σ for 7 consecutive days | Audit onboarding flow, check for broken checkout, A/B test landing page variants |
| **Worker accuracy drift** | Shadow-test accuracy for any worker drops > 5 points over 30-day window | Flag worker for manual review; auto-downgrade routing weight by 50% |
| **Affiliate fraud pattern** | Click-to-signup ratio < 0.1% for any 24-hour window (> 100 clicks, < 1 signup) | Quarantine suspicious clicks, flag IP ranges, exclude from affiliate reporting |

**Implementation:**
A weekly `anomaly_scanner` cron job queries the aggregated metrics database, computes μ and σ for each metric over the trailing 30 days, and compares the most recent 24-hour window. Detected anomalies are written to an `anomalies` table with severity (`info`, `warning`, `critical`) and are surfaced on the dashboard in a dedicated "Anomaly Feed" panel.

---

## Identity, Authentication & Trust Architecture

This section defines the identity, authentication, authorization, and trust infrastructure for the CoreClaw API Directory SaaS platform. Every revenue stream that touches user accounts — the Pro directory, the "APIFlow" SaaS wrapper, the "OneKey API" aggregator, consulting dashboards, and sponsor portals — relies on this layer. Identity is not a feature bolt-on; it is the foundation that determines who can call what, how usage is metered for billing, and how disputes are resolved.

---

### 1. OAuth 2.0 / OIDC Flow Design

All human-initiated authentication uses the Authorization Code flow with PKCE (Proof Key for Code Exchange). No implicit grant. No resource owner password credentials. No exceptions.

#### Authorization Server

| Parameter | Value |
|---|---|
| Issuer | `https://auth.coreclaw-directory.com` |
| Token endpoint | `POST /oauth2/token` |
| Authorization endpoint | `GET /oauth2/authorize` |
| JWKS endpoint | `GET /oauth2/.well-known/jwks.json` |
| Discovery document | `GET /oauth2/.well-known/openid-configuration` |
| Supported flows | `authorization_code` (with PKCE), `refresh_token` |
| Signing algorithm | ES256 (ECDSA P-256) for ID tokens; RS256 for JWTs consumed by legacy integrations |
| ID token expiry | 15 minutes |
| Refresh token expiry | 30 days (sliding window, rotated on every use) |

#### PKCE Implementation

```
Client generates code_verifier (43–128 char random string, RFC 7636)
Client computes code_challenge = BASE64URL(SHA256(code_verifier))
Client sends code_challenge + code_challenge_method=S256 in /authorize request
Authorization server stores challenge with auth code
Client sends code_verifier in /token request
Server hashes it, compares to stored challenge — reject on mismatch
```

#### Client Registration

Before any application can initiate OAuth, it must register:

```json
{
  "client_id": "apiflow-web-dashboard",
  "client_type": "confidential",
  "redirect_uris": [
    "https://apiflow.coreclaw-directory.com/callback",
    "http://localhost:3000/callback"
  ],
  "allowed_scopes": [
    "openid",
    "profile",
    "email",
    "api_keys:manage",
    "workflows:read",
    "workflows:write",
    "usage:read",
    "billing:read"
  ],
  "token_endpoint_auth_method": "client_secret_basic",
  "grant_types": ["authorization_code", "refresh_token"],
  "require_pkce": true,
  "require_consent": true
}
```

#### OIDC Scopes

| Scope | Claims | Purpose |
|---|---|---|
| `openid` | `sub` | Identity assertion |
| `profile` | `name`, `preferred_username` | Display in dashboard |
| `email` | `email`, `email_verified` | Account recovery, notifications |
| `api_keys:manage` | — | Create/rotate/revoke API keys |
| `workflows:read` | — | Read saved APIFlow workflows |
| `workflows:write` | — | Create/edit/delete workflows |
| `usage:read` | — | View call counts, rate limits |
| `billing:read` | — | View invoices, plan details |

#### Token Endpoint Contract

```
POST /oauth2/token
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code
&code=<auth_code>
&redirect_uri=https://apiflow.coreclaw-directory.com/callback
&client_id=apiflow-web-dashboard
&client_secret=<secret>
&code_verifier=<pkce_verifier>
```

Success response:

```json
{
  "access_token": "eyJhbGciOiJFUzI1NiIs...",
  "token_type": "Bearer",
  "expires_in": 900,
  "refresh_token": "dGhpcyBpcyBhIHJlZnJl...",
  "id_token": "eyJhbGciOiJFUzI1NiIs...",
  "scope": "openid profile email api_keys:manage"
}
```

#### Refresh Token Rotation

Every refresh token exchange issues a new refresh token and invalidates the previous one. If a refresh token is reused after it has been rotated (replay detection), **all tokens for that session are revoked immediately** and the user receives a security notification. This is the single most effective defense against token theft.

---

### 2. API Key Management

API keys are the identity mechanism for programmatic access — they authenticate the "OneKey API" aggregator calls and APIFlow worker invocations. Keys are **not** bearer tokens in the OAuth sense; they are pre-shared secrets with structured scoping.

#### Key Format

```
cc_live_<random_64_hex>     — production key
cc_test_<random_64_hex>     — sandbox/testing key
```

The prefix encodes the environment. No production key works in staging. No staging key works in production. The 64-hex random component provides 256 bits of entropy — brute-forceable it is not.

#### Key Object Schema

```json
{
  "key_id": "key_7f3a9b2c",
  "key_prefix": "cc_live_7f3a",
  "owner_id": "org_acme_corp",
  "scopes": [
    "api:scrape",
    "api:automate",
    "usage:read"
  ],
  "allowed_origins": ["https://app.acme.com"],
  "rate_limit_tier": "pro",
  "daily_call_limit": 5000,
  "expires_at": "2026-10-23T00:00:00Z",
  "created_at": "2026-07-24T12:00:00Z",
  "last_used_at": "2026-07-24T14:32:11Z",
  "last_used_ip": "203.0.113.42",
  "revoked": false,
  "revoked_at": null,
  "revoke_reason": null
}
```

#### Scoping Model

| Scope | Grants access to |
|---|---|
| `api:scrape` | Execute scraping workers |
| `api:automate` | Execute automation workers |
| `api:compose` | Execute multi-step APIFlow compositions |
| `usage:read` | Query own usage stats |
| `billing:read` | Query own billing data |
| `admin:org` | Manage org members, keys, settings |

Keys are created with **least-privilege scopes only**. A key used to power a Zapier integration needs `api:scrape` and `api:automate` — it does not need `admin:org`. Scope escalation requires a new key with explicit admin approval.

#### Rotation Policy

| Tier | Rotation interval | Grace period after rotation |
|---|---|---|
| Free | 90 days | 48 hours (old key still works) |
| Pro | 90 days | 48 hours |
| Enterprise | 180 days | 24 hours |
| Service accounts | 365 days | 72 hours |

The system sends rotation reminders at 30, 14, 7, and 1 day before expiry. Expired keys receive HTTP 401 with `error: key_expired` and `rotate_by: <timestamp>`. The key does not function until rotated.

#### Revocation

Keys are revoked immediately and irreversibly via:

- Dashboard UI (`/settings/api-keys`)
- API call: `DELETE /v1/api-keys/{key_id}`
- Automatic trigger: suspicious activity detected (impossible travel, abnormal call volume, new origin IP)

Revoked keys return HTTP 401 with `error: key_revoked`. The revocation is logged to the audit trail within 1 second and propagated to all edge cache nodes within 30 seconds.

---

### 3. Multi-Tenant Architecture with RBAC

Every resource on the platform — workflows, API keys, usage records, billing data — belongs to an organization (tenant). No data is shared between organizations by default. Cross-tenant access is explicit and audited.

#### Tenant Isolation Model

```
┌─────────────────────────────────────────────────┐
│                   Platform Root                   │
│         (Super Admins only — 1-3 people)         │
├────────────────┬────────────────┬────────────────┤
│  Org: Acme Corp│  Org: Globex   │  Org: Initech  │
│  ┌──────────┐  │  ┌──────────┐  │  ┌──────────┐  │
│  │ Projects │  │  │ Projects │  │  │ Projects │  │
│  │ API Keys │  │  │ API Keys │  │  │ API Keys │  │
│  │ Workflows│  │  │ Workflows│  │  │ Workflows│  │
│  │ Members  │  │  │ Members  │  │  │ Members  │  │
│  │ Billing  │  │  │ Billing  │  │  │ Billing  │  │
│  └──────────┘  │  └──────────┘  │  └──────────┘  │
├────────────────┴────────────────┴────────────────┤
│              Shared Infrastructure                │
│     (Workers, Rate Limiters, Audit Log Store)     │
└─────────────────────────────────────────────────┘
```

#### Database-Level Isolation

Every table includes an `org_id` column. All queries are filtered by `org_id` at the ORM/application layer. Row-Level Security (RLS) policies are enforced at the database level as a defense-in-depth measure:

```sql
ALTER TABLE workflows ENABLE ROW LEVEL SECURITY;

CREATE POLICY org_isolation ON workflows
  USING (org_id = current_setting('app.current_org_id')::uuid);
```

If a query ever bypasses the application layer (direct DB access, SQL injection), RLS still blocks cross-tenant data access.

#### Role Hierarchy

| Role | Permissions | Typical user |
|---|---|---|
| **Owner** | Full access to all org resources, billing, member management, delete org | Account creator, CEO |
| **Admin** | Manage members, API keys, workflows, view billing | Team lead, DevOps |
| **Developer** | Create/edit workflows, manage own API keys, view usage | Engineers, builders |
| **Viewer** | Read-only access to workflows and usage dashboards | Managers, stakeholders |
| **Billing** | View invoices, update payment method, manage subscriptions | Finance |

#### RBAC Enforcement

Authorization checks happen at the API gateway layer, not buried in handler logic:

```
Request arrives
  → Authenticate (extract identity from token or API key)
  → Resolve org_id from identity
  → Resolve role from org membership
  → Check: does role grant permission for this action on this resource?
  → Deny with 403 if not
  → Forward to handler with identity context
```

Role assignments are stored in a dedicated `org_memberships` table:

```json
{
  "org_id": "org_acme_corp",
  "user_id": "user_jane_smith",
  "role": "developer",
  "invited_by": "user_john_admin",
  "invited_at": "2026-07-24T12:00:00Z",
  "accepted_at": "2026-07-24T12:15:00Z",
  "scopes": ["api:scrape", "api:automate"]
}
```

#### Org Invitation Flow

1. Admin sends invitation via `POST /v1/orgs/{org_id}/invitations` with email and role.
2. Invitee receives email with a one-time link (token, 7-day expiry).
3. Invitee clicks link, authenticates (or creates account), membership is created.
4. Admin receives confirmation. All actions are audit-logged.

If the invitee is not yet a platform user, they complete registration before the membership is activated. No orphan memberships.

---

### 4. Session Management and Token Lifecycle

#### Session Architecture

The platform maintains two session types: **browser sessions** (for dashboard access) and **API sessions** (for programmatic access via OAuth tokens).

#### Browser Sessions

| Parameter | Value |
|---|---|
| Session store | Server-side (encrypted Redis) |
| Session ID | 256-bit random, HttpOnly, Secure, SameSite=Lax cookie |
| Idle timeout | 30 minutes (dashboard), 15 minutes (billing admin) |
| Absolute timeout | 8 hours |
| Concurrent sessions | Max 5 per user (oldest auto-revoked) |
| Session binding | Bound to IP range + User-Agent fingerprint |

Session data stored server-side:

```json
{
  "session_id": "sess_a1b2c3d4...",
  "user_id": "user_jane_smith",
  "org_id": "org_acme_corp",
  "role": "developer",
  "ip_range": "203.0.113.0/24",
  "user_agent_hash": "sha256:8f14e45f...",
  "mfa_verified": true,
  "created_at": "2026-07-24T08:00:00Z",
  "last_active_at": "2026-07-24T14:30:00Z",
  "expires_at": "2026-07-24T16:00:00Z"
}
```

If the session's IP range or User-Agent fingerprint changes significantly, the session is flagged as suspicious and requires re-authentication. This catches session hijacking without requiring a full MFA challenge on every request.

#### API Token Lifecycle

```
Authorization Code → Access Token (15 min) + Refresh Token (30 days)
         │
         ├── Access Token used for API calls
         │   └── Expires → use refresh token to get new pair
         │
         ├── Refresh Token rotated on every use
         │   └── Old token invalidated
         │   └── If old token reused → all tokens revoked (replay detection)
         │
         └── Token revoked on:
             ├── User logout
             ├── Password change
             ├── MFA enrollment change
             ├── Admin revocation
             └── Suspicious activity detection
```

#### Logout Protocol

```
POST /v1/sessions/logout
Authorization: Bearer <access_token>

Response:
{
  "message": "Session terminated",
  "access_token_revoked": true,
  "refresh_tokens_revoked": 3,
  "cookies_cleared": ["session_id"]
}
```

Logout is **server-side enforced**. The refresh token is immediately invalidated in the database. The session cookie is expired client-side. Calling the API with the revoked access token within its 15-minute window returns HTTP 401 — no grace period.

---

### 5. Trust Verification for Third-Party Worker Integrations

The platform wraps 118 CoreClaw workers. Some of these workers may themselves call third-party APIs (email finders, enrichment services, CRM push targets). The platform must verify and contain these external dependencies.

#### Worker Trust Tiers

| Tier | Description | Verification | Rate limit multiplier |
|---|---|---|---|
| **Tier 0 — CoreClaw native** | First-party CoreClaw workers | API key auth to CoreClaw, response schema validation | 1.0x |
| **Tier 1 — Verified partner** | Partners with signed integration agreement | OAuth or API key with scope restrictions, quarterly key rotation | 1.0x |
| **Tier 2 — Community contributed** | Open-source or community-built wrappers | Code review required, sandboxed execution, manual approval | 0.5x |
| **Tier 3 — Untrusted** | New/unreviewed integrations | Not permitted in production; sandbox only | 0.0x (blocked) |

#### Trust Verification Protocol

Before any third-party worker is promoted from sandbox to production, it must pass:

1. **Credential proof**: The worker authenticates to the platform using OAuth or a platform-issued API key (not a hardcoded secret). The credential is scoped to the specific worker's permitted actions — no wildcard access.

2. **Endpoint verification**: All outbound calls the worker makes are declared in its manifest. Outbound calls to undeclared endpoints are blocked by the platform's egress policy. Undeclared endpoints are logged as security events.

3. **Response schema validation**: The platform validates that worker responses conform to the declared schema. Responses that leak internal details (stack traces, environment variables, internal hostnames) are redacted before passing to the caller.

4. **Sandbox soak**: Every new worker runs in a sandboxed environment for a minimum of 72 hours with synthetic test data before production promotion. Sandbox runs are monitored for unexpected outbound calls, excessive error rates, and data exfiltration patterns.

5. **Trust scoring**: Each worker accumulates a trust score based on:

```
worker_trust = (
    base_score(0.6)
    - sandbox_incidents * 0.1
    - undeclared_endpoint_flags * 0.05
    + consecutive_clean_days * 0.005   # capped at 0.4 bonus
)
```

Workers with trust score below 0.5 are automatically demoted to sandbox. Workers below 0.3 are disabled.

#### Egress Policy Enforcement

All outbound HTTP calls from workers are routed through a platform proxy that enforces:

- **Allowlist**: Only declared endpoints (per worker manifest) are permitted.
- **TLS verification**: All outbound calls require valid TLS. Self-signed certs are rejected.
- **Header scrubbing**: The platform strips `Authorization` headers from outgoing calls unless the target is in the worker's declared credential list. This prevents credential leakage to unintended parties.
- **Timeout**: 30-second hard timeout on all outbound calls. Workers that exceed this are retried once, then failed.

---

### 6. Rate Limiting Per Identity Tier

Rate limiting is enforced per identity (per API key or per OAuth token), not per IP. IP-based rate limiting exists as a secondary defense against unauthenticated abuse.

#### Tier Limits

| Tier | Monthly calls | Calls/second (burst) | Calls/second (sustained) | Concurrent requests |
|---|---|---|---|---|
| **Free** | 100 | 2 | 0.5 | 3 |
| **Starter ($29/mo)** | 5,000 | 10 | 5 | 10 |
| **Pro ($99/mo)** | 25,000 | 50 | 25 | 25 |
| **Enterprise** | Custom | Custom | Custom | Custom |

#### Rate Limit Response Headers

Every API response includes:

```
X-RateLimit-Limit: 25000
X-RateLimit-Remaining: 18423
X-RateLimit-Reset: 1690000000
X-RateLimit-Tier: pro
X-RateLimit-Burst-Remaining: 48
```

#### Exceeded Limits

When the rate limit is exceeded:

```
HTTP/1.1 429 Too Many Requests
Content-Type: application/json
Retry-After: 30
X-RateLimit-Limit: 25000
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1690000000

{
  "error": "rate_limit_exceeded",
  "message": "You have exceeded your rate limit of 25,000 monthly calls.",
  "retry_after_seconds": 30,
  "upgrade_url": "https://coreclaw-directory.com/pricing"
}
```

#### Implementation: Token Bucket with Redis

```python
import time
import redis

def check_rate_limit(key: str, capacity: int, refill_rate: float) -> dict:
    """
    Token bucket algorithm. Keys are scoped by API key prefix:
      rate:{org_id}:{key_id}:monthly
      rate:{org_id}:{key_id}:burst
    """
    now = time.time()
    pipe = redis_client.pipeline()

    # Atomic check-and-consume
    pipe.get(f"{key}:tokens")
    pipe.get(f"{key}:last_refill")
    results = pipe.execute()

    tokens = float(results[0] or capacity)
    last_refill = float(results[1] or now)

    # Refill
    elapsed = now - last_refill
    tokens = min(capacity, tokens + elapsed * refill_rate)

    if tokens < 1:
        return {"allowed": False, "retry_after": int((1 - tokens) / refill_rate)}

    # Consume one token
    pipe.set(f"{key}:tokens", tokens - 1)
    pipe.set(f"{key}:last_refill", now)
    pipe.expire(f"{key}:tokens", 86400)
    pipe.expire(f"{key}:last_refill", 86400)
    pipe.execute()

    return {"allowed": True, "remaining": int(tokens - 1)}
```

#### Abuse Detection

Beyond per-key limits, the platform monitors:

- **Spike detection**: If a key's call rate exceeds 3x its sustained average within 60 seconds, the key is temporarily suspended (15-minute cooldown) and the owner is notified.
- **Distributed abuse**: If multiple keys under the same org exhibit coordinated patterns (sequential ID enumeration, identical payloads across different keys), the org is flagged for review.
- **Impossible origin**: If API calls arrive from geographically impossible locations within a short window, the key is suspended pending verification.

---

### 7. Audit Logging for Compliance

Every consequential action on the platform is recorded in an append-only audit log. The log cannot be modified or deleted by any user, including org admins and platform admins. This is the evidentiary backbone for billing disputes, security investigations, and regulatory compliance.

#### Audit Event Schema

```json
{
  "event_id": "evt_9f8e7d6c5b4a",
  "timestamp_utc": "2026-07-24T14:32:11.045Z",
  "event_type": "api_call.executed",
  "actor": {
    "type": "api_key",
    "identity": "key_7f3a9b2c",
    "org_id": "org_acme_corp",
    "user_id": null,
    "ip_address": "203.0.113.42",
    "user_agent": "python-sdk/2.1.0"
  },
  "resource": {
    "type": "worker_invocation",
    "id": "worker_google_maps_scraper",
    "org_id": "org_acme_corp"
  },
  "action": "execute",
  "result": "success",
  "metadata": {
    "response_time_ms": 342,
    "data_size_bytes": 15360,
    "cost_credits": 1
  },
  "trace_id": "trace_abc123"
}
```

#### Event Types Logged

| Category | Events |
|---|---|
| **Authentication** | login.success, login.failure, logout, password.changed, mfa.enabled, mfa.disabled, passkey.registered |
| **Authorization** | role.changed, member.invited, member.removed, scope.granted, scope.revoked |
| **API Keys** | key.created, key.rotated, key.revoked, key.used (sampled at 1% in high-volume) |
| **Workflows** | workflow.created, workflow.executed, workflow.failed, workflow.deleted |
| **Workers** | worker.executed, worker.failed, worker.promoted, worker.demoted |
| **Billing** | subscription.created, subscription.changed, invoice.generated, payment.failed, payment.succeeded |
| **Admin** | org.created, org.deleted, settings.changed, export.requested, support.ticket.created |

#### Storage and Retention

| Tier | Retention | Storage |
|---|---|---|
| Free | 90 days | Compressed hot storage (S3 Standard) |
| Pro | 1 year | Compressed hot storage (S3 Standard) + warm archive |
| Enterprise | 7 years | S3 Standard + Glacier Deep Archive |
| Platform admin | Indefinite | Immutable append-only store with WORM compliance |

#### Independent Verification

Audit logs are periodically (daily) hashed into a Merkle tree. The root hash is published to a public transparency log (similar to Certificate Transparency). Any tampering with historical audit records is detectable by comparing the Merkle root.

```
Audit Log Entry → SHA-256 hash → Merkle tree leaf
                                    │
                          Merkle tree construction
                                    │
                          Root hash → Transparency log
                                    │
                          Publicly verifiable
```

Any user can request a cryptographic proof that their audit event was included in the integrity-checked log and has not been modified.

---

### 8. Security Best Practices

#### Secrets Management

| Secret type | Storage | Rotation | Access |
|---|---|---|---|
| OAuth client secrets | Encrypted vault (AES-256-GCM, envelope encryption) | On compromise only (alert-triggered) | Auth server only |
| API key hashes | Argon2id hashes in database (keys never stored in plaintext) | Per rotation policy | Key verification service only |
| Database credentials | Injected via environment variable from secrets manager | Every 30 days (automated) | Application containers only |
| CoreClaw API keys (outbound) | Secrets manager, injected at runtime | Per CoreClaw requirements | Worker execution service only |
| JWT signing keys | Asymmetric key pair in HSM (or cloud KMS) | Every 90 days (rolling) | Token signing service only |
| TLS certificates | Managed via ACME (Let's Encrypt) or cloud provider | Auto-renewed at 30 days before expiry | Load balancer only |

**Hard rules:**

- No secrets in source code, config files, environment dumps, error messages, or logs.
- No secrets in browser localStorage, cookies (except session IDs), or client-side storage.
- No secrets in API responses, including error responses. A 500 error must never leak a database password or API key.
- All secrets are encrypted at rest (AES-256-GCM minimum) and in transit (TLS 1.3 minimum).
- Secrets are loaded from the secrets manager at application startup and injected into process memory — never read from disk by the application after initial load.

#### Input Validation

Every API endpoint validates input before processing. No exceptions. Validation is schema-based using a contract-first approach:

```
Request arrives
  → Content-Type validation (reject unexpected types)
  → Schema validation (JSON Schema / Zod for TypeScript handlers)
  → Sanitization (strip HTML tags, normalize Unicode, enforce string length limits)
  → Business rule validation (does this value make sense in context?)
  → Process
```

Validation rules by endpoint category:

| Endpoint | Key validations |
|---|---|
| `/v1/workers/{id}/execute` | Worker ID against allowlist, payload size < 1MB, URL format for target URLs, no internal IPs in target URLs |
| `/v1/workflows` | Workflow definition JSON structure, max 50 steps per workflow, no recursive references |
| `/v1/api-keys` | Scope values must be in permitted set, expiry must be future date, origin must be valid URL |
| `/v1/orgs/*/members` | Email format validation, role must be in permitted set, no duplicate invitations |
| All | Max request body size: 1MB. Max URL length: 2048 chars. Reject null bytes in any string field. |

#### Content Security Policy (CSP) Headers

The dashboard application serves with the following headers:

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'nonce-{random}';
  style-src 'self' 'nonce-{random}';
  img-src 'self' data: https://coreclaw-directory.com;
  font-src 'self';
  connect-src 'self' https://auth.coreclaw-directory.com;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
  upgrade-insecure-requests;

Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 0
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
```

The `nonce` is regenerated per-request. No `unsafe-inline` or `unsafe-eval` in production.

#### Additional Security Headers

```
Cache-Control: no-store, no-cache, must-revalidate, private
Pragma: no-cache
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Resource-Policy: same-origin
```

#### Dependency Security

- **Dependency scanning**: Automated dependency vulnerability scanning via Dependabot or Snyk on every PR.
- **Lock file pinning**: `package-lock.json` / `poetry.lock` committed and enforced — no floating version ranges in production.
- **SLSA Level 2**: Build artifacts are generated in a reproducible CI environment with signed build provenance. Consumers can verify that the artifact they're running was built from a specific commit.

---

### 9. Passkey / WebAuthn Support for Developer Accounts

Passkeys replace passwords for developer accounts. This eliminates password-based attacks entirely — no phishing, no credential stuffing, no password spray. Every developer account is encouraged (and Enterprise accounts are required) to enroll a passkey.

#### WebAuthn Configuration

| Parameter | Value |
|---|---|
| Relying Party name | `CoreClaw API Directory` |
| Relying Party ID | `coreclaw-directory.com` |
| Allowed authenticators | Platform authenticators (Touch ID, Face ID, Windows Hello, Android Biometric) and roaming authenticators (YubiKey, Titan Key) |
| Attestation | `direct` for Enterprise, `none` for individual developers (privacy-preserving) |
| User verification | `required` (biometric/PIN required for each ceremony) |
| Resident key | `preferred` (discoverable credentials for passwordless flow) |

#### Registration Flow

```
1. User initiates passkey enrollment in /settings/security
2. Server generates challenge (random 32 bytes) + challenge options
3. Browser prompts for biometric/PIN
4. Authenticator generates key pair, signs challenge
5. Client sends attestation to server
6. Server verifies attestation, stores public key + credential ID
7. Server confirms registration, logs audit event
```

Registration payload stored:

```json
{
  "credential_id": "base64url-encoded-credential-id",
  "public_key": "base64url-encoded-public-key",
  "sign_count": 0,
  "aaguid": "authenticator-aaguid",
  "user_id": "user_jane_smith",
  "org_id": "org_acme_corp",
  "name": "Jane's MacBook Pro Touch ID",
  "created_at": "2026-07-24T12:00:00Z",
  "last_used_at": "2026-07-24T14:32:11Z",
  "backup_eligible": false,
  "backup_state": false
}
```

#### Authentication Flow

```
1. User enters email at login screen
2. Server returns challenge + allowed credential IDs for that user
3. Browser prompts for biometric/PIN
4. Authenticator signs the challenge
5. Client sends signed assertion to server
6. Server verifies signature against stored public key
7. Server checks sign count (detect cloned authenticators)
8. Server issues OIDC tokens (access + refresh)
9. Audit event: login.success via passkey
```

#### Fallback Authentication

If a user has not enrolled a passkey:

- **Free tier**: Email magic link (one-time code, 10-minute expiry).
- **Pro tier**: Email magic link + optional TOTP (RFC 6238) as intermediate step before passkey enrollment.
- **Enterprise tier**: SSO via corporate identity provider (Okta, Azure AD, Google Workspace) + passkey required for platform-native actions.

All fallback methods require passkey enrollment within 30 days of account creation (configurable per org).

#### Passkey Lifecycle Management

| Event | Action |
|---|---|
| Authenticator sign count decreases | Possible cloned key — flag account, require re-enrollment |
| Backup-eligible key detected | Notify user, suggest registering a second non-backup key |
| 90 days since last use | Mark as stale, notify user |
| User enrolls replacement key | Old key retained for 30-day grace period, then deleted |
| User removes key | Immediate deletion, audit event logged |
| Account recovery | Admin can initiate recovery by verifying identity via secondary channel (email + support ticket), then clearing all passkeys and requiring fresh enrollment |

#### Device Loss Recovery

If a user loses their only enrolled passkey:

1. User clicks "I lost my passkey" at login.
2. Platform sends a recovery code to the verified email address.
3. User enters the recovery code + verifies identity via a second factor (TOTP, backup email, or support-verified ID).
4. All existing passkeys are revoked. The user enrolls a new passkey.
5. The recovery event is logged, and the org admin is notified.

Recovery codes (one-time-use, 10 attempts before lockout) are available as a proactive measure:

```json
{
  "recovery_codes": [
    "a7b3-c9d1-e2f4",
    "f5a6-b8c0-d1e3"
  ],
  "generated_at": "2026-07-24T12:00:00Z",
  "used_codes": [],
  "remaining_codes": 10
}
```

Recovery codes are displayed once at generation time, hashed in the database, and never shown again.

---

### Cross-Cutting Concerns

#### Breach Response Protocol

If a credential compromise is detected (unauthorized API calls from a key, session hijacking attempt, passkey cloning indicator):

1. **Automated response (< 1 minute)**: Compromised credential is revoked. All sessions for the affected identity are terminated. Affected org admin is notified via email + dashboard alert.
2. **Investigation (< 1 hour)**: Audit log for the affected identity is exported. Scope of impact assessed (which APIs were called, what data was accessed).
3. **Communication (< 24 hours)**: Affected users notified with specific details of what happened, what was accessed, and what they should do.
4. **Post-mortem (< 72 hours)**: Root cause analysis completed. Detection gap identified. Prevention controls updated.

#### Compliance Mapping

| Requirement | Architecture control |
|---|---|
| SOC 2 — Access Control | RBAC + least-privilege API key scoping + session timeout enforcement |
| SOC 2 — Audit Logging | Append-only audit trail with Merkle integrity verification |
| SOC 2 — Encryption | TLS 1.3 in transit, AES-256-GCM at rest, key rotation |
| GDPR — Right to Erasure | Org deletion API removes all user data within 30 days; audit logs retained for legal basis |
| GDPR — Data Portability | Full data export API (`GET /v1/orgs/{org_id}/export`) returns JSON + CSV within 24 hours |
| PCI DSS — if processing payments | No card data stored on platform; Stripe handles all payment processing |
| ISO 27001 — Risk Management | Threat model reviewed quarterly; worker trust tiers enforce third-party risk controls |

---

## Specialist PRD Library

This master PRD is supported by 13 domain-specific PRDs created by specialist agents. Each provides deep technical detail for their respective area.

### Infrastructure & Architecture
| PRD | Focus Area | Key Deliverables |
|-----|------------|------------------|
| [AEO Foundations](prds/prd-aeo.md) | AI Engine Optimization | llms.txt, token budgets, structured data, robots.txt |
| [API Platform](prds/prd-api-platform.md) | REST API design | OpenAPI specs, SDK generation, rate limiting |
| [Backend Architecture](prds/prd-backend-architect.md) | System design | Cloudflare Workers, D1, KV, Vectorize |
| [Workflow Architecture](prds/prd-workflow-architect.md) | State machines | DAG execution, error handling, test matrices |

### AI & Intelligence
| PRD | Focus Area | Key Deliverables |
|-----|------------|------------------|
| [AI Engineer](prds/prd-ai-engineer.md) | ML features | RAG, semantic search, anomaly detection |
| [AI Citation](prds/prd-ai-citation.md) | Citation optimization | Platform monitoring, accuracy verification |
| [Agentic Search](prds/prd-agentic-search.md) | Agent accessibility | WebMCP, agent discovery, task workflows |
| [Agents Orchestrator](prds/prd-agents-orchestrator.md) | Multi-agent systems | Pipeline design, state management |

### Business & Growth
| PRD | Focus Area | Key Deliverables |
|-----|------------|------------------|
| [Business Strategy](prds/prd-business-strategy.md) | Revenue & market | TAM/SAM/SOM, pricing, GTM |
| [Ad Creative](prds/prd-ad-creative.md) | Paid acquisition | Google/Meta/LinkedIn ads, budget allocation |
| [Trend Research](prds/prd-trend-research.md) | Market intelligence | Trend monitoring, competitive analysis |

### Design & Expansion
| PRD | Focus Area | Key Deliverables |
|-----|------------|------------------|
| [Cartography](prds/prd-cartography.md) | UX & visual design | IA, component library, responsive design |
| [China E-Commerce](prds/prd-china-ecommerce.md) | China market | 35+ Workers, compliance, localization |

---

## Next Steps

1. **Today:** Share the repo on Reddit, Twitter, LinkedIn
2. **This week:** Write 2 blog posts targeting "web scraping APIs" keywords
3. **This month:** Set up affiliate tracking dashboard + email list
4. **Next month:** Start building Pro directory or SaaS MVP
5. **Now:** Begin project scaffolding based on Backend Architecture PRD

---

*Document created: 2026-07-24*
*Last updated: 2026-07-25*
*Specialist PRDs: 13 total, 150KB+ of detailed technical specifications*
