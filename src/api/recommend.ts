import { Hono } from "hono";
import type { Env } from "../types";

export const recommendRoutes = new Hono<{ Bindings: Env }>();

recommendRoutes.post("/", async (c) => {
  const body = await c.req.json<{
    use_case: string;
    tech_stack?: string[];
    budget?: "free" | "paid" | "any";
    limit?: number;
  }>();

  if (!body.use_case || body.use_case.length < 5) {
    return c.json(
      { error: "use_case must be at least 5 characters", status: 400 },
      400
    );
  }

  const limit = Math.min(body.limit || 5, 10);

  const cacheKey = `recommend:${body.use_case}:${body.tech_stack?.join(",") || ""}:${body.budget || "any"}:${limit}`;
  let cached: any = null;
  try { cached = await c.env.KV.get(cacheKey, "json"); } catch (e) { /* KV unavailable */ }
  if (cached) return c.json(cached);

  // Keyword-based recommendation (simple version - will be enhanced with vector search)
  let query = "SELECT * FROM workers WHERE 1=1";
  const params: any[] = [];

  // Extract keywords from use_case and search
  const keywords = body.use_case
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w.length > 3);

  if (keywords.length > 0) {
    const keywordConditions = keywords.map(() => "(LOWER(name) LIKE ? OR LOWER(description) LIKE ? OR LOWER(category) LIKE ?)").join(" OR ");
    query += ` AND (${keywordConditions})`;
    keywords.forEach((kw) => {
      params.push(`%${kw}%`, `%${kw}%`, `%${kw}%`);
    });
  }

  if (body.budget === "free") {
    query += " AND health_score >= 50";
  }

  query += " ORDER BY health_score DESC LIMIT ?";
  params.push(limit);

  const results = await c.env.DB.prepare(query)
    .bind(...params)
    .all();

  const recommendations = results.results.map((worker: any, index: number) => ({
    worker,
    score: Math.max(95 - index * 8, 50),
    reasoning: `Best match for: ${body.use_case}`,
    rank: index + 1,
  }));

  const response = {
    use_case: body.use_case,
    recommendations,
    meta: {
      total: recommendations.length,
      generated_at: new Date().toISOString(),
    },
  };

  try {
    await c.env.KV.put(cacheKey, JSON.stringify(response), {
      expirationTtl: 1800,
    });
  } catch (e) { /* KV unavailable */ }
  return c.json(response);
});
