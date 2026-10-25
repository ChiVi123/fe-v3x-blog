import { HeroSection } from "~/components/feature/home/hero-section";
import { Marquee } from "~/components/feature/home/marquee";
import { NewsletterSection } from "~/components/feature/home/newsletter-section";
import { QuoteSection } from "~/components/feature/home/quote-section";
import { RecentPostsSection } from "~/components/feature/home/recent-posts-section";
import { TopicsSection } from "~/components/feature/home/topics-section";
import { ScrollReveal } from "~/components/shared/scroll-reveal";
import { getPosts } from "~/service/server/posts.service";

export default async function HomePage() {
  const { data } = await getPosts();

  if (data.length === 0) {
    return null;
  }

  const featured = data[0];

  return (
    <>
      <HeroSection featuredPost={featured} />
      <Marquee />
      <RecentPostsSection posts={data} />
      <TopicsSection />
      <QuoteSection />
      <NewsletterSection />
      <ScrollReveal />

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
