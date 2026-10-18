import { notFound } from "next/navigation";
import { getPostByNo } from "~/lib/data";
import { createMockApi } from "~/lib/utils";
import PostDetail from "./post-detail";

const getPostByNoApi = createMockApi(getPostByNo);

async function PostContent({ params }: { params: Promise<{ no: string }> }) {
  const { no } = await params;
  const post = await getPostByNoApi(no);
  if (!post) notFound();

  return <PostDetail post={post} />;
}

export default PostContent;
