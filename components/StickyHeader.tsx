"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const BRACKET_BASE_URL =
  process.env.NEXT_PUBLIC_BRACKET_BASE_URL ||
  "https://bracket.lucyontheground.com";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: `${BRACKET_BASE_URL}/dashboard`, label: "Games" },
];

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/lucyontheground?igsh=MTdkcHN0aXBocnRvaw==", icon: "/social/insta logo.svg" },
  { label: "Amazon", href: "https://www.amazon.com/shop/lucyontheground?ref_=cm_sw_r_apann_aipsfshop_9XK20V9NDW5QZ1YFC4XF&language=en-US", icon: "/social/amazon logo.svg" },
  { label: "Facebook", href: "https://www.facebook.com/share/16Yvry7Noc/", icon: "/social/facebook logo.svg" },
  { label: "Substack", href: "https://lucyontheground.substack.com/", icon: "/social/substack logo.svg" },
  { label: "Threads", href: "https://www.threads.com/@lucyontheground", icon: "/social/threads  logo.svg" },
];

export default function StickyHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const logoWidth = 220;
  const logoHeight = 55;
  const containerHeight = "h-20";
  const containerPadding = "py-2 px-4";

  const activeClass = "text-[#FEE689] font-semibold";
  const inactiveClass = "text-[#FEE689] opacity-80 hover:opacity-100 transition-colors font-semibold";

  function isActive(href: string) {
    if (href.startsWith("http")) return false;
    if (href === "/") return pathname === "/";
    return pathname === href || pathname?.startsWith(href + "/") || pathname?.startsWith(href);
  }

  return (
    <header
      className={`fixed top-0 z-50 w-full shadow-[0_2px_12px_rgba(0,0,0,0.25)]`}
      style={{ backgroundColor: "#0A2041" }}
    >
      <div className={`max-w-7xl mx-auto flex items-center justify-between gap-6 ${containerHeight} ${containerPadding}`}>

        {/* Logo on left */}
        <Link href="/" className={`flex items-center flex-shrink-0`}>
          <Image
            src="/LOTG_Logo_Substack-Image-copy.svg"
            alt="Lucy On The Ground"
            width={logoWidth}
            height={logoHeight}
            priority
            className="h-auto"
          />
        </Link>

        {/* Right-side links + socials */}
        <div className="hidden md:flex items-center gap-5 flex-shrink-0 ml-auto">
          <nav className="flex items-center gap-4 text-sm">
            {NAV_LINKS.map((link, idx) => (
              <div key={link.href} className="flex items-center gap-4">
                <Link
                  href={link.href}
                  className={isActive(link.href) ? activeClass : inactiveClass}
                >
                  {link.label}
                </Link>
                {idx < NAV_LINKS.length - 1 && (
                  <span className="text-[#FEE689]/30">|</span>
                )}
              </div>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                title={social.label}
                className="relative w-7 h-7 hover:opacity-70 transition-opacity"
              >
                <Image
                  src={social.icon}
                  alt={social.label}
                  fill
                  className="object-contain"
                />
              </a>
            ))}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex-shrink-0">
          <button
            type="button"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-lg border border-white/20 px-3 py-2 text-[#FEE689] hover:text-white hover:border-white/30 transition"
          >
            <span className="font-semibold text-sm">{mobileMenuOpen ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10" style={{ backgroundColor: "#0A2041" }}>
          <div className="px-4 py-4 space-y-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block font-semibold text-[#FEE689] hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-white/10 flex items-center gap-3">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  title={social.label}
                  className="relative w-5 h-5 hover:opacity-70 transition-opacity"
                >
                  <Image
                    src={social.icon}
                    alt={social.label}
                    fill
                    className="object-contain"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
