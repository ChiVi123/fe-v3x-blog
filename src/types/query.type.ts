import type { PostRow } from "~/types/entities.type";

export type PaginationQuery<T = Record<string, unknown>> = {
  query?: string;
  page?: number;
  limit?: number;
  sortBy?: keyof T;
  sortOrder?: "asc" | "desc";
};

export type PostQuery = PaginationQuery<Pick<PostRow, "title" | "createdAt" | "updatedAt" | "id">> & {
  author?: string;
  category?: string;
};

export type PostQueryResult = {
  data: PostRow[];
  total: number;
};
