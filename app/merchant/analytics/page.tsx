import MerchantNav, { MerchantHeader } from "@/components/merchant-nav";
import { formatXAF } from "@/lib/data";

const WEEKLY = [
  { day: "Mon", sales: 12, revenue: 18000 },
  { day: "Tue", sales: 8, revenue: 11500 },
  { day: "Wed", sales: 15, revenue: 22000 },
  { day: "Thu", sales: 20, revenue: 29500 },
  { day: "Fri", sales: 18, revenue: 26000 },
  { day: "Sat", sales: 25, revenue: 38000 },
  { day: "Sun", sales: 10, revenue: 14500 },
];

const TOP_ITEMS = [
  { name: "Artisan Bread Medley", sold: 48, revenue: 84000, pct: 82 },
  { name: "Pastry Box Assortment", sold: 31, revenue: 51000, pct: 60 },
  { name: "Choco-Fudge Muffin Set", sold: 22, revenue: 32000, pct: 45 },
  { name: "Croissant Bundle", sold: 14, revenue: 21000, pct: 28 },
];

export default function MerchantAnalyticsPage() {
  const maxRevenue = Math.max(...WEEKLY.map((w) => w.revenue));

  return (
    <div className="flex min-h-screen bg-[var(--ep-cream)]">
      <MerchantNav />

      <div className="flex-1 flex flex-col">
        <MerchantHeader title="Analytics" />

        <main className="p-6 flex flex-col gap-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Analytics</h1>
            <p className="text-sm text-[var(--ep-neutral)]">
              Track rescue performance and revenue insights.
            </p>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Total Revenue (Month)", value: formatXAF(159500) },
              { label: "Items Rescued", value: "108" },
              { label: "Avg Rescue Price", value: formatXAF(1477) },
              { label: "Rescue Rate", value: "76%" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl bg-white border border-gray-100 p-4">
                <p className="text-xl font-bold text-[var(--ep-green)]">{s.value}</p>
                <p className="text-xs text-[var(--ep-neutral)] mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Weekly revenue chart */}
          <div className="rounded-2xl bg-white border border-gray-100 p-5">
            <h2 className="font-semibold text-gray-900 mb-5">
              Weekly Rescue Revenue
            </h2>
            <div className="flex items-end gap-3 h-40">
              {WEEKLY.map((w) => (
                <div key={w.day} className="flex-1 flex flex-col items-center gap-1">
                  <p className="text-xs text-[var(--ep-green)] font-medium">
                    {formatXAF(w.revenue).replace("XAF", "").trim()}
                  </p>
                  <div
                    className="w-full rounded-t-lg bg-[var(--ep-green-mid)] hover:bg-[var(--ep-green)] transition"
                    style={{
                      height: `${(w.revenue / maxRevenue) * 100}%`,
                      minHeight: "12px",
                    }}
                  />
                  <p className="text-xs text-[var(--ep-neutral)]">{w.day}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Top performing items */}
          <div className="rounded-2xl bg-white border border-gray-100 p-5">
            <h2 className="font-semibold text-gray-900 mb-4">
              Top Performing Items
            </h2>
            <div className="flex flex-col gap-4">
              {TOP_ITEMS.map((item) => (
                <div key={item.name} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-900">{item.name}</span>
                    <span className="text-[var(--ep-green)] font-semibold">
                      {formatXAF(item.revenue)}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 rounded-full bg-gray-100">
                      <div
                        className="h-2 rounded-full bg-[var(--ep-orange)]"
                        style={{ width: `${item.pct}%` }}
                      />
                    </div>
                    <span className="text-xs text-[var(--ep-neutral)] w-14 text-right">
                      {item.sold} sold
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
