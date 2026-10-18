import { useEffect } from "react";

export function useRevealOnScroll(dependency?: unknown) {
  useEffect(() => {
    void dependency;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12 },
    );

    const elements = document.querySelectorAll(".reveal:not(.in)");
    for (const el of elements) {
      io.observe(el);
    }

    return () => io.disconnect();
  }, [dependency]);
}
