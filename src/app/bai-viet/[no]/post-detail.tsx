"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useReadingActions, useReadingStore } from "~/components/reading-store";
import { useToast } from "~/components/toast";
import {
  authors,
  getAuthorInitials,
  getRelatedPosts,
  type Post,
} from "~/lib/data";
import { img } from "~/lib/utils";

const FS = ["1.02rem", "1.13rem", "1.26rem"];

export default function PostDetail({ post }: { post: Post }) {
  const author = authors[post.author];
  const related = getRelatedPosts(post);
  const ini = author ? getAuthorInitials(author.name) : "TP";
  const toast = useToast();

  const { toggleSave, setProgress, setLastRead, setFs } = useReadingActions();
  const savedSet = useReadingStore((s) => s.savedSet);
  const fsLvl = useReadingStore((s) => s.fsLvl);
  const isSaved = savedSet.has(post.no);

  // Progress bar
  const progressRef = useRef<HTMLDivElement>(null);
  const lastLSRef = useRef(0);
  const postNo = post.no;

  useEffect(() => {
    function onScroll() {
      const h = document.documentElement;
      const p = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
      if (progressRef.current)
        progressRef.current.style.transform = `scaleX(${p})`;
      const now = Date.now();
      if (now - lastLSRef.current > 400) {
        lastLSRef.current = now;
        if (p > 0.03 && p < 0.97) setLastRead(postNo, p);
        if (p >= 0.95) setProgress(postNo, 1);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [postNo, setLastRead, setProgress]);

  // paras with blockquote inserted
  const paras = [...post.body.map((t) => <p key={t.slice(0, 20)}>{t}</p>)];
  paras.splice(
    2,
    0,
    <blockquote
      key="quote"
      className="my-[2.6rem] pl-[1.6rem] border-l-[3px] border-son font-serif italic font-[440] text-[1.35em] leading-[1.45]"
    >
      "{post.quote}"
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

      <article
        className="max-w-180 mx-auto px-5"
        style={{ padding: "clamp(2.2rem,5vw,3.4rem) 20px 8rem" }}
      >
        {/* Category + issue */}
        <p className="font-mono text-[.68rem] tracking-[.18em] uppercase text-son">
          {post.cat} · № {post.no}
        </p>

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

        {/* Deck */}
        <p
          className="font-serif italic font-[420] leading-[1.55] text-muted-foreground mb-[1.4rem]"
          style={{ fontSize: "clamp(1.05rem,2.4vw,1.3rem)" }}
        >
          {post.dek}
        </p>

        {/* Meta */}
        <div className="font-mono text-[.68rem] tracking-widest uppercase text-muted-foreground pb-[1.6rem] border-b border-border mb-[2.2rem]">
          {post.date}.2025 · {post.read} phút đọc ·{" "}
          <Link
            href={`/tac-gia/${post.author}`}
            className="text-foreground hover:text-son transition-[color_.25s]"
          >
            {author?.name ?? "Tác giả"}
          </Link>
        </div>

        {/* Hero image */}
        <figure className="mb-10">
          <img
            src={img(post.seed, 1200, 750)}
            alt={`Ảnh minh họa: ${post.title}`}
            width={1200}
            height={750}
            className="w-full aspect-[3/2] object-cover"
            style={{ filter: "grayscale(1) contrast(1.05) sepia(.08)" }}
          />
          <figcaption className="mt-[.65rem] font-mono text-[.64rem] tracking-[.08em] text-muted-foreground">
            Ảnh minh họa — TẠP, số № {post.no}
          </figcaption>
        </figure>

        {/* Body */}
        <div
          className="reader-content"
          style={{ fontSize: `var(--fs, ${FS[fsLvl]})` }}
        >
          {paras}
        </div>

        {/* End marker */}
        <div className="flex items-center gap-[1.1rem] my-12">
          <span className="flex-1 h-px bg-border" />
          <em className="font-mono not-italic text-[.64rem] tracking-[.24em] uppercase text-muted-foreground">
            Hết.
          </em>
          <span className="flex-1 h-px bg-border" />
        </div>

        {/* Author box */}
        {author && (
          <aside className="flex gap-[1.1rem] items-start border border-border p-[1.3rem] mb-12">
            <span className="shrink-0 w-13.5 h-13.5 grid place-items-center bg-foreground text-background font-serif font-[560] text-[1.1rem] tracking-[.04em]">
              {ini}
            </span>
            <div>
              <Link
                href={`/tac-gia/${post.author}`}
                className="font-serif font-[560] text-[1.1rem] transition-[color_.25s] hover:text-son after:content-['→'] after:inline-block after:ml-[.4rem] after:text-[.85em] after:opacity-0 after:-translate-x-1 after:transition-[.25s] hover:after:opacity-100 hover:after:translate-x-0"
              >
                {author.name}
              </Link>
              <p className="font-mono text-[.6rem] tracking-[.16em] uppercase text-son my-[.2rem_.2rem_.5rem]">
                {author.role}
              </p>
              <p className="text-[.88rem] leading-[1.65] text-muted-foreground">
                {author.bio}
              </p>
            </div>
          </aside>
        )}

        {/* Related */}
        {related.length > 0 && (
          <aside className="mt-[3.4rem] border-t border-foreground pt-[1.6rem]">
            <p className="font-mono text-[.64rem] tracking-[.18em] uppercase text-son mb-[1.1rem]">
              Đọc tiếp
            </p>
            {related.map((q) => (
              <Link
                key={q.no}
                href={`/bai-viet/${q.no}`}
                className="flex items-center gap-[1.1rem] w-full text-left border border-border p-[.85rem] mb-[.8rem] transition-[.3s] hover:bg-muted hover:border-foreground group"
              >
                <img
                  src={img(q.seed, 160, 120)}
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
                    {q.cat} · № {q.no} · {q.read} phút
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
          className="min-w-10 h-10 grid place-items-center border border-border font-mono text-[.78rem] tracking-[.04em] transition-[.25s] px-[.6rem] hover:bg-foreground hover:text-background hover:border-foreground disabled:opacity-30 disabled:cursor-default"
          disabled={fsLvl === 0}
          onClick={() => setFs(Math.max(0, fsLvl - 1))}
          aria-label="Giảm cỡ chữ"
        >
          A−
        </button>
        <button
          type="button"
          className="min-w-10 h-10 grid place-items-center border border-border font-mono text-[.78rem] tracking-[.04em] transition-[.25s] px-[.6rem] hover:bg-foreground hover:text-background hover:border-foreground disabled:opacity-30 disabled:cursor-default"
          disabled={fsLvl === FS.length - 1}
          onClick={() => setFs(Math.min(FS.length - 1, fsLvl + 1))}
          aria-label="Tăng cỡ chữ"
        >
          A+
        </button>
        <span className="w-px h-5.5 bg-border mx-1" />
        <button
          type="button"
          className={`min-w-10 h-10 flex items-center gap-1 justify-center border font-mono text-[.78rem] tracking-[.04em] transition-[.25s] px-[.6rem] hover:bg-foreground hover:text-background hover:border-foreground ${isSaved ? "border-son text-son" : "border-border"}`}
          aria-pressed={isSaved}
          aria-label={isSaved ? "Bỏ lưu bài viết" : "Lưu bài viết"}
          onClick={() => {
            toggleSave(post.no);
            if (isSaved) toast("Đã bỏ bài viết khỏi danh sách đọc.");
            else toast(`Đã lưu "${post.title}" vào danh sách đọc.`);
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill={isSaved ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
            className="w-4 h-4"
          >
            <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z" />
          </svg>
          {isSaved ? " Đã lưu" : " Lưu"}
        </button>
        <button
          type="button"
          className="min-w-10 h-10 grid place-items-center border border-border font-mono text-[.78rem] transition-[.25s] px-[.6rem] hover:bg-foreground hover:text-background hover:border-foreground"
          aria-label="Chép liên kết bài viết"
          onClick={() => {
            const url = `${window.location.origin}/bai-viet/${post.no}`;
            navigator.clipboard
              ?.writeText(url)
              .then(() => toast("Đã chép liên kết bài viết vào clipboard."));
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
          >
            <path d="M9 17H7A5 5 0 0 1 7 7h2" />
            <path d="M15 7h2a5 5 0 1 1 0 10h-2" />
            <path d="M8 12h8" />
          </svg>
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
