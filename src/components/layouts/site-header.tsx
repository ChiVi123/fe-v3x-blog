import Link from "next/link";
import {
  SiteHeaderBookmark,
  SiteHeaderMenuMobile,
  SiteHeaderNav,
  SiteHeaderProvider,
  SiteHeaderSearchButton,
  SiteHeaderThemeButton,
} from "~/components/layouts/components";
import { queryUsers } from "~/service/server/author.service";
import { getCategories } from "~/service/server/categories.service";

/* ─── SiteHeader ─── */
export default async function SiteHeader() {
  const [{ data: categories }, { data: users }] = await Promise.all([getCategories(), queryUsers()]);

  return (
    <SiteHeaderProvider categories={categories} users={users}>
      <header
        className="site-head sticky top-0 z-50 border-b border-border"
        style={{
          background: "color-mix(in srgb,var(--background) 86%,transparent)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="wrapper flex items-center gap-[1.6rem] h-(--header-h)">
          <SiteHeaderMenuMobile />

          {/* logo */}
          <Link
            className="font-serif font-[620] text-[1.5rem] tracking-[-0.02em] shrink-0"
            href="/"
            style={{ fontVariationSettings: '"opsz" 60' }}
          >
            TẠP<span style={{ color: "var(--son)" }}>.</span>
          </Link>

          {/* nav (desktop) */}
          <SiteHeaderNav />

          {/* actions */}
          <div className="head-actions flex items-center gap-[.9rem] ml-auto">
            <SiteHeaderSearchButton />
            <SiteHeaderBookmark />
            <SiteHeaderThemeButton />

            <Link
              className="hidden md:inline-flex font-mono text-[.68rem] tracking-widest uppercase bg-foreground text-background px-[1.1rem] py-[.62rem] transition-[background_.25s] hover:bg-son hover:text-white"
              href="/#dang-ky"
            >
              Đăng ký
            </Link>
          </div>
        </div>
      </header>

      <style>{`
        @media (min-width: 860px) { .burger-btn { display: none !important; } }
        @media (max-width: 859px) { .main-nav { display: none !important; } .theme-btn-head { display: none !important; } }
        .menu-m-link {
          display: flex; justify-content: space-between; align-items: baseline;
          gap: 1rem; width: 100%; text-align: left;
          padding: .85rem 0; border-bottom: 1px solid var(--inverse-border);
          font-family: var(--font-serif); font-weight: 480;
          font-variation-settings: "opsz" 100;
          font-size: clamp(1.4rem,4vw,2.2rem); letter-spacing: -.01em;
          color: var(--inverse-foreground);
          transition: .25s;
        }
        .menu-m-link:hover { color: var(--son); padding-left: .6rem; }
        .menu-m-cnt {
          font-family: var(--font-mono); font-size: .68rem;
          letter-spacing: .1em; color: var(--inverse-muted);
        }
        .menu-m-link:hover .menu-m-cnt { color: var(--son); }
        @keyframes fade { from { opacity: 0 } }
        @keyframes panel { from { opacity: 0; transform: translateY(18px) } }
      `}</style>
    </SiteHeaderProvider>
  );
}
