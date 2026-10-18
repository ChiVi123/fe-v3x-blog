export function QuoteSection() {
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
          &ldquo;Viết, với tôi, là cách giữ lại những gì thời gian cố tình{" "}
          <b className="text-son font-[inherit]">mang đi</b> — từng chút một,
          mỗi ngày.&rdquo;
        </blockquote>
        <p className="mt-8 font-mono text-[.68rem] tracking-[.12em] uppercase text-muted-foreground">
          — Mai An Nhiên · &ldquo;Đời thường trong thời đại chạy đua&rdquo; ·
          TẠP số 05
        </p>
      </div>
    </section>
  );
}
