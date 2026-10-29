"use client";

import { Bookmark } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useReadingStore } from "~/hooks/use-reading-store";

export function SiteHeaderBookmark() {
  const [mounted, setMounted] = useState(false);
  const savedCount = useReadingStore((s) => s.savedSet.size);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Link
      href="/da-luu"
      id="savedBtn"
      className="relative w-8.5 h-8.5 grid place-items-center border border-border transition-[border-color_.25s] hover:border-foreground"
      aria-label="Bài đã lưu"
    >
      <Bookmark className="w-4 h-4" strokeWidth={1.8} />
      {mounted && savedCount > 0 && (
        <span className="absolute -top-1.75 -right-1.75 min-w-4 h-4 rounded-full bg-son text-white font-mono font-semibold text-[9px] leading-4 text-center px-1">
          {savedCount}
        </span>
      )}
    </Link>
  );
}
