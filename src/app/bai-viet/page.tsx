import type { Metadata } from "next";
import { Suspense } from "react";
import ArchiveLoadContent from "~/components/feature/bai-viet/archive-load-content";

type Query = {
  category?: string;
  limit?: number;
};

export const metadata: Metadata = {
  title: "Bài viết",
  description: "Kho lưu trữ toàn bộ bài viết của tạp chí TẠP.",
};

export default async function ArchivePage({ searchParams }: { searchParams: Promise<Query> }) {
  return (
    <Suspense fallback={<div className="text-center">Đang tải bài viết...</div>}>
      <ArchiveLoadContent searchParams={searchParams} />
    </Suspense>
  );
}
