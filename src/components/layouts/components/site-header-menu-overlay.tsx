"use client";

import { Moon, Sun, X } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useContext, useEffect, useState } from "react";
import { HeaderContext } from "~/components/layouts/components/header-context";
import { useReadingStore } from "~/hooks/use-reading-store";

export function SiteHeaderMenuOverlay() {
  const { categories, users, menuOpen, setMenuOpen } = useContext(HeaderContext);
  const savedCount = useReadingStore((s) => s.savedSet.size);

  const handleClose = () => {
    setMenuOpen(false);
  };

  if (!menuOpen) return null;

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
            type="button"
            className="w-9.5 h-9.5 grid place-items-center border border-inverse-border transition-[.25s] hover:border-son hover:text-son hover:rotate-90 cursor-pointer"
            onClick={handleClose}
            aria-label="Đóng mục lục"
          >
            <X className="w-4 h-4" strokeWidth={2} />
          </button>
        </div>
        <nav className="flex-1 pt-8">
          <Link href="/" className="menu-m-link" onClick={handleClose}>
            <span>Trang chủ</span>
          </Link>
          <Link href="/bai-viet" className="menu-m-link" onClick={handleClose}>
            <span>Bài viết</span>
          </Link>
          <Link href="/da-luu" className="menu-m-link" onClick={handleClose}>
            <span>Đã lưu</span>
            <span className="menu-m-cnt">{savedCount}</span>
          </Link>
          <p className="font-mono text-[.6rem] tracking-[.22em] uppercase text-inverse-muted mt-1.8 mb-[.3rem]">
            Chuyên mục
          </p>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/bai-viet?category=${encodeURIComponent(cat.id)}`}
              className="menu-m-link"
              onClick={handleClose}
            >
              <span>{cat.name}</span>
              <span className="menu-m-cnt">{cat.postsCount}</span>
            </Link>
          ))}
          <p className="font-mono text-[.6rem] tracking-[.22em] uppercase text-inverse-muted mt-[1.8rem] mb-[.3rem]">
            Tác giả
          </p>
          {users.map((user) => (
            <Link key={user.id} href={`/tac-gia/${user.id}`} className="menu-m-link" onClick={handleClose}>
              <span>{user.username}</span>
              <span className="menu-m-cnt">NaN bài</span>
            </Link>
          ))}
          <Link href="/#dang-ky" className="menu-m-link" onClick={handleClose}>
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
  const { theme, setTheme } = useTheme();
  const [dark, setDark] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    if (!theme) {
      return;
    }

    let isDark = false;
    if (theme === "system") {
      isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    } else {
      isDark = theme === "dark";
    }
    setDark(isDark);
  }, [theme]);

  function toggle() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <button
      type="button"
      className="inline-flex items-center gap-[.6rem] border-[1.5px] border-inverse-border rounded-full px-[1.1rem] py-[.7rem] font-mono text-[.66rem] tracking-[.12em] uppercase text-inverse-muted transition-[.25s] hover:border-son hover:text-inverse-foreground cursor-pointer"
      onClick={toggle}
    >
      <Sun className="w-3.25 h-3.25" strokeWidth={2} />
      Giao diện <b className="text-son font-medium">{dark ? "Tối" : "Sáng"}</b>
      <Moon className="w-3.25 h-3.25" strokeWidth={2} />
    </button>
  );
}
