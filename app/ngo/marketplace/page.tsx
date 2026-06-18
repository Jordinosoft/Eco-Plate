"use client";

import { useState } from "react";
import NGONav, { NGOHeader } from "@/components/ngo-nav";
import { LISTINGS, formatXAF } from "@/lib/data";
import { Clock, MapPin, Heart, Filter } from "lucide-react";

type FilterType = "urgent" | "perishable" | "5km" | null;

const ALL_DONATION = LISTINGS.filter((l) => l.isDonation);
const SURPLUS = LISTINGS.filter((l) => !l.isDonation).slice(0, 5);

function DonationCard({ listing, featured = false }: { listing: typeof LISTINGS[number]; featured?: boolean }) {
  const [claimed, setClaimed] = useState(false);

  if (featured) {
    return (
      <div className="rounded-2xl overflow-hidden border-2 border-[var(--ep-orange)] mb-6">
        <div className="relative h-52">
          <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" />
          <span className="absolute top-2 left-2 badge-urgent text-xs">URGENT PICKUP</span>
          <span className="absolute top-2 right-2 text-xs rounded-full bg-white/90 px-2 py-0.5 text-[var(--ep-neutral)]">
            Posted 1hr ago
          </span>
        </div>
        <div className="bg-white p-5 grid sm:grid-cols-2 gap-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">{listing.title}</h2>
            <p className="text-sm text-[var(--ep-neutral)] mt-1">📦 8kg Mixed Vegetables</p>
            <div className="flex items-center gap-2 mt-2 text-sm text-[var(--ep-neutral)]">
              <Clock size={13} />
              Window: Closes in {listing.expiresInHours}hr 5m
            </div>
            <div className="flex items-center gap-2 mt-1 text-sm text-[var(--ep-neutral)]">
              <MapPin size={13} />
              {listing.merchantAddress} · 0.3km away
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <button className="btn-cta w-full justify-center">
              Claim Donation ↗
            </button>
            <button className="btn-outline w-full justify-center text-sm">
              View Interactive Map
            </button>
            <div className="flex -space-x-2">
              {[1,2,3].map((i) => (
                <div key={i} className="h-7 w-7 rounded-full bg-[var(--ep-green-light)] border-2 border-white flex items-center justify-center text-xs font-bold text-[var(--ep-green)]">
                  N
                </div>
              ))}
              <span className="ml-3 text-xs text-[var(--ep-neutral)] self-center">+8</span>
            </div>
            <p className="text-xs text-[var(--ep-neutral)]">Nearby Merchants</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card-food flex flex-col">
      <div className="relative h-40">
        <img src={listing.image} alt={listing.title} className="h-full w-full object-cover" />
        <span className="absolute top-2 left-2 badge-impact text-xs">Perishable</span>
        <button className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 text-gray-400 hover:text-red-400 transition">
          <Heart size={14} />
        </button>
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="text-sm font-semibold text-gray-900">{listing.title}</h3>
        <p className="text-xs text-[var(--ep-neutral)] line-clamp-1">{listing.description}</p>
        <div className="flex items-center gap-1 text-xs text-[var(--ep-neutral)]">
          <Clock size={10} />
          Pickup to {listing.pickupWindow.split("–")[1]?.trim() || "18:00"}
        </div>
        <div className="flex items-center gap-1 text-xs text-[var(--ep-neutral)]">
          <MapPin size={10} />
          {listing.merchantAddress}
        </div>
        <div className="flex items-center gap-1 text-xs text-[var(--ep-neutral)]">
          👥 Serves ~{listing.quantityLeft * 2} people
        </div>
        <button
          onClick={() => setClaimed((c) => !c)}
          className={`mt-auto ${claimed ? "btn-outline text-xs py-2" : "btn-cta text-xs py-2"} w-full justify-center`}
        >
          {claimed ? "✓ Claimed" : "Claim Donation"}
        </button>
      </div>
    </div>
  );
}

export default function NGOMarketplacePage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>(null);

  const FILTERS: { key: FilterType; label: string }[] = [
    { key: "urgent", label: "🔴 Urgent" },
    { key: "perishable", label: "🟡 Perishable" },
    { key: "5km", label: "📍 < 5 km" },
  ];

  return (
    <div className="flex min-h-screen bg-[var(--ep-cream)]">
      <NGONav />

      <div className="flex-1 flex flex-col">
        <NGOHeader />

        <main className="p-6">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Surplus Marketplace</h1>
              <p className="text-sm text-[var(--ep-neutral)]">
                Browse real-time food donations from 42 local merchants.
              </p>
            </div>
            <button className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
              <Filter size={14} /> Quick Filters
            </button>
          </div>

          {/* Filter pills */}
          <div className="flex gap-2 mb-6">
            {FILTERS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveFilter(activeFilter === key ? null : key)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium border transition ${
                  activeFilter === key
                    ? "bg-[var(--ep-green)] text-white border-[var(--ep-green)]"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Featured */}
          {ALL_DONATION[0] && <DonationCard listing={ALL_DONATION[0]} featured />}

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {LISTINGS.filter((l) => !l.isDonation)
              .slice(0, 6)
              .map((l) => (
                <DonationCard key={l.id} listing={l} />
              ))}
          </div>
        </main>
      </div>
    </div>
  );
}
