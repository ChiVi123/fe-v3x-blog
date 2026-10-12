import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostByNo, posts } from "~/lib/data";
import PostDetail from "./post-detail";

export function generateStaticParams() {
  return posts.map((p) => ({ no: p.no }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ no: string }>;
}): Promise<Metadata> {
  const { no } = await params;
  const post = getPostByNo(no);
  if (!post) return { title: "Không tìm thấy bài viết" };

  return {
    title: `${post.title} — TẠP.`,
    description: post.dek,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ no: string }>;
}) {
  const { no } = await params;
  const post = getPostByNo(no);
  if (!post) notFound();

  return <PostDetail post={post} />;
}
