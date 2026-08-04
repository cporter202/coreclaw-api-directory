export interface Env {
  DB: D1Database;
  KV: KVNamespace;
  R2: R2Bucket;
  ENVIRONMENT: string;
}

export interface Worker {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  token_summary: string;
  url: string;
  affiliate_url: string;
  parameters: Record<string, any> | null;
  examples: Record<string, any> | null;
  dependencies: string[] | null;
  health_score: number;
  github_stars: number;
  github_forks: number;
  created_at: string;
  updated_at: string;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  worker_count: number;
  icon: string;
}

export interface SearchResult {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  score: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    pages: number;
    limit: number;
  };
}

export interface ApiError {
  error: string;
  message?: string;
  status: number;
}
