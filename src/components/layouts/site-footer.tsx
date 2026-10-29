import Link from "next/link";
import { Suspense } from "react";
import { SiteFooterAuthors } from "~/components/layouts/components/site-footer-authors";
import { SiteFooterBottomBar } from "~/components/layouts/components/site-footer-bottom-bar";
import { SiteFooterCategories } from "~/components/layouts/components/site-footer-categories";

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
              TẠP là một tạp chí hư cấu được dựng nên chỉ để làm demo — nhưng những ý nghĩ trong đó thì thật.
            </p>
          </div>

          <SiteFooterCategories />
          <Suspense fallback={<div>Loading...</div>}>
            <SiteFooterAuthors />
          </Suspense>

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
        <SiteFooterBottomBar />
      </div>
    </footer>
  );
}
