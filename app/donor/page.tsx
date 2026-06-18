import DonorNav, { DonorHeader } from "@/components/donor-nav";
import Link from "next/link";
import { Leaf, Package, Users, Plus, TrendingUp } from "lucide-react";

const MY_LISTINGS = [
  { name: "Excess Tomatoes", qty: "8 kg",   type: "discounted", price: 500,  claimed: true,  claimedBy: "Green Shelter NGO", expires: "Today" },
  { name: "Plantain Bunch",  qty: "12 pcs", type: "discounted", price: 800,  claimed: false, claimedBy: null,                expires: "Tomorrow" },
  { name: "Garden Spinach",  qty: "3 kg",   type: "free",        price: 0,    claimed: false, claimedBy: null,                expires: "2 days" },
];

export default function DonorDashboardPage() {
  return (
    <div className="flex min-h-screen bg-[var(--ep-cream)]">
      <DonorNav />

      <div className="flex-1 flex flex-col">
        <DonorHeader />

        <main className="p-4 sm:p-6 flex flex-col gap-6 pb-24 lg:pb-6">
          {/* Welcome banner */}
          <div className="rounded-2xl bg-[var(--ep-green)] text-white p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <p className="text-xs text-white/70 uppercase tracking-widest mb-1">Welcome back, Felix</p>
              <h1 className="text-lg font-bold">Sell surplus, recover costs, reduce waste 🌱</h1>
              <p className="text-sm text-white/80 mt-1">
                You've recovered <strong>2,300 XAF</strong> and donated 8 kg to families this month.
              </p>
            </div>
            <Link href="/donor/listings" className="btn-cta bg-white text-[var(--ep-green)] hover:bg-gray-50 shrink-0 gap-1.5 text-sm">
              <Plus size={14} /> List Food
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Active Listings",  value: "3",          icon: Package,    color: "text-[var(--ep-orange)]",    bg: "bg-[var(--ep-orange-light)]" },
              { label: "Revenue Earned",   value: "2,300 XAF",  icon: TrendingUp, color: "text-[var(--ep-green)]",    bg: "bg-[var(--ep-green-light)]" },
              { label: "Food Donated",     value: "8 kg",       icon: Leaf,       color: "text-[var(--ep-green-mid)]", bg: "bg-[var(--ep-green-light)]" },
              { label: "People Helped",    value: "14",         icon: Users,      color: "text-[var(--ep-neutral)]",   bg: "bg-gray-100" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl bg-white border border-gray-100 p-4 flex flex-col gap-2">
                <div className={`h-9 w-9 rounded-xl ${s.bg} flex items-center justify-center`}>
                  <s.icon size={17} className={s.color} />
                </div>
                <p className={`text-lg font-bold leading-tight ${s.color}`}>{s.value}</p>
                <p className="text-xs text-[var(--ep-neutral)]">{s.label}</p>
              </div>
            ))}
          </div>

          {/* My listings preview */}
          <div className="rounded-2xl bg-white border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">My Listings</h2>
              <Link href="/donor/listings" className="text-xs text-[var(--ep-orange)] hover:underline">Manage all →</Link>
            </div>
            <div className="divide-y divide-gray-50">
              {MY_LISTINGS.map((l) => (
                <div key={l.name} className="px-5 py-4 flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-[var(--ep-green-light)] flex items-center justify-center text-lg shrink-0">
                    🥬
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-gray-900">{l.name}</p>
                    <p className="text-xs text-[var(--ep-neutral)]">{l.qty} · Expires {l.expires}</p>
                    <p className="text-xs mt-0.5">
                      {l.type === "discounted"
                        ? <span className="text-[var(--ep-orange)] font-medium">{l.price.toLocaleString()} XAF</span>
                        : <span className="text-[var(--ep-green-mid)] font-medium">Free donation</span>
                      }
                    </p>
                    {l.claimed && <p className="text-xs text-[var(--ep-green-mid)]">Claimed by {l.claimedBy}</p>}
                  </div>
                  {l.claimed
                    ? <span className="badge-impact text-xs shrink-0">Claimed</span>
                    : <span className="badge-urgent text-xs shrink-0">Available</span>
                  }
                </div>
              ))}
            </div>
          </div>

          {/* Tip */}
          <div className="rounded-2xl bg-[var(--ep-green-light)] border border-[var(--ep-green-mid)]/20 p-5">
            <p className="text-xs font-semibold text-[var(--ep-green)] uppercase tracking-widest mb-1">Tip</p>
            <p className="text-sm text-gray-800">
              List food 24–48 hours before it expires to give buyers and NGOs time to arrange pickup.
              Even a 200 XAF listing recovers transport cost and keeps food out of landfill.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
