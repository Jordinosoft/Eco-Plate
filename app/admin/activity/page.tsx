import AdminNav, { AdminHeader } from "@/components/admin-nav";
import { FileDown } from "lucide-react";

const LIVE_FEED = [
  { icon: "🟢", text: "Green Shovel listed 20kg of Surplus Produce.", time: "10 seconds ago" },
  { icon: "🟠", text: "Claim Verified: Local Pantry claims 15kg Organic Bread.", time: "12 minutes ago" },
  { icon: "🚚", text: "Pickup Completed: Farmer Partnered 6442 collected from Cafe Bloom.", time: "24 minutes ago" },
  { icon: "⚠️", text: "System Alert: High demand detected in London North Sector.", time: "1 hr ago" },
  { icon: "🤝", text: "New Partner: Healthy Foods Ltd joined as a Merchant Partner.", time: "2 hrs ago" },
];

const AUDIT_LOG = [
  { id: "WFM-98921", merchant: "WholeFoods Market", action: "Listing Created", metric: 83.0, time: "22 Jun, 7:20", status: "active" },
  { id: "CFB-00122", merchant: "City Food Bank", action: "Claim Completed", metric: 12.0, time: "22 Jun, 9:11", status: "completed" },
  { id: "DL-88810", merchant: "Daily Logistics", action: "Batch Delivery", metric: 192.2, time: "22 Jun, 14:30", status: "completed" },
  { id: "EXP-55521", merchant: "—", action: "Listing Expired", metric: 4.1, time: "22 Jun, 18:22", status: "expired" },
];

const WASTE_BARS = [
  { label: "Mon", baked: 70, produce: 50, dairy: 30 },
  { label: "Tue", baked: 55, produce: 65, dairy: 25 },
  { label: "Wed", baked: 80, produce: 40, dairy: 45 },
  { label: "Thu", baked: 45, produce: 70, dairy: 35 },
  { label: "Fri", baked: 90, produce: 55, dairy: 50 },
  { label: "Sat", baked: 60, produce: 80, dairy: 40 },
  { label: "Sun", baked: 30, produce: 45, dairy: 20 },
];

const REGIONAL = [
  { city: "London", pct: 40 },
  { city: "Manchester", pct: 36 },
  { city: "Birmingham", pct: 24 },
];

export default function AdminActivityPage() {
  return (
    <div className="flex min-h-screen bg-[var(--ep-cream)]">
      <AdminNav />

      <div className="flex-1 flex flex-col">
        <AdminHeader />

        <main className="p-6 flex flex-col gap-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Activity Monitor & Reporting
              </h1>
              <p className="text-sm text-[var(--ep-neutral)]">
                01 Oct – 04 Oct, 2024
              </p>
            </div>
            <button className="btn-cta text-sm gap-1.5">
              <FileDown size={14} /> Generate Report
            </button>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Total Food Saved", value: "12,482 kg", sub: "+13% past week", color: "text-[var(--ep-green)]" },
              { label: "CO₂e Prevented", value: "31.2 Tonnes", sub: "+10% this week", color: "text-[var(--ep-orange)]" },
              { label: "Social Value", value: "8,290", sub: "+4 community impact", color: "text-[var(--ep-green-mid)]" },
              { label: "Platform Activity", value: "452", sub: "System Health: Optimal", color: "text-purple-600" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl bg-white border border-gray-100 p-4">
                <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                <p className="text-xs text-[var(--ep-neutral)]">{s.label}</p>
                <p className="text-xs text-[var(--ep-green-mid)] mt-0.5">{s.sub}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Live feed */}
            <div className="rounded-2xl bg-white border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-900">Live Activity Feed</h2>
                <span className="badge-urgent text-xs">● Live</span>
              </div>
              <div className="flex flex-col gap-3">
                {LIVE_FEED.map((f, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-sm">
                    <span className="shrink-0 text-base leading-none mt-0.5">{f.icon}</span>
                    <div className="flex-1">
                      <p className="text-gray-700 leading-snug">{f.text}</p>
                      <p className="text-xs text-[var(--ep-neutral)] mt-0.5">{f.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 text-xs text-[var(--ep-orange)] hover:underline">
                View Audit Log →
              </button>
            </div>

            {/* Food waste reduction chart */}
            <div className="rounded-2xl bg-white border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-1">
                <h2 className="font-semibold text-gray-900">Food Waste Reduction</h2>
                <div className="flex gap-2 text-xs text-[var(--ep-neutral)]">
                  {[
                    { label: "Bakery", color: "bg-[var(--ep-green)]" },
                    { label: "Produce", color: "bg-[var(--ep-orange)]" },
                    { label: "Dairy", color: "bg-[var(--ep-green-mid)]" },
                  ].map((l) => (
                    <span key={l.label} className="flex items-center gap-1">
                      <span className={`h-2 w-3 rounded ${l.color} inline-block`} />
                      {l.label}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-xs text-[var(--ep-neutral)] mb-4">% performance by category (kg)</p>
              <div className="flex items-end gap-2 h-32">
                {WASTE_BARS.map((b) => (
                  <div key={b.label} className="flex-1 flex items-end gap-0.5">
                    <div className="flex-1 rounded-t bg-[var(--ep-green)]" style={{ height: `${b.baked}%` }} />
                    <div className="flex-1 rounded-t bg-[var(--ep-orange)]" style={{ height: `${b.produce}%` }} />
                    <div className="flex-1 rounded-t bg-[var(--ep-green-mid)]" style={{ height: `${b.dairy}%` }} />
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-xs text-[var(--ep-neutral)] mt-2">
                {WASTE_BARS.map((b) => <span key={b.label}>{b.label}</span>)}
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Regional distribution */}
            <div className="rounded-2xl bg-white border border-gray-100 p-5">
              <h2 className="font-semibold text-gray-900 mb-4">Regional Distribution</h2>
              <div className="flex items-center gap-6">
                {/* Donut */}
                <div className="relative h-28 w-28 shrink-0">
                  <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
                    <circle cx="50" cy="50" r="38" fill="none" stroke="#E5E7EB" strokeWidth="16" />
                    <circle cx="50" cy="50" r="38" fill="none" stroke="var(--ep-green)" strokeWidth="16" strokeDasharray="239" strokeDashoffset={239 * 0.6} />
                    <circle cx="50" cy="50" r="38" fill="none" stroke="var(--ep-orange)" strokeWidth="16" strokeDasharray="239" strokeDashoffset={239 * 0.24} strokeLinecap="butt" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-xs font-bold text-gray-700 text-center leading-tight">Impact<br />Map</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  {REGIONAL.map((r) => (
                    <div key={r.city} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-[var(--ep-green)] shrink-0" />
                      <span className="flex-1 text-gray-700">{r.city}</span>
                      <span className="font-semibold text-gray-900">{r.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Export engine */}
            <div className="rounded-2xl bg-white border border-gray-100 p-5">
              <h2 className="font-semibold text-gray-900 mb-4">Export Engine</h2>
              <p className="text-sm text-[var(--ep-neutral)] mb-4">
                Scheduled for Logical Audit
              </p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "PDF", icon: "📄", color: "bg-red-50 text-red-600 border-red-100" },
                  { label: "CSV", icon: "📊", color: "bg-[var(--ep-green-light)] text-[var(--ep-green)] border-[var(--ep-green-mid)]/20" },
                  { label: "Excel", icon: "📑", color: "bg-blue-50 text-blue-600 border-blue-100" },
                ].map((e) => (
                  <button
                    key={e.label}
                    className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 text-xs font-medium transition hover:opacity-80 ${e.color}`}
                  >
                    <span className="text-2xl">{e.icon}</span>
                    {e.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Historical audit log */}
          <div className="rounded-2xl bg-white border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">Historical Audit Log</h2>
              <button className="text-xs text-[var(--ep-orange)] hover:underline">
                ↕ Sort
              </button>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-xs text-[var(--ep-neutral)] uppercase tracking-wide">
                  {["Event ID", "Merchant", "Action", "Metric Impact", "Timestamp", "Status"].map((h) => (
                    <th key={h} className="px-5 py-3 text-left font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {AUDIT_LOG.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50 transition">
                    <td className="px-5 py-3 font-mono text-xs text-[var(--ep-neutral)]">
                      #{row.id}
                    </td>
                    <td className="px-5 py-3 font-medium text-gray-900">{row.merchant}</td>
                    <td className="px-5 py-3 text-[var(--ep-neutral)]">{row.action}</td>
                    <td className="px-5 py-3 font-semibold text-[var(--ep-green)]">
                      {row.metric} kg
                    </td>
                    <td className="px-5 py-3 text-xs text-[var(--ep-neutral)]">{row.time}</td>
                    <td className="px-5 py-3">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          row.status === "active"
                            ? "badge-impact"
                            : row.status === "completed"
                            ? "bg-gray-100 text-gray-600"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-5 py-3 border-t border-gray-100 flex justify-between items-center">
              <p className="text-xs text-[var(--ep-neutral)]">Showing 1–4 of 1,247 events</p>
              <button className="text-xs text-[var(--ep-orange)] hover:underline">Next →</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
