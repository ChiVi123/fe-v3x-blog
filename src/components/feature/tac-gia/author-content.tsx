import AuthorDetail from "~/components/feature/tac-gia/author-detail";
import { authors, getPostsByAuthor } from "~/lib/data";
import { createMockApi } from "~/lib/utils";

const getAuthorPostsApi = createMockApi(getPostsByAuthor);

async function AuthorContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const posts = await getAuthorPostsApi(id);
  return <AuthorDetail list={posts} author={authors[id]} />;
}

export default AuthorContent;
