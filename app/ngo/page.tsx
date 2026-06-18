import NGONav, { NGOHeader } from "@/components/ngo-nav";
import { NGO_CLAIMS, LISTINGS } from "@/lib/data";
import Link from "next/link";
import { MapPin, Clock, CheckCircle2, Circle, Loader2, ArrowRight } from "lucide-react";

const LIVE_FEED = [
  { time: "2 min ago", text: "Marco R. completed delivery at FoodWorldMall" },
  { time: "14 min ago", text: "WholeFoods Mall listed 15kg of Poultry surplus" },
  { time: "1 hr ago", text: "Baker's Table offline after reporting mechanical delay" },
];

const LOGISTICS = [
  { name: "Green Grocer Co.", sub: "10kg Organic Produce • Driver: Marco R.", time: "09:00 AM", status: "scheduled" },
  { name: "St. Jude Center", sub: "Hot Meal Kit • Driver: Sarah J.", time: "11:00 AM", status: "en-route" },
  { name: "Baker's Place", sub: "Surplus Bread/Pastry • Awaiting Driver", time: "02:30 PM", status: "pending" },
];

const donationListings = LISTINGS.filter((l) => l.isDonation);

export default function NGODashboard() {
  return (
    <div className="flex min-h-screen bg-[var(--ep-cream)]">
      <NGONav />

      <div className="flex-1 flex flex-col">
        <NGOHeader />

        <main className="p-4 sm:p-6 flex flex-col gap-6 pb-24 lg:pb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Overview</h1>
              <p className="text-sm text-[var(--ep-neutral)]">
                Manage your regional ecological impact and coordination.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
                This Month ▾
              </button>
            </div>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Total Food Batches Claimed", value: "12,482", sub: "kg", color: "text-[var(--ep-green)]" },
              { label: "Active Merchants", value: "84", sub: "", color: "text-[var(--ep-orange)]" },
              { label: "33 Pending", value: "33", sub: "Pickups", color: "text-[var(--ep-neutral)]" },
              { label: "CO₂ Prevented Score", value: "92.4", sub: "Excellent Performance", color: "text-[var(--ep-green-mid)]" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl bg-white border border-gray-100 p-4 flex flex-col gap-1">
                <p className={`text-2xl font-bold ${s.color}`}>
                  {s.value}
                  {s.sub && <span className="text-sm ml-1 text-[var(--ep-neutral)] font-normal">{s.sub}</span>}
                </p>
                <p className="text-xs text-[var(--ep-neutral)]">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Quick actions */}
          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              href="/ngo/marketplace"
              className="rounded-2xl bg-[var(--ep-orange)] text-white p-5 flex items-center gap-4 hover:opacity-90 transition"
            >
              <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center">
                🚛
              </div>
              <div>
                <p className="font-semibold">New Pickup</p>
                <p className="text-xs text-white/80 mt-0.5">
                  Initiate immediate dispatch
                </p>
              </div>
              <ArrowRight size={18} className="ml-auto" />
            </Link>
            <Link
              href="/ngo/marketplace"
              className="rounded-2xl bg-[var(--ep-green)] text-white p-5 flex items-center gap-4 hover:opacity-90 transition"
            >
              <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center">
                🛒
              </div>
              <div>
                <p className="font-semibold">Marketplace</p>
                <p className="text-xs text-white/80 mt-0.5">
                  Browse available surplus batches
                </p>
              </div>
              <ArrowRight size={18} className="ml-auto" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Daily logistics */}
            <div className="rounded-2xl bg-white border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-900">Daily Logistics</h2>
                <Link href="/ngo/logistics" className="text-xs text-[var(--ep-orange)] hover:underline">
                  View Schedule
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                {LOGISTICS.map((l) => (
                  <div key={l.name} className="flex items-start gap-3 rounded-xl border border-gray-100 p-3">
                    <div className={`mt-0.5 shrink-0 ${
                      l.status === "en-route" ? "text-[var(--ep-green-mid)]" :
                      l.status === "scheduled" ? "text-[var(--ep-orange)]" :
                      "text-[var(--ep-neutral)]"
                    }`}>
                      {l.status === "en-route" ? <Loader2 size={16} className="animate-spin" /> :
                       l.status === "scheduled" ? <CheckCircle2 size={16} /> :
                       <Circle size={16} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{l.name}</p>
                      <p className="text-xs text-[var(--ep-neutral)] mt-0.5">{l.sub}</p>
                      {l.status === "pending" && (
                        <button className="mt-1.5 text-xs font-medium text-[var(--ep-orange)] hover:underline">
                          Assign Logistics Partner →
                        </button>
                      )}
                    </div>
                    <span className="text-xs text-[var(--ep-neutral)] shrink-0">{l.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Live feed + Map */}
            <div className="flex flex-col gap-4">
              <div className="rounded-2xl bg-white border border-gray-100 p-5">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-semibold text-gray-900">Live Feed</h2>
                  <span className="badge-urgent text-xs">4 Updates</span>
                </div>
                <div className="flex flex-col gap-3">
                  {LIVE_FEED.map((f, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <div className="mt-1.5 h-2 w-2 rounded-full bg-[var(--ep-green-mid)] shrink-0" />
                      <div>
                        <p className="text-gray-700">{f.text}</p>
                        <p className="text-xs text-[var(--ep-neutral)]">{f.time}</p>
                      </div>
                    </div>
                  ))}
                  <Link href="#" className="text-xs text-[var(--ep-orange)] hover:underline">
                    View Full Audit Log →
                  </Link>
                </div>
              </div>

              <div className="rounded-2xl bg-gray-100 h-36 flex items-center justify-center text-sm text-[var(--ep-neutral)]">
                <MapPin size={16} className="mr-1" /> Fleet Monitoring Map
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
