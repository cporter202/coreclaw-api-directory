CREATE TABLE IF NOT EXISTS categories (
  slug TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  worker_count INTEGER DEFAULT 0,
  icon TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS workers (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  token_summary TEXT,
  url TEXT,
  affiliate_url TEXT,
  parameters TEXT,
  examples TEXT,
  dependencies TEXT,
  health_score REAL DEFAULT 75,
  github_stars INTEGER DEFAULT 0,
  github_forks INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (category) REFERENCES categories(slug)
);

CREATE INDEX IF NOT EXISTS idx_workers_category ON workers(category);
CREATE INDEX IF NOT EXISTS idx_workers_health ON workers(health_score DESC);
CREATE INDEX IF NOT EXISTS idx_workers_slug ON workers(slug);
CREATE INDEX IF NOT EXISTS idx_workers_name ON workers(name);
