import { Asterisk } from "lucide-react";
import type { Category } from "~/types";

export function Marquee({ categories }: { categories: Category[] }) {
  const group = (
    <div className="flex items-center gap-[2.8rem] pr-[2.8rem]">
      {categories.map((category) => (
        <span
          key={category.id}
          className="flex items-center gap-[2.8rem] font-serif italic font-[420] text-[1.35rem] whitespace-nowrap"
        >
          {category.name} <Asterisk className="w-3.5 h-3.5 text-son shrink-0" strokeWidth={2.2} />
        </span>
      ))}
    </div>
  );

  return (
    <div className="border-y border-foreground overflow-hidden py-[.85rem]" aria-hidden="true">
      <div className="flex w-max animate-marquee hover:paused">
        {group}
        {group}
      </div>
    </div>
  );
}
