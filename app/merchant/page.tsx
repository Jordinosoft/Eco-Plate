import MerchantNav, { MerchantHeader } from "@/components/merchant-nav";
import { LISTINGS, formatXAF } from "@/lib/data";
import Link from "next/link";
import { Package, TrendingUp, DollarSign, Leaf, Plus, ArrowRight } from "lucide-react";

const MERCHANT_LISTINGS = LISTINGS.filter((l) => l.merchantId === "m1");

export default function MerchantDashboard() {
  const totalActive = MERCHANT_LISTINGS.filter((l) => l.quantityLeft > 0).length;
  const totalRescued = 58;
  const dailyRevenue = 41250;

  return (
    <div className="flex min-h-screen bg-[var(--ep-cream)]">
      <MerchantNav />

      <div className="flex-1 flex flex-col">
        <MerchantHeader title="Dashboard" />

        <main className="p-6 flex flex-col gap-6">
          {/* Page heading */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-sm text-[var(--ep-neutral)]">
                Welcome back, Artisan Bakery. Here's your snapshot.
              </p>
            </div>
            <Link href="/merchant/listings" className="btn-cta text-sm gap-1.5">
              <Plus size={15} /> New Listing
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Package, label: "Total Active", value: String(totalActive), color: "text-[var(--ep-green)]", bg: "bg-[var(--ep-green-light)]" },
              { icon: TrendingUp, label: "Items Rescued", value: String(totalRescued), color: "text-[var(--ep-orange)]", bg: "bg-[var(--ep-orange-light)]" },
              { icon: DollarSign, label: "Daily Rescue Revenue", value: formatXAF(dailyRevenue), color: "text-[var(--ep-green)]", bg: "bg-[var(--ep-green-light)]" },
              { icon: Leaf, label: "CO₂ Prevented", value: "38.2kg", color: "text-[var(--ep-green-mid)]", bg: "bg-[var(--ep-green-light)]" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl bg-white border border-gray-100 p-4 flex flex-col gap-2">
                <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${s.bg}`}>
                  <s.icon size={17} className={s.color} />
                </div>
                <p className="text-lg font-bold text-gray-900">{s.value}</p>
                <p className="text-xs text-[var(--ep-neutral)]">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Recent listings */}
          <div className="rounded-2xl bg-white border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900">Active Listings</h2>
              <Link href="/merchant/listings" className="text-xs text-[var(--ep-orange)] hover:underline flex items-center gap-1">
                View All <ArrowRight size={12} />
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              {MERCHANT_LISTINGS.map((l) => (
                <div key={l.id} className="flex items-center gap-3">
                  <img src={l.image} alt={l.title} className="h-12 w-12 rounded-xl object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{l.title}</p>
                    <p className="text-xs text-[var(--ep-neutral)]">{l.quantityLeft} left · {l.pickupWindow}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-[var(--ep-green)]">{formatXAF(l.discountedPrice)}</p>
                    <span className={`text-xs ${l.quantityLeft > 0 ? "text-[var(--ep-green-mid)]" : "text-[var(--ep-neutral)]"}`}>
                      {l.quantityLeft > 0 ? "Active" : "Sold Out"}
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
