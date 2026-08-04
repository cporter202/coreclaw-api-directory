import { Hono } from "hono";
import type { Env } from "../types";

export const categoryRoutes = new Hono<{ Bindings: Env }>();

categoryRoutes.get("/", async (c) => {
  const cacheKey = "categories:all";
  let cached: any = null;
  try { cached = await c.env.KV.get(cacheKey, "json"); } catch (e) { /* KV unavailable */ }
  if (cached) return c.json(cached);

  const categories = await c.env.DB.prepare(
    "SELECT * FROM categories ORDER BY name ASC"
  ).all();

  try {
    await c.env.KV.put(cacheKey, JSON.stringify(categories.results), {
      expirationTtl: 3600,
    });
  } catch (e) { /* KV unavailable */ }
  return c.json(categories.results);
});

categoryRoutes.get("/:slug", async (c) => {
  const slug = c.req.param("slug");

  const cacheKey = `category:${slug}`;
  let cached: any = null;
  try { cached = await c.env.KV.get(cacheKey, "json"); } catch (e) { /* KV unavailable */ }
  if (cached) return c.json(cached);

  const category = await c.env.DB.prepare(
    "SELECT * FROM categories WHERE slug = ?"
  )
    .bind(slug)
    .first();

  if (!category) {
    return c.json({ error: "Category not found", status: 404 }, 404);
  }

  try {
    await c.env.KV.put(cacheKey, JSON.stringify(category), {
      expirationTtl: 3600,
    });
  } catch (e) { /* KV unavailable */ }
  return c.json(category);
});

categoryRoutes.get("/:slug/workers", async (c) => {
  const slug = c.req.param("slug");
  const page = parseInt(c.req.query("page") || "1");
  const limit = Math.min(parseInt(c.req.query("limit") || "20"), 100);
  const offset = (page - 1) * limit;

  const cacheKey = `category:${slug}:workers:${page}:${limit}`;
  let cached: any = null;
  try { cached = await c.env.KV.get(cacheKey, "json"); } catch (e) { /* KV unavailable */ }
  if (cached) return c.json(cached);

  const [workers, countResult] = await Promise.all([
    c.env.DB.prepare(
      "SELECT * FROM workers WHERE category = ? ORDER BY name ASC LIMIT ? OFFSET ?"
    )
      .bind(slug, limit, offset)
      .all(),
    c.env.DB.prepare(
      "SELECT COUNT(*) as total FROM workers WHERE category = ?"
    )
      .bind(slug)
      .first<{ total: number }>(),
  ]);

  const result = {
    data: workers.results,
    meta: {
      total: countResult?.total || 0,
      page,
      pages: Math.ceil((countResult?.total || 0) / limit),
      limit,
    },
  };

  try {
    await c.env.KV.put(cacheKey, JSON.stringify(result), {
      expirationTtl: 3600,
    });
  } catch (e) { /* KV unavailable */ }
  return c.json(result);
});
