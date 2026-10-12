"use client";

import { useEffect, useState } from "react";
import { useReadingActions, useReadingStore } from "./reading-store";

interface ToastItem {
  id: number;
  msg: string;
  action?: { label: string; fn: () => void };
}

let toastId = 0;
type ToastFn = (
  msg: string,
  action?: { label: string; fn: () => void },
) => void;
let globalToast: ToastFn = () => {};

export function useToast() {
  return globalToast;
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    globalToast = (msg, action) => {
      const id = ++toastId;
      setToasts((prev) => [...prev, { id, msg, action }]);
      const kill = () => setToasts((prev) => prev.filter((t) => t.id !== id));
      setTimeout(kill, action ? 5200 : 3200);
    };
  }, []);

  return (
    <div className="fixed bottom-[calc(1.4rem+env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 z-100 flex flex-col gap-[.6rem] items-center pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="flex items-center gap-3 bg-inverse text-inverse-foreground border-l-[3px] border-son px-[1.3rem] py-[.9rem] shadow-[0_12px_40px_rgba(0,0,0,.3)] animate-[rise_.4s_both] max-w-[min(92vw,520px)]"
        >
          <svg
            className="w-4 h-4 text-son shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
          <span className="text-[.88rem] leading-[1.4]">{t.msg}</span>
          {t.action && (
            <button
              type="button"
              className="ml-[.4rem] pointer-events-auto font-mono text-[.68rem] tracking-[.08em] uppercase text-son underline underline-offset-[3px] whitespace-nowrap"
              onClick={t.action.fn}
            >
              {t.action.label}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

import Link from "next/link";
/* ─── Resume reading bar ─── */
import { getPostByNo } from "~/lib/data";
import { img } from "~/lib/utils";

export function ResumeBar() {
  const lastRead = useReadingStore((s) => s.lastRead);
  const { clearLastRead } = useReadingActions();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (lastRead && lastRead.pct > 0.04 && lastRead.pct < 0.96) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [lastRead]);

  if (!visible || !lastRead) return null;
  const post = getPostByNo(lastRead.no);
  if (!post) return null;

  return (
    <div
      className="fixed bottom-[calc(14px+env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 z-44 flex items-center gap-[.9rem] bg-inverse text-inverse-foreground border border-inverse px-[.8rem] py-[.65rem] shadow-[0_16px_44px_rgba(0,0,0,.32)] cursor-pointer animate-[rsIn_.5s_cubic-bezier(.22,1,.36,1)_both]"
      style={{ width: "min(92vw,640px)" }}
    >
      <Link
        href={`/bai-viet/${post.no}`}
        className="flex items-center gap-[.9rem] flex-1 min-w-0"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img(post.seed, 104, 78)}
          alt=""
          width={52}
          height={39}
          className="object-cover shrink-0"
          style={{ filter: "grayscale(1)", width: 52, height: 39 }}
        />
        <div className="flex-1 min-w-0">
          <span className="block font-mono text-[.58rem] tracking-[.16em] uppercase text-son mb-[.2rem]">
            Tiếp tục đọc · <b>{Math.round(lastRead.pct * 100)}%</b>
          </span>
          <span className="block font-serif font-medium text-[.92rem] whitespace-nowrap overflow-hidden text-ellipsis">
            {post.title}
          </span>
          <span className="block h-0.75 mt-2 bg-[rgba(245,241,232,.22)]">
            <i
              className="block h-full bg-son"
              style={{ width: `${lastRead.pct * 100}%` }}
            />
          </span>
        </div>
      </Link>
      <Link
        href={`/bai-viet/${post.no}`}
        className="shrink-0 w-9.5 h-9.5 grid place-items-center border border-inverse-border text-son transition-[.25s] hover:bg-son hover:border-son hover:text-white"
        aria-label="Tiếp tục đọc"
      >
        <svg
          className="w-3.75 h-3.75"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </Link>
      <button
        type="button"
        className="shrink-0 w-7.5 h-7.5 grid place-items-center text-muted transition-[color_.25s] hover:text-inverse-foreground"
        onClick={() => {
          setVisible(false);
          clearLastRead();
        }}
        aria-label="Ẩn gợi ý tiếp tục đọc"
      >
        <svg
          className="w-3.75 h-3.75"
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
      <style>{`
        @keyframes rsIn { from { opacity:0; transform: translate(-50%,16px); } }
      `}</style>
    </div>
  );
}
