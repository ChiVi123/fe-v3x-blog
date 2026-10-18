"use client";

import { usePathname } from "next/navigation";
import { useRevealOnScroll } from "~/hooks/use-reveal-on-scroll";

export function ScrollReveal() {
  const pathname = usePathname();
  useRevealOnScroll(pathname);
  return null;
}
