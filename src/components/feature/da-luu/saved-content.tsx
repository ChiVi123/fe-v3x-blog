"use client";

import { Bookmark } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import PostRow from "~/components/shared/post-row";
import { useReadingActions, useReadingStore } from "~/hooks/use-reading-store";
import { useRevealOnScroll } from "~/hooks/use-reveal-on-scroll";
import { useToast } from "~/hooks/use-toast";

export default function SavedContent() {
  const savedSet = useReadingStore((s) => s.savedSet);
  const { toggleSave } = useReadingActions();
  const toast = useToast();

  const postList = useMemo(() => {
    return Array.from(savedSet.values()).sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }, [savedSet]);

  useRevealOnScroll(postList.length);

  function handleUnsave(id: string) {
    const p = savedSet.get(id);
    if (p) {
      toggleSave(p);
      toast(`Đã bỏ lưu "${p.title}".`, {
        label: "Hoàn tác",
        fn: () => toggleSave(p),
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
          {postList.length} bài · lưu trên máy này
        </span>
      </div>

      {postList.length === 0 ? (
        <div className="border-[1.5px] border-dashed border-border grid place-items-center gap-[.9rem] p-12 text-center mt-6">
          <Bookmark
            className="w-6.5 h-6.5 text-muted-foreground"
            strokeWidth={1.6}
          />
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
          {postList.map((p, i) => (
            <PostRow
              key={p.id}
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
