"use client";

import { type ReactNode, useEffect, useState } from "react";
import { SiteHeaderMenuOverlay, SiteHeaderSearchOverlay } from "~/components/layouts/components";
import { HeaderContext } from "~/components/layouts/components/header-context";
import type { Author, Category } from "~/types";

type Props = {
  categories: Category[];
  users: Author[];
  children: ReactNode;
};

export function SiteHeaderProvider({ categories, users, children }: Props) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      const typing = /INPUT|TEXTAREA/.test((document.activeElement as HTMLElement)?.tagName || "");
      if (e.key === "Escape") {
        if (searchOpen) setSearchOpen(false);
        else if (menuOpen) setMenuOpen(false);
      }
      if ((e.key === "/" && !typing) || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k")) {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [searchOpen, menuOpen]);

  useEffect(() => {
    document.body.style.overflow = searchOpen || menuOpen ? "hidden" : "";
  }, [searchOpen, menuOpen]);

  return (
    <HeaderContext.Provider value={{ categories, users, searchOpen, menuOpen, setMenuOpen, setSearchOpen }}>
      {children}
      <SiteHeaderSearchOverlay />
      <SiteHeaderMenuOverlay />
    </HeaderContext.Provider>
  );
}
