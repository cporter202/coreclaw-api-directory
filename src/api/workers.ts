import { Hono } from "hono";
import type { Env } from "../types";

export const workerRoutes = new Hono<{ Bindings: Env }>();

workerRoutes.get("/", async (c) => {
  const page = parseInt(c.req.query("page") || "1");
  const limit = Math.min(parseInt(c.req.query("limit") || "20"), 100);
  const category = c.req.query("category");
  const offset = (page - 1) * limit;

  let query = "SELECT * FROM workers";
  let countQuery = "SELECT COUNT(*) as total FROM workers";
  const params: any[] = [];

  if (category) {
    query += " WHERE category = ?";
    countQuery += " WHERE category = ?";
    params.push(category);
  }

  query += " ORDER BY name ASC LIMIT ? OFFSET ?";

  const [workers, countResult] = await Promise.all([
    c.env.DB.prepare(query)
      .bind(...params, limit, offset)
      .all(),
    c.env.DB.prepare(countQuery)
      .bind(...params)
      .first<{ total: number }>(),
  ]);

  return c.json({
    data: workers.results,
    meta: {
      total: countResult?.total || 0,
      page,
      pages: Math.ceil((countResult?.total || 0) / limit),
      limit,
    },
  });
});

workerRoutes.get("/:slug", async (c) => {
  const slug = c.req.param("slug");

  const cacheKey = `worker:${slug}`;
  let cached: any = null;
  try { cached = await c.env.KV.get(cacheKey, "json"); } catch (e) { /* KV unavailable */ }
  if (cached) return c.json(cached);

  const worker = await c.env.DB.prepare(
    "SELECT * FROM workers WHERE slug = ?"
  )
    .bind(slug)
    .first();

  if (!worker) {
    return c.json({ error: "Worker not found", status: 404 }, 404);
  }

  try {
    await c.env.KV.put(cacheKey, JSON.stringify(worker), {
      expirationTtl: 3600,
    });
  } catch (e) { /* KV unavailable */ }
  return c.json(worker);
});

workerRoutes.get("/:slug/summary", async (c) => {
  const slug = c.req.param("slug");

  const cacheKey = `worker:${slug}:summary`;
  let cached: any = null;
  try { cached = await c.env.KV.get(cacheKey, "json"); } catch (e) { /* KV unavailable */ }
  if (cached) return c.json(cached);

  const worker = await c.env.DB.prepare(
    "SELECT slug, name, category, token_summary, health_score FROM workers WHERE slug = ?"
  )
    .bind(slug)
    .first();

  if (!worker) {
    return c.json({ error: "Worker not found", status: 404 }, 404);
  }

  try {
    await c.env.KV.put(cacheKey, JSON.stringify(worker), {
      expirationTtl: 3600,
    });
  } catch (e) { /* KV unavailable */ }
  return c.json(worker);
});
