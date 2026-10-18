import { Skeleton } from "~/components/ui/skeleton";

function PostLoading() {
  return (
    <article
      className="max-w-180 mx-auto px-5"
      style={{ padding: "clamp(2.2rem,5vw,3.4rem) 20px 8rem" }}
    >
      {/* Category + issue */}
      <Skeleton className="w-16.25 h-[16.31px] rounded-full" />

      {/* Title */}
      <Skeleton className="h-[62.74px] mt-[.9rem] mb-4  rounded-full" />

      {/* Deck */}
      <Skeleton className="h-[32.24px] mb-[1.4rem] rounded-full" />

      {/* Meta */}
      <Skeleton className="h-4 pb-[1.6rem] mb-[2.2rem] rounded-full" />

      {/* Hero image */}
      <Skeleton className="h-120 mb-10" />

      {/* Body */}
      <Skeleton className="h-150" />

      {/* End marker */}
      <div className="flex items-center gap-[1.1rem] my-12">
        <span className="flex-1 h-px bg-border" />
        <em className="font-mono not-italic text-[.64rem] tracking-[.24em] uppercase text-muted-foreground">
          Hết.
        </em>
        <span className="flex-1 h-px bg-border" />
      </div>

      {/* Author box */}
      {
        <aside className="flex gap-[1.1rem] items-start border border-border p-[1.3rem] mb-12">
          <Skeleton className="shrink-0 w-13.5 h-13.5" />
          <div className="flex-1 flex flex-col justify-start gap-0.5">
            <Skeleton className="w-40 h-5.5" />
            <Skeleton className="w-25 h-3.5 " />
            <Skeleton className="h-5.5" />
          </div>
        </aside>
      }

      {/* Related */}
      {
        <aside className="mt-[3.4rem] border-t border-foreground pt-[1.6rem]">
          <p className="font-mono text-[.64rem] tracking-[.18em] uppercase text-son mb-[1.1rem]">
            Đọc tiếp
          </p>
        </aside>
      }
    </article>
  );
}

export default PostLoading;
