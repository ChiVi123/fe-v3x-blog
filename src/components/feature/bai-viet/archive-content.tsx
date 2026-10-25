"use client";

import { ArrowDown } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import PostRow from "~/components/shared/post-row";
import { useRevealOnScroll } from "~/hooks/use-reveal-on-scroll";
import type { Category, PostRow as PostRowType } from "~/types";

const PAGE0 = 5;
const STEP = 4;

export default function ArchiveContent({
  posts,
  categories,
}: {
  posts: PostRowType[];
  categories: Category[];
}) {
  const searchParams = useSearchParams();
  const urlCat = searchParams.get("cat") ?? "Tất cả";
  const [filter, setFilter] = useState(
    categories.map((c) => c.name).includes(urlCat) ? urlCat : "Tất cả",
  );
  const [shown, setShown] = useState(PAGE0);

  // Sync filter when URL search param changes
  useEffect(() => {
    const cat = searchParams.get("cat") ?? "Tất cả";
    setFilter(categories.map((c) => c.name).includes(cat) ? cat : "Tất cả");
    setShown(PAGE0);
  }, [searchParams, categories]);

  const list =
    filter === "Tất cả"
      ? posts
      : posts.filter((p) => p.category.name === filter);
  const visible = list.slice(0, shown);
  const remain = list.length - shown;

  useRevealOnScroll(`${filter}:${shown}`);

  return (
    <div className="wrapper" style={{ paddingTop: "clamp(2.2rem,5vw,3.4rem)" }}>
      {/* Section head */}
      <div className="reveal flex justify-between items-end gap-6 flex-wrap border-b border-foreground pb-[1.3rem] mb-[.4rem]">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-[.72rem] tracking-widest text-son">
            (01)
          </span>
          <h1
            className="font-serif font-medium tracking-[-0.01em]"
            style={{
              fontVariationSettings: '"opsz" 100',
              fontSize: "clamp(1.8rem,3.4vw,2.7rem)",
            }}
          >
            Bài viết
          </h1>
        </div>
        <span className="font-mono text-[.66rem] tracking-[.12em] uppercase text-muted-foreground">
          Hiển thị {visible.length} / {list.length}
          {filter !== "Tất cả" ? ` · ${filter}` : ""}
        </span>
      </div>

      {/* Chips filter bar */}
      <div
        className="sticky bg-background flex gap-2 flex-wrap py-[.9rem] z-3"
        style={{ top: "var(--header-h)" }}
        role="tablist"
        aria-label="Lọc theo chuyên mục"
      >
        {categories.map((cat) => {
          const n =
            cat.name === "Tất cả"
              ? posts.length
              : posts.filter((p) => p.category.name === cat.name).length;
          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={cat.name === filter}
              className={`font-mono text-[.64rem] tracking-[.09em] uppercase px-[.95rem] py-[.45rem] border rounded-full transition-[.25s] cursor-pointer ${
                cat.name === filter
                  ? "bg-foreground text-background border-foreground"
                  : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
              onClick={() => {
                setFilter(cat.name);
                setShown(PAGE0);
                window.scrollTo({ top: 0 });
              }}
            >
              {cat.name} <span className="opacity-55">({n})</span>
            </button>
          );
        })}
      </div>

      {/* Post rows */}
      <div id="archRows">
        {visible.map((p, i) => (
          <PostRow key={p.id} post={p} index={i} />
        ))}
      </div>

      {/* Load more */}
      {remain > 0 ? (
        <button
          type="button"
          className="flex justify-center items-center gap-[.7rem] w-full px-[1.2rem] mx-[-1.2rem] py-6 border-t border-border font-mono text-[.7rem] tracking-[.13em] uppercase transition-[.3s] hover:bg-foreground hover:text-background cursor-pointer"
          onClick={() => setShown((s) => s + STEP)}
        >
          Nhiều hơn (còn {remain})
          <ArrowDown className="w-3.5 h-3.5" strokeWidth={2} />
        </button>
      ) : (
        <p className="py-4 text-center font-mono text-[.64rem] tracking-[.12em] uppercase text-muted-foreground border-t border-border">
          Bạn đã xem hết rồi — hẹn gặp ở số sau.
        </p>
      )}

      <style>{`
        @keyframes rise { from { opacity:0; transform:translateY(26px) } to { opacity:1; transform:none } }
        .reveal { opacity: 0; }
        .reveal.in { opacity: 1; animation: rise .9s cubic-bezier(.22,1,.36,1) both; }
        @media (max-width:960px) {
          .row { grid-template-columns: 4.4rem 1fr 2.4rem !important; }
        }
      `}</style>
    </div>
  );
}
