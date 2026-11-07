import { notFound } from "next/navigation";
import AuthorDetail from "~/components/feature/tac-gia/author-detail";
import { getAuthorById } from "~/service/server/author.service";
import { queryPosts } from "~/service/server/posts.service";

async function AuthorContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [author, { data: posts }] = await Promise.all([getAuthorById(id), queryPosts({ author: id })]);

  if (!author) notFound();

  return <AuthorDetail author={author} list={posts} />;
}

export default AuthorContent;
