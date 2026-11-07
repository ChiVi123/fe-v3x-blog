import { ArrowRight } from "lucide-react";
import Link from "next/link";
import PostRow from "~/components/shared/post-row";
import { dateFormat } from "~/lib/utils";
import type { PostRow as PostRowType } from "~/types";

export function RecentPostsSection({ posts, total: allPostsCount }: { posts: PostRowType[]; total: number }) {
  const latestPost = posts[0];
  return (
    <section className="sec" id="home-posts">
      <div className="wrapper">
        <div className="sec-head reveal flex justify-between items-end gap-6 flex-wrap border-b border-foreground pb-[1.3rem] mb-[.4rem]">
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-[.72rem] tracking-widest text-son">(01)</span>
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
            {posts.length > 0 && latestPost
              ? `${posts.length} bài · cập nhật ${dateFormat(latestPost.createdAt, "short")}`
              : "0 bài viết"}
          </span>
        </div>
        <div id="homeList">
          {posts.length > 0 ? (
            posts.slice(0, 4).map((p, i) => <PostRow key={p.id} post={p} index={i} />)
          ) : (
            <div className="py-12 text-center font-mono text-[.75rem] text-muted-foreground uppercase tracking-widest">
              Chưa có bài viết nào
            </div>
          )}
          <Link
            href="/bai-viet"
            className="group flex justify-center items-center gap-[.7rem] px-[1.2rem] mx-[-1.2rem] py-6 border-t border-border font-mono text-[.7rem] tracking-[.13em] uppercase transition-[.3s] hover:bg-foreground hover:text-background"
          >
            Tất cả {allPostsCount} bài viết
            <ArrowRight
              className="w-3.5 h-3.5 transition-[transform_.3s] group-hover:translate-x-0.75"
              strokeWidth={2}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
