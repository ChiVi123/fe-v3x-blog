import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import type { Category } from "~/types";

export async function getCategories(): Promise<{ data: Category[] }> {
  "use cache";

  cacheLife("hours");
  cacheTag("categories");
  const res = await fetch(`${process.env.API_URL}/categories`);
  return res.json();
}
