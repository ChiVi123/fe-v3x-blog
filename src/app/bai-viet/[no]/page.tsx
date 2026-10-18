import type { Metadata } from "next";
import { Suspense } from "react";
import PostContent from "~/components/feature/bai-viet/post-content";
import PostLoading from "~/components/feature/bai-viet/post-loading";
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

export default function PostPage({
  params,
}: {
  params: Promise<{ no: string }>;
}) {
  return (
    <Suspense fallback={<PostLoading />}>
      <PostContent params={params} />
    </Suspense>
  );
}
