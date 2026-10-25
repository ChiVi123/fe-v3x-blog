import { Asterisk } from "lucide-react";

export function Marquee() {
  const items = [
    "Tùy bút",
    "Sách & Đọc",
    "Đời thường",
    "Xã hội",
    `NaN bài viết`,
    "Từ 2021",
    "Hà Nội",
  ];

  const group = (
    <div className="flex items-center gap-[2.8rem] pr-[2.8rem]">
      {items.map((t) => (
        <span
          key={t}
          className="flex items-center gap-[2.8rem] font-serif italic font-[420] text-[1.35rem] whitespace-nowrap"
        >
          {t}{" "}
          <Asterisk
            className="w-3.5 h-3.5 text-son shrink-0"
            strokeWidth={2.2}
          />
        </span>
      ))}
    </div>
  );

  return (
    <div
      className="border-y border-foreground overflow-hidden py-[.85rem]"
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee hover:paused">
        {group}
        {group}
      </div>
    </div>
  );
}
