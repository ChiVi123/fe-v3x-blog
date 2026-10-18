"use client";

import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { useToast } from "~/hooks/use-toast";

export function NewsletterSection() {
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
      if (msgRef.current) {
        msgRef.current.textContent =
          "Địa chỉ này có vẻ chưa đúng — thử kiểm tra lại nhé.";
      }
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
                className="flex items-center gap-[.6rem] bg-son text-son-foreground font-mono text-[.7rem] tracking-[.12em] uppercase px-[1.3rem] py-[.9rem] transition-[.3s] whitespace-nowrap hover:bg-inverse-foreground hover:text-inverse cursor-pointer"
              >
                Nhận thư
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
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
