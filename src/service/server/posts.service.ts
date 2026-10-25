import "server-only";

import { cacheLife, cacheTag } from "next/cache";
import type { PostDetail, PostRow } from "~/types";

export async function getPosts(): Promise<{ data: PostRow[] }> {
  "use cache";

  cacheLife("hours");
  cacheTag("posts");
  const url = new URL(`${process.env.API_URL}/posts/all`);
  url.searchParams.set("page", "1");
  url.searchParams.set("limit", "10");
  const res = await fetch(url.toString());
  return res.json();
}

export async function getPostDetail(slug: string): Promise<PostDetail> {
  const res = await fetch(`${process.env.API_URL}/posts/detail/${slug}`);
  return res.json();
}

export async function queryPosts({
  author,
}: {
  author?: string;
  category?: string;
}): Promise<{ data: PostRow[] }> {
  const url = new URL(`${process.env.API_URL}/posts/all`);
  if (author) url.searchParams.set("author", author);
  url.searchParams.set("page", "1");
  url.searchParams.set("limit", "10");

  const res = await fetch(url.toString());
  return res.json();
}
