"use client";

import Link from "next/link";

export default function CTAChoice({
  href,
  label,
  descriptor,
  emoji,
  disabled = false,
}: {
  href: string;
  label: string;
  descriptor: string;
  emoji?: string;
  disabled?: boolean;
}) {
  const isPaste = !href || href.startsWith("PASTE_");
  const isDisabled = disabled || isPaste;

  return (
    <Link href={isDisabled ? "#" : href} target={isDisabled ? undefined : "_blank"} rel={isDisabled ? undefined : "noreferrer"}>
      <div className={`rounded-3xl border-2 p-6 sm:p-7 transform transition-all duration-300 cursor-pointer ${
        isDisabled
          ? "border-[#0A2041]/10 bg-[#F8F5EE] opacity-60 cursor-not-allowed"
          : "border-[#CA4C4C]/30 bg-white/80 hover:border-[#CA4C4C] hover:bg-white hover:scale-105 hover:shadow-lg"
      }`}>
        <div className="flex items-start gap-3">
          {emoji && <span className="text-2xl">{emoji}</span>}
          <div className="flex-1">
            <h3 className="font-extrabold text-lg text-[#0A2041]">{label}</h3>
            <p className="text-sm text-[#0A2041]/70 mt-1">{descriptor}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
