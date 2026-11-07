import Link from "next/link";
import Image from "~/components/shared/image";
import type { PostRow } from "~/types";

export function FeatureCard({ post }: { post?: PostRow }) {
  if (!post) {
    return (
      <div className="border border-foreground bg-background p-8 text-center font-mono text-[.75rem] text-muted-foreground uppercase tracking-widest">
        Chưa có bài viết nổi bật
      </div>
    );
  }

  return (
    <figure className="relative border border-foreground cursor-pointer bg-background group">
      <span className="absolute -top-px -left-px bg-son text-son-foreground font-mono text-[.6rem] tracking-[.14em] uppercase px-3 py-[.38rem] z-2">
        Bài nổi bật
      </span>
      <Link href={`/bai-viet/${post.slug}`} className="block">
        <div className="overflow-hidden">
          <Image
            src={post.thumbnail.url}
            alt={`Ảnh minh họa: ${post.title}`}
            width={900}
            height={600}
            loading="eager"
            className="w-full aspect-3/2 object-cover grayscale contrast-105 transition-[filter_.6s,transform_.6s] group-hover:grayscale-0 group-hover:scale-[1.025]"
          />
        </div>
        <figcaption className="p-[1.1rem_1.1rem] border-t border-foreground">
          <h3 className="font-serif font-[520] text-[1.3rem] leading-tight my-[.4rem_.4rem_.5rem] transition-[color_.3s] group-hover:text-son">
            {post.title}
          </h3>
          <span className="font-mono text-[.66rem] tracking-[.08em] text-muted-foreground uppercase">
            {post.category.name}
          </span>
        </figcaption>
      </Link>
    </figure>
  );
}
