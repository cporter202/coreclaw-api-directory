-- Rebuild FTS index after seed data is inserted
INSERT INTO workers_fts(workers_fts) VALUES('rebuild');
