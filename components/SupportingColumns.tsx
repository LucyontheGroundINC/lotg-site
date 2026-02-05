"use client";

import { useEffect, useState } from "react";
import Card from "./Card";
import Eyebrow from "./Eyebrow";

type Item = { title: string; url?: string };

export default function SupportingColumns() {
  const [data, setData] = useState<{ watching: Item[]; wearing: Item[]; reading: Item[] }>({ watching: [], wearing: [], reading: [] });

  useEffect(() => {
    fetch("/api/currently")
      .then((r) => r.json())
      .then((j) => setData(j?.whatImInto || { watching: [], wearing: [], reading: [] }))
      .catch(() => {});
  }, []);

  const tiles = [
    { eyebrow: "Watching", title: data.watching[0]?.title || "—", desc: data.watching.slice(1, 3).map((t) => t.title).join(" • ") },
    { eyebrow: "Wearing", title: data.wearing[0]?.title || "—", desc: data.wearing.slice(1, 3).map((t) => t.title).join(" • ") },
    { eyebrow: "Reading", title: data.reading[0]?.title || "—", desc: data.reading.slice(1, 3).map((t) => t.title).join(" • ") },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
      {tiles.map((t, idx) => (
        <Card key={idx} className={`${idx === 1 ? "sm:col-span-2" : ""} hover:shadow-xl transition` }>
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h3 className="mt-3 text-xl sm:text-2xl font-extrabold text-[#0A2041]">{t.title}</h3>
          <p className="mt-2 text-sm text-[#0A2041]/75">{t.desc || "Curated picks + quick recs."}</p>
        </Card>
      ))}
    </div>
  );
}
