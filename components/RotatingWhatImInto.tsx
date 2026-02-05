"use client";

import { useEffect, useState } from "react";

type Item = { title: string; url: string };

interface CurrentlyData {
  whatImInto: {
    watching: Item[];
    wearing: Item[];
    reading: Item[];
  };
}

const CATEGORIES = [
  { key: "watching" as const, label: "Watching", emoji: "📺" },
  { key: "wearing" as const, label: "Wearing", emoji: "👗" },
  { key: "reading" as const, label: "Reading", emoji: "📚" },
];

export default function RotatingWhatImInto() {
  const [data, setData] = useState<CurrentlyData>({
    whatImInto: { watching: [], wearing: [], reading: [] },
  });
  const [loading, setLoading] = useState(true);
  const [flipped, setFlipped] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/currently")
      .then((r) => r.json())
      .then((j) => {
        setData(j || { whatImInto: { watching: [], wearing: [], reading: [] } });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;

  return (
    <section className="bg-[#07122a] py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FEE689] mb-8">
          What I am into Right Now
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 perspective">
          {CATEGORIES.map((category) => {
            const items = data.whatImInto[category.key];
            const isFlipped = flipped === category.key;

            return (
              <div
                key={category.key}
                className="h-64 sm:h-72 cursor-pointer"
                onMouseEnter={() => setFlipped(category.key)}
                onMouseLeave={() => setFlipped(null)}
                onClick={() => setFlipped(isFlipped ? null : category.key)}
              >
                <div className="relative w-full h-full transition-transform duration-500 preserve-3d"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}>
                  
                  {/* FRONT: ICON */}
                  <div
                    className="absolute w-full h-full rounded-3xl border border-[#0A2041]/10 bg-gradient-to-br from-[#F8F5EE]/80 to-[#F9DCD8]/60 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <span className="text-7xl sm:text-8xl">{category.emoji}</span>
                  </div>

                  {/* BACK: CONTENT */}
                  <div
                    className="absolute w-full h-full rounded-3xl border border-[#0A2041]/10 bg-gradient-to-br from-[#0A2041] to-[#0A2041]/95 flex flex-col p-6 sm:p-8 shadow-lg"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                  >
                    <div>
                      <p className="text-xs font-black tracking-[0.22em] uppercase text-[#FEE689]">
                        {category.label}
                      </p>
                      <h3 className="mt-2 text-2xl sm:text-3xl font-black text-white">
                        {category.emoji}
                      </h3>
                    </div>

                    <div className="mt-6 space-y-3 flex-1 overflow-y-auto">
                      {items.length === 0 ? (
                        <p className="text-sm text-white/60 italic">Coming soon...</p>
                      ) : (
                        items.map((item, idx) => (
                          <div key={idx}>
                            {item.url ? (
                              <a
                                href={item.url}
                                target="_blank"
                                rel="noreferrer"
                                className="block text-sm sm:text-base font-semibold text-[#FEE689] hover:text-white transition underline"
                              >
                                {item.title}
                              </a>
                            ) : (
                              <p className="text-sm sm:text-base font-semibold text-white">
                                {item.title}
                              </p>
                            )}
                          </div>
                        ))
                      )}
                    </div>

                    <p className="mt-4 text-xs text-white/50">Hover to flip</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
