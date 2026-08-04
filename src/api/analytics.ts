import { Hono } from "hono";
import type { Env } from "../types";

export const analyticsRoutes = new Hono<{ Bindings: Env }>();

// Track affiliate click
analyticsRoutes.post("/click", async (c) => {
  const body = await c.req.json<{
    worker_slug: string;
    worker_name: string;
    category: string;
    referrer?: string;
    user_agent?: string;
  }>();

  const click = {
    timestamp: new Date().toISOString(),
    worker_slug: body.worker_slug,
    worker_name: body.worker_name,
    category: body.category,
    referrer: body.referrer || c.req.header("referer") || "direct",
    user_agent: c.req.header("user-agent") || "unknown",
    ip: c.req.header("cf-connecting-ip") || "unknown",
  };

  // Store click in D1
  try {
    await c.env.DB.prepare(`
      INSERT INTO affiliate_clicks (timestamp, worker_slug, worker_name, category, referrer, user_agent, ip)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(
      click.timestamp,
      click.worker_slug,
      click.worker_name,
      click.category,
      click.referrer,
      click.user_agent,
      click.ip
    ).run();
  } catch (e) {
    console.error("Click tracking error:", e);
  }

  return c.json({ success: true });
});

// Get click analytics
analyticsRoutes.get("/clicks", async (c) => {
  const period = c.req.query("period") || "7d";
  const limit = parseInt(c.req.query("limit") || "100");

  let dateFilter = "";
  if (period === "24h") {
    dateFilter = "AND timestamp >= datetime('now', '-1 day')";
  } else if (period === "7d") {
    dateFilter = "AND timestamp >= datetime('now', '-7 days')";
  } else if (period === "30d") {
    dateFilter = "AND timestamp >= datetime('now', '-30 days')";
  }

  // Top clicked workers
  const topWorkers = await c.env.DB.prepare(`
    SELECT worker_slug, worker_name, category, COUNT(*) as clicks
    FROM affiliate_clicks
    WHERE 1=1 ${dateFilter}
    GROUP BY worker_slug
    ORDER BY clicks DESC
    LIMIT ?
  `).bind(limit).all();

  // Top referrers
  const topReferrers = await c.env.DB.prepare(`
    SELECT referrer, COUNT(*) as clicks
    FROM affiliate_clicks
    WHERE 1=1 ${dateFilter}
    GROUP BY referrer
    ORDER BY clicks DESC
    LIMIT 20
  `).all();

  // Clicks by day
  const dailyClicks = await c.env.DB.prepare(`
    SELECT DATE(timestamp) as day, COUNT(*) as clicks
    FROM affiliate_clicks
    WHERE 1=1 ${dateFilter}
    GROUP BY day
    ORDER BY day DESC
  `).all();

  // Total clicks
  const total = await c.env.DB.prepare(`
    SELECT COUNT(*) as total
    FROM affiliate_clicks
    WHERE 1=1 ${dateFilter}
  `).first<{ total: number }>();

  return c.json({
    total: total?.total || 0,
    period,
    top_workers: topWorkers.results,
    top_referrers: topReferrers.results,
    daily_clicks: dailyClicks.results,
  });
});

// Get revenue estimate
analyticsRoutes.get("/revenue", async (c) => {
  const period = c.req.query("period") || "30d";

  let dateFilter = "";
  if (period === "7d") {
    dateFilter = "AND timestamp >= datetime('now', '-7 days')";
  } else if (period === "30d") {
    dateFilter = "AND timestamp >= datetime('now', '-30 days')";
  }

  const totalClicks = await c.env.DB.prepare(`
    SELECT COUNT(*) as total
    FROM affiliate_clicks
    WHERE 1=1 ${dateFilter}
  `).first<{ total: number }>();

  const uniqueVisitors = await c.env.DB.prepare(`
    SELECT COUNT(DISTINCT ip) as total
    FROM affiliate_clicks
    WHERE 1=1 ${dateFilter}
  `).first<{ total: number }>();

  // Industry benchmarks (conservative)
  const clicks = totalClicks?.total || 0;
  const visitors = uniqueVisitors?.total || 0;
  const clickRate = 0.02; // 2% CTR from directory to affiliate
  const conversionRate = 0.05; // 5% conversion on affiliate site
  const avgCommission = 15; // $15 per conversion

  const estimatedConversions = Math.floor(clicks * clickRate * conversionRate);
  const estimatedRevenue = estimatedConversions * avgCommission;

  return c.json({
    period,
    total_clicks: clicks,
    unique_visitors: visitors,
    estimates: {
      click_rate: `${(clickRate * 100).toFixed(1)}%`,
      conversion_rate: `${(conversionRate * 100).toFixed(1)}%`,
      avg_commission: `$${avgCommission}`,
      estimated_conversions: estimatedConversions,
      estimated_revenue: `$${estimatedRevenue}`,
      revenue_per_click: `$${(estimatedRevenue / Math.max(clicks, 1)).toFixed(2)}`,
    },
  });
});
