"use client";

import Link from "next/link";
import type { Post } from "~/lib/data";
import { useReadingStore } from "./reading-store";

const ICON_UP_RIGHT = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-3.5 h-3.5"
  >
    <path d="M7 17 17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

const ICON_X = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    className="w-3.5 h-3.5"
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

interface PostRowProps {
  post: Post;
  index?: number;
  /** In saved view: show unsave button instead of arrow */
  showUnsave?: boolean;
  onUnsave?: (no: string) => void;
}

export default function PostRow({
  post,
  index = 0,
  showUnsave = false,
  onUnsave,
}: PostRowProps) {
  const readPct = useReadingStore((s) => s.readMap[post.no] ?? 0);
  const isRead = readPct >= 0.95;

  return (
    <Link
      href={`/bai-viet/${post.no}`}
      className={`row group grid items-center gap-[1.4rem] px-[1.2rem] mx-[-1.2rem] border-t border-border cursor-pointer transition-[background_.3s] hover:bg-muted ${isRead ? "read" : ""}`}
      style={{
        gridTemplateColumns: "4.4rem 8.6rem 1fr auto 2.4rem",
        padding: "1.55rem 1.2rem",
        animationDelay: `${index * 60}ms`,
      }}
      data-no={post.no}
    >
      {/* № */}
      <span
        className={`font-mono text-[.72rem] text-muted-foreground transition-[.3s] ${isRead ? "line-through opacity-45" : ""}`}
      >
        № {post.no}
      </span>

      {/* category */}
      <span className="font-mono text-[.63rem] tracking-[.13em] uppercase text-son">
        {post.cat}
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
        {post.date} · {post.read} phút
        {isRead && <em className="not-italic text-son"> · đã đọc</em>}
      </span>

      {/* action */}
      {showUnsave ? (
        <button
          type="button"
          className="w-8.5 h-8.5 grid place-items-center border border-son text-son transition-[.3s] hover:bg-son hover:text-white"
          onClick={(e) => {
            e.preventDefault();
            onUnsave?.(post.no);
          }}
          aria-label="Bỏ lưu bài này"
        >
          {ICON_X}
        </button>
      ) : (
        <span className="row-arrow w-8.5 h-8.5 grid place-items-center border border-border text-muted-foreground transition-[.3s] group-hover:bg-son group-hover:border-son group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          {ICON_UP_RIGHT}
        </span>
      )}
    </Link>
  );
}

/* ─── Hover preview (desktop only) ─── */
import { useEffect, useRef } from "react";
import { getPostByNo } from "~/lib/data";
import { img } from "~/lib/utils";

export function HoverPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(hover:hover) and (pointer:fine)").matches) return;

    const pv = ref.current;
    const pvImg = imgRef.current;
    if (!pv || !pvImg) return;

    let tx = 0;
    let ty = 0;
    let px = 0;
    let py = 0;
    let sc = 0.85;
    let tsc = 0.85;
    let curRow: HTMLElement | null = null;
    let animId: number;

    function onPointerOver(e: PointerEvent) {
      const target = e.target as HTMLElement | null;
      const r = target?.closest(".row") as HTMLElement | null;
      if (r && r !== curRow) {
        curRow = r;
        const no = r.dataset.no;
        if (no) {
          const post = getPostByNo(no);
          if (post && pvImg) {
            pvImg.src = img(post.seed, 600, 400);
            tsc = 1;
            pv?.classList.add("opacity-100");
            pv?.classList.remove("opacity-0");
          }
        }
      } else if (!r && curRow) {
        curRow = null;
        tsc = 0.85;
        pv?.classList.remove("opacity-100");
        pv?.classList.add("opacity-0");
      }
    }

    function onPointerMove(e: PointerEvent) {
      const flip = e.clientX + 340 > window.innerWidth;
      tx = flip ? e.clientX - 332 : e.clientX + 32;
      ty = Math.min(Math.max(e.clientY - 100, 12), window.innerHeight - 212);
    }

    function loop() {
      const vel = tx - px;
      px += vel * 0.13;
      py += (ty - py) * 0.13;
      sc += (tsc - sc) * 0.15;
      const deg = Math.max(-9, Math.min(9, vel * 0.12));
      if (pv) {
        pv.style.transform = `translate3d(${px}px,${py}px,0) rotate(${deg}deg) scale(${sc})`;
      }
      animId = requestAnimationFrame(loop);
    }

    document.addEventListener("pointerover", onPointerOver);
    document.addEventListener("pointermove", onPointerMove);
    animId = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="fixed top-0 left-0 w-75 h-50 z-40 pointer-events-none overflow-hidden border border-foreground shadow-[12px_12px_0_color-mix(in_srgb,var(--foreground)_12%,transparent)] opacity-0 transition-opacity duration-300 hidden md:block"
    >
      <img ref={imgRef} src="" alt="" className="w-full h-full object-cover" />
    </div>
  );
}
