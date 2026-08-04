# PRD: Agent Orchestration Architecture — CoreClaw API Directory

## Executive Summary

This PRD defines the multi-agent orchestration system for the CoreClaw API Directory, enabling complex, multi-step workflows across specialized AI agents. The architecture implements a pipeline-based orchestration pattern with 10+ specialized agents, each handling distinct domain tasks, coordinated through a central orchestrator that manages state, routing, and quality control.

## Problem Statement

The CoreClaw API Directory requires multiple specialized capabilities: content generation, data analysis, monitoring, optimization, and reporting. A single monolithic system cannot handle the diversity of tasks efficiently. A multi-agent architecture allows parallel execution, specialized expertise, and graceful degradation when individual components fail.

## Goals & Success Metrics

| Metric | Current | Target (6mo) | Target (12mo) |
|--------|---------|---------------|----------------|
| Agent pipeline throughput | 0 | 100 tasks/day | 1,000 tasks/day |
| Pipeline success rate | N/A | 90% | 95% |
| Average task completion | N/A | 5 minutes | 2 minutes |
| Agent utilization rate | N/A | 70% | 85% |
| Cross-agent coordination latency | N/A | <500ms | <200ms |

## Orchestration Architecture

### 1. Orchestrator Core

```typescript
// src/orchestration/orchestrator.ts
interface AgentTask {
  id: string;
  type: string;
  priority: "low" | "medium" | "high" | "critical";
  input: Record<string, any>;
  dependencies: string[];
  timeout_ms: number;
  retry_policy: {
    max_retries: number;
    backoff_ms: number;
  };
}

interface AgentResult {
  task_id: string;
  agent_id: string;
  status: "pending" | "running" | "completed" | "failed";
  output?: any;
  error?: string;
  duration_ms: number;
  metadata: {
    tokens_used: number;
    cost_usd: number;
  };
}

class Orchestrator {
  private agents: Map<string, Agent>;
  private taskQueue: PriorityQueue<AgentTask>;
  private stateStore: StateStore;
  
  async executeWorkflow(workflow: Workflow): Promise<WorkflowResult> {
    const dag = this.buildDAG(workflow.tasks);
    const results = new Map<string, AgentResult>();
    
    // Execute in topological order
    for (const batch of dag.topologicalBatches()) {
      const batchPromises = batch.map(task => 
        this.executeTask(task, results)
      );
      
      const batchResults = await Promise.allSettled(batchPromises);
      
      for (const result of batchResults) {
        if (result.status === "rejected") {
          return this.handleFailure(workflow, result.reason);
        }
      }
    }
    
    return this.compileResults(workflow, results);
  }
  
  private async executeTask(
    task: AgentTask,
    context: Map<string, AgentResult>
  ): Promise<AgentResult> {
    const agent = this.agents.get(task.type);
    if (!agent) throw new Error(`Unknown agent type: ${task.type}`);
    
    // Resolve dependencies
    const resolvedInput = this.resolveDependencies(task, context);
    
    // Execute with timeout and retry
    return this.executeWithRetry(
      () => agent.execute(resolvedInput),
      task.retry_policy,
      task.timeout_ms
    );
  }
}
```

### 2. Agent Registry

```typescript
// src/orchestration/registry.ts
const AGENT_REGISTRY: AgentConfig[] = [
  {
    id: "content-generator",
    type: "content",
    capabilities: ["worker-descriptions", "category-summaries", "comparison-pages"],
    model: "claude-3-opus",
    max_concurrent: 3,
    cost_per_1k_tokens: 0.03
  },
  {
    id: "data-analyst",
    type: "analytics",
    capabilities: ["usage-analysis", "trend-detection", "anomaly-scoring"],
    model: "gpt-4-turbo",
    max_concurrent: 5,
    cost_per_1k_tokens: 0.01
  },
  {
    id: "seo-optimizer",
    type: "optimization",
    capabilities: ["keyword-research", "content-optimization", "schema-markup"],
    model: "claude-3-sonnet",
    max_concurrent: 2,
    cost_per_1k_tokens: 0.015
  },
  {
    id: "citation-tracker",
    type: "monitoring",
    capabilities: ["ai-citation-monitoring", "competitor-tracking", "accuracy-verification"],
    model: "gpt-4-turbo",
    max_concurrent: 10,
    cost_per_1k_tokens: 0.01
  },
  {
    id: "agent-optimizer",
    type: "agentic",
    capabilities: ["task-optimization", "response-formatting", "agent-analytics"],
    model: "claude-3-opus",
    max_concurrent: 2,
    cost_per_1k_tokens: 0.03
  },
  {
    id: "quality-assurance",
    type: "qa",
    capabilities: ["content-review", "fact-checking", "style-consistency"],
    model: "claude-3-opus",
    max_concurrent: 2,
    cost_per_1k_tokens: 0.03
  },
  {
    id: "api-optimizer",
    type: "api",
    capabilities: ["performance-optimization", "rate-limiting", "caching"],
    model: "gpt-4-turbo",
    max_concurrent: 5,
    cost_per_1k_tokens: 0.01
  },
  {
    id: "security-scanner",
    type: "security",
    capabilities: ["vulnerability-scanning", "dependency-audit", "access-control"],
    model: "claude-3-sonnet",
    max_concurrent: 3,
    cost_per_1k_tokens: 0.015
  },
  {
    id: "integration-builder",
    type: "integration",
    capabilities: ["sdk-generation", "webhook-setup", "partner-integration"],
    model: "gpt-4-turbo",
    max_concurrent: 2,
    cost_per_1k_tokens: 0.01
  },
  {
    id: "report-generator",
    type: "reporting",
    capabilities: ["daily-reports", "weekly-digests", "monthly-analysis"],
    model: "claude-3-sonnet",
    max_concurrent: 1,
    cost_per_1k_tokens: 0.015
  }
];
```

### 3. Workflow Definitions

#### Workflow: Daily Content Update
```typescript
const DAILY_CONTENT_WORKFLOW: Workflow = {
  id: "daily-content-update",
  name: "Daily Content Update Pipeline",
  schedule: "0 2 * * *", // 2 AM daily
  tasks: [
    {
      id: "fetch-github-data",
      type: "data-analyst",
      priority: "high",
      input: { action: "fetch_github_metrics" },
      dependencies: [],
      timeout_ms: 60000
    },
    {
      id: "analyze-quality",
      type: "quality-assurance",
      priority: "high",
      input: { action: "analyze_worker_quality" },
      dependencies: ["fetch-github-data"],
      timeout_ms: 120000
    },
    {
      id: "generate-summaries",
      type: "content-generator",
      priority: "medium",
      input: { action: "update_worker_summaries" },
      dependencies: ["analyze-quality"],
      timeout_ms: 180000
    },
    {
      id: "optimize-seo",
      type: "seo-optimizer",
      priority: "medium",
      input: { action: "optimize_content" },
      dependencies: ["generate-summaries"],
      timeout_ms: 120000
    },
    {
      id: "verify-accuracy",
      type: "citation-tracker",
      priority: "high",
      input: { action: "verify_citations" },
      dependencies: ["optimize-seo"],
      timeout_ms: 60000
    },
    {
      id: "generate-report",
      type: "report-generator",
      priority: "low",
      input: { action: "daily_content_report" },
      dependencies: ["verify-accuracy"],
      timeout_ms: 60000
    }
  ]
};
```

#### Workflow: Citation Monitoring
```typescript
const CITATION_MONITORING_WORKFLOW: Workflow = {
  id: "citation-monitoring",
  name: "Citation Monitoring Pipeline",
  schedule: "0 */6 * * *", // Every 6 hours
  tasks: [
    {
      id: "query-ai-platforms",
      type: "citation-tracker",
      priority: "high",
      input: { action: "query_all_platforms" },
      dependencies: [],
      timeout_ms: 300000
    },
    {
      id: "analyze-citations",
      type: "data-analyst",
      priority: "medium",
      input: { action: "analyze_citation_trends" },
      dependencies: ["query-ai-platforms"],
      timeout_ms: 120000
    },
    {
      id: "detect-anomalies",
      type: "data-analyst",
      priority: "high",
      input: { action: "detect_citation_anomalies" },
      dependencies: ["analyze-citations"],
      timeout_ms: 60000
    },
    {
      id: "optimize-content",
      type: "seo-optimizer",
      priority: "medium",
      input: { action: "optimize_for_citations" },
      dependencies: ["analyze-citations"],
      timeout_ms: 180000
    },
    {
      id: "alert-stakeholders",
      type: "report-generator",
      priority: "high",
      input: { action: "citation_alert_report" },
      dependencies: ["detect-anomalies", "optimize-content"],
      timeout_ms: 30000
    }
  ]
};
```

### 4. State Management

```typescript
// src/orchestration/state.ts
interface WorkflowState {
  workflow_id: string;
  run_id: string;
  status: "initializing" | "running" | "paused" | "completed" | "failed";
  started_at: string;
  updated_at: string;
  task_states: Map<string, TaskState>;
  context: Record<string, any>;
  metrics: WorkflowMetrics;
}

interface TaskState {
  task_id: string;
  status: "pending" | "running" | "completed" | "failed" | "skipped";
  started_at?: string;
  completed_at?: string;
  retries: number;
  output?: any;
  error?: string;
}

class StateStore {
  private kv: KVNamespace;
  private d1: D1Database;
  
  async saveState(state: WorkflowState): Promise<void> {
    // Hot state in KV for fast access
    await this.kv.put(
      `workflow:${state.workflow_id}:${state.run_id}`,
      JSON.stringify(state),
      { expirationTtl: 3600 } // 1 hour
    );
    
    // Cold state in D1 for persistence
    await this.d1.prepare(`
      INSERT INTO workflow_states 
      (workflow_id, run_id, status, started_at, updated_at, context, metrics)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      state.workflow_id,
      state.run_id,
      state.status,
      state.started_at,
      state.updated_at,
      JSON.stringify(state.context),
      JSON.stringify(state.metrics)
    );
  }
  
  async getState(workflow_id: string, run_id: string): Promise<WorkflowState | null> {
    // Try KV first (hot path)
    const kvState = await this.kv.get(`workflow:${workflow_id}:${run_id}`);
    if (kvState) return JSON.parse(kvState);
    
    // Fall back to D1 (cold path)
    const d1State = await this.d1.prepare(`
      SELECT * FROM workflow_states 
      WHERE workflow_id = ? AND run_id = ?
    `).bind(workflow_id, run_id).first();
    
    return d1State ? this.parseState(d1State) : null;
  }
}
```

### 5. Error Handling & Recovery

```typescript
// src/orchestration/error-handler.ts
class ErrorHandler {
  async handleTaskFailure(
    task: AgentTask,
    error: Error,
    context: WorkflowState
  ): Promise<"retry" | "skip" | "abort" | "fallback"> {
    const errorType = this.classifyError(error);
    
    switch (errorType) {
      case "transient":
        // Rate limits, timeouts, temporary failures
        if (task.retries < task.retry_policy.max_retries) {
          return "retry";
        }
        return "fallback";
        
      case "permanent":
        // Invalid input, authentication failures
        return "skip";
        
      case "critical":
        // Security issues, data corruption
        return "abort";
        
      case "degraded":
        // Partial results, reduced quality
        return "fallback";
        
      default:
        return "retry";
    }
  }
  
  async executeFallback(
    task: AgentTask,
    primaryError: Error
  ): Promise<AgentResult> {
    // Fallback strategy based on task type
    const fallbackAgent = this.getFallbackAgent(task.type);
    
    if (fallbackAgent) {
      // Use simpler model or different approach
      return fallbackAgent.execute(task.input);
    }
    
    // Return cached/default result
    return {
      task_id: task.id,
      agent_id: "fallback",
      status: "completed",
      output: this.getDefaultOutput(task.type),
      duration_ms: 0,
      metadata: { tokens_used: 0, cost_usd: 0 }
    };
  }
}
```

### 6. Monitoring & Observability

```typescript
// src/orchestration/monitoring.ts
interface PipelineMetrics {
  workflows_executed: number;
  tasks_completed: number;
  tasks_failed: number;
  average_duration_ms: number;
  total_cost_usd: number;
  agent_utilization: Record<string, number>;
  error_rate: number;
  p95_latency_ms: number;
}

class PipelineMonitor {
  private metrics: MetricsCollector;
  private tracer: Tracer;
  
  async trackWorkflow(workflow: Workflow): Promise<void> {
    const span = this.tracer.startSpan(`workflow.${workflow.id}`);
    
    try {
      for (const task of workflow.tasks) {
        const taskSpan = this.tracer.startSpan(`task.${task.id}`);
        
        try {
          const result = await this.executeTask(task);
          
          this.metrics.increment("tasks_completed");
          this.metrics.histogram("task_duration", result.duration_ms);
          this.metrics.counter("task_cost", result.metadata.cost_usd);
          
          taskSpan.setStatus("ok");
        } catch (error) {
          this.metrics.increment("tasks_failed");
          taskSpan.setStatus("error", error.message);
          throw error;
        } finally {
          taskSpan.end();
        }
      }
      
      span.setStatus("ok");
    } catch (error) {
      span.setStatus("error", error.message);
      throw error;
    } finally {
      span.end();
    }
  }
  
  async generateReport(): Promise<PipelineReport> {
    return {
      period: "last_24h",
      summary: await this.metrics.getSummary(),
      agent_performance: await this.getAgentPerformance(),
      cost_analysis: await this.getCostAnalysis(),
      error_analysis: await this.getErrorAnalysis(),
      recommendations: await this.generateRecommendations()
    };
  }
}
```

## Implementation Phases

### Phase 1: Core Orchestrator (Weeks 1-2)
- [ ] Implement orchestrator core with DAG execution
- [ ] Build agent registry and lifecycle management
- [ ] Deploy state store (KV + D1)
- [ ] Create basic error handling

### Phase 2: Agent Integration (Weeks 3-4)
- [ ] Integrate content-generator agent
- [ ] Integrate data-analyst agent
- [ ] Integrate citation-tracker agent
- [ ] Add monitoring and logging

### Phase 3: Workflow Library (Weeks 5-6)
- [ ] Implement daily content update workflow
- [ ] Implement citation monitoring workflow
- [ ] Add workflow scheduling (Cron triggers)
- [ ] Build workflow dashboard

### Phase 4: Optimization (Weeks 7-8)
- [ ] Add advanced error recovery
- [ ] Implement cost optimization
- [ ] Build performance dashboards
- [ ] Add workflow templates

## Technical Requirements

- Cloudflare Workers for orchestrator and agents
- Durable Objects for complex workflow state
- D1 for persistent state and analytics
- KV for hot state caching
- R2 for workflow artifacts
- Cron triggers for scheduled workflows

## Costs Estimate

| Component | Monthly Cost | Notes |
|-----------|-------------|-------|
| Orchestrator Worker | $5 | 10M invocations |
| Agent Workers (10) | $50 | 1M invocations each |
| Durable Objects | $25 | 1M API calls |
| D1 Database | $10 | 10GB storage |
| KV Storage | $5 | 10GB storage |
| LLM API Costs | $200 | Based on 1000 tasks/day |
| **Total** | **$295/mo** | Scales with task volume |

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Agent coordination failures | High | Idempotent operations, state checkpoints |
| Cost overrun from LLM usage | High | Budget limits, model selection optimization |
| Workflow state corruption | High | Immutable state, backup/restore |
| Performance degradation | Medium | Auto-scaling, circuit breakers |

## Owner

Agents Orchestrator — responsible for multi-agent coordination, workflow execution, and pipeline optimization.
