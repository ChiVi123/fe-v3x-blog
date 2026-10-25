"use client";

import { ArrowUp } from "lucide-react";
import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer
      className="bg-inverse text-inverse-foreground border-t border-border"
      style={{ padding: "clamp(3rem,7vw,5.5rem) 0 2rem" }}
    >
      <div className="wrapper">
        {/* Big wordmark */}
        <p
          className="font-serif select-none"
          style={{
            fontWeight: 560,
            fontVariationSettings: '"opsz" 144',
            fontSize: "clamp(4.2rem,15vw,13rem)",
            lineHeight: 0.85,
            letterSpacing: "-.03em",
            marginBottom: "clamp(2rem,5vw,3.5rem)",
          }}
        >
          TẠP<span style={{ color: "var(--son)" }}>.</span>
        </p>

        {/* Link grid */}
        <div
          className="foot-grid grid gap-8 mb-12"
          style={{ gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))" }}
        >
          <div>
            <h4 className="font-mono font-medium text-[.62rem] tracking-[.18em] uppercase text-inverse-muted mb-4">
              Về tạp chí
            </h4>
            <p className="foot-desc text-[.92rem] text-inverse-muted leading-[1.7] max-w-[34ch]">
              TẠP là một tạp chí hư cấu được dựng nên chỉ để làm demo — nhưng
              những ý nghĩ trong đó thì thật.
            </p>
          </div>
          <div>
            <h4 className="font-mono font-medium text-[.62rem] tracking-[.18em] uppercase text-inverse-muted mb-4">
              Chuyên mục
            </h4>
            {["Tùy bút", "Sách", "Đời thường", "Xã hội"].map((cat) => (
              <Link
                key={cat}
                href={`/bai-viet?cat=${encodeURIComponent(cat)}`}
                className="block py-[.28rem] text-[.92rem] text-inverse-muted transition-[color_.25s] hover:text-son"
              >
                {cat}
              </Link>
            ))}
          </div>
          <div>
            <h4 className="font-mono font-medium text-[.62rem] tracking-[.18em] uppercase text-inverse-muted mb-4">
              Tác giả
            </h4>
            {(
              [["123", { username: "admin" }]] as [
                string,
                { username: string },
              ][]
            ).map(([id, a]) => (
              <Link
                key={id}
                href={`/tac-gia/${id}`}
                className="block py-[.28rem] text-[.92rem] text-inverse-muted transition-[color_.25s] hover:text-son"
              >
                {a.username}
              </Link>
            ))}
          </div>
          <div>
            <h4 className="font-mono font-medium text-[.62rem] tracking-[.18em] uppercase text-inverse-muted mb-4">
              Khác
            </h4>
            <Link
              href="/da-luu"
              className="block py-[.28rem] text-[.92rem] text-inverse-muted transition-[color_.25s] hover:text-son"
            >
              Bài đã lưu
            </Link>
            <Link
              href="/bai-viet"
              className="block py-[.28rem] text-[.92rem] text-inverse-muted transition-[color_.25s] hover:text-son"
            >
              Bản lưu trữ
            </Link>
            <Link
              href="/#dang-ky"
              className="block py-[.28rem] text-[.92rem] text-inverse-muted transition-[color_.25s] hover:text-son"
            >
              Thư tuần san
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex justify-between items-center gap-4 flex-wrap border-t border-inverse-border pt-[1.4rem] font-mono text-[.64rem] tracking-widest uppercase text-inverse-muted">
          <span>© 2025 TẠP — viết &amp; dàn trang tại Hà Nội</span>
          <span>Mọi bài viết là hư cấu</span>
          <button
            type="button"
            className="inline-flex items-center gap-2 transition-[color_.25s] hover:text-son cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Về đầu trang
            <ArrowUp className="w-3.25 h-3.25" strokeWidth={2} />
          </button>
        </div>
      </div>
    </footer>
  );
}
