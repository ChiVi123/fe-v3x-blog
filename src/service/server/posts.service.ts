import "server-only";

import { cacheLife, cacheTag } from "next/cache";
import type { PostDetail, PostQuery, PostQueryResult } from "~/types";

/** Empty result returned when the API is unreachable (e.g. during Docker build). */
const EMPTY_POSTS: PostQueryResult = { data: [], total: 0 };

export async function queryPostsCache(query?: PostQuery): Promise<PostQueryResult> {
  "use cache";

  cacheLife("hours");
  cacheTag("posts");

  try {
    return await queryPosts(query);
  } catch {
    // API unavailable at build time — return empty so Next.js renders a safe
    // shell. The cache entry will be populated on the first real request.
    return EMPTY_POSTS;
  }
}

export async function getFeaturedPosts(): Promise<PostQueryResult> {
  "use cache";

  cacheLife("hours");
  cacheTag("posts");

  try {
    return await queryPosts({ page: 1, limit: 1 });
  } catch {
    return EMPTY_POSTS;
  }
}

export async function getPostDetail(slug: string): Promise<PostDetail | null> {
  try {
    const res = await fetch(`${process.env.API_URL}/posts/detail/${slug}`);
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function queryPosts(query?: PostQuery): Promise<PostQueryResult> {
  const url = new URL(`${process.env.API_URL}/posts/all`);
  if (query?.author) url.searchParams.set("author", query.author);
  url.searchParams.set("page", (query?.page || 1).toString());
  url.searchParams.set("limit", (query?.limit || 10).toString());
  if (query?.category) url.searchParams.set("category", query.category);
  if (query?.query) url.searchParams.set("query", query.query);
  if (query?.sortBy) url.searchParams.set("sortBy", query.sortBy);
  if (query?.sortOrder) url.searchParams.set("sortOrder", query.sortOrder);

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Failed to fetch posts: ${res.status}`);
  return res.json();
}
