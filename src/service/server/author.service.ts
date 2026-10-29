import "server-only";

import type { Author, UserQuery, UserQueryResult } from "~/types";

export async function getAuthorById(id: string): Promise<Author> {
  const res = await fetch(`${process.env.API_URL}/users/${id}`);
  return res.json();
}
export async function queryUsers(query?: UserQuery): Promise<UserQueryResult> {
  const url = new URL(`${process.env.API_URL}/users/search`);
  url.searchParams.set("page", (query?.page || 1).toString());
  url.searchParams.set("limit", (query?.limit || 10).toString());
  if (query?.query) url.searchParams.set("query", query.query);
  if (query?.sortBy) url.searchParams.set("sortBy", query.sortBy);
  if (query?.sortOrder) url.searchParams.set("sortOrder", query.sortOrder);
  const res = await fetch(url.toString());
  return res.json();
}
