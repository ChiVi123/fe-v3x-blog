"use client";

import { useContext } from "react";
import { HeaderContext } from "~/components/layouts/components/header-context";

/* burger (mobile) */
export function SiteHeaderMenuMobile() {
  const { setMenuOpen } = useContext(HeaderContext);
  return (
    <button
      type="button"
      className="burger-btn md:hidden flex-col gap-1 w-5 p-1 flex cursor-pointer"
      style={{ display: "flex" }}
      id="menuBtn"
      onClick={() => setMenuOpen(true)}
      aria-label="Mở mục lục"
    >
      <i className="block h-0.5 bg-foreground w-full" />
      <i className="block h-0.5 bg-foreground w-full" />
      <i className="block h-0.5 bg-foreground w-full" />
    </button>
  );
}
