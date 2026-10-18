import type { Metadata } from "next";
import { Suspense } from "react";
import ArchiveContent from "~/components/feature/bai-viet/archive-content";

export const metadata: Metadata = {
  title: "Bài viết",
  description: "Kho lưu trữ toàn bộ bài viết của tạp chí TẠP.",
};

export default function ArchivePage() {
  return (
    <Suspense>
      <ArchiveContent />
    </Suspense>
  );
}
