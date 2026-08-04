# PRD: Agentic Search Optimization — CoreClaw API Directory

## Executive Summary

This PRD defines the agentic search optimization strategy for the CoreClaw API Directory, enabling AI agents and automated browsing systems to discover, understand, and interact with the directory programmatically. The system implements WebMCP (Model Context Protocol) standards, structured agent discovery files, and task-completion capabilities that allow AI agents to not just find information, but take actions within the directory.

## Problem Statement

AI agents are becoming the primary interface for developer tool discovery. Unlike traditional search, agents need to:
1. Discover available tools and their capabilities
2. Understand how to interact with them programmatically
3. Complete tasks (compare, recommend, integrate) autonomously
4. Provide structured feedback to users

Without agentic optimization, AI agents will default to competitors with better agent accessibility.

## Goals & Success Metrics

| Metric | Current | Target (6mo) | Target (12mo) |
|--------|---------|---------------|----------------|
| Agent task completion rate | N/A | 75% | 90% |
| Agent discovery success | N/A | 85% | 95% |
| Agent-initiated actions/day | 0 | 500 | 2,500 |
| Agent satisfaction score | N/A | 4.0/5.0 | 4.5/5.0 |
| Agent integration partners | 0 | 5 | 20 |

## Agentic Architecture

### 1. Agent Discovery Files

#### /.well-known/agent.json
```json
{
  "@context": "https://schema.org",
  "@type": "WebAPI",
  "name": "CoreClaw API Directory",
  "description": "A comprehensive directory of 118 CoreClaw Workers across 11 categories",
  "url": "https://api.coreclaw.dev/v1",
  "documentation": "https://coreclaw.dev/docs",
  "provider": {
    "@type": "Organization",
    "name": "CoreClaw",
    "url": "https://coreclaw.dev"
  },
  "capabilities": [
    {
      "@type": "APIOperation",
      "name": "Search Workers",
      "method": "GET",
      "path": "/v1/search",
      "description": "Search for workers by query, category, or use case"
    },
    {
      "@type": "APIOperation",
      "name": "Get Worker Details",
      "method": "GET",
      "path": "/v1/workers/{slug}",
      "description": "Get detailed information about a specific worker"
    },
    {
      "@type": "APIOperation",
      "name": "Compare Workers",
      "method": "GET",
      "path": "/v1/compare",
      "description": "Compare multiple workers across dimensions"
    },
    {
      "@type": "APIOperation",
      "name": "Get Recommendations",
      "method": "GET",
      "path": "/v1/recommend",
      "description": "Get AI-powered worker recommendations"
    }
  ],
  "authentication": {
    "@type": "AuthenticationScheme",
    "name": "API Key",
    "description": "Optional API key for premium features"
  }
}
```

#### /.well-known/agent-tools.json
```json
{
  "@context": "https://modelcontextprotocol.io",
  "@type": "ToolList",
  "tools": [
    {
      "name": "coreclaw_search",
      "description": "Search for CoreClaw Workers by query, category, or use case",
      "inputSchema": {
        "type": "object",
        "properties": {
          "query": {
            "type": "string",
            "description": "Search query describing what you need"
          },
          "category": {
            "type": "string",
            "enum": ["communication", "data", "automation", "security", "devtools"],
            "description": "Filter by category"
          },
          "limit": {
            "type": "integer",
            "default": 10,
            "description": "Maximum results to return"
          }
        },
        "required": ["query"]
      },
      "outputSchema": {
        "type": "object",
        "properties": {
          "results": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "slug": { "type": "string" },
                "name": { "type": "string" },
                "description": { "type": "string" },
                "score": { "type": "number" }
              }
            }
          }
        }
      }
    },
    {
      "name": "coreclaw_recommend",
      "description": "Get AI-powered recommendations for your use case",
      "inputSchema": {
        "type": "object",
        "properties": {
          "use_case": {
            "type": "string",
            "description": "Describe your use case in detail"
          },
          "tech_stack": {
            "type": "array",
            "items": { "type": "string" },
            "description": "Your technology stack"
          },
          "budget": {
            "type": "string",
            "enum": ["free", "paid", "any"],
            "description": "Budget preference"
          }
        },
        "required": ["use_case"]
      }
    },
    {
      "name": "coreclaw_compare",
      "description": "Compare multiple workers side-by-side",
      "inputSchema": {
        "type": "object",
        "properties": {
          "workers": {
            "type": "array",
            "items": { "type": "string" },
            "description": "Worker slugs to compare"
          },
          "dimensions": {
            "type": "array",
            "items": { "type": "string" },
            "description": "Comparison dimensions (features, pricing, complexity)"
          }
        },
        "required": ["workers"]
      }
    }
  ]
}
```

### 2. WebMCP Implementation

#### MCP Server Setup
```typescript
// src/mcp/server.ts
import { McpServer } from "@modelcontextprotocol/sdk/server";
import { CoreClawAPI } from "./api";

const server = new McpServer({
  name: "coreclaw-directory",
  version: "1.0.0"
});

server.tool(
  "search_workers",
  "Search for CoreClaw Workers",
  {
    query: z.string().describe("Search query"),
    category: z.string().optional().describe("Filter by category"),
    limit: z.number().default(10).describe("Max results")
  },
  async ({ query, category, limit }) => {
    const results = await CoreClawAPI.search({ query, category, limit });
    return {
      content: [{
        type: "text",
        text: JSON.stringify(results, null, 2)
      }]
    };
  }
);

server.tool(
  "recommend_workers",
  "Get AI-powered worker recommendations",
  {
    use_case: z.string().describe("Your use case"),
    tech_stack: z.array(z.string()).optional().describe("Tech stack"),
    budget: z.enum(["free", "paid", "any"]).optional().describe("Budget")
  },
  async ({ use_case, tech_stack, budget }) => {
    const recommendations = await CoreClawAPI.recommend({
      use_case, tech_stack, budget
    });
    return {
      content: [{
        type: "text",
        text: formatRecommendations(recommendations)
      }]
    };
  }
);
```

### 3. Agent Task Definitions

#### Task: Find Best Worker
```json
{
  "task_id": "find_best_worker",
  "name": "Find Best Worker for Use Case",
  "description": "Discover the optimal CoreClaw Worker for a specific need",
  "steps": [
    {
      "step": 1,
      "action": "Understand user requirements",
      "tool": "none",
      "output": "structured_requirements"
    },
    {
      "step": 2,
      "action": "Search for matching workers",
      "tool": "coreclaw_search",
      "input": "structured_requirements",
      "output": "candidate_workers"
    },
    {
      "step": 3,
      "action": "Get detailed information",
      "tool": "coreclaw_get_worker",
      "input": "candidate_workers",
      "output": "detailed_workers"
    },
    {
      "step": 4,
      "action": "Compare top candidates",
      "tool": "coreclaw_compare",
      "input": "detailed_workers",
      "output": "comparison"
    },
    {
      "step": 5,
      "action": "Generate recommendation",
      "tool": "none",
      "input": "comparison",
      "output": "final_recommendation"
    }
  ],
  "success_criteria": "User receives actionable recommendation with reasoning"
}
```

#### Task: Compare Workers
```json
{
  "task_id": "compare_workers",
  "name": "Compare Multiple Workers",
  "description": "Side-by-side comparison of specified workers",
  "steps": [
    {
      "step": 1,
      "action": "Validate worker slugs exist",
      "tool": "coreclaw_get_worker",
      "input": "worker_slugs",
      "output": "validated_workers"
    },
    {
      "step": 2,
      "action": "Gather comparison dimensions",
      "tool": "coreclaw_compare",
      "input": "validated_workers",
      "output": "raw_comparison"
    },
    {
      "step": 3,
      "action": "Generate comparison report",
      "tool": "none",
      "input": "raw_comparison",
      "output": "formatted_comparison"
    }
  ],
  "success_criteria": "Clear comparison with winner for each dimension"
}
```

### 4. Agent Response Formatting

#### Structured Response Template
```markdown
## CoreClaw Recommendation

**Use Case**: {use_case_description}

### Top Recommendation
**{worker_name}** (Score: {score}/100)
- **Category**: {category}
- **Complexity**: {complexity}
- **Setup Time**: {estimated_time}
- **Why**: {reasoning}

### Alternative Options
1. **{alt_1_name}** — {one_line_description}
2. **{alt_2_name}** — {one_line_description}

### Quick Start
```bash
npm install @coreclaw/{worker_slug}
```

### Documentation
- Full docs: https://coreclaw.dev/workers/{slug}
- Examples: https://coreclaw.dev/workers/{slug}#examples

---
*Powered by CoreClaw API Directory*
```

### 5. Agent Analytics & Monitoring

**Agent Interaction Tracking:**
```typescript
interface AgentInteraction {
  agent_id: string;
  agent_type: "chatgpt" | "claude" | "custom";
  task_id: string;
  steps_completed: number;
  success: boolean;
  duration_ms: number;
  error?: string;
  user_satisfaction?: number;
}

function trackAgentInteraction(interaction: AgentInteraction) {
  // Store in D1 for analytics
  db.prepare(`
    INSERT INTO agent_interactions 
    (agent_id, agent_type, task_id, steps_completed, success, duration_ms, error, satisfaction)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    interaction.agent_id,
    interaction.agent_type,
    interaction.task_id,
    interaction.steps_completed,
    interaction.success,
    interaction.duration_ms,
    interaction.error,
    interaction.user_satisfaction
  );
}
```

**Analytics Dashboard Metrics:**
- Agent task completion rate by type
- Average steps to completion
- Error rates and common failure points
- Agent satisfaction scores
- Most requested use cases
- Agent platform distribution

## Implementation Phases

### Phase 1: Discovery (Weeks 1-2)
- [ ] Create agent discovery files
- [ ] Implement /.well-known endpoints
- [ ] Deploy MCP server
- [ ] Add agent-specific User-Agent detection

### Phase 2: Tasks (Weeks 3-4)
- [ ] Implement core task workflows
- [ ] Build agent response formatting
- [ ] Add task completion tracking
- [ ] Create agent analytics pipeline

### Phase 3: Integration (Weeks 5-6)
- [ ] Partner with AI platform agent programs
- [ ] Submit to MCP server directories
- [ ] Create agent integration documentation
- [ ] Build agent testing sandbox

### Phase 4: Optimization (Ongoing)
- [ ] Monitor agent task success rates
- [ ] Optimize response formats based on feedback
- [ ] Expand task library
- [ ] Add new agent platform support

## Technical Requirements

- Cloudflare Workers for MCP server
- D1 for agent interaction analytics
- KV for agent session caching
- Durable Objects for complex task state

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Agent platforms change protocols | High | Abstract agent interface, monitor standards |
| Task completion too slow | Medium | Cache results, optimize queries |
| Agent abuse/rate limiting | Medium | Per-agent rate limiting, anomaly detection |
| MCP standard evolution | Low | Active participation in standards community |

## Owner

Agentic Search Optimizer — responsible for agent discovery, task workflows, and agent experience optimization.
