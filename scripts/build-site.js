#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const SITE_URL = "https://coreclaw.netlify.app";
const DOCS_DIR = path.join(__dirname, "..", "docs");
const WORKERS_DIR = path.join(DOCS_DIR, "workers");
const CATEGORIES_DIR = path.join(DOCS_DIR, "categories");
const DATA_FILE = path.join(DOCS_DIR, "data.json");

const CATEGORIES = [
  { slug: "e-commerce", name: "E-Commerce & Marketplaces", icon: "🛍️" },
  { slug: "social", name: "Social & Creator Data", icon: "🌐" },
  { slug: "search", name: "Search, Maps & SEO", icon: "🔎" },
  { slug: "jobs", name: "Jobs & Recruiting", icon: "💼" },
  { slug: "leads", name: "Lead Generation", icon: "🎯" },
  { slug: "ai-research", name: "AI & Research", icon: "✨" },
  { slug: "devtools", name: "Developer Utilities", icon: "🧰" },
  { slug: "finance", name: "Finance & Markets", icon: "📈" },
  { slug: "real-estate", name: "Real Estate", icon: "🏠" },
  { slug: "education", name: "Education & Knowledge", icon: "📚" },
  { slug: "news", name: "News & Media", icon: "📰" },
];

const CSS = `*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#F5F7FA;--surface:#FFFFFF;--surface2:#EDF1F7;--surface3:#E2E8F2;--ink:#0C1526;--ink2:#3E4A5C;--ink3:#76839A;--line:#E3E9F1;--line2:#C6D0DE;--accent:#0D9488;--accent2:#06B6D4;--accent-ink:#0F766E;--accent-soft:rgba(13,148,136,.1);--ok:#10B981;--warn:#F59E0B;--bad:#EF4444;--shadow-s:0 1px 2px rgba(12,21,38,.05),0 1px 3px rgba(12,21,38,.06);--shadow-m:0 4px 16px rgba(12,21,38,.08);--shadow-l:0 16px 44px rgba(12,21,38,.16);--radius:14px;--radius-s:9px;--font-d:"Space Grotesk","Inter",system-ui,sans-serif;--font-b:"Inter",system-ui,-apple-system,sans-serif;--font-m:"JetBrains Mono",ui-monospace,SFMono-Regular,Consolas,monospace;--grad:linear-gradient(135deg,#0D9488,#06B6D4)}
@media(prefers-color-scheme:dark){:root{--bg:#0A0F1C;--surface:#101826;--surface2:#182234;--surface3:#22304A;--ink:#EFF4FB;--ink2:#A9B6CC;--ink3:#6E7C96;--line:#1E2A3F;--line2:#2C3B55;--accent:#2DD4BF;--accent2:#22D3EE;--accent-ink:#5EEAD4;--accent-soft:rgba(45,212,191,.12);--ok:#34D399;--warn:#FBBF24;--bad:#F87171;--shadow-s:0 1px 2px rgba(0,0,0,.4);--shadow-m:0 4px 16px rgba(0,0,0,.4);--shadow-l:0 16px 44px rgba(0,0,0,.55)}}
[data-theme="dark"]{--bg:#0A0F1C;--surface:#101826;--surface2:#182234;--surface3:#22304A;--ink:#EFF4FB;--ink2:#A9B6CC;--ink3:#6E7C96;--line:#1E2A3F;--line2:#2C3B55;--accent:#2DD4BF;--accent2:#22D3EE;--accent-ink:#5EEAD4;--accent-soft:rgba(45,212,191,.12);--ok:#34D399;--warn:#FBBF24;--bad:#F87171;--shadow-s:0 1px 2px rgba(0,0,0,.4);--shadow-m:0 4px 16px rgba(0,0,0,.4);--shadow-l:0 16px 44px rgba(0,0,0,.55)}
[data-theme="light"]{--bg:#F5F7FA;--surface:#FFFFFF;--surface2:#EDF1F7;--surface3:#E2E8F2;--ink:#0C1526;--ink2:#3E4A5C;--ink3:#76839A;--line:#E3E9F1;--line2:#C6D0DE;--accent:#0D9488;--accent2:#06B6D4;--accent-ink:#0F766E;--accent-soft:rgba(13,148,136,.1);--ok:#10B981;--warn:#F59E0B;--bad:#EF4444;--shadow-s:0 1px 2px rgba(12,21,38,.05),0 1px 3px rgba(12,21,38,.06);--shadow-m:0 4px 16px rgba(12,21,38,.08);--shadow-l:0 16px 44px rgba(12,21,38,.16)}
html{scroll-behavior:smooth}
body{font-family:var(--font-b);background:var(--bg);color:var(--ink);line-height:1.7;-webkit-font-smoothing:antialiased;transition:background .25s,color .25s}
a{color:var(--accent);text-decoration:none}
::selection{background:var(--accent);color:#fff}
:focus-visible{outline:2px solid var(--accent);outline-offset:2px;border-radius:4px}
.container{max-width:860px;margin:0 auto;padding:0 20px}
header{background:color-mix(in srgb,var(--surface) 88%,transparent);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border-bottom:1px solid var(--line);position:sticky;top:0;z-index:100}
.header-inner{display:flex;align-items:center;justify-content:space-between;padding:12px 20px;max-width:1200px;margin:0 auto;gap:12px}
.logo{font-family:var(--font-d);font-weight:700;font-size:1.02rem;color:var(--ink);display:flex;align-items:center;gap:9px;letter-spacing:-.01em}
.logo svg{width:24px;height:24px;color:var(--accent)}
.logo b{color:var(--accent)}
.header-nav{display:flex;align-items:center;gap:10px}
.header-visit{font-family:var(--font-m);font-size:.7rem;font-weight:600;color:var(--accent-ink);border:1px solid var(--line2);border-radius:99px;padding:6px 13px;transition:all .2s}
.header-visit:hover{border-color:var(--accent);background:var(--accent-soft)}
.theme-toggle{background:var(--surface2);border:1px solid var(--line);width:36px;height:36px;border-radius:9px;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--ink2);transition:all .2s}
.theme-toggle:hover{color:var(--ink);border-color:var(--line2)}
.theme-toggle svg{width:16px;height:16px}
.ic-sun{display:none}
[data-theme="dark"] .ic-moon{display:none}
[data-theme="dark"] .ic-sun{display:block}
.crumb{font-family:var(--font-m);font-size:.72rem;color:var(--ink3);padding:26px 0 0;text-transform:uppercase;letter-spacing:.12em}
.crumb a{color:var(--ink3)}
.crumb a:hover{color:var(--accent)}
.crumb span{color:var(--line2);margin:0 6px}
main{padding:10px 0 44px}
h1{font-family:var(--font-d);font-size:clamp(1.7rem,4vw,2.3rem);font-weight:700;margin:12px 0 6px;line-height:1.2;letter-spacing:-.02em}
.sub{font-family:var(--font-m);font-size:.8rem;color:var(--ink3);margin-bottom:22px;display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.desc{font-size:1.02rem;color:var(--ink2);margin-bottom:20px}
.token{background:var(--surface2);border:1px solid var(--line);border-left:3px solid var(--accent);border-radius:var(--radius-s);padding:14px 16px;margin-bottom:22px;font-family:var(--font-m);font-size:.85rem;color:var(--ink2);line-height:1.65}
.token strong{display:block;font-size:.66rem;text-transform:uppercase;letter-spacing:.24em;color:var(--ink);margin-bottom:6px}
.meter{display:inline-flex;align-items:flex-end;gap:2.5px;height:13px}
.meter i{width:3.5px;border-radius:1.5px;background:var(--line2);height:25%}
.meter i:nth-child(2){height:50%}
.meter i:nth-child(3){height:75%}
.meter i:nth-child(4){height:100%}
.meter i.on{background:currentColor}
.meter-ok{color:var(--ok)}.meter-warn{color:var(--warn)}.meter-bad{color:var(--bad)}
.meter-num{font-family:var(--font-m);font-size:.72rem;font-weight:600;color:var(--ink2)}
.cta-wrap{margin:4px 0 34px}
.cta{display:inline-flex;align-items:center;gap:8px;background:var(--grad);color:#fff;padding:13px 28px;border-radius:var(--radius-s);font-weight:700;font-size:.95rem;transition:transform .2s,box-shadow .2s;box-shadow:0 3px 12px rgba(13,148,136,.25)}
.cta:hover{transform:scale(1.02);box-shadow:0 6px 20px rgba(13,148,136,.4);color:#fff}
.cta-note{font-family:var(--font-m);font-size:.68rem;color:var(--ink3);margin-top:10px}
h2{font-family:var(--font-d);font-size:1.15rem;font-weight:700;margin:30px 0 14px;letter-spacing:-.01em}
.related{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:10px}
.rel-card{background:var(--surface);border:1px solid var(--line);border-radius:var(--radius-s);padding:14px;transition:all .2s;box-shadow:var(--shadow-s)}
.rel-card:hover{transform:translateY(-2px);box-shadow:var(--shadow-m);border-color:var(--accent)}
.rel-card .rc-name{font-weight:600;font-size:.88rem;color:var(--ink);display:block;margin-bottom:4px}
.rel-card .rc-cat{font-family:var(--font-m);font-size:.62rem;color:var(--accent-ink);text-transform:uppercase;letter-spacing:.12em}
.cat-workers{display:flex;flex-direction:column;gap:10px}
.cat-worker{display:flex;align-items:center;gap:14px;background:var(--surface);border:1px solid var(--line);border-radius:var(--radius-s);padding:13px 16px;transition:all .2s;box-shadow:var(--shadow-s)}
.cat-worker:hover{transform:translateY(-2px);box-shadow:var(--shadow-m);border-color:var(--accent)}
.cw-icon{font-size:1.15rem;flex-shrink:0;width:38px;height:38px;display:flex;align-items:center;justify-content:center;background:var(--surface2);border-radius:9px;border:1px solid var(--line)}
.cw-main{display:flex;flex-direction:column;flex:1;min-width:0}
.cw-name{font-weight:600;font-size:.9rem;color:var(--ink)}
.cw-desc{font-size:.76rem;color:var(--ink3);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.cw-health{display:inline-flex;align-items:center;gap:7px;flex-shrink:0}
.cat-nav{display:flex;justify-content:space-between;gap:10px;margin-top:30px;font-family:var(--font-m);font-size:.76rem}
.cat-nav a{color:var(--ink3)}
.cat-nav a:hover{color:var(--accent)}
.back{margin-top:30px;font-size:.88rem}
footer{background:var(--surface);border-top:1px solid var(--line);padding:28px 20px;text-align:center;color:var(--ink3);font-size:.8rem}
footer a{color:var(--accent)}
.footer-mono{font-family:var(--font-m);font-size:.66rem;letter-spacing:.08em;text-transform:uppercase;color:var(--ink3);margin-bottom:8px}
@media(max-width:640px){.header-inner{padding:10px 16px}.crumb{padding-top:20px}}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;scroll-behavior:auto!important}}`;

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function catMeta(slug) {
  for (const c of CATEGORIES) if (c.slug === slug) return c;
  return { slug, name: slug, icon: "📦" };
}

function healthTone(s){return s>=80?"ok":s>=65?"warn":"bad"}
function meterBars(s){return s>=85?4:s>=75?3:s>=65?2:1}
function meterHtml(s){
  const n=meterBars(s);
  let html=`<span class="meter meter-${healthTone(s)}" aria-label="${s}% health">`;
  for(let i=1;i<=4;i++)html+=`<i${i<=n?' class="on"':''}></i>`;
  return html+`</span><span class="meter-num">${s}%</span>`;
}

function truncate(s, n) {
  if (s.length <= n) return s;
  return s.slice(0, n - 1).replace(/\s+\S*$/, "") + "…";
}

const HEAD_FONTS = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">`;

const HEADER = `<header>
  <div class="container header-inner">
    <a class='logo' href='/'><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v9M7.5 12h9"/></svg><span>CoreClaw <b>API</b> Directory</span></a>
    <div class="header-nav">
      <a class="header-visit" href="https://www.coreclaw.com/?fpr=chris69" target="_blank" rel="noopener nofollow sponsored" data-aff="1">Visit CoreClaw ↗</a>
      <button class="theme-toggle" id="themeToggle" aria-label="Toggle dark mode">
        <svg class="ic-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>
        <svg class="ic-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
      </button>
    </div>
  </div>
</header>`;

const FOOTER = `<footer>
  <div class="container">
    <p class="footer-mono">CoreClaw API Directory · Free · Affiliate-supported</p>
    <p><a href="https://www.coreclaw.com/?fpr=chris69" target="_blank" rel="noopener nofollow sponsored">Visit CoreClaw</a> · <a href="../llms.txt">llms.txt</a> · <a href="../sitemap.xml">sitemap</a></p>
  </div>
</footer>`;

function pageSnippets() {
  return `<script>
(function(){
  var saved=localStorage.getItem("cc-theme");
  if(saved==="dark"||saved==="light"){document.documentElement.setAttribute("data-theme",saved)}
  var btn=document.getElementById("themeToggle");
  if(btn){btn.addEventListener("click",function(){
    var cur=document.documentElement.getAttribute("data-theme");
    if(!cur){cur=(window.matchMedia&&window.matchMedia("(prefers-color-scheme:dark)").matches)?"dark":"light"}
    var next=cur==="dark"?"light":"dark";
    document.documentElement.setAttribute("data-theme",next);
    localStorage.setItem("cc-theme",next);
  })}
  document.querySelectorAll("a[data-aff][data-slug]").forEach(function(a){
    a.addEventListener("click",function(){
      try{
        var clicks=JSON.parse(localStorage.getItem("cc-clicks")||"[]");
        clicks.push({slug:a.getAttribute("data-slug"),name:a.getAttribute("data-name"),category:a.getAttribute("data-cat"),ts:new Date().toISOString()});
        if(clicks.length>200)clicks=clicks.slice(-200);
        localStorage.setItem("cc-clicks",JSON.stringify(clicks));
      }catch(e){}
    });
  });
})();
</script>`;
}

function workerPage(w, all) {
  const cat = catMeta(w.category);
  const title = `${w.name} API | Web Scraping API for ${cat.name}`;
  const desc = truncate(w.token_summary, 158);
  const url = `${SITE_URL}/workers/${w.slug}.html`;
  const related = all
    .filter((x) => x.category === w.category && x.slug !== w.slug)
    .sort((a, b) => b.health_score - a.health_score)
    .slice(0, 6);

  const relatedHtml = related
    .map(
      (r) =>
        `<a class='rel-card' href='/workers/${r.slug}'><span class="rc-name">${esc(r.name)}</span><span class="rc-cat">${esc(
          catMeta(r.category).name
        )}</span></a>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="index, follow">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(desc)}">
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": ${JSON.stringify(w.name)},
  "description": ${JSON.stringify(w.description)},
  "applicationCategory": "DeveloperApplication",
  "url": ${JSON.stringify(url)},
  "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD"},
  "aggregateRating": {"@type": "AggregateRating", "ratingValue": ${(w.health_score / 20).toFixed(1)}, "bestRating": "5", "worstRating": "1", "ratingCount": "1"}
}
</script>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "CoreClaw API Directory", "item": ${JSON.stringify(SITE_URL + "/")}},
    {"@type": "ListItem", "position": 2, "name": ${JSON.stringify(cat.name)}, "item": ${JSON.stringify(SITE_URL + "/")}},
    {"@type": "ListItem", "position": 3, "name": ${JSON.stringify(w.name)}}
  ]
}
</script>
${HEAD_FONTS}
<style>${CSS}</style>
</head>
<body>

${HEADER}

<main class="container">
  <div class="crumb"><a href='/'>Home</a><span>›</span><a href='/categories/${cat.slug}'>${esc(cat.name)}</a><span>›</span>${esc(w.name)}</div>
  <h1>${esc(w.name)}</h1>
  <div class="sub">${esc(cat.icon)} ${esc(cat.name)} · ${meterHtml(w.health_score)} health</div>
  <p class="desc">${esc(w.description)}</p>
  <div class="token"><strong>What it does</strong>${esc(w.token_summary)}</div>
  <div class="cta-wrap">
    <a class="cta" data-aff="1" data-slug="${esc(w.slug)}" data-name="${esc(w.name)}" data-cat="${esc(w.category)}" href="${esc(w.affiliate_url)}" target="_blank" rel="noopener nofollow sponsored">Try on CoreClaw →</a>
    <div class="cta-note">No signup required to browse. Affiliate link — supports this directory.</div>
  </div>
  ${related.length ? `<h2>Related ${esc(cat.name)} APIs</h2><div class="related">${relatedHtml}</div>` : ""}
  <div class="back"><a href='/'>← Back to all 118 APIs</a></div>
</main>

${FOOTER}

${pageSnippets()}
</body>
</html>
`;
}

function categoryPage(cat, workers, allCats) {
  const members = workers.filter((w) => w.category === cat.slug);
  const title = `${cat.name} APIs | Web Scraping & Data Extraction`;
  const names = members.map((w) => w.name).slice(0, 8).join(", ");
  const desc = truncate(
    `Production-ready ${cat.name.toLowerCase()} scraping and data extraction APIs. ${members.length} workers including ${names}.`,
    158
  );
  const url = `${SITE_URL}/categories/${cat.slug}.html`;
  const idx = allCats.findIndex((c) => c.slug === cat.slug);
  const prev = allCats[(idx - 1 + allCats.length) % allCats.length];
  const next = allCats[(idx + 1) % allCats.length];

  const workerCards = members
    .sort((a, b) => b.health_score - a.health_score)
    .map(
      (w) =>
        `<a class='cat-worker' href='/workers/${w.slug}'><span class="cw-icon">${cat.icon}</span><span class="cw-main"><span class="cw-name">${esc(
          w.name
        )}</span><span class="cw-desc">${esc(truncate(w.token_summary, 110))}</span></span><span class="cw-health">${meterHtml(
          w.health_score
        )}</span></a>`
    )
    .join("");

  const itemList = members.map((w, i) =>
    JSON.stringify({
      "@type": "ListItem",
      position: i + 1,
      name: w.name,
      url: `${SITE_URL}/workers/${w.slug}.html`,
    })
  );

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="index, follow">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(desc)}">
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": ${JSON.stringify(title)},
  "description": ${JSON.stringify(desc)},
  "url": ${JSON.stringify(url)},
  "mainEntity": {"@type": "ItemList", "itemListElement": [${itemList.join(",")}]}
}
</script>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "CoreClaw API Directory", "item": ${JSON.stringify(SITE_URL + "/")}},
    {"@type": "ListItem", "position": 2, "name": ${JSON.stringify(cat.name)}}
  ]
}
</script>
${HEAD_FONTS}
<style>${CSS}</style>
</head>
<body>

${HEADER}

<main class="container">
  <div class="crumb"><a href='/'>Home</a><span>›</span>${esc(cat.name)}</div>
  <h1>${esc(cat.icon)} ${esc(cat.name)} APIs</h1>
  <div class="sub">${members.length} production-ready scraping &amp; data extraction workers</div>
  <p class="desc">${esc(desc)}</p>
  <div class="cta-wrap">
    <a class="cta" data-aff="1" data-slug="${esc(cat.slug)}" data-name="${esc(cat.name)}" data-cat="${esc(cat.slug)}" href="https://www.coreclaw.com/?fpr=chris69" target="_blank" rel="noopener nofollow sponsored">Browse all APIs on CoreClaw →</a>
    <div class="cta-note">Affiliate link — supports this directory.</div>
  </div>
  <h2>All ${members.length} ${esc(cat.name)} APIs</h2>
  <div class="cat-workers">${workerCards}</div>
  <div class="cat-nav">
    <a href='/categories/${prev.slug}'>← ${esc(prev.name)}</a>
    <a href='/categories/${next.slug}'>${esc(next.name)} →</a>
  </div>
  <div class="back"><a href='/'>← Browse all categories</a></div>
</main>

${FOOTER}

${pageSnippets()}
</body>
</html>
`;
}

function buildSitemap(workers) {
  const today = new Date().toISOString().slice(0, 10);
  let out = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
`;
  for (const c of CATEGORIES) {
    out += `  <url>
    <loc>${SITE_URL}/categories/${c.slug}.html</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
`;
  }
  for (const w of workers) {
    out += `  <url>
    <loc>${SITE_URL}/workers/${w.slug}.html</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
  }
  out += `</urlset>
`;
  return out;
}

function buildRobots() {
  return `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
}

function buildLlmstxt(workers) {
  const lines = [
    "# CoreClaw API Directory",
    "",
    `> ${workers.length} production-ready API workers for web scraping, data extraction, and automation.`,
    "> Browse by category: E-Commerce, Social Media, Search/Maps, Jobs, Lead Generation, AI/Research, Developer Tools, Finance, Real Estate, Education, News.",
    "",
    "## Categories",
  ];
  for (const c of CATEGORIES) {
    const names = workers
      .filter((w) => w.category === c.slug)
      .map((w) => w.name.replace(/ Scraper$/, "").replace(/ API$/, ""))
      .join(", ");
    lines.push(`- ${c.name}: ${names} scrapers`);
  }
  lines.push("", "## Category Pages");
  for (const c of CATEGORIES) {
    lines.push(`- ${c.name}: ${SITE_URL}/categories/${c.slug}.html`);
  }
  lines.push("", "## Workers");
  for (const w of workers) {
    lines.push(`- ${w.name}: ${SITE_URL}/workers/${w.slug}.html`);
  }
  lines.push("", "## API Usage", "");
  lines.push(
    "All workers are available via the CoreClaw platform. Visit https://www.coreclaw.com/?fpr=chris69 for API access and documentation."
  );
  lines.push("", "## Contact", "");
  lines.push("Visit https://www.coreclaw.com/?fpr=chris69");
  lines.push("");
  return lines.join("\n");
}

function updateIndexCanonical() {
  const file = path.join(DOCS_DIR, "index.html");
  let html = fs.readFileSync(file, "utf8");
  html = html.replace(
    /<link rel="canonical" href="[^"]*">/,
    `<link rel="canonical" href="${SITE_URL}/">`
  );
  fs.writeFileSync(file, html);
}

function main() {
  const workers = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  fs.mkdirSync(WORKERS_DIR, { recursive: true });
  fs.mkdirSync(CATEGORIES_DIR, { recursive: true });

  for (const w of workers) {
    fs.writeFileSync(path.join(WORKERS_DIR, `${w.slug}.html`), workerPage(w, workers));
  }

  for (const c of CATEGORIES) {
    fs.writeFileSync(path.join(CATEGORIES_DIR, `${c.slug}.html`), categoryPage(c, workers, CATEGORIES));
  }

  fs.writeFileSync(path.join(DOCS_DIR, "sitemap.xml"), buildSitemap(workers));
  fs.writeFileSync(path.join(DOCS_DIR, "robots.txt"), buildRobots());
  fs.writeFileSync(path.join(DOCS_DIR, "llms.txt"), buildLlmstxt(workers));
  updateIndexCanonical();

  console.log(`Generated ${workers.length} worker pages in docs/workers/`);
  console.log(`Generated ${CATEGORIES.length} category pages in docs/categories/`);
  console.log(`Updated sitemap.xml, robots.txt, llms.txt, index.html canonical`);
  console.log(`Site URL: ${SITE_URL}`);
}

main();
