"use client";

import { cn } from "cn";
import { ArrowUpRight, X } from "lucide-react";
import Link from "next/link";
import { useReadingStore } from "~/hooks/use-reading-store";
import { dateFormat } from "~/lib/utils";
import type { PostRow as PostRowType } from "~/types";

export interface PostRowProps {
  post: PostRowType;
  index?: number;
  /** In saved view: show unsave button instead of arrow */
  showUnsave?: boolean;
  onUnsave?: (no: string) => void;
}

export default function PostRow({ post, index = 0, showUnsave = false, onUnsave }: PostRowProps) {
  const readPct = useReadingStore((s) => s.readMap[post.id] ?? 0);
  const isRead = readPct >= 0.95;

  return (
    <Link
      href={`/bai-viet/${post.slug}`}
      className={cn(
        "row group grid items-center gap-[1.4rem] px-[1.2rem] mx-[-1.2rem] border-t border-border cursor-pointer transition-[background_.3s] hover:bg-muted",
        { read: isRead },
      )}
      style={{
        gridTemplateColumns: "8.6rem 1fr auto 2.4rem",
        padding: "1.55rem 1.2rem",
        animationDelay: `${index * 60}ms`,
      }}
      data-id={post.id}
      data-img={post.thumbnail.url}
    >
      {/* category */}
      <span className="font-mono text-[.63rem] tracking-[.13em] uppercase text-son">
        {post.category?.name || "Unknown"}
      </span>

      {/* title */}
      <h3
        className="font-serif font-medium leading-tight tracking-[-0.01em] transition-[transform_.35s_cubic-bezier(.22,1,.36,1)] group-hover:translate-x-2.25"
        style={{ fontSize: "clamp(1.2rem,2.1vw,1.7rem)" }}
      >
        {post.title}
      </h3>

      {/* meta */}
      <span className="font-mono text-[.66rem] tracking-[.06em] text-muted-foreground whitespace-nowrap">
        {dateFormat(post.createdAt)} · {post.readingTime} phút
        {isRead && <em className="not-italic text-son"> · đã đọc</em>}
      </span>

      {/* action */}
      {showUnsave ? (
        <button
          type="button"
          className="w-8.5 h-8.5 grid place-items-center border border-son text-son transition-[.3s] hover:bg-son hover:text-white cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            onUnsave?.(post.id);
          }}
          aria-label="Bỏ lưu bài này"
        >
          <X className="w-3.5 h-3.5" strokeWidth={2} />
        </button>
      ) : (
        <span className="row-arrow w-8.5 h-8.5 grid place-items-center border border-border text-muted-foreground transition-[.3s] group-hover:bg-son group-hover:border-son group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.8} />
        </span>
      )}
    </Link>
  );
}
