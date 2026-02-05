import Image from "next/image";

const LINKS = {
  substack: "PASTE_SUBSTACK",
  shopmy: "PASTE_SHOPMY",
  amazon: "PASTE_AMAZON",
  bracket: "https://bracket.lucyontheground.com",
  instagram: "PASTE_INSTAGRAM",
  tiktok: "PASTE_TIKTOK",
  facebook: "PASTE_FACEBOOK",
  threads: "PASTE_THREADS",
  x: "PASTE_X",
};

export default function LinkHubLanding() {
  return (
    <div className="w-full">
      {/* NAVY TOP BANNER */}
      <header className="sticky top-0 z-50 w-full bg-[#0A2041] shadow-[0_2px_12px_rgba(0,0,0,0.25)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/LOTG_Logo_Substack-Image-copy.svg"
              alt="Lucy On The Ground"
              className="h-8 sm:h-10 w-auto"
            />
          </div>

          <div className="flex items-center gap-3">
            <a
              href={LINKS.substack}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline text-sm font-semibold text-white/80 hover:text-white transition"
            >
              Substack
            </a>

            <a
              href={LINKS.bracket}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-[#FEE689] text-[#0A2041] px-4 py-2 text-xs sm:text-sm font-bold hover:opacity-90 transition"
            >
              Play Bracket
            </a>
          </div>
        </div>

        <div className="h-px bg-white/10" />
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-[#A7C4E7]/30 blur-3xl" />
          <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-[#F8F5EE]/55 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-12 items-center">
            {/* LEFT */}
            <div className="lg:col-span-7">
              <p className="text-xs font-bold tracking-[0.22em] uppercase text-[#0A2041]/70">
                Links • Looks • Bravo takes
              </p>

              <h1 className="mt-4 text-4xl sm:text-6xl font-black tracking-tight leading-[0.95] text-[#0A2041]">
                Links, looks, and the
                <span className="text-[#CA4C4C]">
                  {" "}
                  pop culture I can’t quit
                </span>
                .
              </h1>

              <p className="mt-4 text-base sm:text-lg text-[#0A2041]/75 max-w-2xl">
                Shop the favorites, read the recaps, and jump into the Bracket
                Challenge when you’re ready to get competitive.
              </p>

              {/* Big CTAs */}
              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                <BigCTA
                  href={LINKS.shopmy}
                  title="ShopMy"
                  subtitle="My weekly picks"
                  accent="cream"
                />
                <BigCTA
                  href={LINKS.amazon}
                  title="Amazon"
                  subtitle="Saved & trending"
                  accent="yellow"
                />
                <BigCTA
                  href={LINKS.substack}
                  title="Substack"
                  subtitle="Recaps + recommendations"
                  accent="red"
                />
              </div>

              {/* Currently line */}
              <div className="mt-6 rounded-2xl bg-[#F8F5EE]/70 border border-[#0A2041]/10 px-4 py-3 text-sm text-[#0A2041]/80">
                <span className="font-bold">Currently:</span>{" "}
                watching <span className="font-semibold">_____</span> • wearing{" "}
                <span className="font-semibold">_____</span> • reading{" "}
                <span className="font-semibold">_____</span>
              </div>
            </div>

            {/* RIGHT (Magazine style section) */}
            <div className="lg:col-span-5">
              <BracketMagazineTile
                href={LINKS.bracket}
                imageSrc="/images/bracket-magazine.jpg"
              />

              {/* Bottom caption (kept from your file) */}
              <div className="mt-4 rounded-2xl bg-white/70 border border-[#0A2041]/10 px-4 py-3">
                <p className="text-sm font-semibold text-[#0A2041]">
                  Tap a mood, grab the links, and meet me on Substack.
                </p>
              </div>

              <div className="mt-4 h-2 bg-[#CA4C4C]" />
            </div>
          </div>
        </div>
      </section>

      {/* MOOD SECTIONS */}
      <section className="bg-[#F9DCD8]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 pb-12 sm:pb-16">
          <div className="grid gap-6 lg:grid-cols-2">
            <Panel
              id="bravo"
              eyebrow="BRAVO"
              title="Bravo energy, always"
              body="Recaps, hot takes, and the moments we all text about."
              primaryLabel="Read on Substack"
              primaryHref={LINKS.substack}
              secondaryLabel="Follow on Instagram"
              secondaryHref={LINKS.instagram}
              bg="bg-[#F8F5EE]/70"
            />

            <Panel
              id="fashion"
              eyebrow="FASHION"
              title="Looks I’m into"
              body="Trendy finds, staples, and the ‘where is that from?’ links."
              primaryLabel="ShopMy picks"
              primaryHref={LINKS.shopmy}
              secondaryLabel="Amazon saves"
              secondaryHref={LINKS.amazon}
              bg="bg-[#F8F5EE]/70"
            />

            <Panel
              id="pop"
              eyebrow="POP CULTURE"
              title="What I’m talking about"
              body="The headlines, the couples, the chaos — curated."
              primaryLabel="Substack recaps"
              primaryHref={LINKS.substack}
              secondaryLabel="Threads"
              secondaryHref={LINKS.threads}
              bg="bg-[#F8F5EE]/70"
            />

            <Panel
              id="romcom"
              eyebrow="ROM COMS"
              title="Rom-com comfort zone"
              body="What I’m watching, reading, and recommending this week."
              primaryLabel="Subscribe"
              primaryHref={LINKS.substack}
              secondaryLabel="TikTok"
              secondaryHref={LINKS.tiktok}
              bg="bg-[#F8F5EE]/70"
            />
          </div>
        </div>
      </section>

      {/* BRACKET STRIP */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0A2041]" />
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(248,245,238,1) 1px, transparent 0)",
            backgroundSize: "22px 22px",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-16">
          <div className="grid gap-8 lg:grid-cols-12 items-center">
            <div className="lg:col-span-8">
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#F8F5EE]/70">
                Bracket Challenge
              </p>
              <h2 className="mt-3 text-3xl sm:text-4xl font-black text-[#F8F5EE]">
                Join my Bracket Challenge — it gets competitive fast.
              </h2>
              <p className="mt-3 text-[#F8F5EE]/75 max-w-2xl">
                Fill out your bracket, climb the leaderboard, and talk about it
                with me when the results go sideways.
              </p>
            </div>
            <div className="lg:col-span-4 flex lg:justify-end">
              <a
                href={LINKS.bracket}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-2xl px-6 py-4 text-sm font-black bg-[#FEE689] text-[#0A2041] hover:opacity-95 transition"
              >
                Play Bracket Madness →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="socials" className="bg-[#F9DCD8] border-t border-[#0A2041]/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <p className="text-lg font-extrabold">Follow along</p>
              <p className="text-sm text-[#0A2041]/70 mt-1">
                Daily content across socials + weekly recs on Substack.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <SocialChip label="Instagram" href={LINKS.instagram} />
              <SocialChip label="TikTok" href={LINKS.tiktok} />
              <SocialChip label="Facebook" href={LINKS.facebook} />
              <SocialChip label="Threads" href={LINKS.threads} />
              <SocialChip label="X" href={LINKS.x} />
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between gap-4 text-[11px] text-[#0A2041]/55">
            <span>© {new Date().getFullYear()} Lucy On The Ground</span>
            <span>Some links may be affiliate links.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ---------- Magazine tile ---------- */

function BracketMagazineTile({
  href,
  imageSrc,
}: {
  href: string;
  imageSrc: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group block"
      aria-label="Open Bracket Challenge"
    >
      <div className="relative overflow-hidden rounded-2xl border border-[#0A2041]/10 bg-white/60 shadow-sm cursor-pointer">
        {/* Use a fixed aspect ratio so layout stays stable */}
     
<div className="relative overflow-hidden rounded-2xl border border-[#0A2041]/10 bg-white/60 shadow-sm">

  {/* TOP CAPTION */}
  <div className="bg-white/90 backdrop-blur px-5 py-4 border-b border-[#0A2041]/10">
    <p className="text-xs uppercase tracking-wide text-[#0A2041]/60">
      Lucy on the Ground
    </p>
    <h3 className="text-lg font-bold leading-tight text-[#0A2041]">
      Bracket Challenge
    </h3>
  </div>

  {/* IMAGE */}
   <div className="relative w-full aspect-[20/17]">
          <Image
            src="/social/magcover.svg"
            alt="Bracket Challenge"
            fill
            sizes="(min-width: 1024px) 420px, 100vw"
            className="object-top transition-transform duration-300 group-hover:scale-115"
            priority
          />
        </div>

  {/* BOTTOM CAPTION */}
  <div className="bg-white/90 backdrop-blur px-5 py-4 border-t border-[#0A2041]/10">
    <p className="text-sm text-[#0A2041]/70">
      Compete, vote, and win bragging rights
    </p>
  </div>

  {/* HOVER OVERLAY */}
  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
    <span className="text-white text-lg font-semibold tracking-wide">
      Enter the Bracket →
    </span>
  </div>
</div>



        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="text-white text-lg font-semibold tracking-wide">
            Enter the Bracket →
          </span>
        </div>
      </div>
    </a>
  );
}

/* ---------- UI bits ---------- */

function BigCTA({
  href,
  title,
  subtitle,
  accent,
}: {
  href: string;
  title: string;
  subtitle: string;
  accent: "red" | "cream" | "yellow";
}) {
  const styles =
    accent === "red"
      ? "bg-[#CA4C4C] text-[#F8F5EE] border-[#CA4C4C]/30"
      : accent === "yellow"
      ? "bg-[#FEE689] text-[#0A2041] border-[#0A2041]/10"
      : "bg-[#F8F5EE] text-[#0A2041] border-[#0A2041]/10";

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={[
        "rounded-3xl border px-5 py-5 shadow-sm hover:shadow-md hover:-translate-y-[1px] transition",
        styles,
      ].join(" ")}
    >
      <div className="text-lg font-black">{title}</div>
      <div className="mt-1 text-sm font-semibold opacity-80">{subtitle}</div>
      <div className="mt-4 text-sm font-black">Open →</div>
    </a>
  );
}

function Panel({
  id,
  eyebrow,
  title,
  body,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  bg,
}: {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  bg: string;
}) {
  return (
    <div
      id={id}
      className={`rounded-[28px] border border-[#0A2041]/10 ${bg} p-7 sm:p-9`}
    >
      <p className="text-[10px] font-black tracking-[0.22em] uppercase text-[#0A2041]/60">
        {eyebrow}
      </p>
      <h3 className="mt-3 text-2xl font-black tracking-tight">{title}</h3>
      <p className="mt-3 text-sm text-[#0A2041]/70 max-w-prose">{body}</p>

      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <a
          href={primaryHref}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-black bg-[#0A2041] text-[#F8F5EE] hover:opacity-95 transition"
        >
          {primaryLabel} →
        </a>
        <a
          href={secondaryHref}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-black bg-white/70 border border-[#0A2041]/10 hover:bg-white transition"
        >
          {secondaryLabel} →
        </a>
      </div>
    </div>
  );
}

function SocialChip({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center rounded-full bg-white/70 border border-[#0A2041]/10 px-4 py-2 text-xs font-bold text-[#0A2041] hover:shadow-sm hover:-translate-y-[1px] transition"
    >
      {label}
    </a>
  );
}
