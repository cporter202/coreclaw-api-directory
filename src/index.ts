import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import type { Env } from "./types";
import { workerRoutes } from "./api/workers";
import { categoryRoutes } from "./api/categories";
import { searchRoutes } from "./api/search";
import { recommendRoutes } from "./api/recommend";
import { compareRoutes } from "./api/compare";
import { analyticsRoutes } from "./api/analytics";
import { staticRoutes } from "./static";
import { seedDatabase } from "./seed";

const app = new Hono<{ Bindings: Env }>();

app.use("*", logger());
app.use("*", cors());
app.use("/api/*", prettyJSON());

// Seed database on first request
let seeded = false;
app.use("*", async (c, next) => {
  if (!seeded && c.env.ENVIRONMENT === "development") {
    try {
      await seedDatabase(c.env.DB);
      seeded = true;
    } catch (e) {
      console.error("Seed error:", e);
    }
  }
  await next();
});

app.route("/api/v1/workers", workerRoutes);
app.route("/api/v1/categories", categoryRoutes);
app.route("/api/v1/search", searchRoutes);
app.route("/api/v1/recommend", recommendRoutes);
app.route("/api/v1/compare", compareRoutes);
app.route("/api/v1/analytics", analyticsRoutes);
app.route("/", staticRoutes);

app.get("/api/v1/directory", async (c) => {
  const page = parseInt(c.req.query("page") || "1");
  const limit = Math.min(parseInt(c.req.query("limit") || "50"), 200);
  const category = c.req.query("category");
  const sort = c.req.query("sort") || "name";
  const offset = (page - 1) * limit;

  const cacheKey = `directory:${category || "all"}:${sort}:${page}:${limit}`;
  try {
    const cached = await c.env.KV.get(cacheKey, "json");
    if (cached) return c.json(cached);
  } catch (e) { /* KV unavailable */ }

  let query = "SELECT * FROM workers";
  let countQuery = "SELECT COUNT(*) as total FROM workers";
  const params: any[] = [];

  if (category) {
    query += " WHERE category = ?";
    countQuery += " WHERE category = ?";
    params.push(category);
  }

  const orderMap: Record<string, string> = {
    name: "name ASC",
    recent: "created_at DESC",
    health: "health_score DESC",
    stars: "github_stars DESC",
  };
  query += ` ORDER BY ${orderMap[sort] || "name ASC"}`;
  query += " LIMIT ? OFFSET ?";

  const [workers, countResult] = await Promise.all([
    c.env.DB.prepare(query)
      .bind(...params, limit, offset)
      .all(),
    c.env.DB.prepare(countQuery)
      .bind(...params)
      .first<{ total: number }>(),
  ]);

  const total = countResult?.total || 0;
  const result = {
    data: workers.results,
    meta: {
      total,
      page,
      pages: Math.ceil(total / limit),
      limit,
    },
  };

  try {
    await c.env.KV.put(cacheKey, JSON.stringify(result), { expirationTtl: 3600 });
  } catch (e) { /* KV unavailable */ }
  return c.json(result);
});

app.get("/health", (c) => c.json({ status: "ok", env: c.env.ENVIRONMENT }));

app.notFound((c) =>
  c.json({ error: "Not Found", status: 404 }, 404)
);

app.onError((err, c) => {
  console.error("Unhandled error:", err);
  return c.json({ error: "Internal Server Error", status: 500 }, 500);
});

export default app;
