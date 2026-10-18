import type { Metadata } from "next";
import SavedContent from "~/components/feature/da-luu/saved-content";

export const metadata: Metadata = {
  title: "Đã lưu",
  description: "Các bài viết đã lưu để đọc lại trên tạp chí TẠP.",
};

export default function SavedPage() {
  return <SavedContent />;
}
