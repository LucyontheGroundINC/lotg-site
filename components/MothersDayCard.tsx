"use client";

import { Dancing_Script } from "next/font/google";
import { useState } from "react";

// One panel = 22rem (352px). Two panels = 44rem (704px).
// On small screens panels shrink proportionally to half of 92vw each.
const CLOSED = "min(22rem, 92vw)";
const OPEN = "min(44rem, 92vw)";
const HEIGHT = "min(30rem, 138vw)"; // portrait aspect
const handwriting = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"],
});
const DEFAULT_NOTE = `Dear Lucy,

Every day should be Mother's Day and you should be celebrated. You are the superhero of our family. Not many women have the strength and love to have and care for 3 kids. Thank you for being my partner, my rock, and the love of my life. Happy every day, but today, Happy Mother's Day.

Love,
Bill, Coco, Frankie, Tully, Rumple, Kyle and #3`;

export default function MothersDayCard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    /* Outer centering shell */
    <div className="flex w-full justify-center px-2 sm:px-4">
      {/*
        Clip-wrapper
        ───────────────────────────────────────────────────────────
        • overflow:hidden clips the right interior panel when closed
        • transitions width: 1 panel → 2 panels when opened
        • perspective applied here so the cover 3D rotation reads
          from the same viewpoint as the rest of the card
      */}
      <div
        className="relative overflow-hidden transition-[width] duration-[1300ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          width: isOpen ? OPEN : CLOSED,
          height: HEIGHT,
          perspective: "2600px",
          boxShadow: "0 32px 110px rgba(10,32,65,0.22)",
        }}
      >
        {/*
          Interior — always full open width.
          The right panel overflows the clip-wrapper when closed;
          the expanding wrapper naturally reveals it on open.
        */}
        <div
          className="absolute inset-y-0 left-0 flex"
          style={{ width: OPEN }}
        >
          {/* Left page — note */}
          <div className="relative flex h-full w-1/2 flex-shrink-0 flex-col overflow-hidden border-r border-[#0A2041]/10 bg-[#fffaf0]">
            <div
              className="flex h-full flex-col p-4 transition-opacity duration-700 sm:p-5"
              style={{
                opacity: isOpen ? 1 : 0,
                transitionDelay: isOpen ? "380ms" : "0ms",
              }}
            >
              <p
                className={`${handwriting.className} whitespace-pre-line text-left text-[0.96rem] leading-[1.38] text-[#0A2041] sm:text-[1.08rem]`}
              >
                {DEFAULT_NOTE}
              </p>
            </div>
          </div>

          {/* Right page — video */}
          <div className="relative flex h-full w-1/2 flex-shrink-0 flex-col overflow-hidden bg-[#0A2041]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(254,230,137,0.28),transparent_32%),radial-gradient(circle_at_80%_0%,rgba(202,76,76,0.35),transparent_28%)]" />
            <div
              className="relative flex h-full flex-col p-4 transition-opacity duration-700 sm:p-5"
              style={{
                opacity: isOpen ? 1 : 0,
                transitionDelay: isOpen ? "420ms" : "0ms",
              }}
            >
              <p className="mb-0.5 text-[0.64rem] font-semibold uppercase tracking-[0.35em] text-[#FEE689]">
                Video
              </p>
              <p className="mb-3 text-[0.72rem] leading-5 text-white/65">
                Press play to watch.
              </p>
              <div className="flex-1 overflow-hidden border border-white/15 bg-black/25">
                <video
                  className="h-full w-full object-contain"
                  controls
                  playsInline
                  preload="metadata"
                  src="/Mothers Day(1).mp4"
                />
              </div>
            </div>
          </div>
        </div>

        {/*
          Cover
          ───────────────────────────────────────────────────────────
          • Absolutely positioned over the left panel
          • transform-origin: left center  → left edge is the hinge
          • rotateY(0) closed → rotateY(-180deg) open
          • backface-visibility:hidden: vanishes once fully open
          • pointer-events:none once open so interior is clickable
        */}
        <button
          type="button"
          aria-label="Open Mother's Day card"
          aria-expanded={isOpen}
          disabled={isOpen}
          onClick={() => setIsOpen(true)}
          className="absolute inset-y-0 left-0 overflow-hidden border-r border-[#0A2041]/14 transition-transform duration-[1300ms] ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CA4C4C] focus-visible:ring-offset-4"
          style={{
            width: CLOSED,
            transformOrigin: "left center",
            transform: isOpen ? "rotateY(-180deg)" : "rotateY(0deg)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            pointerEvents: isOpen ? "none" : "auto",
            zIndex: 10,
          }}
        >
          {/* Yellow card face */}
          <div className="relative flex h-full flex-col bg-[#FEE689]">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.44),rgba(255,255,255,0.06)),radial-gradient(circle_at_22%_18%,rgba(255,255,255,0.34),transparent_42%)]" />
            {/* Spine shadow */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-5 bg-gradient-to-r from-[#0A2041]/16 to-transparent" />
            {/* Right edge fold hint */}
            <div className="pointer-events-none absolute inset-y-0 right-0 w-3 bg-gradient-to-l from-[#0A2041]/12 to-transparent" />

            <div className="relative flex h-full flex-col justify-between p-6 sm:p-8">
              <div className="space-y-4">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.44em] text-[#CA4C4C]">
                  Open me
                </p>
                <div className="space-y-1">
                  <h2 className="text-3xl font-semibold leading-snug text-[#0A2041] sm:text-4xl">
                    Happy
                    <br />
                    Mother&apos;s Day
                  </h2>
                </div>
                <p className="max-w-[11rem] text-sm leading-6 text-[#0A2041]/62">
                  A little card with a surprise inside.
                </p>
              </div>
              <div className="space-y-2">
                <div className="h-px w-full bg-[#0A2041]/10" />
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-[#0A2041]/48">
                  Click to open →
                </p>
              </div>
            </div>
          </div>
        </button>

        {/* Close button — fades in after opening */}
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          aria-label="Close card"
          className={`absolute right-3 top-3 z-20 border border-[#0A2041]/10 bg-white/80 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#0A2041]/55 shadow-sm transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CA4C4C] ${
            isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          Close
        </button>
      </div>
    </div>
  );
}
