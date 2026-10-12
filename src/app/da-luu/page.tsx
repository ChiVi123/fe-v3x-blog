"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import PostRow from "~/components/post-row";
import { useReadingActions, useReadingStore } from "~/components/reading-store";
import { useToast } from "~/components/toast";
import { posts } from "~/lib/data";

export default function SavedPage() {
  const [mounted, setMounted] = useState(false);
  const savedSet = useReadingStore((s) => s.savedSet);
  const { toggleSave } = useReadingActions();
  const toast = useToast();

  useEffect(() => {
    setMounted(true);
  }, []);

  const list = mounted ? posts.filter((p) => savedSet.has(p.no)) : [];

  useEffect(() => {
    if (!mounted) return;
    const io = new IntersectionObserver(
      (es) => {
        for (const e of es)
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
      },
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal:not(.in)").forEach((el) => {
      io.observe(el);
    });
    return () => io.disconnect();
  }, [mounted]);

  function handleUnsave(no: string) {
    const p = posts.find((x) => x.no === no);
    toggleSave(no);
    if (p) {
      toast(`Đã bỏ lưu "${p.title}".`, {
        label: "Hoàn tác",
        fn: () => toggleSave(no),
      });
    }
  }

  return (
    <div className="wrapper" style={{ paddingTop: "clamp(2.2rem,5vw,3.4rem)" }}>
      <div className="flex justify-between items-end gap-6 flex-wrap border-b border-foreground pb-[1.3rem] mb-[.4rem]">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-[.72rem] tracking-widest text-son">
            (02)
          </span>
          <h1
            className="font-serif font-medium tracking-[-0.01em]"
            style={{
              fontVariationSettings: '"opsz" 100',
              fontSize: "clamp(1.8rem,3.4vw,2.7rem)",
            }}
          >
            Đã lưu
          </h1>
        </div>
        <span className="font-mono text-[.66rem] tracking-[.12em] uppercase text-muted-foreground">
          {list.length} bài · lưu trên máy này
        </span>
      </div>

      {list.length === 0 ? (
        <div className="border-[1.5px] border-dashed border-border grid place-items-center gap-[.9rem] p-12 text-center mt-6">
          <svg
            className="w-6.5 h-6.5 text-muted-foreground"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          >
            <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z" />
          </svg>
          <p className="text-[.95rem] text-muted-foreground max-w-[34ch] leading-[1.6]">
            Chưa có bài nào được lưu. Chạm hình dấu bookmark ở bất kỳ bài viết
            để giữ lại đọc sau.
          </p>
          <Link
            href="/bai-viet"
            className="inline-flex items-center gap-[.6rem] font-mono text-[.7rem] tracking-[.12em] uppercase px-[1.4rem] py-[.9rem] border border-foreground transition-[.3s] hover:bg-foreground hover:text-background"
          >
            Khám phá bài viết
          </Link>
        </div>
      ) : (
        <div>
          {list.map((p, i) => (
            <PostRow
              key={p.no}
              post={p}
              index={i}
              showUnsave
              onUnsave={handleUnsave}
            />
          ))}
        </div>
      )}

      <style>{`
        @keyframes rise { from { opacity:0; transform:translateY(26px) } to { opacity:1; transform:none } }
        .reveal { opacity: 0; }
        .reveal.in { opacity: 1; animation: rise .9s cubic-bezier(.22,1,.36,1) both; }
      `}</style>
    </div>
  );
}
