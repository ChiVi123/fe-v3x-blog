import "server-only";

import { cacheLife, cacheTag } from "next/cache";
import type { PostDetail, PostQuery, PostQueryResult } from "~/types";

export async function queryPostsCache(query?: PostQuery): Promise<PostQueryResult> {
  "use cache";

  cacheLife("hours");
  cacheTag("posts");

  return queryPosts(query);
}
export async function getFeaturedPosts(): Promise<PostQueryResult> {
  "use cache";

  cacheLife("hours");
  cacheTag("posts");

  return queryPosts({ page: 1, limit: 1 });
}

export async function getPostDetail(slug: string): Promise<PostDetail> {
  const res = await fetch(`${process.env.API_URL}/posts/detail/${slug}`);
  return res.json();
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
  return res.json();
}
