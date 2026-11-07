"use client";

import { useEffect, useRef, useState } from "react";
import Image from "~/components/shared/image";
import { optimizeCloudinaryUrl } from "~/lib/utils";

// 450px ensures razor-sharp quality on Retina (2x) displays while staying under ~40KB
const PREVIEW_WIDTH = 450;

export function HoverPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(hover:hover) and (pointer:fine)").matches) return;

    const pv = ref.current;
    if (!pv) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let tx = 0;
    let ty = 0;
    let px = 0;
    let py = 0;
    let sc = 0.85;
    let tsc = 0.85;
    let curRow: HTMLElement | null = null;
    let animId: number | null = null;
    let isRunning = false;
    let isInitialized = false;

    function updateTargetPos(e: PointerEvent) {
      const flip = e.clientX + 340 > window.innerWidth;
      const targetX = flip ? e.clientX - 332 : e.clientX + 32;
      const targetY = Math.min(Math.max(e.clientY - 100, 12), window.innerHeight - 212);

      tx = targetX;
      ty = targetY;

      if (!isInitialized) {
        px = targetX;
        py = targetY;
        isInitialized = true;
      }
    }

    function startLoop() {
      if (isRunning) return;
      isRunning = true;
      animId = requestAnimationFrame(loop);
    }

    function loop() {
      const vel = tx - px;
      px += vel * 0.13;
      py += (ty - py) * 0.13;
      sc += (tsc - sc) * 0.15;

      // Disable tilt and scale if user prefers reduced motion
      const deg = prefersReducedMotion ? 0 : Math.max(-9, Math.min(9, vel * 0.12));
      const currentScale = prefersReducedMotion ? 1 : sc;

      if (pv) {
        pv.style.transform = `translate3d(${px}px,${py}px,0) rotate(${deg}deg) scale(${currentScale})`;
      }

      // Stop the animation loop when idle (preview is hidden and physics settled)
      if (!curRow && Math.abs(vel) < 0.1 && Math.abs(ty - py) < 0.1 && Math.abs(tsc - sc) < 0.01) {
        isRunning = false;
        animId = null;
        return;
      }

      animId = requestAnimationFrame(loop);
    }

    function hidePreview() {
      if (!curRow) return;
      curRow = null;
      tsc = 0.85;
      pv?.classList.remove("opacity-100");
      pv?.classList.add("opacity-0");
    }

    function onPointerOver(e: PointerEvent) {
      // Ignore touch events on hybrid / touchscreen devices
      if (e.pointerType === "touch") return;

      const target = e.target as HTMLElement | null;
      const r = target?.closest(".row") as HTMLElement | null;

      if (r && r !== curRow) {
        curRow = r;
        const imageUrl = r.dataset.img;

        if (imageUrl) {
          const optimized = optimizeCloudinaryUrl(imageUrl, PREVIEW_WIDTH);
          setImageSrc(optimized);
          tsc = 1;
          pv?.classList.add("opacity-100");
          pv?.classList.remove("opacity-0");
          startLoop();
        } else {
          setImageSrc("/placeholder-image.jpg");
          tsc = 1;
          pv?.classList.add("opacity-100");
          pv?.classList.remove("opacity-0");
          startLoop();
        }
      } else if (!r && curRow) {
        hidePreview();
      }
    }

    function onPointerMove(e: PointerEvent) {
      if (e.pointerType === "touch") return;
      updateTargetPos(e);
      if (curRow && !isRunning) {
        startLoop();
      }
    }

    // Hide preview immediately when user scrolls or changes window focus
    window.addEventListener("scroll", hidePreview, { passive: true });
    window.addEventListener("blur", hidePreview);
    document.addEventListener("pointerover", onPointerOver);
    document.addEventListener("pointermove", onPointerMove);

    return () => {
      window.removeEventListener("scroll", hidePreview);
      window.removeEventListener("blur", hidePreview);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointermove", onPointerMove);
      if (animId !== null) {
        cancelAnimationFrame(animId);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="fixed top-0 left-0 w-75 h-50 z-40 pointer-events-none overflow-hidden border border-foreground shadow-[12px_12px_0_color-mix(in_srgb,var(--foreground)_12%,transparent)] opacity-0 transition-opacity duration-300 hidden md:block will-change-transform"
    >
      {imageSrc && (
        <Image src={imageSrc} alt="" fill sizes="300px" loading="eager" className="w-full h-full object-cover" />
      )}
    </div>
  );
}

export default HoverPreview;
