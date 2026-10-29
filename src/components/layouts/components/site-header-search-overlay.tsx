"use client";

import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { HeaderContext } from "~/components/layouts/components/header-context";
import { dateFormat } from "~/lib/utils";
import type { PostRow } from "~/types";

export function SiteHeaderSearchOverlay() {
  const { searchOpen, setSearchOpen } = useContext(HeaderContext);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [q, setQ] = useState("");
  const [results, _setResults] = useState<PostRow[]>([]);
  const [recents, setRecents] = useState<string[]>([]);

  const SUG = [
    ["im lặng", "im lặng"],
    ["Hà Nội", "Hà Nội"],
    ["bút chì", "bút chì"],
    ["sach", "sach — tìm không dấu"],
  ] as const;

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        setRecents(JSON.parse(localStorage.getItem("tap-recent") || "[]"));
      } catch {}
    }
  }, []);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 60);
      setQ("");
    }
  }, [searchOpen]);

  function handleSearch(v: string) {
    setQ(v);
  }

  function addRecent(query: string) {
    if (!query) return;
    const next = [query, ...recents.filter((x) => x !== query)].slice(0, 5);
    setRecents(next);
    try {
      localStorage.setItem("tap-recent", JSON.stringify(next));
    } catch {}
  }

  function handleClose() {
    setSearchOpen(false);
  }

  function go(slug: string) {
    addRecent(q);
    handleClose();
    router.push(`/bai-viet/${slug}`);
  }

  if (!searchOpen) return null;

  const hints = q === "" && recents.length > 0 ? recents.map((r) => [r, r] as const) : SUG;

  return (
    <div id="search" className="fixed inset-0 z-90" role="dialog" aria-label="Tìm kiếm bài viết">
      <button
        type="button"
        aria-label="Đóng tìm kiếm"
        className="absolute inset-0 bg-[rgba(12,10,8,.55)] backdrop-blur-[6px] animate-[fade_.3s_both] w-full h-full cursor-default"
        onClick={handleClose}
      />
      <div className="relative max-w-165 mx-4 mt-[11vh] bg-background border border-foreground shadow-[0_30px_80px_rgba(0,0,0,.4)] animate-[panel_.35s_cubic-bezier(.22,1,.36,1)_both]">
        {/* head */}
        <div className="flex items-center gap-[.9rem] px-5 py-[1.05rem] border-b border-foreground">
          <Search className="w-4.75 h-4.75 text-son shrink-0" strokeWidth={1.8} />
          <input
            ref={inputRef}
            id="searchInput"
            className="flex-1 bg-transparent border-none outline-none font-serif font-[460] text-[1.45rem] text-foreground placeholder:text-muted-foreground"
            placeholder="Tìm bài viết, chuyên mục, ý nghĩ…"
            autoComplete="off"
            value={q}
            onChange={(e) => handleSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && results.length) go(results[0].slug);
            }}
          />
          <button
            type="button"
            className="w-8.5 h-8.5 grid place-items-center border border-border transition-[border-color_.25s] hover:border-foreground cursor-pointer"
            onClick={handleClose}
            aria-label="Đóng tìm kiếm"
          >
            <X className="w-4 h-4" strokeWidth={1.8} />
          </button>
        </div>
        {/* hints */}
        <div className="flex items-center gap-2 flex-wrap px-5 py-[.9rem] border-b border-border font-mono text-[.64rem] tracking-widest uppercase text-muted-foreground">
          <span>{q === "" && recents.length > 0 ? "Gần đây:" : "Thử:"}</span>
          {hints.map(([val, label]) => (
            <button
              type="button"
              key={val}
              className="font-mono text-[.64rem] tracking-[.08em] border border-border rounded-full px-[.8rem] py-[.32rem] text-muted-foreground transition-[.25s] hover:bg-foreground hover:border-foreground hover:text-background cursor-pointer"
              onClick={() => {
                handleSearch(val);
                inputRef.current?.focus();
              }}
            >
              {label}
            </button>
          ))}
        </div>
        {/* results */}
        <div className="max-h-[46vh] overflow-auto" id="searchResults">
          {results.length === 0 ? (
            <p className="px-5 py-[2.2rem] font-mono text-[.72rem] text-muted-foreground">
              Không tìm thấy bài nào cho &ldquo;{q}&rdquo; — thử một từ khác, hoặc tìm không cần dấu.
            </p>
          ) : (
            results.map((p) => (
              <button
                type="button"
                key={p.id}
                className="flex justify-between items-center gap-4 w-full text-left px-5 py-4 border-b border-border transition-[background_.25s] hover:bg-muted cursor-pointer"
                onClick={() => go(p.slug)}
              >
                <span>
                  <span className="block font-mono text-[.6rem] tracking-[.13em] uppercase text-son mb-1">
                    {p.category.name}
                  </span>
                  <span className="font-serif font-medium text-[1.05rem]">{p.title}</span>
                </span>
                <span className="font-mono text-[.64rem] text-muted-foreground whitespace-nowrap">
                  {dateFormat(p.createdAt)}
                </span>
              </button>
            ))
          )}
        </div>
        <div className="flex justify-between px-5 py-[.8rem] font-mono text-[.6rem] tracking-[.12em] uppercase text-muted-foreground">
          <span>
            <kbd className="font-mono text-[.62rem] border border-border rounded-[3px] px-[.34rem] py-[.08rem]">
              ESC
            </kbd>{" "}
            đóng
          </span>
          <span>
            <kbd className="font-mono text-[.62rem] border border-border rounded-[3px] px-[.34rem] py-[.08rem]">↵</kbd>{" "}
            mở kết quả đầu tiên
          </span>
        </div>
      </div>
    </div>
  );
}
