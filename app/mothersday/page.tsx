import type { Metadata } from "next";
import MothersDayCard from "@/components/MothersDayCard";

export const metadata: Metadata = {
  title: "Mother's Day Card",
  description: "A private Mother's Day card with an embedded video.",
};

export default function MothersDayPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#F8F5EE] text-[#0A2041] antialiased">
      <div className="relative isolate flex min-h-screen items-center justify-center px-4 py-10 sm:px-6">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(254,230,137,0.4),_transparent_34%),radial-gradient(circle_at_20%_80%,rgba(202,76,76,0.16),_transparent_28%),linear-gradient(180deg,#fbf7ee_0%,#f8f5ee_45%,#f5eee0_100%)]" />
        <div className="absolute inset-0 -z-10 opacity-50 [background-image:radial-gradient(rgba(10,32,65,0.08)_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="flex w-full max-w-5xl flex-col items-center gap-6 text-center">
          <div className="space-y-3">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.38em] text-[#CA4C4C]">
              Private greeting
            </p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Happy Mothers Day, Lucy
            </h1>
            <p className="mx-auto max-w-xl text-sm leading-7 text-[#0A2041]/72 sm:text-base">
              Click the card to open it, then play the video tucked inside.
            </p>
          </div>

          <MothersDayCard />
        </div>
      </div>
    </main>
  );
}