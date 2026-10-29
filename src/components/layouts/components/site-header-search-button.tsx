"use client";

import { Search } from "lucide-react";
import { useContext } from "react";
import { HeaderContext } from "~/components/layouts/components/header-context";

export function SiteHeaderSearchButton() {
  const { setSearchOpen } = useContext(HeaderContext);

  return (
    <button
      type="button"
      id="searchBtn"
      className="flex items-center gap-2 font-mono text-[.68rem] tracking-widest uppercase text-muted-foreground px-[.6rem] py-[.45rem] transition-[color_.25s] hover:text-foreground cursor-pointer"
      onClick={() => setSearchOpen(true)}
      aria-label="Tìm kiếm"
    >
      <Search className="w-3.75 h-3.75" strokeWidth={1.8} />
      <span className="hidden sm:inline">Tìm kiếm</span>
      <kbd className="hidden sm:inline font-mono text-[.62rem] border border-border rounded-[3px] px-[.34rem] py-[.08rem] text-muted-foreground">
        /
      </kbd>
    </button>
  );
}
