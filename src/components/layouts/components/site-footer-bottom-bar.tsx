"use client";

import { ArrowUp } from "lucide-react";

export function SiteFooterBottomBar() {
  return (
    <div className="flex justify-between items-center gap-4 flex-wrap border-t border-inverse-border pt-[1.4rem] font-mono text-[.64rem] tracking-widest uppercase text-inverse-muted">
      <span>© 2025 TẠP — viết &amp; dàn trang tại Hà Nội</span>
      <span>Mọi bài viết là hư cấu</span>
      <button
        type="button"
        className="inline-flex items-center gap-2 transition-[color_.25s] hover:text-son cursor-pointer"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        Về đầu trang
        <ArrowUp className="w-3.25 h-3.25" strokeWidth={2} />
      </button>
    </div>
  );
}
