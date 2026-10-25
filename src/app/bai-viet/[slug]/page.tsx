import type { Metadata } from "next";
import { Suspense } from "react";
import PostContent from "~/components/feature/bai-viet/post-content";
import PostLoading from "~/components/feature/bai-viet/post-loading";
import { getPostDetail } from "~/service/server/posts.service";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostDetail(slug);
  if (!post) return { title: "Không tìm thấy bài viết" };

  return {
    title: `${post.title} — TẠP.`,
    description: post.slug,
  };
}

export default function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense fallback={<PostLoading />}>
      <PostContent params={params} />
    </Suspense>
  );
}
