import { notFound } from "next/navigation";
import { getPostDetail, queryPosts } from "~/service/server/posts.service";
import PostDetail from "./post-detail";

async function PostContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostDetail(slug);
  if (!post) notFound();

  const relate = await queryPosts({ author: post.author.id });
  return (
    <PostDetail
      post={post}
      related={relate.data.filter((t) => t.id !== post.id)}
    />
  );
}

export default PostContent;
