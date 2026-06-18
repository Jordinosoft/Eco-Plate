import CustomerSidebar from "@/components/customer-sidebar";
import { Leaf, Droplets, ShoppingBag, Trash2 } from "lucide-react";

const STATS = [
  { label: "CO₂ Avoided", value: "452.8", unit: "kg", icon: Leaf, color: "text-[var(--ep-green)]", bg: "bg-[var(--ep-green-light)]" },
  { label: "Water Conserved", value: "12,400", unit: "L", icon: Droplets, color: "text-blue-500", bg: "bg-blue-50" },
  { label: "Meals Rescued", value: "184", unit: "meals", icon: ShoppingBag, color: "text-[var(--ep-orange)]", bg: "bg-[var(--ep-orange-light)]" },
  { label: "Landfill Waste Avoided", value: "312.4", unit: "kg", icon: Trash2, color: "text-[var(--ep-green-mid)]", bg: "bg-[var(--ep-green-light)]" },
];

const TREND_BARS = [
  { label: "Jan", meals: 12, co2: 8 },
  { label: "Feb", meals: 18, co2: 13 },
  { label: "Mar", meals: 22, co2: 17 },
  { label: "Apr", meals: 30, co2: 24 },
  { label: "May", meals: 28, co2: 21 },
  { label: "Jun", meals: 35, co2: 28 },
  { label: "Jul", meals: 39, co2: 33 },
];

const CATEGORIES = [
  { label: "Bakery & Bread", pct: 45 },
  { label: "Fresh Produce", pct: 30 },
  { label: "Dairy & Eggs", pct: 15 },
  { label: "Ready Meals", pct: 10 },
];

const MILESTONES = [
  { label: "100 Meals", done: true },
  { label: "500 kg CO₂", done: true },
  { label: "250 Meals", done: false },
  { label: "Earth Guardian Badge", done: false },
];

export default function AnalyticsPage() {
  return (
    <div className="flex min-h-screen bg-[var(--ep-cream)]">
      <CustomerSidebar />

      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100 bg-white flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Your Rescuer Analytics</h1>
            <p className="text-sm text-[var(--ep-neutral)]">Tracking your personal climate impact</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-[var(--ep-green-light)] border border-[var(--ep-green-mid)]/20 px-3 py-1 text-xs font-medium text-[var(--ep-green)]">
              🌍 Earth Guardian
            </span>
          </div>
        </div>

        <main className="p-8 flex flex-col gap-8">
          {/* Stat cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {STATS.map((s) => (
              <div key={s.label} className="rounded-2xl bg-white border border-gray-100 p-5 flex flex-col gap-3">
                <div className={`h-10 w-10 rounded-xl ${s.bg} flex items-center justify-center`}>
                  <s.icon size={18} className={s.color} />
                </div>
                <div>
                  <p className={`text-2xl font-bold ${s.color}`}>
                    {s.value}
                    <span className="text-sm font-normal text-[var(--ep-neutral)] ml-1">{s.unit}</span>
                  </p>
                  <p className="text-xs text-[var(--ep-neutral)]">{s.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Impact Trends */}
            <div className="rounded-2xl bg-white border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-900">Impact Trends</h2>
                <div className="flex gap-3 text-xs text-[var(--ep-neutral)]">
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-3 rounded bg-[var(--ep-green)] inline-block" /> Meals
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-3 rounded bg-[var(--ep-orange)] inline-block" /> CO₂ (kg)
                  </span>
                </div>
              </div>
              <div className="flex items-end gap-2 h-36">
                {TREND_BARS.map((b) => (
                  <div key={b.label} className="flex-1 flex items-end gap-0.5">
                    <div
                      className="flex-1 rounded-t bg-[var(--ep-green)]"
                      style={{ height: `${(b.meals / 40) * 100}%` }}
                    />
                    <div
                      className="flex-1 rounded-t bg-[var(--ep-orange)]"
                      style={{ height: `${(b.co2 / 40) * 100}%` }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-xs text-[var(--ep-neutral)] mt-2">
                {TREND_BARS.map((b) => <span key={b.label}>{b.label}</span>)}
              </div>
            </div>

            {/* Milestone Progress */}
            <div className="rounded-2xl bg-white border border-gray-100 p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Milestone Progress</h2>
              <div className="flex items-center gap-6">
                {/* Donut */}
                <div className="relative h-28 w-28 shrink-0">
                  <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
                    <circle cx="50" cy="50" r="38" fill="none" stroke="#E5E7EB" strokeWidth="14" />
                    <circle
                      cx="50" cy="50" r="38" fill="none"
                      stroke="var(--ep-green)"
                      strokeWidth="14"
                      strokeDasharray={`${239 * 0.5} 239`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-lg font-bold text-[var(--ep-green)]">50%</p>
                    <p className="text-xs text-[var(--ep-neutral)]">complete</p>
                  </div>
                </div>
                {/* List */}
                <div className="flex flex-col gap-2 flex-1">
                  {MILESTONES.map((m) => (
                    <div key={m.label} className="flex items-center gap-2 text-sm">
                      <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        m.done ? "bg-[var(--ep-green)] border-[var(--ep-green)]" : "border-gray-300"
                      }`}>
                        {m.done && <span className="text-white text-[9px] font-bold">✓</span>}
                      </div>
                      <span className={m.done ? "text-gray-900 font-medium" : "text-[var(--ep-neutral)]"}>
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Rescue Categories */}
          <div className="rounded-2xl bg-white border border-gray-100 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Rescue Categories</h2>
            <div className="flex flex-col gap-3">
              {CATEGORIES.map((c) => (
                <div key={c.label} className="flex items-center gap-3 text-sm">
                  <span className="w-36 text-[var(--ep-neutral)] shrink-0">{c.label}</span>
                  <div className="flex-1 h-2.5 rounded-full bg-gray-100">
                    <div
                      className="h-2.5 rounded-full bg-[var(--ep-green-mid)]"
                      style={{ width: `${c.pct}%` }}
                    />
                  </div>
                  <span className="font-semibold text-gray-900 w-10 text-right">{c.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Maximize Your Impact */}
          <div className="rounded-2xl bg-[var(--ep-green)] text-white p-6 flex items-center justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-white/70 mb-1">
                MAXIMIZE YOUR IMPACT
              </p>
              <h2 className="text-lg font-bold">You're only 16 rescues away from Earth Guardian!</h2>
              <p className="text-sm text-white/80 mt-1">
                Rescue 16 more meals this month to unlock your next badge and a 500 XAF platform credit.
              </p>
            </div>
            <a href="/marketplace" className="btn-cta bg-white text-[var(--ep-green)] hover:bg-gray-50 shrink-0 whitespace-nowrap">
              Rescue Now →
            </a>
          </div>
        </main>
      </div>
    </div>
  );
}
