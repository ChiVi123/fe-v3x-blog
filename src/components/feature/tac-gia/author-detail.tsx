"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import PostRow from "~/components/shared/post-row";
import { useRevealOnScroll } from "~/hooks/use-reveal-on-scroll";
import { getAuthorInitials } from "~/lib/data";
import type { Author, Post } from "~/types";

export default function AuthorDetail({
  author,
  list,
}: {
  author: Author;
  list: Post[];
}) {
  const mins = list.reduce((s, p) => s + p.read, 0);
  const ini = getAuthorInitials(author.name);
  const shortName = author.name.split(" ").slice(-1)[0] ?? author.name;

  useRevealOnScroll(list.length);

  return (
    <div
      className="max-w-215 mx-auto px-5"
      style={{ padding: "clamp(2rem,5vw,3.2rem) 20px 7rem" }}
    >
      {/* Back */}
      <Link
        href="/bai-viet"
        className="inline-flex items-center gap-[.6rem] font-mono text-[.7rem] tracking-[.12em] uppercase px-[1.4rem] py-[.9rem] border border-foreground mb-[2.4rem] transition-[.3s] hover:bg-foreground hover:text-background"
      >
        <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2} />
        Tất cả bài viết
      </Link>

      {/* Author header */}
      <header className="flex gap-[clamp(1.2rem,3vw,2rem)] items-start border-t border-foreground pt-[1.6rem] flex-wrap">
        <span
          className="shrink-0 grid place-items-center bg-foreground text-background font-serif font-[560] tracking-[.04em]"
          style={{
            width: 96,
            height: 96,
            fontSize: "2rem",
            fontVariationSettings: '"opsz" 100',
          }}
        >
          {ini}
        </span>
        <div>
          <p className="font-mono text-[.68rem] tracking-[.18em] uppercase text-son">
            Tác giả — TẠP.
          </p>
          <h1
            className="font-serif leading-[1.05] tracking-[-0.015em] mt-2 mb-[.3rem]"
            style={{
              fontWeight: 480,
              fontVariationSettings: '"opsz" 144',
              fontSize: "clamp(2rem,5vw,3.2rem)",
            }}
          >
            {author.name}
          </h1>
          <p className="font-mono text-[.6rem] tracking-[.16em] uppercase text-son">
            {author.role}
          </p>
          <p className="max-w-[52ch] leading-[1.75] text-muted-foreground mt-[.8rem] mb-[1.1rem] text-[1rem]">
            {author.bio}
          </p>
          <p className="font-mono text-[.68rem] tracking-[.12em] uppercase text-son">
            {list.length} bài viết · {mins} phút đọc trên TẠP
          </p>
        </div>
      </header>

      {/* Posts by author */}
      <div className="flex justify-between items-baseline gap-4 border-b border-foreground pb-[1.1rem] mt-[3.4rem]">
        <h2
          className="font-serif font-medium tracking-[-0.01em]"
          style={{
            fontVariationSettings: '"opsz" 100',
            fontSize: "clamp(1.5rem,3vw,2.2rem)",
          }}
        >
          Bài viết của {shortName}
        </h2>
        <span className="font-mono text-[.66rem] tracking-[.12em] uppercase text-muted-foreground">
          {list.length} bài
        </span>
      </div>
      <div>
        {list.map((p, i) => (
          <PostRow key={p.no} post={p} index={i} />
        ))}
      </div>

      <style>{`
        @keyframes rise { from { opacity:0; transform:translateY(26px) } to { opacity:1; transform:none } }
        .reveal { opacity: 0; }
        .reveal.in { opacity: 1; animation: rise .9s cubic-bezier(.22,1,.36,1) both; }
      `}</style>
    </div>
  );
}
