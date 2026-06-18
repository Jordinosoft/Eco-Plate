import AppNav from "@/components/app-nav";
import { ORDERS } from "@/lib/data";
import Link from "next/link";
import { Leaf, Droplets, ShoppingBag, Trophy, TrendingUp } from "lucide-react";

const LEADERBOARD = [
  { rank: 1, name: "Sarah M.", pts: 428 },
  { rank: 2, name: "James K.", pts: 391 },
  { rank: 3, name: "Alex Rivera", pts: 384, isYou: true },
  { rank: 4, name: "Liu P.", pts: 320 },
];

const RECENT = [
  {
    title: "Artisan Bakery Surplus",
    merchant: "Boulangerie de la Paix",
    date: "Yesterday, 18:30 · 1 May Saver",
    status: "Completed",
    co2: 1.2,
  },
  {
    title: "The Green Grill · Dinner Box",
    merchant: "Green Garden Deli",
    date: "Yesterday, 13:00 · 1 May Saver",
    status: "Completed",
    co2: 0.8,
  },
  {
    title: "Downtown Market Bag",
    merchant: "Farmers Market Hub",
    date: "20 May 2024 · 1 May Saver",
    status: "Completed",
    co2: 2.1,
  },
];

export default function ImpactPage() {
  const totalCO2 = RECENT.reduce((s, r) => s + r.co2, 0).toFixed(1);

  return (
    <div className="min-h-screen bg-[var(--ep-cream)]">
      <AppNav />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6 grid lg:grid-cols-[240px_1fr] gap-6">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col gap-1 text-sm">
          {[
            { label: "Home", href: "/marketplace" },
            { label: "Marketplace", href: "/marketplace" },
            { label: "Community", href: "/community" },
            { label: "Analytics", href: "/analytics" },
            { label: "Impact", href: "/impact", active: true },
          ].map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className={`flex items-center gap-2 rounded-xl px-3 py-2 font-medium transition ${
                l.active
                  ? "bg-[var(--ep-green)] text-white"
                  : "text-[var(--ep-neutral)] hover:bg-gray-100"
              }`}
            >
              {l.label}
            </Link>
          ))}

          <div className="mt-4 rounded-2xl bg-[var(--ep-orange)] p-4 text-white">
            <p className="font-semibold text-sm">Rescue Food Now</p>
            <p className="text-xs text-white/80 mt-1">Find surplus near you.</p>
            <Link
              href="/marketplace"
              className="mt-3 block rounded-xl bg-white text-[var(--ep-orange)] text-xs font-semibold text-center px-3 py-2 hover:opacity-90 transition"
            >
              Browse →
            </Link>
          </div>
        </aside>

        {/* Main */}
        <main className="flex flex-col gap-6">
          {/* Header */}
          <div className="rounded-2xl bg-[var(--ep-green)] text-white p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 font-bold text-sm">
                AR
              </div>
              <div>
                <p className="font-semibold">Alex Rivera</p>
                <p className="text-xs text-white/70">Impact Level: Gold</p>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <span className="badge-impact bg-white/20 text-white border-0 text-xs">
                ✅ ID Authorised
              </span>
              <span className="badge-impact bg-white/20 text-white border-0 text-xs">
                🟢 Gold Verified
              </span>
            </div>
            <p className="text-sm text-white/80 mt-3 leading-relaxed">
              Your Green Legacy — Every rescued meal is a step toward a
              zero-waste future. Track your contribution to the circular economy.
            </p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              {
                icon: <ShoppingBag size={16} />,
                value: "128",
                label: "Meals Rescued",
                trend: "+12% this month",
                color: "bg-orange-50 text-[var(--ep-orange)]",
              },
              {
                icon: <Leaf size={16} />,
                value: `${totalCO2}kg`,
                label: "CO₂ Avoided",
                trend: "+8%",
                color: "bg-[var(--ep-green-light)] text-[var(--ep-green)]",
              },
              {
                icon: <Droplets size={16} />,
                value: "1.2k L",
                label: "Water Saved",
                trend: "",
                color: "bg-blue-50 text-blue-600",
              },
              {
                icon: <Trophy size={16} />,
                value: "Platinum",
                label: "Impact Level",
                trend: "Almost Elite!",
                color: "bg-purple-50 text-purple-600",
              },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl bg-white border border-gray-100 p-4 flex flex-col gap-2"
              >
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${s.color}`}
                >
                  {s.icon}
                </div>
                <p className="text-xl font-bold text-gray-900">{s.value}</p>
                <p className="text-xs text-[var(--ep-neutral)]">{s.label}</p>
                {s.trend && (
                  <p className="text-xs text-[var(--ep-green-mid)] font-medium">
                    {s.trend}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Chart + Milestones */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-900">
                  Green Legacy Growth
                </h2>
                <span className="text-xs text-[var(--ep-neutral)]">
                  Last 6 Months
                </span>
              </div>
              {/* Simple bar chart */}
              <div className="flex items-end gap-2 h-28">
                {[40, 55, 38, 70, 60, 85].map((v, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-md bg-[var(--ep-green-mid)] opacity-80 transition-all hover:opacity-100"
                    style={{ height: `${v}%` }}
                  />
                ))}
              </div>
              <div className="flex justify-between text-xs text-[var(--ep-neutral)] mt-2">
                {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-white border border-gray-100 p-5 flex flex-col items-center justify-center gap-3">
              <h2 className="font-semibold text-gray-900 self-start">
                Milestones
              </h2>
              <div className="relative flex h-28 w-28 items-center justify-center">
                <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#E5E7EB" strokeWidth="12" />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="var(--ep-orange)"
                    strokeWidth="12"
                    strokeDasharray="251"
                    strokeDashoffset={251 - 251 * 0.75}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="text-center">
                  <p className="text-2xl font-bold text-[var(--ep-orange)]">75%</p>
                </div>
              </div>
              <div className="text-center">
                <p className="font-semibold text-gray-900 text-sm">
                  Silver to Gold Rescuer
                </p>
                <p className="text-xs text-[var(--ep-neutral)] mt-0.5">
                  Rescue 25 more meals to unlock Gold
                </p>
                <Link
                  href="/marketplace"
                  className="mt-2 inline-block text-xs font-semibold text-[var(--ep-orange)] hover:underline"
                >
                  View Rewards →
                </Link>
              </div>
            </div>
          </div>

          {/* Recent rescues + Leaderboard */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-900">Recent Rescues</h2>
                <Link
                  href="/marketplace"
                  className="text-xs text-[var(--ep-orange)] hover:underline"
                >
                  View All
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                {RECENT.map((r) => (
                  <div
                    key={r.title}
                    className="flex items-center gap-3 text-sm"
                  >
                    <div className="h-10 w-10 rounded-xl bg-[var(--ep-green-light)] flex items-center justify-center shrink-0">
                      <ShoppingBag size={16} className="text-[var(--ep-green)]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">
                        {r.title}
                      </p>
                      <p className="text-xs text-[var(--ep-neutral)]">{r.date}</p>
                    </div>
                    <span className="badge-impact text-xs shrink-0">
                      {r.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-white border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-900">Community Rank</h2>
              </div>
              <div className="flex flex-col gap-3">
                {LEADERBOARD.map((l) => (
                  <div
                    key={l.rank}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2 ${
                      l.isYou ? "bg-[var(--ep-green-light)]" : ""
                    }`}
                  >
                    <span
                      className={`text-sm font-bold w-5 text-center ${
                        l.rank === 1
                          ? "text-yellow-500"
                          : l.isYou
                          ? "text-[var(--ep-green)]"
                          : "text-[var(--ep-neutral)]"
                      }`}
                    >
                      {l.rank}
                    </span>
                    <p
                      className={`flex-1 text-sm font-medium ${
                        l.isYou ? "text-[var(--ep-green)]" : "text-gray-700"
                      }`}
                    >
                      {l.name} {l.isYou && "(You)"}
                    </p>
                    <span className="text-sm font-semibold text-gray-700">
                      {l.pts} pts
                    </span>
                  </div>
                ))}
              </div>
              <Link
                href="#"
                className="mt-3 block text-center text-xs text-[var(--ep-orange)] hover:underline"
              >
                See Full Standings
              </Link>
            </div>
          </div>

          {/* Account settings */}
          <div className="rounded-2xl bg-white border border-gray-100 p-5 grid sm:grid-cols-2 gap-6">
            <div>
              <h2 className="font-semibold text-gray-900 mb-3">
                Account Settings
              </h2>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Surplus Alerts", sub: "Nearby rescues available now" },
                  { label: "Impact Reports", sub: "Weekly summary of your saves" },
                ].map((s) => (
                  <div key={s.label} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{s.label}</p>
                      <p className="text-xs text-[var(--ep-neutral)]">{s.sub}</p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 rounded-full bg-[var(--ep-green)] transition">
                      <span className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-semibold text-gray-900 mb-3">
                Payment Methods
              </h2>
              <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3">
                <div className="h-8 w-8 rounded-full bg-[var(--ep-orange)] text-white text-xs font-bold flex items-center justify-center">
                  OM
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Visa ending in 4242
                  </p>
                  <p className="text-xs text-[var(--ep-neutral)]">Expires 06/28</p>
                </div>
              </div>
              <button className="mt-2 text-xs text-[var(--ep-green)] hover:underline flex items-center gap-1">
                + Add New Method
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
