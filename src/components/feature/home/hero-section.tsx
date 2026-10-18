import { ArrowDown } from "lucide-react";
import Link from "next/link";
import type { Post } from "~/types";
import { FeatureCard } from "./feature-card";

export function HeroSection({ featuredPost }: { featuredPost: Post }) {
  return (
    <section
      style={{ padding: "clamp(2.4rem,6vh,4.6rem) 0 clamp(3rem,7vh,5.5rem)" }}
    >
      <div className="wrapper">
        <div className="reveal flex justify-between gap-4 border-t border-foreground pt-[.85rem] mb-[clamp(2rem,5vh,3.4rem)] font-mono text-[.66rem] tracking-[.13em] uppercase text-muted-foreground">
          <span>Số 07 — Tháng Sáu, 2025</span>
          <span>Hà Nội, Việt Nam</span>
          <span className="hidden sm:inline">Bản MVP</span>
        </div>
        <div
          className="hero-grid grid gap-[clamp(2rem,5vw,5rem)] items-end"
          style={{ gridTemplateColumns: "7fr 4fr" }}
        >
          <div>
            <h1
              className="reveal font-serif leading-[1.02] tracking-[-0.02em]"
              style={
                {
                  fontWeight: 460,
                  fontVariationSettings: '"opsz" 144',
                  fontSize: "clamp(2.6rem,7vw,6rem)",
                  "--d": "60ms",
                } as React.CSSProperties
              }
            >
              <span className="block">
                {["Những", "ý", "nghĩ"].map((w) => (
                  <span
                    key={w}
                    className="inline-block transition-[color_.35s,transform_.35s_cubic-bezier(.3,1.4,.5,1)] hover:text-son hover:[-webkit-transform:skewX(-8deg)] hover:transform-[skewX(-8deg)]"
                  >
                    {w}{" "}
                  </span>
                ))}
              </span>
              <span className="block italic text-son">
                {["lang", "thang"].map((w) => (
                  <span
                    key={w}
                    className="inline-block transition-[color_.35s,transform_.35s_cubic-bezier(.3,1.4,.5,1)] hover:text-son hover:[-webkit-transform:skewX(-8deg)] hover:transform-[skewX(-8deg)]"
                  >
                    {w}{" "}
                  </span>
                ))}
              </span>
              <span className="block">
                {["trên", "trang", "giấy", "trắng."].map((w) => (
                  <span
                    key={w}
                    className="inline-block transition-[color_.35s,transform_.35s_cubic-bezier(.3,1.4,.5,1)] hover:text-son hover:[-webkit-transform:skewX(-8deg)] hover:transform-[skewX(-8deg)]"
                  >
                    {w}{" "}
                  </span>
                ))}
              </span>
            </h1>
            <p
              className="reveal max-w-[46ch] text-[1.02rem] leading-[1.75] text-muted-foreground my-8"
              style={{ "--d": "140ms" } as React.CSSProperties}
            >
              Tạp chí trực tuyến về viết, đọc và những điều nhỏ nhặt — đăng một
              bài mỗi ngày, trừ những ngày chúng tôi bận đọc.
            </p>
            <div
              className="reveal flex gap-[.8rem] flex-wrap"
              style={{ "--d": "220ms" } as React.CSSProperties}
            >
              <Link
                href={`/bai-viet/${featuredPost.no}`}
                className="group inline-flex items-center gap-[.6rem] font-mono text-[.7rem] tracking-[.12em] uppercase px-[1.4rem] py-[.9rem] border border-foreground bg-foreground text-background transition-[.3s] hover:bg-son hover:border-son hover:text-white"
              >
                Đọc số mới này
                <ArrowDown
                  className="w-3.5 h-3.5 transition-[transform_.3s] group-hover:translate-y-0.75"
                  strokeWidth={2}
                />
              </Link>
              <Link
                href="/bai-viet"
                className="inline-flex items-center gap-[.6rem] font-mono text-[.7rem] tracking-[.12em] uppercase px-[1.4rem] py-[.9rem] border border-foreground transition-[.3s] hover:bg-foreground hover:text-background"
              >
                Tất cả bài viết
              </Link>
            </div>
          </div>
          <aside
            className="reveal hero-side"
            style={{ "--d": "180ms" } as React.CSSProperties}
          >
            <FeatureCard post={featuredPost} />
          </aside>
        </div>
      </div>
    </section>
  );
}
