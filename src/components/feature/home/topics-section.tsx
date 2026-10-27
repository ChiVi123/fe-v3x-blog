import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { Category } from "~/types";

export function TopicsSection({ categories }: { categories: Category[] }) {
  return (
    <section className="sec" id="chuyen-muc" style={{ paddingTop: 0 }}>
      <div className="wrapper">
        <div className="sec-head reveal flex justify-between items-end gap-6 flex-wrap border-b border-foreground pb-[1.3rem] mb-[.4rem]">
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-[.72rem] tracking-widest text-son">(02)</span>
            <h2
              className="font-serif font-medium tracking-[-0.01em]"
              style={{
                fontVariationSettings: '"opsz" 100',
                fontSize: "clamp(1.8rem,3.4vw,2.7rem)",
              }}
            >
              Chuyên mục
            </h2>
          </div>
          <span className="font-mono text-[.66rem] tracking-[.12em] uppercase text-muted-foreground">
            {categories.length.toString().padStart(2, "0")} chuyên mục — cập nhật hằng ngày
          </span>
        </div>
        <div>
          {categories.map((category, i) => (
            <Link
              key={category.id}
              href={`/bai-viet?cat=${encodeURIComponent(category.name)}`}
              className="topic group grid items-center gap-[1.3rem] border-t border-border transition-[background_.35s] hover:bg-foreground last:border-b"
              style={{
                gridTemplateColumns: "1fr auto 2.6rem",
                padding: "1.9rem 1.2rem",
                margin: "0 -1.2rem",
                animationDelay: `${i * 60}ms`,
              }}
            >
              <span
                className="block font-serif font-medium tracking-[-0.01em] transition-[color_.35s] group-hover:text-background"
                style={{
                  fontVariationSettings: '"opsz" 100',
                  fontSize: "clamp(1.6rem,3.6vw,2.5rem)",
                }}
              >
                {category.name}
              </span>
              <span className="font-mono text-[.68rem] tracking-widest text-muted-foreground whitespace-nowrap transition-[color_.35s] group-hover:text-son">
                {category.postsCount} bài
              </span>
              <span className="w-9.5 h-9.5 grid place-items-center border border-border text-muted-foreground transition-[.35s] group-hover:bg-background group-hover:border-background group-hover:text-foreground group-hover:rotate-45">
                <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.8} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
