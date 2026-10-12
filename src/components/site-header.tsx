"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { authors, posts } from "~/lib/data";
import { deaccent } from "~/lib/utils";
import { useReadingStore } from "./reading-store";

/* ─── SearchOverlay ─── */
function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [q, setQ] = useState("");
  const [results, setResults] = useState(posts.slice(0, 4));
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
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 60);
      setQ("");
      setResults(posts.slice(0, 4));
    }
  }, [open]);

  function handleSearch(v: string) {
    setQ(v);
    setResults(
      v
        ? posts.filter((p) =>
            deaccent(`${p.title} ${p.cat}`).includes(deaccent(v)),
          )
        : posts.slice(0, 4),
    );
  }

  function addRecent(query: string) {
    if (!query) return;
    const next = [query, ...recents.filter((x) => x !== query)].slice(0, 5);
    setRecents(next);
    try {
      localStorage.setItem("tap-recent", JSON.stringify(next));
    } catch {}
  }

  function go(no: string) {
    addRecent(q);
    onClose();
    window.location.href = `/bai-viet/${no}`;
  }

  if (!open) return null;

  const hints =
    q === "" && recents.length > 0 ? recents.map((r) => [r, r] as const) : SUG;

  return (
    <div
      id="search"
      className="fixed inset-0 z-90"
      role="dialog"
      aria-label="Tìm kiếm bài viết"
    >
      <button
        type="button"
        aria-label="Đóng tìm kiếm"
        className="absolute inset-0 bg-[rgba(12,10,8,.55)] backdrop-blur-[6px] animate-[fade_.3s_both] w-full h-full cursor-default"
        onClick={onClose}
      />
      <div className="relative max-w-165 mx-4 mt-[11vh] bg-background border border-foreground shadow-[0_30px_80px_rgba(0,0,0,.4)] animate-[panel_.35s_cubic-bezier(.22,1,.36,1)_both]">
        {/* head */}
        <div className="flex items-center gap-[.9rem] px-5 py-[1.05rem] border-b border-foreground">
          <svg
            className="w-4.75 h-4.75 text-son shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            ref={inputRef}
            id="searchInput"
            className="flex-1 bg-transparent border-none outline-none font-serif font-[460] text-[1.45rem] text-foreground placeholder:text-muted-foreground"
            placeholder="Tìm bài viết, chuyên mục, ý nghĩ…"
            autoComplete="off"
            value={q}
            onChange={(e) => handleSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && results.length) go(results[0].no);
            }}
          />
          <button
            className="w-8.5 h-8.5 grid place-items-center border border-border transition-[border-color_.25s] hover:border-foreground"
            onClick={onClose}
            aria-label="Đóng tìm kiếm"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
        {/* hints */}
        <div className="flex items-center gap-2 flex-wrap px-5 py-[.9rem] border-b border-border font-mono text-[.64rem] tracking-widest uppercase text-muted-foreground">
          <span>{q === "" && recents.length > 0 ? "Gần đây:" : "Thử:"}</span>
          {hints.map(([val, label]) => (
            <button
              key={val}
              className="font-mono text-[.64rem] tracking-[.08em] border border-border rounded-full px-[.8rem] py-[.32rem] text-muted-foreground transition-[.25s] hover:bg-foreground hover:border-foreground hover:text-background"
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
              Không tìm thấy bài nào cho &ldquo;{q}&rdquo; — thử một từ khác,
              hoặc tìm không cần dấu.
            </p>
          ) : (
            results.map((p) => (
              <button
                key={p.no}
                className="flex justify-between items-center gap-4 w-full text-left px-5 py-4 border-b border-border transition-[background_.25s] hover:bg-muted"
                onClick={() => go(p.no)}
              >
                <span>
                  <span className="block font-mono text-[.6rem] tracking-[.13em] uppercase text-son mb-1">
                    {p.cat} · № {p.no}
                  </span>
                  <span className="font-serif font-medium text-[1.05rem]">
                    {p.title}
                  </span>
                </span>
                <span className="font-mono text-[.64rem] text-muted-foreground whitespace-nowrap">
                  {p.date} · {p.read}'
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
            <kbd className="font-mono text-[.62rem] border border-border rounded-[3px] px-[.34rem] py-[.08rem]">
              ↵
            </kbd>{" "}
            mở kết quả đầu tiên
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── MenuOverlay ─── */
function MenuOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const savedCount = useReadingStore((s) => s.savedSet.size);

  if (!open) return null;

  return (
    <div
      id="menu"
      className="fixed inset-0 z-95 bg-inverse text-inverse-foreground overflow-y-auto"
      style={{ transition: ".4s cubic-bezier(.22,1,.36,1)" }}
      role="dialog"
      aria-label="Mục lục"
    >
      <div className="max-w-310 mx-auto px-[clamp(20px,4.5vw,56px)] pb-12 min-h-full flex flex-col">
        <div className="flex justify-between items-center h-(--header-h)">
          <span
            className="font-serif font-[620] text-[1.5rem] tracking-[-0.02em]"
            style={{ fontVariationSettings: '"opsz" 60' }}
          >
            TẠP<span style={{ color: "var(--son)" }}>.</span>
          </span>
          <button
            className="w-9.5 h-9.5 grid place-items-center border border-inverse-border transition-[.25s] hover:border-son hover:text-son hover:rotate-90"
            onClick={onClose}
            aria-label="Đóng mục lục"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
        <nav className="flex-1 pt-8">
          <Link href="/" className="menu-m-link" onClick={onClose}>
            <span>Trang chủ</span>
            <span className="menu-m-cnt">Số 07</span>
          </Link>
          <Link href="/bai-viet" className="menu-m-link" onClick={onClose}>
            <span>Bài viết</span>
            <span className="menu-m-cnt">{posts.length}</span>
          </Link>
          <Link href="/da-luu" className="menu-m-link" onClick={onClose}>
            <span>Đã lưu</span>
            <span className="menu-m-cnt">{savedCount}</span>
          </Link>
          <p className="font-mono text-[.6rem] tracking-[.22em] uppercase text-inverse-muted mt-1.8 mb-[.3rem]">
            Chuyên mục
          </p>
          {["Tùy bút", "Sách", "Đời thường", "Xã hội"].map((cat) => (
            <Link
              key={cat}
              href={`/bai-viet?cat=${encodeURIComponent(cat)}`}
              className="menu-m-link"
              onClick={onClose}
            >
              <span>{cat}</span>
              <span className="menu-m-cnt">
                {posts.filter((p) => p.cat === cat).length}
              </span>
            </Link>
          ))}
          <p className="font-mono text-[.6rem] tracking-[.22em] uppercase text-inverse-muted mt-[1.8rem] mb-[.3rem]">
            Tác giả
          </p>
          {Object.entries(authors).map(([id, a]) => (
            <Link
              key={id}
              href={`/tac-gia/${id}`}
              className="menu-m-link"
              onClick={onClose}
            >
              <span>{a.name}</span>
              <span className="menu-m-cnt">
                {posts.filter((p) => p.author === id).length} bài
              </span>
            </Link>
          ))}
          <Link href="/#dang-ky" className="menu-m-link" onClick={onClose}>
            <span>Thư tuần san</span>
            <span className="menu-m-cnt">1.247</span>
          </Link>
        </nav>
        <div className="flex justify-between items-center flex-wrap gap-4 pt-[2.4rem]">
          <ThemeTogglePill />
          <a
            className="font-mono text-[.7rem] tracking-widest text-inverse-muted transition-[color_.25s] hover:text-son"
            href="mailto:toasoan@tap.blog"
          >
            toasoan@tap.blog
          </a>
        </div>
      </div>
    </div>
  );
}

function ThemeTogglePill() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    document.documentElement.classList.toggle("dark");
    const isDark = document.documentElement.classList.contains("dark");
    setDark(isDark);
    try {
      localStorage.setItem("tap-theme", isDark ? "dark" : "light");
    } catch {}
  }

  return (
    <button
      className="inline-flex items-center gap-[.6rem] border-[1.5px] border-inverse-border rounded-full px-[1.1rem] py-[.7rem] font-mono text-[.66rem] tracking-[.12em] uppercase text-inverse-muted transition-[.25s] hover:border-son hover:text-inverse-foreground"
      onClick={toggle}
    >
      <svg
        className="w-3.25 h-3.25"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
      </svg>
      Giao diện <b className="text-son font-medium">{dark ? "Tối" : "Sáng"}</b>
      <svg
        className="w-3.25 h-3.25"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </svg>
    </button>
  );
}

/* ─── ThemeBtn (header) ─── */
function ThemeBtnHead() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    document.documentElement.classList.toggle("dark");
    const isDark = document.documentElement.classList.contains("dark");
    setDark(isDark);
    try {
      localStorage.setItem("tap-theme", isDark ? "dark" : "light");
    } catch {}
  }

  return (
    <button
      className="relative w-8.5 h-8.5 grid place-items-center border border-border transition-[border-color_.25s] hover:border-foreground theme-btn-head"
      onClick={toggle}
      aria-label="Đổi giao diện sáng / tối"
    >
      <svg
        className={`icon-moon w-4 h-4 absolute transition-[.45s_cubic-bezier(.5,1.6,.4,1)] ${dark ? "opacity-0 -rotate-90 scale-[.4]" : "opacity-100"}`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </svg>
      <svg
        className={`icon-sun w-4 h-4 absolute transition-[.45s_cubic-bezier(.5,1.6,.4,1)] ${dark ? "opacity-100" : "opacity-0 rotate-90 scale-[.4]"}`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    </button>
  );
}

/* ─── SiteHeader ─── */
export default function SiteHeader() {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const savedCount = useReadingStore((s) => s.savedSet.size);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      const typing = /INPUT|TEXTAREA/.test(
        (document.activeElement as HTMLElement)?.tagName || "",
      );
      if (e.key === "Escape") {
        if (searchOpen) setSearchOpen(false);
        else if (menuOpen) setMenuOpen(false);
      }
      if (
        (e.key === "/" && !typing) ||
        ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k")
      ) {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [searchOpen, menuOpen]);

  // Lock body scroll when overlays open
  useEffect(() => {
    document.body.style.overflow = searchOpen || menuOpen ? "hidden" : "";
  }, [searchOpen, menuOpen]);

  const navLinks = [
    { href: "/bai-viet", label: "Bài viết", key: "archive" },
    { href: "/da-luu", label: "Đã lưu", key: "saved" },
  ];

  return (
    <>
      <header
        className="site-head sticky top-0 z-50 border-b border-border"
        style={{
          background: "color-mix(in srgb,var(--background) 86%,transparent)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="wrapper flex items-center gap-[1.6rem] h-(--header-h)">
          {/* burger (mobile) */}
          <button
            className="burger-btn md:hidden flex-col gap-1 w-5 p-1 flex"
            style={{ display: "flex" }}
            id="menuBtn"
            onClick={() => setMenuOpen(true)}
            aria-label="Mở mục lục"
          >
            <i className="block h-0.5 bg-foreground w-full" />
            <i className="block h-0.5 bg-foreground w-full" />
            <i className="block h-0.5 bg-foreground w-full" />
          </button>

          {/* logo */}
          <Link
            className="font-serif font-[620] text-[1.5rem] tracking-[-0.02em] shrink-0"
            href="/"
            style={{ fontVariationSettings: '"opsz" 60' }}
          >
            TẠP<span style={{ color: "var(--son)" }}>.</span>
          </Link>

          {/* nav (desktop) */}
          <nav
            className="main-nav hidden md:flex gap-[1.9rem] mx-auto"
            aria-label="Điều hướng chính"
          >
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`font-mono text-[.68rem] tracking-[.14em] uppercase transition-[color_.25s] py-[.4rem] border-b-2 ${
                  pathname.startsWith(href)
                    ? "text-foreground border-son"
                    : "text-muted-foreground border-transparent hover:text-son"
                }`}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/#dang-ky"
              className="font-mono text-[.68rem] tracking-[.14em] uppercase text-muted-foreground transition-[color_.25s] py-[.4rem] border-b-2 border-transparent hover:text-son"
            >
              Thư tuần san
            </Link>
          </nav>

          {/* actions */}
          <div className="head-actions flex items-center gap-[.9rem] ml-auto">
            <button
              id="searchBtn"
              className="flex items-center gap-2 font-mono text-[.68rem] tracking-widest uppercase text-muted-foreground px-[.6rem] py-[.45rem] transition-[color_.25s] hover:text-foreground"
              onClick={() => setSearchOpen(true)}
              aria-label="Tìm kiếm"
            >
              <svg
                className="w-3.75 h-3.75"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <span className="hidden sm:inline">Tìm kiếm</span>
              <kbd className="hidden sm:inline font-mono text-[.62rem] border border-border rounded-[3px] px-[.34rem] py-[.08rem] text-muted-foreground">
                /
              </kbd>
            </button>
            <Link
              href="/da-luu"
              id="savedBtn"
              className="relative w-8.5 h-8.5 grid place-items-center border border-border transition-[border-color_.25s] hover:border-foreground"
              aria-label="Bài đã lưu"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              >
                <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z" />
              </svg>
              {mounted && savedCount > 0 && (
                <span className="absolute -top-1.75 -right-1.75 min-w-4 h-4 rounded-full bg-son text-white font-mono font-semibold text-[9px] leading-4 text-center px-1">
                  {savedCount}
                </span>
              )}
            </Link>
            <ThemeBtnHead />
            <Link
              className="hidden md:inline-flex font-mono text-[.68rem] tracking-widest uppercase bg-foreground text-background px-[1.1rem] py-[.62rem] transition-[background_.25s] hover:bg-son hover:text-white"
              href="/#dang-ky"
            >
              Đăng ký
            </Link>
          </div>
        </div>
      </header>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />

      <style>{`
        @media (min-width: 860px) { .burger-btn { display: none !important; } }
        @media (max-width: 859px) { .main-nav { display: none !important; } .theme-btn-head { display: none !important; } }
        .menu-m-link {
          display: flex; justify-content: space-between; align-items: baseline;
          gap: 1rem; width: 100%; text-align: left;
          padding: .85rem 0; border-bottom: 1px solid var(--inverse-border);
          font-family: var(--font-serif); font-weight: 480;
          font-variation-settings: "opsz" 100;
          font-size: clamp(1.4rem,4vw,2.2rem); letter-spacing: -.01em;
          color: var(--inverse-foreground);
          transition: .25s;
        }
        .menu-m-link:hover { color: var(--son); padding-left: .6rem; }
        .menu-m-cnt {
          font-family: var(--font-mono); font-size: .68rem;
          letter-spacing: .1em; color: var(--inverse-muted);
        }
        .menu-m-link:hover .menu-m-cnt { color: var(--son); }
        @keyframes fade { from { opacity: 0 } }
        @keyframes panel { from { opacity: 0; transform: translateY(18px) } }
      `}</style>
    </>
  );
}
