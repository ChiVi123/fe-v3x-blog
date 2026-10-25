"use client";

import { ArrowRight, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useReadingActions, useReadingStore } from "~/hooks/use-reading-store";

export function ResumeBar() {
  const lastRead = useReadingStore((s) => s.lastRead);
  const { clearLastRead } = useReadingActions();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (lastRead && lastRead.pct > 0.04 && lastRead.pct < 0.96) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [lastRead]);

  if (!visible || !lastRead) return null;
  const post = lastRead;
  if (!post) return null;

  return (
    <div
      className="fixed bottom-[calc(14px+env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 z-44 flex items-center gap-[.9rem] bg-inverse text-inverse-foreground border border-inverse px-[.8rem] py-[.65rem] shadow-[0_16px_44px_rgba(0,0,0,.32)] cursor-pointer animate-[rsIn_.5s_cubic-bezier(.22,1,.36,1)_both]"
      style={{ width: "min(92vw,640px)" }}
    >
      <Link
        href={`/bai-viet/${post.slug}`}
        className="flex items-center gap-[.9rem] flex-1 min-w-0"
      >
        <Image
          src={post.thumbnail.url}
          alt={post.title}
          width={52}
          height={39}
          className="object-cover shrink-0"
          style={{ filter: "grayscale(1)", width: 52, height: 39 }}
        />
        <div className="flex-1 min-w-0">
          <span className="block font-mono text-[.58rem] tracking-[.16em] uppercase text-son mb-[.2rem]">
            Tiếp tục đọc · <b>{Math.round(lastRead.pct * 100)}%</b>
          </span>
          <span className="block font-serif font-medium text-[.92rem] whitespace-nowrap overflow-hidden text-ellipsis">
            {post.title}
          </span>
          <span className="block h-0.75 mt-2 bg-[rgba(245,241,232,.22)]">
            <i
              className="block h-full bg-son"
              style={{ width: `${lastRead.pct * 100}%` }}
            />
          </span>
        </div>
      </Link>
      <Link
        href={`/bai-viet/${post.slug}`}
        className="shrink-0 w-9.5 h-9.5 grid place-items-center border border-inverse-border text-son transition-[.25s] hover:bg-son hover:border-son hover:text-white"
        aria-label="Tiếp tục đọc"
      >
        <ArrowRight className="w-3.75 h-3.75" strokeWidth={2} />
      </Link>
      <button
        type="button"
        className="shrink-0 w-7.5 h-7.5 grid place-items-center text-muted transition-[color_.25s] hover:text-inverse-foreground cursor-pointer"
        onClick={() => {
          setVisible(false);
          clearLastRead();
        }}
        aria-label="Ẩn gợi ý tiếp tục đọc"
      >
        <X className="w-3.75 h-3.75" strokeWidth={2} />
      </button>
      <style>{`
        @keyframes rsIn { from { opacity:0; transform: translate(-50%,16px); } }
      `}</style>
    </div>
  );
}
