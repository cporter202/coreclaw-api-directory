import { Hono } from "hono";
import type { Env } from "../types";

export const searchRoutes = new Hono<{ Bindings: Env }>();

searchRoutes.get("/", async (c) => {
  const query = c.req.query("q");
  const category = c.req.query("category");
  const limit = Math.min(parseInt(c.req.query("limit") || "10"), 50);

  if (!query || query.length < 2) {
    return c.json(
      { error: "Query must be at least 2 characters", status: 400 },
      400
    );
  }

  const cacheKey = `search:${query}:${category || "all"}:${limit}`;
  let cached: any = null;
  try { cached = await c.env.KV.get(cacheKey, "json"); } catch (e) { /* KV unavailable */ }
  if (cached) return c.json(cached);

  // LIKE-based search (reliable with Miniflare)
  let searchQuery = `
    SELECT id, slug, name, category, description, token_summary, health_score
    FROM workers
    WHERE (LOWER(name) LIKE ? OR LOWER(description) LIKE ? OR LOWER(token_summary) LIKE ? OR LOWER(category) LIKE ?)
  `;
  const searchParam = `%${query.toLowerCase()}%`;
  const params: any[] = [searchParam, searchParam, searchParam, searchParam];

  if (category) {
    searchQuery += " AND category = ?";
    params.push(category);
  }

  searchQuery += " ORDER BY health_score DESC LIMIT ?";
  params.push(limit);

  const results = await c.env.DB.prepare(searchQuery)
    .bind(...params)
    .all();

  const response = {
    query,
    category: category || null,
    results: results.results.map((r: any, i: number) => ({
      ...r,
      score: Math.max(100 - i * 5, 50),
    })),
    meta: {
      total: results.results.length,
      limit,
    },
  };

  try {
    await c.env.KV.put(cacheKey, JSON.stringify(response), {
      expirationTtl: 900,
    });
  } catch (e) { /* KV unavailable */ }
  return c.json(response);
});
