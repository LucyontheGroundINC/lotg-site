"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "";

type Item = { title: string; url: string };

interface CurrentlyData {
  whatImInto: {
    watching: Item[];
    wearing: Item[];
    reading: Item[];
  };
}

export default function AdminPage() {
  const [data, setData] = useState<CurrentlyData>({
    whatImInto: { watching: [], wearing: [], reading: [] },
  });
  const [status, setStatus] = useState("");
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [authEmail, setAuthEmail] = useState<string | null>(null);

  const SUPABASE_CONFIGURED = !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;


  useEffect(() => {
    if (!SUPABASE_CONFIGURED) {
      setLoadingAuth(false);
      return;
    }

    const load = async () => {
      try {
        setLoadingAuth(true);
        const { data: sessionData } = await supabase.auth.getSession();
        if (!sessionData?.session) {
          setAuthEmail(null);
        } else {
          const { data: authData, error } = await supabase.auth.getUser();
          if (!error && authData.user) setAuthEmail(authData.user.email ?? null);
        }
      } catch (e) {
        setAuthEmail(null);
      } finally {
        setLoadingAuth(false);
      }
    };

    load();
  }, []);

  useEffect(() => {
    fetch("/api/currently")
      .then((r) => r.json())
      .then((j) => setData(j || { whatImInto: { watching: [], wearing: [], reading: [] } }))
      .catch(() => {});
  }, []);

  const isAdmin = !!(authEmail && ADMIN_EMAIL && authEmail === ADMIN_EMAIL);

  async function sendMagicLink() {
    try {
      await supabase.auth.signInWithOtp({ email: ADMIN_EMAIL });
      alert("Magic link sent to admin email.");
    } catch (err) {
      console.error(err);
      alert("Failed to send magic link.");
    }
  }

  const handleItemChange = (
    category: "watching" | "wearing" | "reading",
    index: number,
    field: "title" | "url",
    value: string
  ) => {
    setData((prev) => {
      const newItems = [...prev.whatImInto[category]];
      newItems[index] = { ...newItems[index], [field]: value };
      return {
        ...prev,
        whatImInto: { ...prev.whatImInto, [category]: newItems },
      };
    });
  };

  const addItem = (category: "watching" | "wearing" | "reading") => {
    setData((prev) => ({
      ...prev,
      whatImInto: {
        ...prev.whatImInto,
        [category]: [...prev.whatImInto[category], { title: "", url: "" }],
      },
    }));
  };

  const removeItem = (category: "watching" | "wearing" | "reading", index: number) => {
    setData((prev) => ({
      ...prev,
      whatImInto: {
        ...prev.whatImInto,
        [category]: prev.whatImInto[category].filter((_, i) => i !== index),
      },
    }));
  };

  async function save(e: React.FormEvent) {
    e.preventDefault();
    const allowed = isAdmin;
    if (!allowed) return alert("Unauthorized");
    setStatus("saving");
    try {
      await fetch("/api/currently", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus("saved");
      setTimeout(() => setStatus(""), 1800);
    } catch (err) {
      setStatus("error");
    }
  }

  if (loadingAuth) {
    return <div className="p-6">Checking auth…</div>;
  }

  if (!SUPABASE_CONFIGURED) {
    return (
      <div className="min-h-screen bg-[#F9DCD8] text-[#0A2041] p-6 flex items-center justify-center">
        <div className="mx-auto max-w-md bg-white/80 rounded-2xl border border-[#0A2041]/10 p-6 text-center">
          <h1 className="text-xl font-black mb-2">Admin unavailable</h1>
          <p className="text-sm text-[#0A2041]/70 mb-4">Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#F9DCD8] text-[#0A2041] p-6 flex items-center justify-center">
        <div className="mx-auto max-w-md bg-white/80 rounded-2xl border border-[#0A2041]/10 p-6 text-center">
          <h1 className="text-xl font-black mb-2">Admin access required</h1>
          <p className="text-sm text-[#0A2041]/70 mb-4">You must sign in with the admin email to edit these values.</p>
          {ADMIN_EMAIL ? (
            <>
              <p className="text-xs text-[#0A2041]/60 mb-3">Admin email: <span className="font-semibold">{ADMIN_EMAIL}</span></p>
              <button onClick={sendMagicLink} className="rounded-2xl bg-[#CA4C4C] text-white px-4 py-2 font-black">Send magic link</button>
            </>
          ) : (
            <p className="text-sm text-red-500">No admin email configured.</p>
          )}
        </div>
      </div>
    );
  }

  const renderCategorySection = (
    category: "watching" | "wearing" | "reading",
    label: string,
    emoji: string
  ) => {
    const items = data.whatImInto[category];

    return (
      <div className="bg-[#F8F5EE]/50 rounded-xl p-4 border border-[#0A2041]/10">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">{emoji}</span>
          <h3 className="text-lg font-black text-[#0A2041]">{label}</h3>
        </div>

        <div className="space-y-3">
          {items.map((item, idx) => (
            <div key={idx} className="bg-white/80 rounded-lg border border-[#0A2041]/10 p-3 space-y-2">
              <input
                type="text"
                value={item.title}
                onChange={(e) => handleItemChange(category, idx, "title", e.target.value)}
                placeholder="Item title (required)"
                className="w-full px-3 py-2 border border-[#0A2041]/20 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#CA4C4C]"
              />
              <input
                type="url"
                value={item.url}
                onChange={(e) => handleItemChange(category, idx, "url", e.target.value)}
                placeholder="URL (optional)"
                className="w-full px-3 py-2 border border-[#0A2041]/20 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#CA4C4C]"
              />
              <button
                type="button"
                onClick={() => removeItem(category, idx)}
                className="text-xs text-[#CA4C4C] hover:text-[#CA4C4C]/70 font-black"
              >
                × Remove
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => addItem(category)}
          className="mt-3 text-sm px-3 py-2 bg-[#FEE689] text-[#0A2041] rounded-lg hover:bg-[#FEE689]/80 transition font-semibold"
        >
          + Add {label}
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F9DCD8] text-[#0A2041] p-6">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-black mb-2">What I'm Into Right Now</h1>
        <p className="text-sm text-[#0A2041]/70 mb-6">Edit your reading, watching, and wearing — add as many items as you'd like per category.</p>

        <form onSubmit={save} className="space-y-6">
          {renderCategorySection("watching", "Watching", "📺")}
          {renderCategorySection("wearing", "Wearing", "👗")}
          {renderCategorySection("reading", "Reading", "📚")}

          <div className="flex items-center gap-3 bg-white/80 rounded-2xl border border-[#0A2041]/10 p-6">
            <button className="rounded-2xl bg-[#CA4C4C] text-white px-6 py-3 font-black hover:bg-[#CA4C4C]/90 transition" type="submit">
              Save All Changes
            </button>
            <div className="text-sm text-[#0A2041]/70">{status === "saving" ? "Saving..." : status === "saved" ? "✓ Saved" : status === "error" ? "Error saving" : ""}</div>
          </div>
        </form>
      </div>
    </div>
  );
}
