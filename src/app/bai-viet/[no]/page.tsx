import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PostDetail from "~/components/feature/bai-viet/post-detail";
import { getPostByNo, posts } from "~/lib/data";

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
