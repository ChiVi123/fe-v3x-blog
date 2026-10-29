import Link from "next/link";
import { queryUsers } from "~/service/server/author.service";

export async function SiteFooterAuthors() {
  const { data } = await queryUsers({ page: 1, limit: 5 });

  return (
    <div>
      <h4 className="font-mono font-medium text-[.62rem] tracking-[.18em] uppercase text-inverse-muted mb-4">
        Tác giả
      </h4>
      {data?.map((user) => (
        <Link
          key={user.id}
          href={`/tac-gia/${user.id}`}
          className="block py-[.28rem] text-[.92rem] text-inverse-muted transition-[color_.25s] hover:text-son"
        >
          {user.username}
        </Link>
      ))}
    </div>
  );
}
