import MerchantNav, { MerchantHeader } from "@/components/merchant-nav";
import { formatXAF } from "@/lib/data";

const REVENUE_POINTS = [18000, 22000, 19500, 31000, 27000, 38000, 29500, 42000, 35000, 48000];

const WASTE_CATEGORIES = [
  { label: "Baked Goods", kg: 170, pct: 88 },
  { label: "Produce", kg: 65, pct: 55 },
  { label: "Dairy Deli", kg: 56, pct: 45 },
  { label: "Beverages", kg: 24, pct: 18 },
];

// 7 days × 8 time slots — value 0–3 (heat intensity)
const HEATMAP_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const HEATMAP_SLOTS = ["6am", "8am", "10am", "12pm", "2pm", "4pm", "6pm", "8pm"];
const HEATMAP: number[][] = [
  [0, 1, 2, 3, 2, 1, 0, 0],
  [0, 0, 1, 2, 2, 1, 0, 0],
  [1, 1, 3, 3, 2, 2, 1, 0],
  [0, 1, 2, 3, 3, 2, 1, 0],
  [1, 2, 3, 3, 2, 2, 1, 0],
  [2, 3, 3, 2, 2, 1, 0, 0],
  [0, 0, 1, 1, 1, 0, 0, 0],
];

function heatColor(v: number) {
  if (v === 0) return "bg-gray-100";
  if (v === 1) return "bg-[var(--ep-orange)]/30";
  if (v === 2) return "bg-[var(--ep-orange)]/65";
  return "bg-[var(--ep-orange)]";
}

const maxRevenue = Math.max(...REVENUE_POINTS);

export default function MerchantAnalyticsPage() {
  return (
    <div className="flex min-h-screen bg-[var(--ep-cream)]">
      <MerchantNav />

      <div className="flex-1 flex flex-col">
        <MerchantHeader title="Analytics" />

        <main className="p-6 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">Analytics</h1>
            <button className="text-xs text-[var(--ep-orange)] border border-[var(--ep-orange)]/30 rounded-xl px-3 py-1.5 hover:bg-[var(--ep-orange-light)] transition">
              View Detailed Report →
            </button>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Revenue Recovered", value: formatXAF(428050), sub: "+18%", up: true },
              { label: "CO₂ Avoided", value: "1.2 Tons", sub: "+12%", up: true },
              { label: "Water Saved", value: "14.5k Gal", sub: "+8%", up: true },
              { label: "Total Waste Volume", value: "240 kg", sub: "-5%", up: false },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl bg-white border border-gray-100 p-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs text-[var(--ep-neutral)]">{s.label}</p>
                  <span className={`text-xs font-semibold ${s.up ? "text-[var(--ep-green-mid)]" : "text-[var(--ep-orange)]"}`}>
                    {s.sub}
                  </span>
                </div>
                <p className="text-xl font-bold text-gray-900">{s.value}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-[1fr_280px] gap-6">
            {/* Revenue Recovery Trends — line-style chart */}
            <div className="rounded-2xl bg-white border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-1">
                <div>
                  <h2 className="font-semibold text-gray-900">Revenue Recovery Trends</h2>
                  <p className="text-xs text-[var(--ep-neutral)]">Daily financial recovery from surplus sales</p>
                </div>
                <span className="text-xs border border-gray-200 rounded-xl px-3 py-1 text-[var(--ep-neutral)]">
                  Last 30 Days ▾
                </span>
              </div>

              {/* SVG line chart */}
              <div className="mt-4 h-36 w-full relative">
                <svg viewBox="0 0 400 120" className="w-full h-full" preserveAspectRatio="none">
                  {/* Fill */}
                  <defs>
                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--ep-green)" stopOpacity="0.18" />
                      <stop offset="100%" stopColor="var(--ep-green)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {(() => {
                    const pts = REVENUE_POINTS.map((v, i) => ({
                      x: (i / (REVENUE_POINTS.length - 1)) * 390 + 5,
                      y: 110 - (v / maxRevenue) * 100,
                    }));
                    const line = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
                    const fill = `${line} L${pts[pts.length - 1].x},115 L${pts[0].x},115 Z`;
                    return (
                      <>
                        <path d={fill} fill="url(#revGrad)" />
                        <path d={line} fill="none" stroke="var(--ep-green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        {pts.map((p, i) => (
                          <circle key={i} cx={p.x} cy={p.y} r="3" fill="var(--ep-green)" />
                        ))}
                      </>
                    );
                  })()}
                </svg>
                <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-[var(--ep-neutral)] px-1">
                  {["Sep 1", "Sep 10", "Sep 20", "Sep 30"].map((l) => <span key={l}>{l}</span>)}
                </div>
              </div>
            </div>

            {/* Waste by Category */}
            <div className="rounded-2xl bg-white border border-gray-100 p-5">
              <h2 className="font-semibold text-gray-900 mb-4">Waste by Category</h2>
              <div className="flex flex-col gap-3">
                {WASTE_CATEGORIES.map((c) => (
                  <div key={c.label} className="flex flex-col gap-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-700">{c.label}</span>
                      <span className="font-semibold text-gray-900">{c.kg}kg</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-100">
                      <div
                        className="h-2 rounded-full bg-[var(--ep-orange)]"
                        style={{ width: `${c.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Peak Waste Times heatmap */}
          <div className="rounded-2xl bg-white border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-1">
              <div>
                <h2 className="font-semibold text-gray-900">Peak Waste Times</h2>
                <p className="text-xs text-[var(--ep-neutral)]">Optimise your production cycles by identifying recurring surplus spikes</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-[var(--ep-neutral)]">
                <span className="h-2 w-4 rounded bg-gray-100 inline-block" /> Low
                <span className="h-2 w-4 rounded bg-[var(--ep-orange)]/40 inline-block" /> Mid
                <span className="h-2 w-4 rounded bg-[var(--ep-orange)] inline-block" /> Peak
              </div>
            </div>

            <div className="mt-4 overflow-x-auto">
              <div className="flex gap-2 min-w-max">
                {/* Day labels */}
                <div className="flex flex-col gap-1.5 pt-6">
                  {HEATMAP_DAYS.map((d) => (
                    <div key={d} className="h-7 flex items-center text-xs text-[var(--ep-neutral)] w-8 shrink-0">
                      {d}
                    </div>
                  ))}
                </div>

                {/* Grid */}
                <div className="flex flex-col gap-0">
                  {/* Slot headers */}
                  <div className="flex gap-1.5 mb-1">
                    {HEATMAP_SLOTS.map((s) => (
                      <div key={s} className="w-9 text-center text-xs text-[var(--ep-neutral)]">{s}</div>
                    ))}
                  </div>
                  {HEATMAP.map((row, ri) => (
                    <div key={ri} className="flex gap-1.5 mb-1.5">
                      {row.map((v, ci) => (
                        <div
                          key={ci}
                          className={`h-7 w-9 rounded-md ${heatColor(v)} transition`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* AI Insights */}
          <div className="rounded-2xl bg-[var(--ep-orange-light)] border border-[var(--ep-orange)]/20 p-5 flex items-start gap-4">
            <div className="h-10 w-10 rounded-full bg-[var(--ep-orange)] flex items-center justify-center shrink-0">
              <span className="text-white text-lg">✦</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-[var(--ep-orange)] uppercase tracking-widest mb-1">
                AI Insights: Production Tuning
              </p>
              <p className="text-sm text-gray-800 leading-relaxed">
                Our analysis shows that Sourdough Loaves often go to surplus on Friday afternoons. We recommend reducing the Friday 11:00 AM batch by 15% to maximise profit.
              </p>
            </div>
            <button className="btn-cta text-xs py-2 px-4 shrink-0">
              Apply Adjustments
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
