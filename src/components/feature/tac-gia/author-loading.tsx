import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "~/components/ui/skeleton";

function AuthorLoading() {
  return (
    <div
      className="max-w-215 mx-auto px-5"
      style={{ padding: "clamp(2rem,5vw,3.2rem) 20px 7rem" }}
    >
      {/* Back */}
      <Link
        href="/bai-viet"
        className="inline-flex items-center gap-[.6rem] font-mono text-[.7rem] tracking-[.12em] uppercase px-[1.4rem] py-[.9rem] border border-foreground mb-[2.4rem] transition-[.3s] hover:bg-foreground hover:text-background"
      >
        <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2} />
        Tất cả bài viết
      </Link>

      {/* Author header */}
      <header className="flex gap-[clamp(1.2rem,3vw,2rem)] items-start border-t border-foreground pt-[1.6rem] flex-wrap">
        <Skeleton className="shrink-0 size-24" />

        <div className="flex-1">
          <Skeleton className="w-150 h-4" />
          <Skeleton className="w-150 h-12 mt-2 mb-[.3rem]" />
          <Skeleton className="w-150 h-3.75" />
          <Skeleton className="max-w-[52ch] h-14 mt-[.8rem] mb-[1.1rem]" />
          <Skeleton className="h-4.25" />
        </div>
      </header>

      {/* Posts by author */}
      <div className="flex justify-between items-baseline gap-4 border-b border-foreground pb-[1.1rem] mt-[3.4rem]">
        <h2
          className="flex items-center gap-2 font-serif font-medium tracking-[-0.01em]"
          style={{
            fontVariationSettings: '"opsz" 100',
            fontSize: "clamp(1.5rem,3vw,2.2rem)",
          }}
        >
          Bài viết của <Skeleton className="w-19 h-8.5" />
        </h2>
        <span className="flex items-center gap-1 font-mono text-[.66rem] tracking-[.12em] uppercase text-muted-foreground">
          <Skeleton className="w-4 h-3" /> bài
        </span>
      </div>

      <div className="px-[1.2rem] py-[1.55rem]">
        <Skeleton className="h-16.5" />
      </div>
    </div>
  );
}

export default AuthorLoading;
