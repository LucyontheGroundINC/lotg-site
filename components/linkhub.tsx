"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Links = {
  substack: string;
  biggestNight: string;
  bracket: string;
  shopmy: string;
  amazon: string;
  instagram: string;
  facebook: string;
  threads: string;
  instagramStories: string;
};

const LINKS: Links = {
  substack: "https://lucyontheground.substack.com/",
  biggestNight: "https://bracket.lucyontheground.com/biggest-night/ballot",
  bracket: "https://bracket.lucyontheground.com/",
  shopmy: "https://shopmy.us/lucyontheground",
  amazon: "https://www.amazon.com/shop/lucyontheground?ref_=cm_sw_r_apann_aipsfshop_9XK20V9NDW5QZ1YFC4XF&language=en-US",
  instagram: "https://www.instagram.com/lucyontheground?igsh=MTdkcHN0aXBocnRvaw==",
  facebook: "https://www.facebook.com/share/16Yvry7Noc/",
  threads: "PASTE_THREADS_URL",
  instagramStories: "https://instagram.com/stories/lucyontheground",
};

type CurrentlyData = {
  whatImInto?: {
    watching: Array<{ title: string; url?: string }>;
    wearing: Array<{ title: string; url?: string }>;
    reading: Array<{ title: string; url?: string }>;
  };
};

// MAGAZINE-STYLE LANDING PAGE
// Multi-column grid layout with featured stories, sidebars, and editorial design
type LinkHubProps = {
  latestPost?: {
    title: string;
    link: string;
    excerpt: string;
    date?: string;
  } | null;
};

export default function LinkHub({ latestPost }: LinkHubProps) {
  const [currentlyData, setCurrentlyData] = useState<CurrentlyData>({});

  useEffect(() => {
    fetch("/api/currently")
      .then((r) => r.json())
      .then((j) => setCurrentlyData(j || {}))
      .catch(() => {});
  }, []);

  const featuredShow = currentlyData.whatImInto?.watching?.[0]?.title || "Summer House";
  const featuredBook = currentlyData.whatImInto?.reading?.[0]?.title || "Smut";

  return (
    <div className="min-h-screen bg-transparent text-[#0A2041]">
      {/* MAGAZINE MASTHEAD WITH LOGO */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-8">
        <div className="border-b-2 border-[#CA4C4C] pb-6 flex flex-col items-center text-center">
          <div className="mb-4 w-full flex justify-center">
            <Image
              src="/LOTG_Logo_Substack-Image-copy.svg"
              alt="Lucy On The Ground"
              width={1120}
              height={300}
              sizes="(min-width: 1024px) 1120px, (min-width: 640px) 920px, 640px"
              className="h-40 sm:h-48 lg:h-56 w-auto"
              priority
            />
          </div>
          <p className="mt-4 text-lg sm:text-xl text-[#0A2041]/75 font-light">
            Blogs, Bravo, and the pop culture I can't quit
          </p>
        </div>
      </div>

      {/* MAIN CONTENT GRID: Featured + Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT: FEATURED ARTICLES (2 columns on desktop) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* FEATURED ARTICLE HERO */}
          <div className="border-l-4 border-[#CA4C4C] pl-6 py-4 group">
            <span className="text-xs font-black tracking-[0.2em] uppercase text-[#CA4C4C]">This Week's Feature</span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-black leading-tight text-[#0A2041] group-hover:text-[#CA4C4C] transition-colors">
              {latestPost?.title || "Latest from Substack"}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#0A2041]/75 leading-relaxed">
              {latestPost?.excerpt || "New posts coming soon. Check back for the latest blogs and recaps."}
            </p>
            <a
              href={latestPost?.link || LINKS.substack}
              target="_blank"
              rel="noreferrer"
              className="inline-flex mt-5 px-6 py-3 bg-[#CA4C4C] text-white font-semibold hover:bg-[#B03C3C] transition-colors"
            >
              Read the Blog →
            </a>
          </div>

          {/* DIVIDER */}
          <div className="border-t border-[#0A2041]/10" />

          {/* ARTICLES GRID (2 columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* ARTICLE CARD 1 - FEATURED */}
            <article className="border-2 border-[#CA4C4C] bg-gradient-to-br from-[#CA4C4C]/10 to-[#FEE689]/10 p-6 hover:border-[#CA4C4C] hover:shadow-xl transition-all group ring-1 ring-[#CA4C4C]/20">
              <span className="text-xs font-black tracking-[0.15em] uppercase text-[#CA4C4C] bg-[#CA4C4C]/10 px-3 py-1 inline-block rounded">Featured</span>
              <h3 className="mt-3 text-2xl font-black leading-tight text-[#0A2041] group-hover:text-[#CA4C4C]">
                Play Hollywood's Biggest Night
              </h3>
              <p className="mt-2 text-sm text-[#0A2041]/70 line-clamp-3">
                Make your picks for Hollywood's biggest night. Climb the leaderboard. Brag to your friends forever.
              </p>
              <a
                href={LINKS.biggestNight}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-4 px-4 py-2 bg-[#CA4C4C] text-white font-semibold hover:bg-[#B03C3C] transition-colors rounded"
              >
                Play now →
              </a>
            </article>

            {/* ARTICLE CARD 2 */}
            <article className="border border-[#0A2041]/10 p-6 hover:border-[#CA4C4C] hover:shadow-lg transition-all group">
              <span className="text-xs font-black tracking-[0.15em] uppercase text-[#0A2041]/60">Column</span>
              <h3 className="mt-3 text-2xl font-black leading-tight text-[#0A2041] group-hover:text-[#CA4C4C]">
                What I'm Reading
              </h3>
              <p className="mt-2 text-sm text-[#0A2041]/70 line-clamp-3">
                Hot takes on {featuredBook} and why it's consuming my brain right now. Plot twists, feels, and recommendations.
              </p>
              <a
                href={LINKS.substack}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-4 text-sm font-semibold text-[#CA4C4C] hover:underline"
              >
                Read more →
              </a>
            </article>

            {/* ARTICLE CARD 3 */}
            <article className="border border-[#FEE689]/30 bg-[#FEE689]/5 p-6 hover:border-[#FEE689] hover:shadow-lg transition-all group">
              <span className="text-xs font-black tracking-[0.15em] uppercase text-[#0A2041]/60">Style</span>
              <h3 className="mt-3 text-2xl font-black leading-tight text-[#0A2041] group-hover:text-[#CA4C4C]">
                Shop My Favorites
              </h3>
              <p className="mt-2 text-sm text-[#0A2041]/70 line-clamp-3">
                Curated finds: aesthetics, comfort, and the occasional splurge that makes me ridiculously happy.
              </p>
              <a
                href={LINKS.shopmy}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-4 text-sm font-semibold text-[#CA4C4C] hover:underline"
              >
                Shop now →
              </a>
            </article>

            {/* ARTICLE CARD 4 */}
            <article className="border border-[#0A2041]/10 p-6 hover:border-[#CA4C4C] hover:shadow-lg transition-all group">
              <span className="text-xs font-black tracking-[0.15em] uppercase text-[#0A2041]/60">Follow</span>
              <h3 className="mt-3 text-2xl font-black leading-tight text-[#0A2041] group-hover:text-[#CA4C4C]">
                Daily Stories
              </h3>
              <p className="mt-2 text-sm text-[#0A2041]/70 line-clamp-3">
                Real-time updates on Instagram Stories: moments, thoughts, and the chaos as it unfolds.
              </p>
              <a
                href={LINKS.instagramStories}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-4 text-sm font-semibold text-[#CA4C4C] hover:underline"
              >
                Watch now →
              </a>
            </article>

          </div>

        </div>

        {/* RIGHT: SIDEBAR */}
        <aside className="space-y-8">
          
          {/* ABOUT THE AUTHOR SIDEBAR */}
          <div className="border border-[#0A2041]/10 p-6 bg-white/40">
            <h4 className="text-xs font-black tracking-[0.2em] uppercase text-[#0A2041]">About Lucy</h4>
            <p className="mt-3 text-sm text-[#0A2041]/80 leading-relaxed">
              I think about pop culture the way some people think about their ex: with passion, questions, and way too much detail.
            </p>
            <div className="mt-4 flex gap-2">
              <a href={LINKS.instagram} target="_blank" rel="noreferrer" className="text-xs font-semibold text-[#CA4C4C] hover:underline">Instagram</a>
              <span className="text-[#0A2041]/20">•</span>
              <a href={LINKS.substack} target="_blank" rel="noreferrer" className="text-xs font-semibold text-[#CA4C4C] hover:underline">Substack</a>
              <span className="text-[#0A2041]/20">•</span>
              <a href={LINKS.facebook} target="_blank" rel="noreferrer" className="text-xs font-semibold text-[#CA4C4C] hover:underline">Facebook</a>
            </div>
          </div>

          {/* WHAT'S HOT BOX */}
          <div className="border border-[#FEE689]/40 bg-[#FEE689]/10 p-6">
            <h4 className="text-xs font-black tracking-[0.2em] uppercase text-[#0A2041]/70">What's Hot This Week</h4>
            <ul className="mt-4 space-y-3">
              <li>
                <p className="text-xs font-semibold text-[#0A2041]/60 uppercase">Watching</p>
                <p className="text-sm font-bold text-[#0A2041] mt-1">{featuredShow}</p>
              </li>
              <li className="border-t border-[#FEE689]/30 pt-3">
                <p className="text-xs font-semibold text-[#0A2041]/60 uppercase">Reading</p>
                <p className="text-sm font-bold text-[#0A2041] mt-1">{featuredBook}</p>
              </li>
              <li className="border-t border-[#FEE689]/30 pt-3">
                <p className="text-xs font-semibold text-[#0A2041]/60 uppercase">Shopping</p>
                <p className="text-sm font-bold text-[#0A2041] mt-1">Amazon picks</p>
              </li>
            </ul>
          </div>

          {/* NEWSLETTER CTA */}
          <div className="border-2 border-[#CA4C4C] p-6 bg-[#CA4C4C]/5">
            <h4 className="text-sm font-black text-[#0A2041]">Get Blogs in Your Inbox</h4>
            <p className="mt-2 text-xs text-[#0A2041]/70">
              Weekly recaps, hot takes, and the culture I'm obsessed with.
            </p>
            <a
              href={LINKS.substack}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-4 w-full text-center px-4 py-3 bg-[#CA4C4C] text-white font-semibold hover:bg-[#B03C3C] transition-colors text-sm"
            >
              Subscribe →
            </a>
          </div>

          {/* QUOTE BOX */}
          <div className="border-l-4 border-[#0A2041] pl-4 py-3">
            <p className="text-sm italic text-[#0A2041]">
              "Fashion is a love language. Shopping is therapy. And yes, I have opinions about both."
            </p>
            <p className="mt-2 text-xs text-[#0A2041]/60">— Lucy</p>
          </div>

        </aside>

      </div>

      {/* BOTTOM SECTION: MORE STORIES */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 border-t border-[#0A2041]/10 mt-8">
        <div className="text-center mb-10">
          <h3 className="text-3xl font-black text-[#0A2041]">More Stories</h3>
          <p className="mt-2 text-sm text-[#0A2041]/70">From the archives</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="border border-[#0A2041]/10 p-5 hover:border-[#CA4C4C] hover:shadow-md transition-all group">
            <span className="text-xs font-black tracking-[0.15em] uppercase text-[#0A2041]/50">Feature</span>
            <h4 className="mt-2 text-lg font-black leading-snug text-[#0A2041] group-hover:text-[#CA4C4C]">Bracket Madness Returns</h4>
            <a href={LINKS.bracket} target="_blank" rel="noreferrer" className="text-xs font-semibold text-[#CA4C4C] hover:underline mt-3 inline-block">Read →</a>
          </div>
          <div className="border border-[#0A2041]/10 p-5 hover:border-[#CA4C4C] hover:shadow-md transition-all group">
            <span className="text-xs font-black tracking-[0.15em] uppercase text-[#0A2041]/50">Roundup</span>
            <h4 className="mt-2 text-lg font-black leading-snug text-[#0A2041] group-hover:text-[#CA4C4C]">Best Shopping Finds</h4>
            <a href={LINKS.amazon} target="_blank" rel="noreferrer" className="text-xs font-semibold text-[#CA4C4C] hover:underline mt-3 inline-block">Shop →</a>
          </div>
          <div className="border border-[#0A2041]/10 p-5 hover:border-[#CA4C4C] hover:shadow-md transition-all group">
            <span className="text-xs font-black tracking-[0.15em] uppercase text-[#0A2041]/50">Blog</span>
            <h4 className="mt-2 text-lg font-black leading-snug text-[#0A2041] group-hover:text-[#CA4C4C]">The Art of TV Recaps</h4>
            <a href={LINKS.substack} target="_blank" rel="noreferrer" className="text-xs font-semibold text-[#CA4C4C] hover:underline mt-3 inline-block">Read →</a>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center border-t border-[#0A2041]/10 mt-8">
        <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
          <a href={LINKS.instagram} target="_blank" rel="noreferrer" className="text-[#0A2041]/75 hover:text-[#CA4C4C] font-semibold transition">
            Instagram
          </a>
          <span className="text-[#0A2041]/20">•</span>
          <a href={LINKS.facebook} target="_blank" rel="noreferrer" className="text-[#0A2041]/75 hover:text-[#CA4C4C] font-semibold transition">
            Facebook
          </a>
          <span className="text-[#0A2041]/20">•</span>
          <a href={LINKS.substack} target="_blank" rel="noreferrer" className="text-[#0A2041]/75 hover:text-[#CA4C4C] font-semibold transition">
            Substack
          </a>
        </div>
        <p className="text-xs text-[#0A2041]/50">
          Some links may be affiliate links. Thanks for hanging out.
        </p>
      </footer>
    </div>
  );
}
