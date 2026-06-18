"use client";

import { useState } from "react";
import Link from "next/link";
import AppNav from "@/components/app-nav";
import { LISTINGS, CATEGORIES, formatXAF } from "@/lib/data";
import { Search, MapPin, SlidersHorizontal, Clock, Leaf, Plus } from "lucide-react";

function FoodCard({
  listing,
}: {
  listing: (typeof LISTINGS)[number];
}) {
  return (
    <Link href={`/marketplace/${listing.id}`} className="card-food group block">
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={listing.image}
          alt={listing.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute top-2 left-2 badge-urgent text-xs">
          <Clock size={10} />
          Expires in {listing.expiresInHours}hr
        </span>
        {listing.isDonation && (
          <span className="absolute top-2 right-2 badge-impact text-xs">
            Donation
          </span>
        )}
        <span className="absolute bottom-2 right-2 rounded-full bg-[var(--ep-orange)] px-2 py-0.5 text-xs font-bold text-white">
          -{listing.discountPercent}%
        </span>
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col gap-1">
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">
          {listing.title}
        </h3>
        <div className="flex items-center gap-1 text-xs text-[var(--ep-neutral)]">
          <MapPin size={10} />
          <span className="truncate">{listing.merchant}</span>
          <span>· 0.{listing.id.charCodeAt(1) % 8 + 1} km</span>
        </div>

        <div className="flex items-center justify-between mt-1.5">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-bold text-[var(--ep-green)]">
              {formatXAF(listing.discountedPrice)}
            </span>
            <span className="text-xs text-[var(--ep-neutral)] line-through">
              {formatXAF(listing.originalPrice)}
            </span>
          </div>
          <button className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--ep-orange)] text-white hover:opacity-90 transition">
            <Plus size={14} />
          </button>
        </div>

        <div className="flex items-center gap-1 text-xs text-[var(--ep-green-mid)]">
          <Leaf size={10} />
          Saves {listing.co2SavedKg}kg CO₂
        </div>
      </div>
    </Link>
  );
}

export default function MarketplacePage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Items");

  const filtered = LISTINGS.filter((l) => {
    const matchCat =
      activeCategory === "All Items" || l.category === activeCategory;
    const matchSearch =
      !search ||
      l.title.toLowerCase().includes(search.toLowerCase()) ||
      l.merchant.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[var(--ep-cream)]">
      <AppNav />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        {/* Search row */}
        <div className="flex gap-3 mb-6">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--ep-neutral)]"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Find surplus near you..."
              className="w-full rounded-xl border border-gray-200 bg-white pl-9 pr-4 py-2.5 text-sm outline-none focus:border-[var(--ep-green-mid)] focus:ring-2 focus:ring-[var(--ep-green-mid)]/20 transition"
            />
          </div>
          <button className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
            <MapPin size={14} />
            Map View
          </button>
          <button className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
            <SlidersHorizontal size={14} />
            Filters
          </button>
        </div>

        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-[var(--ep-green)] text-white"
                  : "bg-white text-[var(--ep-neutral)] border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Impact nudge */}
        <div className="rounded-2xl bg-[var(--ep-green)] text-white p-4 mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-sm">Zero Waste Hero</p>
            <p className="text-xs text-white/80 mt-0.5">
              You've helped save 14kg of food this month. Keep it up and reach
              Gold tier status!
            </p>
          </div>
          <button className="shrink-0 rounded-xl border border-white/30 px-4 py-2 text-sm font-medium hover:bg-white/10 transition">
            View Impact Dashboard
          </button>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <p className="text-center text-[var(--ep-neutral)] py-20">
            No listings match your search.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((l) => (
              <FoodCard key={l.id} listing={l} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
