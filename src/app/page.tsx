"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import PostRow from "~/components/post-row";
import { useToast } from "~/components/toast";
import { CATS, posts, TOPIC_META } from "~/lib/data";
import { img } from "~/lib/utils";

/* ─── Marquee ─── */
function Marquee() {
  const items = [
    "Tùy bút",
    "Sách & Đọc",
    "Đời thường",
    "Xã hội",
    `${posts.length} bài viết`,
    "Từ 2021",
    "Hà Nội",
  ];
  const AST = (
    <svg
      className="w-3.5 h-3.5 text-son shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    >
      <path d="M12 2v20" />
      <path d="m3.3 7 17.4 10" />
      <path d="M20.7 7 3.3 17" />
    </svg>
  );
  const group = (
    <div className="flex items-center gap-[2.8rem] pr-[2.8rem]">
      {items.map((t) => (
        <span
          key={t}
          className="flex items-center gap-[2.8rem] font-serif italic font-[420] text-[1.35rem] whitespace-nowrap"
        >
          {t} {AST}
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

/* ─── Hero featured card ─── */
function FeatureCard() {
  const post = posts[0];
  return (
    <figure className="relative border border-foreground cursor-pointer bg-background group">
      <span className="absolute -top-px -left-px bg-son text-son-foreground font-mono text-[.6rem] tracking-[.14em] uppercase px-3 py-[.38rem] z-2">
        Bài nổi bật
      </span>
      <Link href={`/bai-viet/${post.no}`} className="block">
        <div className="overflow-hidden">
          <img
            src={img(post.seed, 900, 600)}
            alt={`Ảnh minh họa: ${post.title}`}
            width={900}
            height={600}
            className="w-full aspect-3/2 object-cover transition-[filter_.6s,transform_.6s] group-hover:scale-[1.025]"
            style={{ filter: "grayscale(1) contrast(1.05) sepia(.1)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLImageElement).style.filter = "none";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLImageElement).style.filter =
                "grayscale(1) contrast(1.05) sepia(.1)";
            }}
          />
        </div>
        <figcaption className="p-[1rem_1.1rem_1.1rem] border-t border-foreground">
          <span className="font-mono text-[.66rem] tracking-[.12em] text-muted-foreground">
            № {post.no}
          </span>
          <h3 className="font-serif font-[520] text-[1.3rem] leading-tight my-[.4rem_.4rem_.5rem] transition-[color_.3s] group-hover:text-son">
            {post.title}
          </h3>
          <span className="font-mono text-[.66rem] tracking-[.08em] text-muted-foreground uppercase">
            {post.cat} · {post.read} phút đọc
          </span>
        </figcaption>
      </Link>
    </figure>
  );
}

/* ─── Newsletter section ─── */
function NewsletterSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const msgRef = useRef<HTMLParagraphElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const toast = useToast();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const email = (
      formRef.current?.querySelector("input") as HTMLInputElement
    )?.value?.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      if (msgRef.current)
        msgRef.current.textContent =
          "Địa chỉ này có vẻ chưa đúng — thử kiểm tra lại nhé.";
      const f = fieldRef.current;
      if (f) {
        f.classList.remove("animate-[shake_.32s_2]");
        void f.offsetWidth;
        f.classList.add("animate-[shake_.32s_2]");
      }
      return;
    }
    if (msgRef.current) msgRef.current.textContent = "";
    if (formRef.current) formRef.current.reset();
    toast("Đã đăng ký — hẹn gặp bạn trong số Chủ nhật này.");
  }

  return (
    <section className="sec" id="dang-ky" style={{ paddingTop: 0 }}>
      <div className="wrapper">
        <div
          className="reveal grid gap-[clamp(2.5rem,5vw,5rem)] bg-inverse text-inverse-foreground p-[clamp(2.4rem,6vw,5.2rem)]"
          style={{ gridTemplateColumns: "1.1fr .9fr" }}
        >
          <div>
            <span className="font-mono text-[.66rem] tracking-[.16em] uppercase text-son">
              (03) — Thư tuần san
            </span>
            <h2
              className="font-serif leading-[1.1] tracking-[-0.01em] my-[1.1rem_0_1.2rem]"
              style={{
                fontWeight: 480,
                fontVariationSettings: '"opsz" 100',
                fontSize: "clamp(1.9rem,4.2vw,3.3rem)",
              }}
            >
              Một lá thư mỗi <em className="italic text-son">Chủ nhật</em> sáng.
            </h2>
            <p className="text-inverse-muted leading-[1.75] text-[.98rem] max-w-[44ch]">
              Ba bài viết chọn lọc, một trích dẫn đáng nhớ, không một dòng quảng
              cáo. Đọc hết trong mười phút, kể cả lúc đang pha cà phê.
            </p>
            <p className="flex items-center gap-[.6rem] mt-8 font-mono text-[.7rem] tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-son animate-pulse-dot" />
              1.247 người đang nhận thư cùng bạn
            </p>
          </div>
          <form ref={formRef} onSubmit={handleSubmit} noValidate>
            <label
              htmlFor="email"
              className="block font-mono text-[.62rem] tracking-[.16em] uppercase text-inverse-muted mb-[.6rem]"
            >
              Địa chỉ email của bạn
            </label>
            <div ref={fieldRef} className="flex gap-4 items-end">
              <input
                type="email"
                id="email"
                placeholder="ban@ten.vn"
                autoComplete="email"
                className="flex-1 bg-transparent border-none border-b border-inverse-border pb-[.85rem] font-[inherit] text-[1.05rem] text-inverse-foreground placeholder:text-[color-mix(in_srgb,var(--inverse-foreground)_35%,transparent)] focus:outline-none focus:border-son transition-[border-color_.3s]"
                style={{ borderBottom: "1px solid var(--inverse-border)" }}
              />
              <button
                type="submit"
                className="flex items-center gap-[.6rem] bg-son text-son-foreground font-mono text-[.7rem] tracking-[.12em] uppercase px-[1.3rem] py-[.9rem] transition-[.3s] whitespace-nowrap hover:bg-inverse-foreground hover:text-inverse"
              >
                Nhận thư
                <svg
                  className="w-3.5 h-3.5"
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
              </button>
            </div>
            <p
              ref={msgRef}
              className="min-h-[1.2em] mt-[.8rem] font-mono text-[.7rem] tracking-[.06em] text-son"
            />
            <p className="mt-[.6rem] text-[.8rem] text-inverse-muted">
              Miễn phí mãi mãi. Hủy đăng ký chỉ mất một cú click.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ─── Topics section ─── */
function TopicsSection() {
  const ICON_UP_RIGHT = (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-3.5 h-3.5"
    >
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
  return (
    <section className="sec" id="chuyen-muc" style={{ paddingTop: 0 }}>
      <div className="wrapper">
        <div className="sec-head reveal flex justify-between items-end gap-6 flex-wrap border-b border-foreground pb-[1.3rem] mb-[.4rem]">
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-[.72rem] tracking-widest text-son">
              (02)
            </span>
            <h2
              className="font-serif font-medium tracking-[-0.01em]"
              style={{
                fontVariationSettings: '"opsz" 100',
                fontSize: "clamp(1.8rem,3.4vw,2.7rem)",
              }}
            >
              Chuyên mục
            </h2>
          </div>
          <span className="font-mono text-[.66rem] tracking-[.12em] uppercase text-muted-foreground">
            04 chuyên mục — cập nhật hằng ngày
          </span>
        </div>
        <div>
          {CATS.slice(1).map((cat, i) => {
            const n = posts.filter((p) => p.cat === cat).length;
            return (
              <Link
                key={cat}
                href={`/bai-viet?cat=${encodeURIComponent(cat)}`}
                className="topic group grid items-center gap-[1.3rem] border-t border-border transition-[background_.35s] hover:bg-foreground last:border-b"
                style={{
                  gridTemplateColumns: "3.4rem 1fr auto 2.6rem",
                  padding: "1.9rem 1.2rem",
                  margin: "0 -1.2rem",
                  animationDelay: `${i * 60}ms`,
                }}
              >
                <span className="font-mono text-[.7rem] text-muted-foreground transition-[color_.35s] group-hover:text-inverse-foreground">
                  0{i + 1}
                </span>
                <span>
                  <span
                    className="block font-serif font-medium tracking-[-0.01em] transition-[color_.35s] group-hover:text-inverse-foreground"
                    style={{
                      fontVariationSettings: '"opsz" 100',
                      fontSize: "clamp(1.6rem,3.6vw,2.5rem)",
                    }}
                  >
                    {cat}
                  </span>
                  <span className="block text-[.9rem] text-muted-foreground mt-[.3rem] transition-[color_.35s] group-hover:text-inverse-foreground sm:hidden md:block">
                    {TOPIC_META[cat]}
                  </span>
                </span>
                <span className="font-mono text-[.68rem] tracking-widest text-muted-foreground whitespace-nowrap transition-[color_.35s] group-hover:text-son">
                  {n} bài
                </span>
                <span className="w-9.5 h-9.5 grid place-items-center border border-border text-muted-foreground transition-[.35s] group-hover:bg-inverse-foreground group-hover:border-inverse-foreground group-hover:text-foreground group-hover:rotate-45">
                  {ICON_UP_RIGHT}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Quote section ─── */
function QuoteSection() {
  return (
    <section
      className="text-center border-t border-border"
      style={{ paddingBlock: "clamp(3.5rem,8vw,6.5rem)" }}
    >
      <div className="wrapper reveal">
        <p className="font-mono text-[.64rem] tracking-[.2em] uppercase text-muted-foreground mb-[2.2rem]">
          ( giữa trang — trích số 05 )
        </p>
        <blockquote
          className="max-w-220 mx-auto font-serif italic font-[420] leading-[1.35] tracking-[-0.01em]"
          style={{ fontSize: "clamp(1.7rem,3.8vw,3rem)" }}
        >
          "Viết, với tôi, là cách giữ lại những gì thời gian cố tình{" "}
          <b className="text-son font-[inherit]">mang đi</b> — từng chút một,
          mỗi ngày."
        </blockquote>
        <p className="mt-8 font-mono text-[.68rem] tracking-[.12em] uppercase text-muted-foreground">
          — Mai An Nhiên · "Đời thường trong thời đại chạy đua" · TẠP số 05
        </p>
      </div>
    </section>
  );
}

/* ─── Home page ─── */
export default function HomePage() {
  // Reveal on scroll
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries)
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
      },
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal:not(.in)").forEach((el) => {
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const featured = posts[0];

  return (
    <>
      {/* Hero */}
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
                Tạp chí trực tuyến về viết, đọc và những điều nhỏ nhặt — đăng
                một bài mỗi ngày, trừ những ngày chúng tôi bận đọc.
              </p>
              <div
                className="reveal flex gap-[.8rem] flex-wrap"
                style={{ "--d": "220ms" } as React.CSSProperties}
              >
                <Link
                  href={`/bai-viet/${featured.no}`}
                  className="inline-flex items-center gap-[.6rem] font-mono text-[.7rem] tracking-[.12em] uppercase px-[1.4rem] py-[.9rem] border border-foreground bg-foreground text-background transition-[.3s] hover:bg-son hover:border-son hover:text-white"
                >
                  Đọc số mới này
                  <svg
                    className="w-3.5 h-3.5 transition-[transform_.3s] group-hover:translate-y-0.75"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 5v14" />
                    <path d="m19 12-7 7-7-7" />
                  </svg>
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
              <FeatureCard />
            </aside>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <Marquee />

      {/* Recent posts */}
      <section className="sec" id="home-posts">
        <div className="wrapper">
          <div className="sec-head reveal flex justify-between items-end gap-6 flex-wrap border-b border-foreground pb-[1.3rem] mb-[.4rem]">
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-[.72rem] tracking-widest text-son">
                (01)
              </span>
              <h2
                className="font-serif font-medium tracking-[-0.01em]"
                style={{
                  fontVariationSettings: '"opsz" 100',
                  fontSize: "clamp(1.8rem,3.4vw,2.7rem)",
                }}
              >
                Bài viết mới
              </h2>
            </div>
            <span className="font-mono text-[.66rem] tracking-[.12em] uppercase text-muted-foreground">
              {posts.length} bài · cập nhật 12.06
            </span>
          </div>
          <div id="homeList">
            {posts.slice(0, 4).map((p, i) => (
              <PostRow key={p.no} post={p} index={i} />
            ))}
            <Link
              href="/bai-viet"
              className="flex justify-center items-center gap-[.7rem] px-[1.2rem] mx-[-1.2rem] py-6 border-t border-border font-mono text-[.7rem] tracking-[.13em] uppercase transition-[.3s] hover:bg-foreground hover:text-background"
            >
              Tất cả {posts.length} bài viết
              <svg
                className="w-3.5 h-3.5 transition-[transform_.3s] hover:translate-y-0.75"
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
          </div>
        </div>
      </section>

      {/* Topics */}
      <TopicsSection />

      {/* Quote */}
      <QuoteSection />

      {/* Newsletter */}
      <NewsletterSection />

      <style>{`
        .sec { padding-block: clamp(4rem,9vw,7rem); }
        @media (max-width: 860px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-side { max-width: 440px; }
        }
        @media (max-width: 860px) {
          .topic { grid-template-columns: 2.4rem 1fr auto !important; }
          .topic > span:nth-child(4) { display: none; }
        }
        @media (max-width: 860px) {
          [style*="1.1fr .9fr"] { grid-template-columns: 1fr !important; }
        }
        @keyframes rise { from { opacity:0; transform:translateY(26px) } to { opacity:1; transform:none } }
        .reveal { opacity: 0; }
        .reveal.in { opacity: 1; animation: rise .9s cubic-bezier(.22,1,.36,1) both; animation-delay: var(--d, 0ms); }
      `}</style>
    </>
  );
}
