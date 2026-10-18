import Image from "next/image";
import Link from "next/link";
import { img } from "~/lib/utils";
import type { Post } from "~/types";

export function FeatureCard({ post }: { post: Post }) {
  return (
    <figure className="relative border border-foreground cursor-pointer bg-background group">
      <span className="absolute -top-px -left-px bg-son text-son-foreground font-mono text-[.6rem] tracking-[.14em] uppercase px-3 py-[.38rem] z-2">
        Bài nổi bật
      </span>
      <Link href={`/bai-viet/${post.no}`} className="block">
        <div className="overflow-hidden">
          <Image
            src={img(post.seed, 900, 600)}
            alt={`Ảnh minh họa: ${post.title}`}
            width={900}
            height={600}
            className="w-full aspect-3/2 object-cover grayscale contrast-105 transition-[filter_.6s,transform_.6s] group-hover:grayscale-0 group-hover:scale-[1.025]"
          />
        </div>
        <figcaption className="p-[1rem_1.1rem_1.1rem] border-t border-foreground">
          <span className="font-mono text-[.66rem] tracking-[.12em] text-muted-foreground">
            № {post.no}
          </span>
          <h3 className="font-serif font-[520] text-[1.3rem] leading-tight my-[.4rem_.4rem_.5rem] transition-[color_.3s] group-hover:text-son">
            {post.title}
          </h3>
          <span className="font-mono text-[.66rem] tracking-[.08em] text-muted-foreground uppercase">
            {post.cat} · {post.read} phút đọc
          </span>
        </figcaption>
      </Link>
    </figure>
  );
}
