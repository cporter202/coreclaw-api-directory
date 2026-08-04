-- Full-text search index for workers
CREATE VIRTUAL TABLE IF NOT EXISTS workers_fts USING fts5(
  name,
  description,
  token_summary,
  content=workers,
  content_rowid=rowid
);

-- Triggers to keep FTS in sync
CREATE TRIGGER IF NOT EXISTS workers_ai AFTER INSERT ON workers BEGIN
  INSERT INTO workers_fts(rowid, name, description, token_summary)
  VALUES (new.rowid, new.name, new.description, new.token_summary);
END;

CREATE TRIGGER IF NOT EXISTS workers_ad AFTER DELETE ON workers BEGIN
  INSERT INTO workers_fts(workers_fts, rowid, name, description, token_summary)
  VALUES('delete', old.rowid, old.name, old.description, old.token_summary);
END;

CREATE TRIGGER IF NOT EXISTS workers_au AFTER UPDATE ON workers BEGIN
  INSERT INTO workers_fts(workers_fts, rowid, name, description, token_summary)
  VALUES('delete', old.rowid, old.name, old.description, old.token_summary);
  INSERT INTO workers_fts(rowid, name, description, token_summary)
  VALUES (new.rowid, new.name, new.description, new.token_summary);
END;
