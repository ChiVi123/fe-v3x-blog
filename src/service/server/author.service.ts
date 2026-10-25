import "server-only";

import type { Author } from "~/types";

export async function getAuthorById(id: string): Promise<Author> {
  const res = await fetch(`${process.env.API_URL}/users/${id}`);
  return res.json();
}
