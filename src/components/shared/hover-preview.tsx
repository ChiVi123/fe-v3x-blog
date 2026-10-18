"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { getPostByNo } from "~/lib/data";
import { img } from "~/lib/utils";

export function HoverPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const [imageSrc, setImageSrc] = useState<string>("/placeholder-image.jpg");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(hover:hover) and (pointer:fine)").matches) return;

    const pv = ref.current;
    if (!pv) return;

    let tx = 0;
    let ty = 0;
    let px = 0;
    let py = 0;
    let sc = 0.85;
    let tsc = 0.85;
    let curRow: HTMLElement | null = null;
    let animId: number;

    function onPointerOver(e: PointerEvent) {
      const target = e.target as HTMLElement | null;
      const r = target?.closest(".row") as HTMLElement | null;
      if (r && r !== curRow) {
        curRow = r;
        const no = r.dataset.no;
        if (no) {
          const post = getPostByNo(no);
          if (post) {
            setImageSrc(img(post.seed, 600, 400));
            tsc = 1;
            pv?.classList.add("opacity-100");
            pv?.classList.remove("opacity-0");
          }
        }
      } else if (!r && curRow) {
        curRow = null;
        tsc = 0.85;
        pv?.classList.remove("opacity-100");
        pv?.classList.add("opacity-0");
        setImageSrc("/placeholder-image.jpg");
      }
    }

    function onPointerMove(e: PointerEvent) {
      const flip = e.clientX + 340 > window.innerWidth;
      tx = flip ? e.clientX - 332 : e.clientX + 32;
      ty = Math.min(Math.max(e.clientY - 100, 12), window.innerHeight - 212);
    }

    function loop() {
      const vel = tx - px;
      px += vel * 0.13;
      py += (ty - py) * 0.13;
      sc += (tsc - sc) * 0.15;
      const deg = Math.max(-9, Math.min(9, vel * 0.12));
      if (pv) {
        pv.style.transform = `translate3d(${px}px,${py}px,0) rotate(${deg}deg) scale(${sc})`;
      }
      animId = requestAnimationFrame(loop);
    }

    document.addEventListener("pointerover", onPointerOver);
    document.addEventListener("pointermove", onPointerMove);
    animId = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="fixed top-0 left-0 w-75 h-50 z-40 pointer-events-none overflow-hidden border border-foreground shadow-[12px_12px_0_color-mix(in_srgb,var(--foreground)_12%,transparent)] opacity-0 transition-opacity duration-300 hidden md:block"
    >
      <Image
        src={imageSrc}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="w-full h-full object-cover"
      />
    </div>
  );
}
