"use client";

import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { subscribeToasts } from "~/hooks/use-toast";
import type { ToastItem } from "~/types";

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    return subscribeToasts((updatedToasts) => {
      setToasts(updatedToasts);
    });
  }, []);

  return (
    <div className="fixed bottom-[calc(1.4rem+env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 z-100 flex flex-col gap-[.6rem] items-center pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="flex items-center gap-3 bg-inverse text-inverse-foreground border-l-[3px] border-son px-[1.3rem] py-[.9rem] shadow-[0_12px_40px_rgba(0,0,0,.3)] animate-[rise_.4s_both] max-w-[min(92vw,520px)]"
        >
          <Check className="w-4 h-4 text-son shrink-0" strokeWidth={2} />
          <span className="text-[.88rem] leading-[1.4]">{t.msg}</span>
          {t.action && (
            <button
              type="button"
              className="ml-[.4rem] pointer-events-auto font-mono text-[.68rem] tracking-[.08em] uppercase text-son underline underline-offset-[3px] whitespace-nowrap cursor-pointer"
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
