import ArchiveContent from "~/components/feature/bai-viet/archive-content";
import { getCategories } from "~/service/server/categories.service";
import { queryPostsCache } from "~/service/server/posts.service";

type Query = {
  category?: string;
  limit?: number;
};
export default async function ArchiveLoadContent({ searchParams }: { searchParams: Promise<Query> }) {
  const { category, limit = 5 } = await searchParams;
  const [{ data: posts, total }, { data: categories }] = await Promise.all([
    queryPostsCache({ category, limit }),
    getCategories(),
  ]);

  return (
    <ArchiveContent filter={category} shown={limit} posts={posts} categories={categories} allCountFilter={total} />
  );
}
