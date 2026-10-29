"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteHeaderNav() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/bai-viet", label: "Bài viết", key: "archive" },
    { href: "/da-luu", label: "Đã lưu", key: "saved" },
  ];

  return (
    <nav className="main-nav hidden md:flex gap-[1.9rem] mx-auto" aria-label="Điều hướng chính">
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
  );
}
