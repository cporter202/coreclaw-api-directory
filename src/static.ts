import { Hono } from "hono";
import { html } from "hono/html";
import type { Env } from "./types";

export const staticRoutes = new Hono<{ Bindings: Env }>();

staticRoutes.get("/workers/:slug", async (c) => {
  const slug = c.req.param("slug");
  const worker = await c.env.DB.prepare(
    "SELECT * FROM workers WHERE slug = ?"
  ).bind(slug).first();

  if (!worker) {
    return c.html(html`<!DOCTYPE html><html><head><title>Not Found</title></head><body><h1>Worker not found</h1><a href="/">Back to directory</a></body></html>`, 404);
  }

  const w = worker as any;
  const related = await c.env.DB.prepare(
    "SELECT slug, name, category, health_score FROM workers WHERE category = ? AND slug != ? ORDER BY health_score DESC LIMIT 4"
  ).bind(w.category, slug).all();

  const relatedJson = JSON.stringify(related.results.map((r: any) => ({ slug: r.slug, name: r.name, category: r.category })));

  return c.html(html`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${w.name} — CoreClaw Directory</title>
  <meta name="description" content="${(w.description || '').slice(0, 160)}">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🔧</text></svg>">
  <style>
    :root { --primary:#6366f1; --primary-hover:#4f46e5; --primary-light:#eef2ff; --accent:#06b6d4; --bg:#fff; --bg-secondary:#f8fafc; --bg-tertiary:#f1f5f9; --text:#0f172a; --text-secondary:#64748b; --text-muted:#94a3b8; --border:#e2e8f0; --success:#10b981; --shadow-md:0 4px 6px -1px rgba(0,0,0,.07); --radius:12px; --radius-sm:8px; }
    @media(prefers-color-scheme:dark){:root{--bg:#0f172a;--bg-secondary:#1e293b;--bg-tertiary:#334155;--text:#f1f5f9;--text-secondary:#94a3b8;--text-muted:#64748b;--border:#334155;--primary-light:#1e1b4b}}
    *{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:var(--text);background:var(--bg);line-height:1.6}
    a{color:var(--primary);text-decoration:none}a:hover{color:var(--primary-hover)}
    .container{max-width:800px;margin:0 auto;padding:0 1.5rem}
    header{border-bottom:1px solid var(--border);padding:.875rem 0;background:var(--bg)}
    .header-content{display:flex;align-items:center;justify-content:space-between}
    .logo{font-size:1.25rem;font-weight:800;color:var(--primary)}.logo span{background:linear-gradient(135deg,var(--primary),var(--accent));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
    nav a{color:var(--text-secondary);font-size:.9rem;font-weight:500;margin-left:1.5rem}
    .breadcrumb{padding:1.25rem 0;font-size:.85rem;color:var(--text-muted)}
    .breadcrumb a{color:var(--text-muted)}.breadcrumb a:hover{color:var(--primary)}
    .worker-detail{padding:2rem 0 4rem}
    .worker-detail h1{font-size:2rem;font-weight:800;margin-bottom:.5rem}
    .meta-row{display:flex;gap:1rem;align-items:center;margin-bottom:1rem;flex-wrap:wrap}
    .badge{font-size:.8rem;font-weight:600;padding:.25rem .75rem;border-radius:99px}
    .badge-health{color:var(--success);background:rgba(16,185,129,.1)}
    .badge-cat{color:var(--primary);background:var(--primary-light)}
    .desc{font-size:1.05rem;color:var(--text-secondary);margin-bottom:2rem;line-height:1.7}
    .cta-btn{display:inline-block;padding:.875rem 2rem;background:var(--primary);color:#fff;border-radius:var(--radius-sm);font-weight:600;font-size:1rem;transition:background .15s;margin-bottom:2rem}
    .cta-btn:hover{background:var(--primary-hover);color:#fff}
    .token-summary{background:var(--bg-secondary);border:1px solid var(--border);border-radius:var(--radius);padding:1.25rem;margin-bottom:2rem}
    .token-summary h3{font-size:.85rem;font-weight:600;color:var(--text-muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:.5rem}
    .token-summary p{font-size:.95rem;color:var(--text)}
    .related{margin-top:2rem}
    .related h2{font-size:1.25rem;font-weight:700;margin-bottom:1rem}
    .related-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:.75rem}
    .related-card{display:block;padding:1rem;border:1px solid var(--border);border-radius:var(--radius-sm);transition:all .2s;background:var(--bg)}
    .related-card:hover{border-color:var(--primary);box-shadow:var(--shadow-md)}
    .related-card strong{display:block;font-size:.9rem;margin-bottom:.25rem;color:var(--text)}
    .tag{font-size:.7rem;background:var(--primary-light);color:var(--primary);padding:.15rem .5rem;border-radius:99px;font-weight:500}
    footer{padding:2rem 0;text-align:center;color:var(--text-muted);border-top:1px solid var(--border);font-size:.85rem}
  </style>
</head>
<body>
  <header><div class="container header-content"><a href="/" class="logo">CoreClaw<span>Directory</span></a><nav><a href="/api/v1/directory">API</a><a href="/">Home</a></nav></div></header>
  <div class="container">
    <div class="breadcrumb"><a href="/">Directory</a> / <a href="/api/v1/directory?category=${w.category}">${w.category}</a> / ${w.name}</div>
    <div class="worker-detail">
      <h1>${w.name}</h1>
      <div class="meta-row">
        <span class="badge badge-cat">${w.category}</span>
        <span class="badge badge-health">${w.health_score}% health</span>
      </div>
      <p class="desc">${w.description}</p>
      ${w.token_summary ? html`<div class="token-summary"><h3>Token-Optimized Summary</h3><p>${w.token_summary}</p></div>` : html``}
      <a href="${w.affiliate_url || w.url}" target="_blank" rel="noopener" class="cta-btn">Try on CoreClaw &rarr;</a>
      <div id="relatedContainer"></div>
    </div>
  </div>
  <footer><div class="container">Built with <strong>CoreClaw Workers</strong> &middot; <a href="/">Directory</a></div></footer>
  <script>
    const related = ${relatedJson};
    if (related.length > 0) {
      document.getElementById('relatedContainer').innerHTML =
        '<div class="related"><h2>Related Workers</h2><div class="related-grid">' +
        related.map(r => '<a href="/workers/' + r.slug + '" class="related-card"><strong>' + r.name + '</strong><span class="tag">' + r.category + '</span></a>').join('') +
        '</div></div>';
    }
  </script>
</body>
</html>`);
});

staticRoutes.get("/llms.txt", (c) => {
  const content = `# CoreClaw API Directory — AI-Optimized Description

> A comprehensive directory of 118 CoreClaw Workers across 11 categories for AI agents, automation workflows, and agentic systems.

## Available Resources
- [Directory Index](https://api.coreclaw.dev/v1/directory) — Full catalog with structured metadata
- [Category Browsing](https://api.coreclaw.dev/v1/categories) — Browse by category
- [Search](https://api.coreclaw.dev/v1/search?q=) — Query workers by capability
- [Individual Workers](https://api.coreclaw.dev/v1/workers/{slug}) — Detailed worker information
- [Recommendations](https://api.coreclaw.dev/v1/recommend) — AI-powered worker recommendations

## For AI Agents
- Machine-readable API at /api/v1/
- Structured data available in JSON
- Token-optimized summaries for each worker
- Bulk retrieval endpoints for complete catalog

## Categories
- Communication — Email, SMS, Push Notifications, Chat
- Data — Databases, Caching, Search, Analytics
- Automation — Workflow Engines, Scheduling, Event Processing
- Security — Authentication, Authorization, Encryption
- DevTools — Testing, Deployment, Monitoring
- AI/ML — LLM APIs, Image Processing, NLP
- Payments — Payment Processing, Subscriptions
- Storage — File Storage, CDN, Backup
- Productivity — Project Management, Collaboration
- Marketing — SEO, Analytics, Campaigns
- Utilities — Text Processing, Date/Time, Validation

## Contact
- GitHub: https://github.com/cporter202/coreclaw-api-directory
- API: https://api.coreclaw.dev/v1/
`;
  return c.text(content, 200, { "Content-Type": "text/plain; charset=utf-8" });
});

staticRoutes.get("/robots.txt", (c) => {
  const content = `# Robots.txt for CoreClaw API Directory

User-agent: GPTBot
Allow: /api/v1/
Allow: /llms.txt
Disallow: /admin/
Crawl-delay: 5

User-agent: ClaudeBot
Allow: /api/v1/
Allow: /llms.txt
Disallow: /admin/
Crawl-delay: 5

User-agent: Google-Extended
Allow: /api/v1/
Allow: /llms.txt
Disallow: /admin/
Crawl-delay: 10

User-agent: PerplexityBot
Allow: /api/v1/
Allow: /llms.txt
Disallow: /admin/
Crawl-delay: 3

User-agent: *
Allow: /
Disallow: /admin/

Sitemap: https://api.coreclaw.dev/sitemap.xml
`;
  return c.text(content, 200, { "Content-Type": "text/plain; charset=utf-8" });
});

staticRoutes.get("/sitemap.xml", async (c) => {
  const workers = await c.env.DB.prepare(
    "SELECT slug, updated_at FROM workers ORDER BY updated_at DESC"
  ).all();

  const categories = await c.env.DB.prepare(
    "SELECT slug FROM categories ORDER BY name ASC"
  ).all();

  const baseUrl = "https://api.coreclaw.dev";

  const workerUrls = workers.results
    .map(
      (w: any) => `  <url>
    <loc>${baseUrl}/directory/workers/${w.slug}</loc>
    <lastmod>${w.updated_at || new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join("\n");

  const categoryUrls = categories.results
    .map(
      (cat: any) => `  <url>
    <loc>${baseUrl}/directory/${cat.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/directory</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/directory</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
${categoryUrls}
${workerUrls}
</urlset>`;

  return c.text(xml, 200, { "Content-Type": "application/xml" });
});

staticRoutes.get("/", async (c) => {
  const topWorkers = await c.env.DB.prepare(
    "SELECT slug, name, category, description, health_score FROM workers ORDER BY health_score DESC LIMIT 6"
  ).all();

  const workerCards = topWorkers.results
    .map(
      (w: any) => `
    <div class="worker-card" data-category="${w.category}">
      <div class="worker-header">
        <h3><a href="/workers/${w.slug}">${w.name}</a></h3>
        <span class="health-badge" title="Health Score">${w.health_score}%</span>
      </div>
      <span class="category-tag">${w.category}</span>
      <p>${w.description.slice(0, 120)}${w.description.length > 120 ? '...' : ''}</p>
    </div>`
    )
    .join("");

  return c.html(html`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CoreClaw API Directory — 118 Developer Tools & Web Scrapers</title>
  <meta name="description" content="Browse 118 CoreClaw Workers across 11 categories. AI-powered search, comparison, and recommendations for developer tools, scrapers, and automation APIs.">
  <meta name="keywords" content="API directory, developer tools, CoreClaw, web scraping, automation, data extraction">
  <meta property="og:title" content="CoreClaw API Directory">
  <meta property="og:description" content="118 developer tools. AI-powered search and recommendations.">
  <meta property="og:type" content="website">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🔧</text></svg>">
  <style>
    :root {
      --primary: #6366f1;
      --primary-hover: #4f46e5;
      --primary-light: #eef2ff;
      --accent: #06b6d4;
      --bg: #ffffff;
      --bg-secondary: #f8fafc;
      --bg-tertiary: #f1f5f9;
      --text: #0f172a;
      --text-secondary: #64748b;
      --text-muted: #94a3b8;
      --border: #e2e8f0;
      --border-hover: #cbd5e1;
      --success: #10b981;
      --warning: #f59e0b;
      --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
      --shadow-md: 0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -2px rgba(0,0,0,0.05);
      --shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -4px rgba(0,0,0,0.04);
      --radius: 12px;
      --radius-sm: 8px;
    }
    @media (prefers-color-scheme: dark) {
      :root {
        --bg: #0f172a;
        --bg-secondary: #1e293b;
        --bg-tertiary: #334155;
        --text: #f1f5f9;
        --text-secondary: #94a3b8;
        --text-muted: #64748b;
        --border: #334155;
        --border-hover: #475569;
        --primary-light: #1e1b4b;
        --shadow-sm: 0 1px 2px rgba(0,0,0,0.3);
        --shadow-md: 0 4px 6px rgba(0,0,0,0.3);
        --shadow-lg: 0 10px 15px rgba(0,0,0,0.4);
      }
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', sans-serif; color: var(--text); background: var(--bg); line-height: 1.6; }
    a { color: var(--primary); text-decoration: none; }
    a:hover { color: var(--primary-hover); }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }

    header { border-bottom: 1px solid var(--border); padding: 0.875rem 0; position: sticky; top: 0; background: var(--bg); z-index: 100; backdrop-filter: blur(8px); background: rgba(255,255,255,0.9); }
    @media (prefers-color-scheme: dark) { header { background: rgba(15,23,42,0.9); } }
    .header-content { display: flex; align-items: center; justify-content: space-between; }
    .logo { font-size: 1.35rem; font-weight: 800; color: var(--primary); display: flex; align-items: center; gap: 0.5rem; }
    .logo span { background: linear-gradient(135deg, var(--primary), var(--accent)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    nav { display: flex; gap: 1.5rem; }
    nav a { color: var(--text-secondary); font-size: 0.9rem; font-weight: 500; transition: color 0.15s; }
    nav a:hover { color: var(--primary); }

    .hero { padding: 5rem 0 4rem; text-align: center; background: linear-gradient(180deg, var(--primary-light) 0%, var(--bg) 100%); }
    .hero h1 { font-size: clamp(2rem, 5vw, 3.25rem); font-weight: 800; margin-bottom: 0.75rem; letter-spacing: -0.02em; line-height: 1.15; }
    .hero h1 em { font-style: normal; background: linear-gradient(135deg, var(--primary), var(--accent)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .hero p { font-size: 1.15rem; color: var(--text-secondary); margin-bottom: 2.5rem; max-width: 550px; margin-left: auto; margin-right: auto; }

    .search-container { max-width: 640px; margin: 0 auto; position: relative; }
    .search-box { display: flex; box-shadow: var(--shadow-lg); border-radius: var(--radius); overflow: hidden; }
    .search-box input { flex: 1; padding: 1rem 1.25rem; border: 2px solid var(--border); border-right: none; font-size: 1rem; background: var(--bg); color: var(--text); outline: none; border-radius: var(--radius) 0 0 var(--radius); transition: border-color 0.15s; }
    .search-box input:focus { border-color: var(--primary); }
    .search-box button { padding: 1rem 1.75rem; background: var(--primary); color: white; border: none; cursor: pointer; font-size: 0.95rem; font-weight: 600; transition: background 0.15s; white-space: nowrap; }
    .search-box button:hover { background: var(--primary-hover); }
    .search-results { position: absolute; top: 100%; left: 0; right: 0; background: var(--bg); border: 1px solid var(--border); border-radius: 0 0 var(--radius) var(--radius); box-shadow: var(--shadow-lg); display: none; z-index: 50; max-height: 400px; overflow-y: auto; }
    .search-results.active { display: block; }
    .search-result-item { padding: 0.75rem 1.25rem; border-bottom: 1px solid var(--border); cursor: pointer; transition: background 0.1s; }
    .search-result-item:last-child { border-bottom: none; }
    .search-result-item:hover { background: var(--bg-secondary); }
    .search-result-item h4 { font-size: 0.95rem; font-weight: 600; margin-bottom: 0.15rem; }
    .search-result-item p { font-size: 0.8rem; color: var(--text-secondary); margin: 0; }
    .search-result-item .tag { font-size: 0.7rem; background: var(--primary-light); color: var(--primary); padding: 0.1rem 0.5rem; border-radius: 99px; margin-left: 0.5rem; font-weight: 500; }

    .stats { display: flex; justify-content: center; gap: 3rem; margin-top: 3rem; }
    .stat { text-align: center; }
    .stat-number { font-size: 2.5rem; font-weight: 800; background: linear-gradient(135deg, var(--primary), var(--accent)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .stat-label { color: var(--text-muted); font-size: 0.85rem; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em; }

    .featured { padding: 4rem 0; }
    .section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 2rem; }
    .section-header h2 { font-size: 1.75rem; font-weight: 700; }
    .section-header a { font-size: 0.9rem; font-weight: 500; }
    .worker-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 1rem; }
    .worker-card { background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.25rem; transition: all 0.2s; }
    .worker-card:hover { border-color: var(--primary); box-shadow: var(--shadow-md); transform: translateY(-1px); }
    .worker-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem; }
    .worker-header h3 { font-size: 1rem; font-weight: 600; }
    .worker-header h3 a { color: var(--text); }
    .worker-header h3 a:hover { color: var(--primary); }
    .health-badge { font-size: 0.75rem; font-weight: 600; color: var(--success); background: rgba(16,185,129,0.1); padding: 0.2rem 0.5rem; border-radius: 99px; white-space: nowrap; }
    .category-tag { display: inline-block; font-size: 0.7rem; font-weight: 500; color: var(--primary); background: var(--primary-light); padding: 0.15rem 0.6rem; border-radius: 99px; margin-bottom: 0.5rem; text-transform: capitalize; }
    .worker-card p { font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; }

    .categories { padding: 4rem 0; background: var(--bg-secondary); }
    .categories h2 { text-align: center; margin-bottom: 0.5rem; font-size: 1.75rem; font-weight: 700; }
    .categories .subtitle { text-align: center; color: var(--text-secondary); margin-bottom: 2.5rem; }
    .category-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1rem; }
    .category-card { background: var(--bg); padding: 1.5rem; border-radius: var(--radius); border: 1px solid var(--border); text-decoration: none; color: inherit; transition: all 0.2s; display: block; }
    .category-card:hover { border-color: var(--primary); box-shadow: var(--shadow-md); transform: translateY(-2px); }
    .category-icon { font-size: 1.75rem; margin-bottom: 0.75rem; }
    .category-card h3 { font-size: 1rem; font-weight: 600; margin-bottom: 0.25rem; }
    .category-card .count { font-size: 0.85rem; color: var(--primary); font-weight: 600; }
    .category-card p { color: var(--text-secondary); font-size: 0.8rem; margin-top: 0.5rem; line-height: 1.4; }

    .api-section { padding: 4rem 0; }
    .api-section h2 { text-align: center; margin-bottom: 0.5rem; font-size: 1.75rem; font-weight: 700; }
    .api-section .subtitle { text-align: center; color: var(--text-secondary); margin-bottom: 2.5rem; }
    .api-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; }
    .api-card { background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.5rem; }
    .api-card h3 { font-size: 1rem; font-weight: 600; margin-bottom: 0.5rem; font-family: 'SF Mono', 'Fira Code', monospace; color: var(--primary); }
    .api-card p { font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.75rem; }
    .api-card code { font-size: 0.8rem; background: var(--bg-tertiary); padding: 0.15rem 0.5rem; border-radius: 4px; color: var(--text-secondary); display: inline-block; }

    footer { padding: 2.5rem 0; text-align: center; color: var(--text-muted); border-top: 1px solid var(--border); font-size: 0.85rem; }
    footer a { color: var(--text-secondary); font-weight: 500; }

    @media (max-width: 768px) {
      .stats { gap: 1.5rem; }
      .stat-number { font-size: 2rem; }
      .worker-grid { grid-template-columns: 1fr; }
      .api-grid { grid-template-columns: 1fr; }
      nav { gap: 1rem; }
    }
  </style>
</head>
<body>
  <header>
    <div class="container header-content">
      <a href="/" class="logo">CoreClaw<span>Directory</span></a>
      <nav>
        <a href="/api/v1/directory">API</a>
        <a href="/llms.txt">For AI</a>
        <a href="https://github.com/cporter202/coreclaw-api-directory">GitHub</a>
      </nav>
    </div>
  </header>

  <section class="hero">
    <div class="container">
      <h1>118 Developer APIs.<br><em>One Directory.</em></h1>
      <p>Search, compare, and discover CoreClaw Workers for web scraping, data extraction, and automation — optimized for AI agents.</p>
      <div class="search-container">
        <form class="search-box" action="/api/v1/search" method="get" id="searchForm">
          <input type="text" name="q" placeholder="Search workers (e.g., Instagram, Amazon, LinkedIn)..." required autocomplete="off" id="searchInput">
          <button type="submit">Search</button>
        </form>
        <div class="search-results" id="searchResults"></div>
      </div>
      <div class="stats">
        <div class="stat">
          <div class="stat-number" id="workerCount">118</div>
          <div class="stat-label">Workers</div>
        </div>
        <div class="stat">
          <div class="stat-number">11</div>
          <div class="stat-label">Categories</div>
        </div>
        <div class="stat">
          <div class="stat-number">Free</div>
          <div class="stat-label">To Use</div>
        </div>
      </div>
    </div>
  </section>

  <section class="featured">
    <div class="container">
      <div class="section-header">
        <h2>Top Workers</h2>
        <a href="/api/v1/directory">View all &rarr;</a>
      </div>
      <div class="worker-grid">${workerCards}</div>
    </div>
  </section>

  <section class="categories">
    <div class="container">
      <h2>Browse by Category</h2>
      <p class="subtitle">Find the right tool for your workflow</p>
      <div class="category-grid" id="categories">Loading...</div>
    </div>
  </section>

  <section class="api-section">
    <div class="container">
      <h2>Developer API</h2>
      <p class="subtitle">RESTful endpoints optimized for AI agents and automation</p>
      <div class="api-grid">
        <div class="api-card">
          <h3>GET /api/v1/directory</h3>
          <p>List all workers with pagination, filtering, and sorting.</p>
          <code>?page=1&amp;limit=50&amp;category=social&amp;sort=health</code>
        </div>
        <div class="api-card">
          <h3>GET /api/v1/search</h3>
          <p>Search workers by name, description, or category.</p>
          <code>?q=instagram&amp;category=social</code>
        </div>
        <div class="api-card">
          <h3>GET /api/v1/workers/:slug</h3>
          <p>Get detailed information about a specific worker.</p>
          <code>/api/v1/workers/instagram-profile-scraper</code>
        </div>
        <div class="api-card">
          <h3>POST /api/v1/recommend</h3>
          <p>AI-powered worker recommendations based on your use case.</p>
          <code>{"use_case": "scrape prices", "budget": "free"}</code>
        </div>
        <div class="api-card">
          <h3>GET /api/v1/compare</h3>
          <p>Compare up to 5 workers side-by-side.</p>
          <code>?workers=worker-a,worker-b</code>
        </div>
        <div class="api-card">
          <h3>GET /api/v1/categories</h3>
          <p>List all categories with worker counts.</p>
          <code>/api/v1/categories</code>
        </div>
      </div>
    </div>
  </section>

  <footer>
    <div class="container">
      <p>Built with <strong>CoreClaw Workers</strong> &middot; <a href="https://github.com/cporter202/coreclaw-api-directory">GitHub</a> &middot; <a href="/llms.txt">AI Docs</a> &middot; <a href="/sitemap.xml">Sitemap</a></p>
    </div>
  </footer>

  <script>
    const categories = [
      { slug: "e-commerce", name: "E-Commerce & Marketplaces", icon: "🛍️", desc: "Amazon, eBay, Shopify, Walmart, TikTok Shop" },
      { slug: "social", name: "Social & Creator Data", icon: "🌐", desc: "Instagram, TikTok, Twitter, YouTube, Reddit" },
      { slug: "search", name: "Search, Maps & SEO", icon: "🔎", desc: "Google SERPs, Maps, Yelp, Bing" },
      { slug: "jobs", name: "Jobs & Recruiting", icon: "💼", desc: "LinkedIn, Indeed, Glassdoor, ZipRecruiter" },
      { slug: "leads", name: "Lead Generation", icon: "🎯", desc: "Company data, emails, contacts, WHOIS" },
      { slug: "ai-research", name: "AI & Research", icon: "✨", desc: "Scholar, arXiv, PubMed, AI answers" },
      { slug: "devtools", name: "Developer Utilities", icon: "🧰", desc: "SEO audit, screenshots, QR codes, IP lookup" },
      { slug: "finance", name: "Finance & Markets", icon: "📈", desc: "Stocks, crypto, forex, SEC filings" },
      { slug: "real-estate", name: "Real Estate", icon: "🏠", desc: "Zillow, Redfin, Airbnb, property data" },
      { slug: "education", name: "Education & Knowledge", icon: "📚", desc: "Courses, books, certifications" },
      { slug: "news", name: "News & Media", icon: "📰", desc: "BBC, NYT, TechCrunch, Hacker News" }
    ];

    document.getElementById('categories').innerHTML = categories.map(c =>
      '<a href="/api/v1/directory?category=' + c.slug + '" class="category-card">' +
      '<div class="category-icon">' + c.icon + '</div>' +
      '<h3>' + c.name + '</h3>' +
      '<p>' + c.desc + '</p>' +
      '</a>'
    ).join('');

    let searchTimeout;
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    searchInput.addEventListener('input', function() {
      clearTimeout(searchTimeout);
      const q = this.value.trim();
      if (q.length < 2) { searchResults.classList.remove('active'); return; }
      searchTimeout = setTimeout(() => {
        fetch('/api/v1/search?q=' + encodeURIComponent(q) + '&limit=5')
          .then(r => r.json())
          .then(data => {
            if (!data.results || data.results.length === 0) {
              searchResults.innerHTML = '<div class="search-result-item"><p>No results found</p></div>';
            } else {
              searchResults.innerHTML = data.results.map(w =>
                '<a href="/workers/' + w.slug + '" class="search-result-item">' +
                '<h4>' + w.name + ' <span class="tag">' + w.category + '</span></h4>' +
                '<p>' + (w.description || '').slice(0, 80) + '...</p>' +
                '</a>'
              ).join('');
            }
            searchResults.classList.add('active');
          });
      }, 300);
    });

    document.addEventListener('click', function(e) {
      if (!e.target.closest('.search-container')) searchResults.classList.remove('active');
    });

    fetch('/api/v1/directory?limit=1').then(r => r.json()).then(d => {
      if (d.meta && d.meta.total) document.getElementById('workerCount').textContent = d.meta.total;
    });
  </script>
</body>
</html>`);
});
