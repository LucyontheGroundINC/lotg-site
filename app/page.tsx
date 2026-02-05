import LinkHub from "@/components/linkhub";
import StickyHeader from "@/components/StickyHeader";
import { getLatestSubstackPost } from "@/lib/substack";

export default async function HomePage() {
  const latestPost = await getLatestSubstackPost();

  return (
    <main className="min-h-screen bg-[#F8F5EE] text-[#0A2041] antialiased leading-relaxed relative overflow-x-hidden">
      {/* Content */}
      <div className="relative z-10">
        {/* Top navigation (preserved) */}
        <StickyHeader />

        {/* Romcom content — scrolls over the stationary background logo */}
        <LinkHub latestPost={latestPost} />
      </div>
    </main>
  );
}
