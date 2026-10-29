import Link from "next/link";
import { getCategories } from "~/service/server/categories.service";

export async function SiteFooterCategories() {
  const { data } = await getCategories();
  return (
    <div>
      <h4 className="font-mono font-medium text-[.62rem] tracking-[.18em] uppercase text-inverse-muted mb-4">
        Chuyên mục
      </h4>
      {data.slice(0, 5).map((cat) => (
        <Link
          key={cat.id}
          href={`/bai-viet?category=${encodeURIComponent(cat.id)}`}
          className="block py-[.28rem] text-[.92rem] text-inverse-muted transition-[color_.25s] hover:text-son"
        >
          {cat.name}
        </Link>
      ))}
    </div>
  );
}
