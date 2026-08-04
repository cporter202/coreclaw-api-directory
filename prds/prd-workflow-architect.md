# PRD: Workflow Architecture — CoreClaw API Directory

## Executive Summary

This PRD defines the workflow architecture for the CoreClaw API Directory, covering all system workflows, state machines, test matrices, and failure recovery patterns. The architecture ensures reliable execution of complex multi-step operations across the platform, from user interactions to background processing to agent orchestration.

## Problem Statement

The CoreClaw directory requires reliable workflow execution for:
1. User-facing operations (search, compare, recommend)
2. Background processing (content updates, indexing, monitoring)
3. Agent coordination (multi-step tasks, pipelines)
4. System operations (deployments, backups, scaling)

Without robust workflow architecture, failures cascade, state becomes inconsistent, and user experience degrades.

## Goals & Success Metrics

| Metric | Current | Target (6mo) | Target (12mo) |
|--------|---------|---------------|----------------|
| Workflow success rate | N/A | 95% | 99% |
| Mean time to recovery | N/A | <5 minutes | <1 minute |
| State consistency | N/A | 99.9% | 99.99% |
| Error detection time | N/A | <30 seconds | <10 seconds |
| Workflow throughput | N/A | 1,000/day | 10,000/day |

## Workflow Architecture

### 1. Workflow Definition Language

```typescript
interface WorkflowDefinition {
  id: string;
  name: string;
  version: string;
  trigger: Trigger;
  steps: Step[];
  error_handling: ErrorHandler;
  timeout: TimeoutConfig;
  metadata: WorkflowMetadata;
}

interface Trigger {
  type: "manual" | "scheduled" | "event" | "api" | "webhook";
  config: Record<string, any>;
}

interface Step {
  id: string;
  name: string;
  type: "task" | "condition" | "parallel" | "loop" | "subworkflow";
  config: StepConfig;
  next: string | ConditionalNext[];
  error: string | ErrorHandler;
  timeout: number;
  retries: RetryConfig;
}

interface TaskConfig {
  agent?: string;
  tool?: string;
  input: Record<string, any>;
  output: string;
  validation?: ValidationRule[];
}

interface ConditionConfig {
  field: string;
  operator: "eq" | "neq" | "gt" | "lt" | "contains" | "exists";
  value: any;
  true_next: string;
  false_next: string;
}
```

### 2. Core Workflows

#### Workflow: User Search
```yaml
id: user-search
name: User Search Workflow
trigger:
  type: api
  path: /v1/search
steps:
  - id: parse-query
    name: Parse Search Query
    type: task
    config:
      tool: query-parser
      input:
        query: "{{trigger.query}}"
        filters: "{{trigger.filters}}"
      output: parsed_query
    next: validate-query

  - id: validate-query
    name: Validate Query
    type: condition
    config:
      field: parsed_query.valid
      operator: eq
      value: true
      true_next: execute-search
      false_next: return-error

  - id: execute-search
    name: Execute Hybrid Search
    type: task
    config:
      tool: search-engine
      input:
        query: "{{parsed_query.text}}"
        category: "{{parsed_query.category}}"
        limit: "{{parsed_query.limit}}"
      output: raw_results
    next: rank-results

  - id: rank-results
    name: Rank Search Results
    type: task
    config:
      tool: result-ranker
      input:
        results: "{{raw_results}}"
        query: "{{parsed_query.text}}"
      output: ranked_results
    next: cache-results

  - id: cache-results
    name: Cache Search Results
    type: task
    config:
      tool: kv-cache
      input:
        key: "search:{{parsed_query.hash}}"
        value: "{{ranked_results}}"
        ttl: 900
      output: cached
    next: return-results

  - id: return-results
    name: Return Search Results
    type: task
    config:
      tool: response-builder
      input:
        results: "{{ranked_results}}"
        meta: "{{parsed_query.meta}}"
      output: response
    next: null

  - id: return-error
    name: Return Error Response
    type: task
    config:
      tool: error-builder
      input:
        error: "Invalid query"
        details: "{{parsed_query.errors}}"
      output: error_response
    next: null
error_handling:
  fallback: return-error
  alert: false
timeout: 5000
```

#### Workflow: Worker Recommendation
```yaml
id: worker-recommendation
name: Worker Recommendation Workflow
trigger:
  type: api
  path: /v1/recommend
steps:
  - id: parse-request
    name: Parse Recommendation Request
    type: task
    config:
      tool: request-parser
      input:
        body: "{{trigger.body}}"
      output: request
    next: check-cache

  - id: check-cache
    name: Check Recommendation Cache
    type: task
    config:
      tool: kv-cache
      input:
        key: "recommend:{{request.hash}}"
      output: cached_result
    next: return-cached

  - id: return-cached
    name: Return Cached Result
    type: condition
    config:
      field: cached_result
      operator: exists
      value: true
      true_next: return-response
      false_next: embed-query

  - id: embed-query
    name: Embed User Query
    type: task
    config:
      tool: embedding-service
      input:
        text: "{{request.use_case}}"
      output: query_embedding
    next: vector-search

  - id: vector-search
    name: Execute Vector Search
    type: task
    config:
      tool: vectorize
      input:
        vector: "{{query_embedding}}"
        topK: 20
        filter: "{{request.filters}}"
      output: similar_workers
    next: rerank-results

  - id: rerank-results
    name: Rerank with Cross-Encoder
    type: task
    config:
      tool: cross-encoder
      input:
        query: "{{request.use_case}}"
        candidates: "{{similar_workers}}"
      output: reranked_results
    next: apply-filters

  - id: apply-filters
    name: Apply User Filters
    type: task
    config:
      tool: filter-engine
      input:
        results: "{{reranked_results}}"
        budget: "{{request.budget}}"
        tech_stack: "{{request.tech_stack}}"
      output: filtered_results
    next: generate-recommendations

  - id: generate-recommendations
    name: Generate Recommendation Response
    type: task
    config:
      tool: recommendation-builder
      input:
        results: "{{filtered_results}}"
        use_case: "{{request.use_case}}"
      output: recommendations
    next: cache-recommendations

  - id: cache-recommendations
    name: Cache Recommendations
    type: task
    config:
      tool: kv-cache
      input:
        key: "recommend:{{request.hash}}"
        value: "{{recommendations}}"
        ttl: 1800
      output: cached
    next: return-response

  - id: return-response
    name: Return Recommendation Response
    type: task
    config:
      tool: response-builder
      input:
        recommendations: "{{recommendations}}"
        meta: "{{request.meta}}"
      output: response
    next: null
error_handling:
  fallback: return-fallback
  alert: true
timeout: 10000
```

#### Workflow: Content Update Pipeline
```yaml
id: content-update-pipeline
name: Content Update Pipeline
trigger:
  type: scheduled
  cron: "0 2 * * *"  # Daily at 2 AM
steps:
  - id: fetch-github-data
    name: Fetch GitHub Metadata
    type: task
    config:
      tool: github-api
      input:
        repos: "{{context.worker_repos}}"
      output: github_data
    next: analyze-quality

  - id: analyze-quality
    name: Analyze Worker Quality
    type: task
    config:
      tool: quality-analyzer
      input:
        github_data: "{{github_data}}"
        existing_data: "{{context.worker_data}}"
      output: quality_scores
    next: update-summaries

  - id: update-summaries
    name: Update Worker Summaries
    type: task
    config:
      tool: content-generator
      input:
        workers: "{{github_data.workers}}"
        scores: "{{quality_scores}}"
      output: updated_summaries
    next: validate-content

  - id: validate-content
    name: Validate Updated Content
    type: task
    config:
      tool: content-validator
      input:
        content: "{{updated_summaries}}"
      output: validation_result
    next: publish-content

  - id: publish-content
    name: Publish Updated Content
    type: task
    config:
      tool: database-updater
      input:
        content: "{{updated_summaries}}"
        validation: "{{validation_result}}"
      output: publish_result
    next: update-search-index

  - id: update-search-index
    name: Update Search Index
    type: task
    config:
      tool: search-indexer
      input:
        workers: "{{updated_summaries}}"
      output: index_result
    next: generate-report

  - id: generate-report
    name: Generate Update Report
    type: task
    config:
      tool: report-builder
      input:
        updates: "{{updated_summaries}}"
        quality: "{{quality_scores}}"
        publish: "{{publish_result}}"
      output: report
    next: send-notification

  - id: send-notification
    name: Send Update Notification
    type: task
    config:
      tool: notification-service
      input:
        report: "{{report}}"
        channels: ["slack", "email"]
      output: notification_result
    next: null
error_handling:
  fallback: alert-only
  alert: true
timeout: 1800000  # 30 minutes
```

### 3. State Machines

#### Workflow State Machine
```typescript
type WorkflowState = 
  | "pending"
  | "running"
  | "paused"
  | "completed"
  | "failed"
  | "cancelled";

type WorkflowEvent =
  | "start"
  | "pause"
  | "resume"
  | "complete"
  | "fail"
  | "cancel"
  | "retry";

const workflowStateMachine = {
  pending: {
    start: "running",
    cancel: "cancelled"
  },
  running: {
    pause: "paused",
    complete: "completed",
    fail: "failed",
    cancel: "cancelled"
  },
  paused: {
    resume: "running",
    cancel: "cancelled"
  },
  failed: {
    retry: "running",
    cancel: "cancelled"
  },
  completed: {},
  cancelled: {}
};
```

#### Task State Machine
```typescript
type TaskState =
  | "queued"
  | "running"
  | "completed"
  | "failed"
  | "skipped"
  | "timeout";

type TaskEvent =
  | "dequeue"
  | "complete"
  | "fail"
  | "skip"
  | "timeout"
  | "retry";

const taskStateMachine = {
  queued: {
    dequeue: "running"
  },
  running: {
    complete: "completed",
    fail: "failed",
    timeout: "timeout"
  },
  failed: {
    retry: "running"
  },
  timeout: {
    retry: "running"
  },
  completed: {},
  skipped: {}
};
```

### 4. Error Handling Patterns

#### Retry Strategy
```typescript
interface RetryConfig {
  max_retries: number;
  backoff: "linear" | "exponential" | "fixed";
  base_delay_ms: number;
  max_delay_ms: number;
  retryable_errors: string[];
}

const defaultRetryConfig: RetryConfig = {
  max_retries: 3,
  backoff: "exponential",
  base_delay_ms: 1000,
  max_delay_ms: 30000,
  retryable_errors: [
    "ECONNRESET",
    "ETIMEDOUT",
    "RATE_LIMITED",
    "TEMPORARY_ERROR"
  ]
};
```

#### Circuit Breaker
```typescript
class CircuitBreaker {
  private failures: number = 0;
  private last_failure: Date | null = null;
  private state: "closed" | "open" | "half-open" = "closed";

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === "open") {
      if (this.shouldRetry()) {
        this.state = "half-open";
      } else {
        throw new CircuitBreakerOpenError();
      }
    }

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  private onSuccess(): void {
    this.failures = 0;
    this.state = "closed";
  }

  private onFailure(): void {
    this.failures++;
    this.last_failure = new Date();
    if (this.failures >= this.threshold) {
      this.state = "open";
    }
  }

  private shouldRetry(): boolean {
    if (!this.last_failure) return false;
    const elapsed = Date.now() - this.last_failure.getTime();
    return elapsed > this.reset_timeout_ms;
  }
}
```

#### Fallback Strategy
```typescript
interface FallbackStrategy {
  type: "cache" | "default" | "degraded" | "failover";
  config: Record<string, any>;
}

const fallbackStrategies: Record<string, FallbackStrategy> = {
  "user-search": {
    type: "cache",
    config: { ttl: 3600 }
  },
  "worker-recommendation": {
    type: "default",
    config: { default_count: 5 }
  },
  "content-update": {
    type: "failover",
    config: { backup_region: "us-east" }
  }
};
```

### 5. Test Matrices

#### Workflow Test Matrix
```typescript
interface TestCase {
  workflow_id: string;
  scenario: string;
  input: Record<string, any>;
  expected_output: any;
  expected_state: WorkflowState;
  expected_duration_ms: number;
  tags: string[];
}

const workflowTestCases: TestCase[] = [
  {
    workflow_id: "user-search",
    scenario: "Basic search query",
    input: { query: "email api", limit: 10 },
    expected_output: { results: expect.any(Array) },
    expected_state: "completed",
    expected_duration_ms: 500,
    tags: ["smoke", "search"]
  },
  {
    workflow_id: "user-search",
    scenario: "Search with category filter",
    input: { query: "email", category: "communication", limit: 5 },
    expected_output: { results: expect.any(Array) },
    expected_state: "completed",
    expected_duration_ms: 400,
    tags: ["search", "filter"]
  },
  {
    workflow_id: "user-search",
    scenario: "Empty search results",
    input: { query: "nonexistent", limit: 10 },
    expected_output: { results: [] },
    expected_state: "completed",
    expected_duration_ms: 300,
    tags: ["search", "edge-case"]
  },
  {
    workflow_id: "user-search",
    scenario: "Invalid query - too short",
    input: { query: "a" },
    expected_output: { error: "Query too short" },
    expected_state: "failed",
    expected_duration_ms: 100,
    tags: ["search", "validation"]
  },
  {
    workflow_id: "user-search",
    scenario: "Search timeout",
    input: { query: "complex query", timeout: 100 },
    expected_output: { error: "Search timeout" },
    expected_state: "failed",
    expected_duration_ms: 100,
    tags: ["search", "timeout"]
  }
];
```

#### Task Test Matrix
```typescript
const taskTestCases: TestCase[] = [
  {
    task_id: "embedding-service",
    scenario: "Normal embedding generation",
    input: { text: "email api for transactional messages" },
    expected_output: { vector: expect.any(Array) },
    expected_state: "completed",
    expected_duration_ms: 200,
    tags: ["embedding", "smoke"]
  },
  {
    task_id: "embedding-service",
    scenario: "Long text truncation",
    input: { text: "a".repeat(10000) },
    expected_output: { vector: expect.any(Array) },
    expected_state: "completed",
    expected_duration_ms: 300,
    tags: ["embedding", "edge-case"]
  },
  {
    task_id: "embedding-service",
    scenario: "Empty text",
    input: { text: "" },
    expected_output: { error: "Empty text" },
    expected_state: "failed",
    expected_duration_ms: 50,
    tags: ["embedding", "validation"]
  }
];
```

### 6. Monitoring & Alerting

#### Workflow Metrics
```typescript
interface WorkflowMetrics {
  execution_count: number;
  success_count: number;
  failure_count: number;
  average_duration_ms: number;
  p95_duration_ms: number;
  p99_duration_ms: number;
  error_rate: number;
  retry_rate: number;
  timeout_rate: number;
}
```

#### Alert Rules
```typescript
const alertRules = [
  {
    name: "high-error-rate",
    condition: "error_rate > 0.05",
    severity: "critical",
    message: "Workflow error rate exceeds 5%"
  },
  {
    name: "slow-execution",
    condition: "p95_duration_ms > 10000",
    severity: "warning",
    message: "Workflow P95 latency exceeds 10 seconds"
  },
  {
    name: "high-retry-rate",
    condition: "retry_rate > 0.2",
    severity: "warning",
    message: "Workflow retry rate exceeds 20%"
  },
  {
    name: "timeout-spike",
    condition: "timeout_rate > 0.1",
    severity: "critical",
    message: "Workflow timeout rate exceeds 10%"
  }
];
```

## Implementation Phases

### Phase 1: Core Workflows (Weeks 1-2)
- [ ] Implement workflow engine
- [ ] Build search workflow
- [ ] Build recommendation workflow
- [ ] Add basic error handling

### Phase 2: State Management (Weeks 3-4)
- [ ] Implement state machines
- [ ] Build state persistence
- [ ] Add recovery mechanisms
- [ ] Create monitoring dashboard

### Phase 3: Advanced Patterns (Weeks 5-6)
- [ ] Implement circuit breakers
- [ ] Build retry mechanisms
- [ ] Add fallback strategies
- [ ] Create test framework

### Phase 4: Production (Weeks 7-8)
- [ ] Set up monitoring and alerting
- [ ] Implement performance optimization
- [ ] Add security measures
- [ ] Create runbooks

## Technical Requirements

- Cloudflare Workers for workflow execution
- Durable Objects for stateful workflows
- D1 for workflow persistence
- KV for caching
- Cron triggers for scheduled workflows
- Queues for async processing

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| State corruption | High | Immutable state, checksums |
| Workflow deadlock | High | Timeout mechanisms, deadlock detection |
| Error cascading | High | Circuit breakers, isolation |
| Performance degradation | Medium | Monitoring, auto-scaling |

## Owner

Workflow Architect — responsible for workflow design, state management, and reliability engineering.
