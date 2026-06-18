import NGONav, { NGOHeader } from "@/components/ngo-nav";
import { NGO_CLAIMS } from "@/lib/data";
import { Leaf, Users, ShoppingBag, TrendingUp } from "lucide-react";

export default function NGOImpactPage() {
  const totalServings = NGO_CLAIMS.reduce((s, c) => s + c.servings, 0);

  return (
    <div className="flex min-h-screen bg-[var(--ep-cream)]">
      <NGONav />

      <div className="flex-1 flex flex-col">
        <NGOHeader />

        <main className="p-6 flex flex-col gap-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Impact Hub</h1>
            <p className="text-sm text-[var(--ep-neutral)]">
              Your organisation's contribution to zero food waste.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: ShoppingBag, label: "Batches Claimed", value: String(NGO_CLAIMS.length), bg: "bg-[var(--ep-orange-light)]", color: "text-[var(--ep-orange)]" },
              { icon: Users, label: "People Fed", value: String(totalServings), bg: "bg-[var(--ep-green-light)]", color: "text-[var(--ep-green)]" },
              { icon: Leaf, label: "CO₂ Avoided", value: "18.4kg", bg: "bg-[var(--ep-green-light)]", color: "text-[var(--ep-green-mid)]" },
              { icon: TrendingUp, label: "Rescue Rate", value: "94%", bg: "bg-purple-50", color: "text-purple-600" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl bg-white border border-gray-100 p-4 flex flex-col gap-2">
                <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${s.bg}`}>
                  <s.icon size={16} className={s.color} />
                </div>
                <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                <p className="text-xs text-[var(--ep-neutral)]">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="rounded-2xl bg-white border border-gray-100 p-5">
            <h2 className="font-semibold text-gray-900 mb-5">Monthly Claims Volume</h2>
            <div className="flex items-end gap-3 h-36">
              {[30, 45, 28, 60, 52, 80, 72].map((v, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t-lg bg-[var(--ep-green-mid)] hover:bg-[var(--ep-green)] transition"
                    style={{ height: `${(v / 80) * 100}%`, minHeight: "8px" }}
                  />
                  <span className="text-xs text-[var(--ep-neutral)]">
                    {["Jan","Feb","Mar","Apr","May","Jun","Jul"][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Mission statement */}
          <div className="rounded-2xl bg-[var(--ep-green)] text-white p-6 flex flex-col gap-3">
            <h2 className="font-bold text-lg">Every Claim Matters</h2>
            <p className="text-white/85 text-sm leading-relaxed">
              Each batch your organisation claims prevents methane emissions,
              conserves the water and land used to produce that food, and
              directly feeds people in need. Your participation in FoodLoop
              creates measurable, scalable environmental impact.
            </p>
            <div className="grid grid-cols-3 gap-4 mt-2">
              {[
                { v: "64", label: "Meals This Month" },
                { v: "2.1t", label: "Waste Diverted" },
                { v: "#3", label: "NGO Leaderboard" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-2xl font-bold">{s.v}</p>
                  <p className="text-xs text-white/70">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
