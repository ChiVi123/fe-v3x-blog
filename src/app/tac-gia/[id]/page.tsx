import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AuthorDetail from "~/components/feature/tac-gia/author-detail";
import { authors, getPostsByAuthor } from "~/lib/data";

export function generateStaticParams() {
  return Object.keys(authors).map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const author = authors[id];
  if (!author) return { title: "Không tìm thấy tác giả" };

  return {
    title: `${author.name} — Tác giả TẠP.`,
    description: author.bio,
  };
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const author = authors[id];
  if (!author) notFound();

  const list = getPostsByAuthor(id);
  return <AuthorDetail author={author} list={list} />;
}
