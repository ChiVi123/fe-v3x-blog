"use client";

import { Bookmark, Link2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef } from "react";
import { useReadingActions, useReadingStore } from "~/hooks/use-reading-store";
import { useToast } from "~/hooks/use-toast";
import { dateFormat, getAuthorInitials } from "~/lib/utils";
import type { PostDetail as PostDetailType, PostRow } from "~/types";

const FS = ["1.02rem", "1.13rem", "1.26rem"];

export default function PostDetail({ post, related }: { post: PostDetailType; related: PostRow[] }) {
  const ini = getAuthorInitials(post.author.username);
  const toast = useToast();

  const { toggleSave, setProgress, setLastRead, setFs } = useReadingActions();
  const savedSet = useReadingStore((s) => s.savedSet);
  const fsLvl = useReadingStore((s) => s.fsLvl);
  const isSaved = savedSet.has(post.id);

  const postRow: PostRow = useMemo(() => {
    const { content: _, ...row } = post;
    return { ...row };
  }, [post]);

  // Progress bar
  const progressRef = useRef<HTMLDivElement>(null);
  const lastLSRef = useRef(0);

  useEffect(() => {
    function onScroll() {
      const h = document.documentElement;
      const p = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${p})`;
      const now = Date.now();
      if (now - lastLSRef.current > 400) {
        lastLSRef.current = now;
        if (p > 0.03 && p < 0.97) setLastRead(postRow, p);
        if (p >= 0.95) setProgress(postRow, 1);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [postRow, setLastRead, setProgress]);

  // paras with blockquote inserted
  const paras = [
    ...post.content
      .split("\n")
      .filter((t) => t.trim() !== "")
      .map((t, index) => <p key={`${post.slug}-${index + 1}`}>{t}</p>),
  ];
  paras.splice(
    2,
    0,
    <blockquote
      key="quote"
      className="my-[2.6rem] pl-[1.6rem] border-l-[3px] border-son font-serif italic font-[440] text-[1.35em] leading-[1.45]"
    >
      &ldquo;Quote&rdquo;
    </blockquote>,
  );

  return (
    <>
      {/* Reading progress bar */}
      <div
        ref={progressRef}
        className="fixed top-0 left-0 right-0 h-0.75 bg-son origin-left z-60"
        style={{ transform: "scaleX(0)" }}
      />

      <article className="max-w-180 mx-auto px-5" style={{ padding: "clamp(2.2rem,5vw,3.4rem) 20px 8rem" }}>
        {/* Category + issue */}
        <p className="font-mono text-[.68rem] tracking-[.18em] uppercase text-son">{post.category.name}</p>

        {/* Title */}
        <h1
          className="font-serif leading-[1.06] tracking-[-0.015em] mt-[.9rem] mb-4"
          style={{
            fontWeight: 480,
            fontVariationSettings: '"opsz" 144',
            fontSize: "clamp(2.1rem,5.4vw,3.7rem)",
          }}
        >
          {post.title}
        </h1>

        {/* Meta */}
        <div className="font-mono text-[.68rem] tracking-widest uppercase text-muted-foreground pb-[1.6rem] border-b border-border mb-[2.2rem]">
          {dateFormat(post.createdAt, "long")} · {post.readingTime} phút đọc ·{" "}
          <Link href={`/tac-gia/${post.author.id}`} className="text-foreground hover:text-son transition-[color_.25s]">
            {post.author.username}
          </Link>
        </div>

        {/* Hero image */}
        <figure className="mb-10">
          <Image
            src={post.thumbnail.url}
            alt={`Ảnh minh họa: ${post.title}`}
            width={1200}
            height={750}
            loading="eager"
            className="w-full aspect-3/2 object-cover"
            style={{ filter: "grayscale(1) contrast(1.05) sepia(.08)" }}
          />
          <figcaption className="invisible mt-[.65rem] font-mono text-[.64rem] tracking-[.08em] text-muted-foreground">
            {post.title}
          </figcaption>
        </figure>

        {/* Body */}
        <div className="reader-content" style={{ fontSize: `var(--fs, ${FS[fsLvl]})` }}>
          {paras}
        </div>

        {/* End marker */}
        <div className="flex items-center gap-[1.1rem] my-12">
          <span className="flex-1 h-px bg-border" />
          <em className="font-mono not-italic text-[.64rem] tracking-[.24em] uppercase text-muted-foreground">Hết.</em>
          <span className="flex-1 h-px bg-border" />
        </div>

        {/* Author box */}
        <aside className="flex gap-[1.1rem] items-start border border-border p-[1.3rem] mb-12">
          <span className="shrink-0 w-13.5 h-13.5 grid place-items-center bg-foreground text-background font-serif font-[560] text-[1.1rem] tracking-[.04em]">
            {ini}
          </span>
          <div>
            <Link
              href={`/tac-gia/${post.author.id}`}
              className="font-serif font-[560] text-[1.1rem] transition-[color_.25s] hover:text-son after:content-['→'] after:inline-block after:ml-[.4rem] after:text-[.85em] after:opacity-0 after:-translate-x-1 after:transition-[.25s] hover:after:opacity-100 hover:after:translate-x-0"
            >
              {post.author.username}
            </Link>
            <p className="font-mono text-[.6rem] tracking-[.16em] uppercase text-son my-[.2rem_.2rem_.5rem]">Role</p>
            <p className="text-[.88rem] leading-[1.65] text-muted-foreground">Bio</p>
          </div>
        </aside>

        {/* Related */}
        {related.length > 0 && (
          <aside className="mt-[3.4rem] border-t border-foreground pt-[1.6rem]">
            <p className="font-mono text-[.64rem] tracking-[.18em] uppercase text-son mb-[1.1rem]">Đọc tiếp</p>
            {related.map((q) => (
              <Link
                key={q.slug}
                href={`/bai-viet/${q.slug}`}
                className="flex items-center gap-[1.1rem] w-full text-left border border-border p-[.85rem] mb-[.8rem] transition-[.3s] hover:bg-muted hover:border-foreground group"
              >
                <Image
                  src={q.thumbnail.url}
                  alt=""
                  width={78}
                  height={58}
                  className="object-cover shrink-0 transition-[filter_.4s] group-hover:filter-none"
                  style={{ filter: "grayscale(1)", width: 78, height: 58 }}
                />
                <span className="flex-1 min-w-0">
                  <h5 className="font-serif font-medium text-[1.05rem] leading-[1.3] transition-[color_.25s] group-hover:text-son">
                    {q.title}
                  </h5>
                  <span className="block mt-[.3rem] font-mono text-[.62rem] text-muted-foreground">
                    {q.category.name}
                  </span>
                </span>
              </Link>
            ))}
          </aside>
        )}
      </article>

      {/* Reading toolbar (fixed bottom) */}
      <div
        role="toolbar"
        className="fixed left-1/2 -translate-x-1/2 z-45 flex items-center gap-[.45rem] bg-background border border-foreground p-[.4rem] shadow-[8px_8px_0_color-mix(in_srgb,var(--foreground)_12%,transparent)]"
        style={{ bottom: "calc(14px + env(safe-area-inset-bottom))" }}
        aria-label="Công cụ đọc bài"
      >
        <button
          type="button"
          className="min-w-10 h-10 grid place-items-center border border-border font-mono text-[.78rem] tracking-[.04em] transition-[.25s] px-[.6rem] hover:bg-foreground hover:text-background hover:border-foreground disabled:opacity-30 disabled:cursor-default cursor-pointer"
          disabled={fsLvl === 0}
          onClick={() => setFs(Math.max(0, fsLvl - 1))}
          aria-label="Giảm cỡ chữ"
        >
          A−
        </button>
        <button
          type="button"
          className="min-w-10 h-10 grid place-items-center border border-border font-mono text-[.78rem] tracking-[.04em] transition-[.25s] px-[.6rem] hover:bg-foreground hover:text-background hover:border-foreground disabled:opacity-30 disabled:cursor-default cursor-pointer"
          disabled={fsLvl === FS.length - 1}
          onClick={() => setFs(Math.min(FS.length - 1, fsLvl + 1))}
          aria-label="Tăng cỡ chữ"
        >
          A+
        </button>
        <span className="w-px h-5.5 bg-border mx-1" />
        <button
          type="button"
          className={`min-w-10 h-10 flex items-center gap-1 justify-center border font-mono text-[.78rem] tracking-[.04em] transition-[.25s] px-[.6rem] hover:bg-foreground hover:text-background hover:border-foreground cursor-pointer ${
            isSaved ? "border-son text-son" : "border-border"
          }`}
          aria-pressed={isSaved}
          aria-label={isSaved ? "Bỏ lưu bài viết" : "Lưu bài viết"}
          onClick={() => {
            toggleSave(postRow);
            if (isSaved) toast("Đã bỏ bài viết khỏi danh sách đọc.");
            else toast(`Đã lưu "${post.title}" vào danh sách đọc.`);
          }}
        >
          <Bookmark className="w-4 h-4" fill={isSaved ? "currentColor" : "none"} strokeWidth={1.8} />
          {isSaved ? " Đã lưu" : " Lưu"}
        </button>
        <button
          type="button"
          className="min-w-10 h-10 grid place-items-center border border-border font-mono text-[.78rem] transition-[.25s] px-[.6rem] hover:bg-foreground hover:text-background hover:border-foreground cursor-pointer"
          aria-label="Chép liên kết bài viết"
          onClick={() => {
            const url = `${window.location.origin}/bai-viet/${post.slug}`;
            navigator.clipboard?.writeText(url).then(() => toast("Đã chép liên kết bài viết vào clipboard."));
          }}
        >
          <Link2 className="w-4 h-4" strokeWidth={1.8} />
        </button>
      </div>

      <style>{`
        .reader-content p { line-height: 1.88; margin-bottom: 1.6rem; }
        .reader-content p:first-of-type::first-letter {
          font-family: var(--font-serif); font-weight: 600; font-size: 3.6em;
          float: left; line-height: .82; padding: .06em .12em 0 0; color: var(--son);
        }
      `}</style>
    </>
  );
}
