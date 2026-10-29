import type { Author, PostRow } from "~/types/entities.type";

export type PaginationQuery<T = Record<string, unknown>> = {
  query?: string;
  page?: number;
  limit?: number;
  sortBy?: keyof T;
  sortOrder?: "asc" | "desc";
};
export type QueryResult<T> = {
  data: T[];
  total: number;
};

export type PostQuery = PaginationQuery<Pick<PostRow, "title" | "createdAt" | "updatedAt" | "id">> & {
  author?: string;
  category?: string;
};
export type UserQuery = PaginationQuery<Pick<Author, "id" | "username" | "email" | "createdAt" | "updatedAt">>;

export type PostQueryResult = QueryResult<PostRow>;
export type UserQueryResult = QueryResult<Author>;
