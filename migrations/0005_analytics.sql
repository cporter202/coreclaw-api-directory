-- Affiliate click tracking table
CREATE TABLE IF NOT EXISTS affiliate_clicks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  worker_slug TEXT NOT NULL,
  worker_name TEXT NOT NULL,
  category TEXT NOT NULL,
  referrer TEXT,
  user_agent TEXT,
  ip TEXT
);

CREATE INDEX IF NOT EXISTS idx_clicks_timestamp ON affiliate_clicks(timestamp);
CREATE INDEX IF NOT EXISTS idx_clicks_worker ON affiliate_clicks(worker_slug);
CREATE INDEX IF NOT EXISTS idx_clicks_category ON affiliate_clicks(category);
