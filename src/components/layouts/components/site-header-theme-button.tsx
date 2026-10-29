"use client";

import { cn } from "cn";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Skeleton } from "~/components/ui/skeleton";

export function SiteHeaderThemeButton() {
  const { theme, setTheme } = useTheme();
  const [dark, setDark] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    if (!theme) {
      return;
    }

    let isDark = false;
    if (theme === "system") {
      isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    } else {
      isDark = theme === "dark";
    }
    setDark(isDark);
  }, [theme]);

  function toggle() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  if (dark === undefined) {
    return (
      <div className="grid place-items-center size-8.5 border border-border">
        <Skeleton className="size-4 rounded-full" />
      </div>
    );
  }

  return (
    <button
      type="button"
      className="relative w-8.5 h-8.5 grid place-items-center border border-border transition-[border-color_.25s] hover:border-foreground theme-btn-head cursor-pointer"
      onClick={toggle}
      aria-label="Đổi giao diện sáng / tối"
    >
      <Moon
        className={cn("icon-moon w-4 h-4 absolute transition-[.45s_cubic-bezier(.5,1.6,.4,1)]", {
          "opacity-0 -rotate-90 scale-[.4]": dark,
          "opacity-100": !dark,
        })}
        strokeWidth={1.8}
      />
      <Sun
        className={cn("icon-sun w-4 h-4 absolute transition-[.45s_cubic-bezier(.5,1.6,.4,1)]", {
          "opacity-100": dark,
          "opacity-0 rotate-90 scale-[.4]": !dark,
        })}
        strokeWidth={1.8}
      />
    </button>
  );
}
