import type { Metadata } from "next";
import { Suspense } from "react";
import AuthorContent from "~/components/feature/tac-gia/author-content";
import AuthorLoading from "~/components/feature/tac-gia/author-loading";
import { getAuthorById } from "~/service/server/author.service";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const author = await getAuthorById(id);
  if (!author) return { title: "Không tìm thấy tác giả" };

  return {
    title: `${author.username} — Tác giả TẠP.`,
    description: "A jump to the sky, turn the rider kick",
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
