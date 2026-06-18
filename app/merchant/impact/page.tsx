import MerchantNav, { MerchantHeader } from "@/components/merchant-nav";
import { Leaf, TrendingUp, Award, ExternalLink } from "lucide-react";

const MILESTONES = [
  { icon: "🌱", label: "Waste Hero", date: "Jan 15, 2024", earned: true },
  { icon: "🤝", label: "Community Pillar", date: "Feb 28, 2024", earned: true },
  { icon: "📦", label: "500kg Rescued", date: "Mar 10, 2024", earned: true },
  { icon: "🌍", label: "Planet Guardian", date: "Pending", earned: false },
];

const NEWS = [
  {
    title: "Local businesses are leading the Zero Waste charge",
    tag: "Trending",
  },
  {
    title: "New CO₂ Tracking V2 is now live",
    tag: "Update",
  },
];

const CATEGORIES = [
  { name: "Bakery", pct: 42 },
  { name: "Produce", pct: 31 },
  { name: "Prepared Meals", pct: 18 },
  { name: "Dairy & Eggs", pct: 9 },
];

export default function MerchantImpactPage() {
  return (
    <div className="flex min-h-screen bg-[var(--ep-cream)]">
      <MerchantNav />

      <div className="flex-1 flex flex-col">
        <MerchantHeader title="Impact" />

        <main className="p-4 sm:p-6 flex flex-col gap-6 pb-24 lg:pb-6">
          {/* Green legacy */}
          <div className="rounded-2xl bg-[var(--ep-cream)] border border-[var(--ep-green-mid)]/30 p-5">
            <h1 className="text-lg font-bold text-[var(--ep-green)] mb-1">
              Your Green Legacy
            </h1>
            <p className="text-sm text-[var(--ep-neutral)]">
              Since joining FoodLoop, you've fundamentally shifted how surplus
              food impacts our local ecosystem. Every item rescued is a step
              toward a zero-waste future.
            </p>
          </div>

          {/* Key metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Total Food Rescued", value: "1.2M", unit: "kg", trend: "+13% this month", color: "text-[var(--ep-green)]", bg: "bg-[var(--ep-green-light)]" },
              { label: "CO₂e Prevented", value: "450", unit: "kg", trend: "", color: "text-[var(--ep-orange)]", bg: "bg-[var(--ep-orange-light)]" },
              { label: "Top 1% Rescued", value: "H2", unit: "", trend: "", color: "text-purple-600", bg: "bg-purple-50" },
              { label: "Meals Donated", value: "312", unit: "", trend: "Milestone reached!", color: "text-[var(--ep-green-mid)]", bg: "bg-[var(--ep-green-light)]" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl bg-white border border-gray-100 p-4 flex flex-col gap-1">
                <div className={`flex h-8 w-8 items-center justify-center rounded-xl mb-1 ${s.bg}`}>
                  <Leaf size={15} className={s.color} />
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {s.value}
                  <span className="text-sm ml-1">{s.unit}</span>
                </p>
                <p className="text-xs text-[var(--ep-neutral)]">{s.label}</p>
                {s.trend && (
                  <p className="text-xs text-[var(--ep-green-mid)]">{s.trend}</p>
                )}
              </div>
            ))}
          </div>

          {/* Charts row */}
          <div className="grid lg:grid-cols-2 gap-4">
            {/* Trend chart */}
            <div className="rounded-2xl bg-white border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-900">Impact Trends</h2>
                <div className="flex gap-2 text-xs">
                  {["6 Months", "1 Year"].map((t) => (
                    <button key={t} className="rounded-full border border-gray-200 px-3 py-1 text-[var(--ep-neutral)] hover:border-[var(--ep-green)] transition">
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-end gap-2 h-32">
                {[55, 70, 45, 90, 78, 100].map((v, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-md bg-[var(--ep-orange)] opacity-80 hover:opacity-100 transition"
                    style={{ height: `${v}%` }}
                  />
                ))}
              </div>
              <div className="flex justify-between text-xs text-[var(--ep-neutral)] mt-2">
                {["JAN", "FEB", "MAR", "APR", "MAY", "JUN"].map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
            </div>

            {/* Top categories */}
            <div className="rounded-2xl bg-white border border-gray-100 p-5">
              <h2 className="font-semibold text-gray-900 mb-4">
                Top Categories
              </h2>
              <div className="flex flex-col gap-3">
                {CATEGORIES.map((c) => (
                  <div key={c.name} className="flex flex-col gap-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">{c.name}</span>
                      <span className="font-semibold text-[var(--ep-green)]">
                        {c.pct}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-100">
                      <div
                        className="h-2 rounded-full bg-[var(--ep-green-mid)]"
                        style={{ width: `${c.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-[var(--ep-neutral)] mt-4 bg-[var(--ep-green-light)] rounded-xl p-3">
                💡 Tip: Your Bakery items are high-demand. Try reducing by 10%
                earlier to reach your food-saver target.
              </p>
            </div>
          </div>

          {/* Milestones */}
          <div className="rounded-2xl bg-white border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900">Sustainability Milestones</h2>
              <button className="text-xs text-[var(--ep-orange)] hover:underline">
                View All Badges
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {MILESTONES.map((m) => (
                <div
                  key={m.label}
                  className={`rounded-2xl border p-4 flex flex-col items-center gap-2 text-center ${
                    m.earned
                      ? "border-[var(--ep-green-mid)]/30 bg-[var(--ep-green-light)]"
                      : "border-gray-200 bg-gray-50 opacity-60"
                  }`}
                >
                  <span className="text-3xl">{m.icon}</span>
                  <p className="text-sm font-semibold text-gray-900">
                    {m.label}
                  </p>
                  <p className="text-xs text-[var(--ep-neutral)]">{m.date}</p>
                  {m.earned && (
                    <span className="badge-impact text-xs">Unlocked</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Share + News */}
          <div className="grid lg:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-[var(--ep-orange)] text-white p-5 flex flex-col gap-3">
              <h2 className="font-semibold">Share Your Impact</h2>
              <p className="text-sm text-white/85 leading-relaxed">
                Let your customers know about your commitment to the planet.
                Businesses that share their impact stats see 220kg more in
                customer loyalty.
              </p>
              <div className="flex items-center gap-3 mt-1">
                <div className="rounded-xl bg-white/20 px-4 py-2 text-sm font-semibold">
                  Download Kit
                </div>
                <div className="rounded-xl bg-white text-[var(--ep-orange)] px-4 py-2 text-sm font-semibold">
                  📱 Social
                </div>
              </div>
              <div className="mt-2 text-center">
                <p className="text-3xl font-bold">220kg</p>
                <p className="text-xs text-white/70">CO₂ Prevented Total</p>
              </div>
            </div>

            <div className="rounded-2xl bg-white border border-gray-100 p-5">
              <h2 className="font-semibold text-gray-900 mb-4">Impact News</h2>
              <div className="flex flex-col gap-3">
                {NEWS.map((n) => (
                  <div key={n.title} className="flex items-start gap-3">
                    <span className="badge-impact text-xs shrink-0">
                      {n.tag}
                    </span>
                    <p className="text-sm text-gray-700 leading-snug">
                      {n.title}
                    </p>
                  </div>
                ))}
              </div>
              <button className="mt-4 flex items-center gap-1 text-xs text-[var(--ep-orange)] hover:underline">
                Discover Community Insights <ExternalLink size={11} />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
