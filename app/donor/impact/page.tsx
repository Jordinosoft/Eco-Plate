import DonorNav, { DonorHeader } from "@/components/donor-nav";
import { Leaf, Droplets, Users, TrendingUp } from "lucide-react";

const MILESTONES = [
  { label: "First Listing",       done: true },
  { label: "10 kg Saved",         done: true },
  { label: "First Sale",          done: true },
  { label: "25 kg Saved",         done: false },
  { label: "100 XAF Revenue",     done: false },
  { label: "Community Champion",  done: false },
];

const MONTHLY = [
  { month: "Jan", kg: 4 },
  { month: "Feb", kg: 6 },
  { month: "Mar", kg: 8 },
  { month: "Apr", kg: 5 },
  { month: "May", kg: 12 },
  { month: "Jun", kg: 9 },
];
const MAX_KG = Math.max(...MONTHLY.map((m) => m.kg));

export default function DonorImpactPage() {
  return (
    <div className="flex min-h-screen bg-[var(--ep-cream)]">
      <DonorNav />

      <div className="flex-1 flex flex-col">
        <DonorHeader />

        <main className="p-4 sm:p-6 flex flex-col gap-6 pb-24 lg:pb-6">
          {/* Header */}
          <div>
            <h1 className="text-xl font-bold text-[var(--ep-green)]">Your Impact</h1>
            <p className="text-sm text-[var(--ep-neutral)] mt-0.5">
              Every kilogram you list keeps food out of landfill and helps your community.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Total Food Listed", value: "44 kg",      icon: Leaf,       color: "text-[var(--ep-green)]",     bg: "bg-[var(--ep-green-light)]" },
              { label: "CO₂ Prevented",     value: "88 kg",      icon: TrendingUp, color: "text-[var(--ep-orange)]",    bg: "bg-[var(--ep-orange-light)]" },
              { label: "Water Saved",        value: "1,320 L",    icon: Droplets,   color: "text-blue-500",              bg: "bg-blue-50" },
              { label: "People Fed",         value: "38",         icon: Users,      color: "text-[var(--ep-green-mid)]", bg: "bg-[var(--ep-green-light)]" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl bg-white border border-gray-100 p-4 flex flex-col gap-2">
                <div className={`h-9 w-9 rounded-xl ${s.bg} flex items-center justify-center`}>
                  <s.icon size={17} className={s.color} />
                </div>
                <p className={`text-xl font-bold leading-tight ${s.color}`}>{s.value}</p>
                <p className="text-xs text-[var(--ep-neutral)]">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Bar chart — monthly food listed */}
          <div className="rounded-2xl bg-white border border-gray-100 p-5">
            <h2 className="font-semibold text-gray-900 mb-4">Monthly Food Listed (kg)</h2>
            <div className="flex items-end gap-3 h-36">
              {MONTHLY.map((m) => {
                const pct = (m.kg / MAX_KG) * 100;
                return (
                  <div key={m.month} className="flex flex-col items-center gap-1 flex-1">
                    <span className="text-[10px] text-[var(--ep-neutral)] font-medium">{m.kg}</span>
                    <div
                      className="w-full rounded-t-lg bg-[var(--ep-green)]"
                      style={{ height: `${pct}%` }}
                    />
                    <span className="text-[10px] text-[var(--ep-neutral)]">{m.month}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Milestones */}
          <div className="rounded-2xl bg-white border border-gray-100 p-5">
            <h2 className="font-semibold text-gray-900 mb-4">Milestones</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {MILESTONES.map((m) => (
                <div
                  key={m.label}
                  className={`rounded-xl border p-3 flex items-center gap-2 text-sm font-medium ${
                    m.done
                      ? "bg-[var(--ep-green-light)] border-[var(--ep-green-mid)]/30 text-[var(--ep-green)]"
                      : "bg-gray-50 border-gray-200 text-gray-400"
                  }`}
                >
                  <span>{m.done ? "✅" : "🔒"}</span>
                  {m.label}
                </div>
              ))}
            </div>
          </div>

          {/* Environment comparison */}
          <div className="rounded-2xl bg-[var(--ep-green)] text-white p-5 flex flex-col gap-3">
            <h2 className="font-semibold">What Your Impact Equals</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
              {[
                { icon: "🚗", text: "88 km NOT driven by car" },
                { icon: "🚿", text: "1,320 L of water saved — ~9 days of showers" },
                { icon: "🌳", text: "Equivalent to planting 4 trees" },
              ].map((c) => (
                <div key={c.text} className="flex items-start gap-2 bg-white/10 rounded-xl p-3">
                  <span className="text-xl leading-none">{c.icon}</span>
                  <p className="text-white/90 leading-snug">{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
