import type { Metadata } from "next";
import { Suspense } from "react";
import ArchiveContent from "~/components/feature/bai-viet/archive-content";
import { getCategories } from "~/service/server/categories.service";
import { getPosts } from "~/service/server/posts.service";

export const metadata: Metadata = {
  title: "Bài viết",
  description: "Kho lưu trữ toàn bộ bài viết của tạp chí TẠP.",
};

export default async function ArchivePage() {
  const { data: posts } = await getPosts();
  const { data: categories } = await getCategories();

  return (
    <Suspense
      fallback={<div className="text-center">Đang tải bài viết...</div>}
    >
      <ArchiveContent posts={posts} categories={categories} />
    </Suspense>
  );
}
