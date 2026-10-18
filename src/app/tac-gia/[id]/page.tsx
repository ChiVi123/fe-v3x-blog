import type { Metadata } from "next";
import { Suspense } from "react";
import AuthorContent from "~/components/feature/tac-gia/author-content";
import AuthorLoading from "~/components/feature/tac-gia/author-loading";
import { authors } from "~/lib/data";

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

export default function AuthorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<AuthorLoading />}>
      <AuthorContent params={params} />
    </Suspense>
  );
}
