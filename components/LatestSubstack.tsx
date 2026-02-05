import { FEED_URL, getLatestSubstackPost } from "@/lib/substack";

const SUBSTACK_HOME = "https://lucyontheground.substack.com/";

export default async function LatestSubstack() {
  const post = await getLatestSubstackPost();
  const feedHost = FEED_URL.replace("/feed", "");
  const substackLink = feedHost.includes("YOURSUBSTACK") ? SUBSTACK_HOME : feedHost;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="border-2 border-[#CA4C4C] bg-white/70 p-6 sm:p-8 rounded-lg">
        <p className="text-xs font-black tracking-[0.2em] uppercase text-[#CA4C4C]">Latest Writing</p>

        {post ? (
          <>
            <h2 className="mt-3 text-3xl sm:text-4xl font-black text-[#0A2041]">
              {post.title}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#0A2041]/75 line-clamp-3">
              {post.excerpt}
            </p>
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 px-5 py-2 bg-[#CA4C4C] text-white font-semibold hover:bg-[#B03C3C] transition-colors"
            >
              Read on Substack →
            </a>
          </>
        ) : (
          <>
            <h2 className="mt-3 text-2xl sm:text-3xl font-black text-[#0A2041]">New posts coming soon.</h2>
            <p className="mt-3 text-sm sm:text-base text-[#0A2041]/75">
              Check back for the latest blogs, recaps, and pop culture takes.
            </p>
            <a
              href={substackLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 px-5 py-2 bg-[#0A2041] text-[#FEE689] font-semibold hover:opacity-90 transition"
            >
              Visit Substack →
            </a>
          </>
        )}
      </div>
    </section>
  );
}
