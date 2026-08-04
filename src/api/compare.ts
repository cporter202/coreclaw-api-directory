import { Hono } from "hono";
import type { Env } from "../types";

export const compareRoutes = new Hono<{ Bindings: Env }>();

compareRoutes.get("/", async (c) => {
  const workersParam = c.req.query("workers");

  if (!workersParam) {
    return c.json(
      { error: "workers parameter required (comma-separated slugs)", status: 400 },
      400
    );
  }

  const slugs = workersParam
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (slugs.length < 2) {
    return c.json(
      { error: "At least 2 workers required for comparison", status: 400 },
      400
    );
  }

  if (slugs.length > 5) {
    return c.json(
      { error: "Maximum 5 workers for comparison", status: 400 },
      400
    );
  }

  const cacheKey = `compare:${slugs.sort().join(",")}`;
  let cached: any = null;
  try { cached = await c.env.KV.get(cacheKey, "json"); } catch (e) { /* KV unavailable */ }
  if (cached) return c.json(cached);

  const placeholders = slugs.map(() => "?").join(",");
  const workers = await c.env.DB.prepare(
    `SELECT * FROM workers WHERE slug IN (${placeholders})`
  )
    .bind(...slugs)
    .all();

  if (workers.results.length < 2) {
    return c.json(
      { error: "Could not find enough workers to compare", status: 404 },
      404
    );
  }

  const response = {
    workers: workers.results,
    comparison: {
      categories: [...new Set(workers.results.map((w: any) => w.category))],
      health_scores: workers.results.map((w: any) => ({
        slug: w.slug,
        name: w.name,
        health_score: w.health_score,
      })),
    },
    meta: {
      compared: workers.results.length,
      requested: slugs.length,
    },
  };

  try {
    await c.env.KV.put(cacheKey, JSON.stringify(response), {
      expirationTtl: 3600,
    });
  } catch (e) { /* KV unavailable */ }
  return c.json(response);
});
