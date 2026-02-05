"use client";

import { useEffect, useState } from "react";

type WhatImIntoData = {
  whatImInto: {
    watching: Array<{ title: string; url: string }>;
    wearing: Array<{ title: string; url: string }>;
    reading: Array<{ title: string; url: string }>;
  };
};

export default function WhatImIntoRightNow() {
  const [data, setData] = useState<WhatImIntoData>({
    whatImInto: { watching: [], wearing: [], reading: [] },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetch("/api/currently")
      .then((r) => r.json())
      .then((j) => {
        if (mounted) {
          setData(
            j || {
              whatImInto: { watching: [], wearing: [], reading: [] },
            }
          );
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return null;

  const { whatImInto } = data;

  const renderCategory = (
    title: string,
    icon: string,
    items: Array<{ title: string; url: string }>
  ) => (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <span className="text-3xl">{icon}</span>
        <h3 className="text-xl sm:text-2xl font-black text-[#0A2041]">{title}</h3>
      </div>
      <div className="space-y-3">
        {items.length === 0 ? (
          <p className="text-base text-[#0A2041]/60 italic">—</p>
        ) : (
          items.map((item, idx) =>
            item.url ? (
              <a
                key={idx}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="block rounded-lg border border-[#0A2041]/10 bg-white/60 p-4 hover:shadow-md hover:-translate-y-0.5 transition text-base font-semibold text-[#0A2041] hover:text-[#CA4C4C]"
              >
                {item.title} →
              </a>
            ) : (
              <div
                key={idx}
                className="rounded-lg border border-[#0A2041]/10 bg-white/60 p-4 text-base font-semibold text-[#0A2041]"
              >
                {item.title}
              </div>
            )
          )
        )}
      </div>
    </div>
  );

  return (
    <section className="bg-[#F8F5EE]/60 py-16 sm:py-24 border-t border-[#0A2041]/10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-14 sm:mb-16 text-center">
          <p className="text-xs font-black tracking-[0.22em] uppercase text-[#0A2041]/65">
            Curated for you
          </p>
          <h2 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-black text-[#0A2041] leading-tight">
            What I'm Into Right Now
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#0A2041]/70 max-w-3xl mx-auto leading-relaxed">
            Books I'm reading, shows I'm watching, and pieces I'm wearing this week.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-12">
          {renderCategory("Watching", "📺", whatImInto.watching)}
          {renderCategory("Wearing", "👗", whatImInto.wearing)}
          {renderCategory("Reading", "📚", whatImInto.reading)}
        </div>
      </div>
    </section>
  );
}

