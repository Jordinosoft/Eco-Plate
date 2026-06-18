import AdminNav, { AdminHeader } from "@/components/admin-nav";
import { MERCHANTS, LISTINGS, formatXAF } from "@/lib/data";
import Link from "next/link";
import { AlertTriangle, TrendingUp, Activity } from "lucide-react";

const TRANSACTIONS = [
  { id: "FL-M01-A", merchant: "Bistro Fresh", ngo: "City Food Bank", vol: 42.5, status: "Completed" },
  { id: "FL-M02-B", merchant: "Harvest Hub", ngo: "H-Organic Roots", vol: 12.0, status: "In Transit" },
  { id: "FL-M03-A", merchant: "Sunny Supermarket", ngo: "Red Cross Regime", vol: 196.2, status: "Pending" },
];

const ALERTS = [
  "Failed Pickup #239: Merchant 'Green Grocer' — 2.4km off route",
  "Late delivery alert: Volunteer Driver ID 028 – 5hr delay",
];

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-[var(--ep-cream)]">
      <AdminNav />

      <div className="flex-1 flex flex-col">
        <AdminHeader />

        <main className="p-4 sm:p-6 flex flex-col gap-6 pb-24 lg:pb-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Global System Oversight</h1>
              <p className="text-sm text-[var(--ep-neutral)]">
                Real-time platform performance and environmental impact tracking.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50 transition">
                Last 30 Days ▾
              </button>
              <button className="btn-cta text-sm gap-1.5">
                ↑ Export Report
              </button>
            </div>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Total Transactions", value: "14,282", trend: "+12.4%", color: "text-[var(--ep-green)]" },
              { label: "Active Merchants", value: "842", trend: "+12%", color: "text-[var(--ep-orange)]" },
              { label: "Food Rescued (Tons)", value: "128.5", trend: "↑92 Pending", color: "text-[var(--ep-green-mid)]" },
              { label: "Active NGO Partners", value: "156", trend: "+2.1%", color: "text-purple-600" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl bg-white border border-gray-100 p-4 flex flex-col gap-1">
                <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                <p className="text-xs text-[var(--ep-neutral)]">{s.label}</p>
                <p className="text-xs text-[var(--ep-green-mid)] font-medium">{s.trend}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
            {/* Chart */}
            <div className="rounded-2xl bg-white border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-semibold text-gray-900">Acquisition vs Impact</h2>
                <div className="flex items-center gap-3 text-xs text-[var(--ep-neutral)]">
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-4 rounded bg-[var(--ep-green)] inline-block" /> Users
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-4 rounded bg-[var(--ep-orange)] inline-block" /> Impact
                  </span>
                </div>
              </div>
              <p className="text-xs text-[var(--ep-neutral)] mb-5">Platform growth over the last quarter</p>
              <div className="flex items-end gap-4 h-44">
                {[
                  { u: 60, i: 40 },
                  { u: 75, i: 55 },
                  { u: 50, i: 65 },
                  { u: 90, i: 80 },
                ].map((bar, i) => (
                  <div key={i} className="flex-1 flex items-end gap-1">
                    <div className="flex-1 rounded-t-lg bg-[var(--ep-green)] hover:opacity-80 transition" style={{ height: `${bar.u}%` }} />
                    <div className="flex-1 rounded-t-lg bg-[var(--ep-orange)] hover:opacity-80 transition" style={{ height: `${bar.i}%` }} />
                  </div>
                ))}
              </div>
              <div className="flex justify-around text-xs text-[var(--ep-neutral)] mt-2">
                {["JAN", "FEB", "MAR", "APR"].map((m) => <span key={m}>{m}</span>)}
              </div>
            </div>

            {/* System health + alerts */}
            <div className="flex flex-col gap-4">
              <div className="rounded-2xl bg-white border border-gray-100 p-4">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-semibold text-gray-900 text-sm">System Health</h2>
                  <span className="badge-impact text-xs">● Operational</span>
                </div>
                <div className="flex flex-col gap-2 text-xs">
                  {[
                    { label: "API Latency", value: "2ms" },
                    { label: "Uptime", value: "99.9%" },
                    { label: "DB Connections", value: "412 / Live" },
                  ].map((m) => (
                    <div key={m.label} className="flex justify-between text-[var(--ep-neutral)]">
                      <span>{m.label}</span>
                      <span className="font-semibold text-gray-900">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-red-50 border border-red-100 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle size={14} className="text-red-500" />
                  <h2 className="font-semibold text-red-700 text-sm">Critical Alerts</h2>
                </div>
                <div className="flex flex-col gap-2">
                  {ALERTS.map((a, i) => (
                    <p key={i} className="text-xs text-red-700 leading-snug">
                      • {a}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Transaction feed */}
          <div className="rounded-2xl bg-white border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">Platform Activity Feed</h2>
              <Link href="/admin/activity" className="text-xs text-[var(--ep-orange)] hover:underline">
                View All Logs
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-xs text-[var(--ep-neutral)] uppercase tracking-wide">
                    {["Transaction ID", "Merchant", "NGO Partner", "Volume (KG)", "Status", "Timestamp"].map((h) => (
                      <th key={h} className="px-5 py-3 text-left font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {TRANSACTIONS.map((t) => (
                    <tr key={t.id} className="hover:bg-gray-50 transition">
                      <td className="px-5 py-3 font-mono text-xs text-[var(--ep-neutral)]">#{t.id}</td>
                      <td className="px-5 py-3 font-medium text-gray-900">{t.merchant}</td>
                      <td className="px-5 py-3 text-[var(--ep-neutral)]">{t.ngo}</td>
                      <td className="px-5 py-3 font-semibold text-[var(--ep-green)]">{t.vol} kg</td>
                      <td className="px-5 py-3">
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          t.status === "Completed" ? "bg-[var(--ep-green-light)] text-[var(--ep-green)]" :
                          t.status === "In Transit" ? "badge-urgent" :
                          "bg-gray-100 text-gray-600"
                        }`}>
                          {t.status}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-xs text-[var(--ep-neutral)]">2m ago</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        <footer className="mt-auto px-6 py-4 border-t border-gray-100 text-xs text-[var(--ep-neutral)] text-center">
          © 2024 FoodLoop Platform. Empowering Circular Economies e Solidarity.
          <Link href="#" className="ml-3 hover:text-gray-900">Privacy Policy</Link>
          <Link href="#" className="ml-3 hover:text-gray-900">System Status</Link>
        </footer>
      </div>
    </div>
  );
}
