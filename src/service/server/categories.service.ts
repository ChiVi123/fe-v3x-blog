import "server-only";

import { cacheLife, cacheTag } from "next/cache";
import type { Category } from "~/types";

/** Empty result returned when the API is unreachable (e.g. during Docker build). */
const EMPTY_CATEGORIES: { data: Category[] } = { data: [] };

export async function getCategories(): Promise<{ data: Category[] }> {
  "use cache";

  cacheLife("hours");
  cacheTag("categories");

  try {
    const res = await fetch(`${process.env.API_URL}/categories`);
    if (!res.ok) return EMPTY_CATEGORIES;
    return res.json();
  } catch {
    // API unavailable at build time — return empty so Next.js renders a safe
    // shell. The cache entry will be populated on the first real request.
    return EMPTY_CATEGORIES;
  }
}
