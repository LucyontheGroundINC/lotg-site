"use client";

import { useEffect, useRef, useState } from "react";

export default function ThoughtCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`rounded-3xl border border-[#CA4C4C]/20 bg-gradient-to-br from-[#F9DCD8]/40 to-[#FEE689]/20 p-6 sm:p-8 transform transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } hover:border-[#CA4C4C]/40 hover:shadow-lg ${className}`}
    >
      {children}
    </div>
  );
}
