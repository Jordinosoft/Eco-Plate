"use client";

import { useState } from "react";
import DonorNav, { DonorHeader } from "@/components/donor-nav";
import { Plus, X, Leaf } from "lucide-react";

const CATEGORIES = ["Vegetables", "Fruits", "Grains & Cereals", "Dairy & Eggs", "Cooked Food", "Other"];

type ListingType = "discounted" | "free";

const EXISTING = [
  { id: "d1", name: "Excess Tomatoes",  category: "Vegetables", qty: "8 kg",   expires: "Today",    status: "claimed",   type: "discounted", price: 500 },
  { id: "d2", name: "Plantain Bunch",   category: "Fruits",     qty: "12 pcs", expires: "Tomorrow", status: "available", type: "discounted", price: 800 },
  { id: "d3", name: "Garden Spinach",   category: "Vegetables", qty: "3 kg",   expires: "2 days",   status: "available", type: "free",        price: 0 },
];

export default function DonorListingsPage() {
  const [showForm, setShowForm] = useState(false);
  const [category, setCategory] = useState("Vegetables");
  const [listingType, setListingType] = useState<ListingType>("discounted");

  return (
    <div className="flex min-h-screen bg-[var(--ep-cream)]">
      <DonorNav />

      <div className="flex-1 flex flex-col">
        <DonorHeader />

        <main className="p-4 sm:p-6 flex flex-col gap-6 pb-24 lg:pb-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h1 className="text-xl font-bold text-gray-900">My Food Listings</h1>
              <p className="text-sm text-[var(--ep-neutral)]">
                Sell surplus food at a discount or donate — your choice.
              </p>
            </div>
            <button onClick={() => setShowForm(true)} className="btn-cta text-sm gap-1.5">
              <Plus size={14} /> List Food
            </button>
          </div>

          {/* Who can list */}
          <div className="rounded-2xl bg-white border border-gray-100 p-4 grid sm:grid-cols-3 gap-4">
            {[
              { icon: "🌾", label: "Farmers", desc: "Excess harvest — sell at cost or donate" },
              { icon: "🏡", label: "Home Gardeners", desc: "Garden overflow you can't use up" },
              { icon: "🏠", label: "Households", desc: "Fridge clear-out before travel or spoilage" },
            ].map((r) => (
              <div key={r.label} className="flex items-start gap-3">
                <span className="text-2xl mt-0.5">{r.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{r.label}</p>
                  <p className="text-xs text-[var(--ep-neutral)]">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Listing form */}
          {showForm && (
            <div className="rounded-2xl bg-white border border-gray-100 p-5 flex flex-col gap-5 relative shadow-sm">
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition"
              >
                <X size={16} className="text-[var(--ep-neutral)]" />
              </button>

              <div>
                <h2 className="font-semibold text-gray-900">List Surplus Food</h2>
                <p className="text-xs text-[var(--ep-neutral)] mt-0.5">
                  Sell at a discount to recover costs, or offer for free. Both help reduce waste.
                </p>
              </div>

              {/* Listing type selector — sell is primary */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setListingType("discounted")}
                  className={`flex-1 flex items-center gap-3 rounded-xl border-2 px-4 py-3.5 text-left transition ${
                    listingType === "discounted"
                      ? "border-[var(--ep-orange)] bg-[var(--ep-orange-light)]"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <span className="text-2xl">🏷️</span>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Sell at Discount</p>
                    <p className="text-xs text-[var(--ep-neutral)]">Set a reduced price — buyers pay, you recover costs</p>
                  </div>
                  {listingType === "discounted" && (
                    <span className="ml-auto text-[var(--ep-orange)] text-lg shrink-0">●</span>
                  )}
                </button>

                <button
                  onClick={() => setListingType("free")}
                  className={`flex-1 flex items-center gap-3 rounded-xl border-2 px-4 py-3.5 text-left transition ${
                    listingType === "free"
                      ? "border-[var(--ep-green)] bg-[var(--ep-green-light)]"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <span className="text-2xl">🎁</span>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Free Donation</p>
                    <p className="text-xs text-[var(--ep-neutral)]">NGOs and families claim at no cost</p>
                  </div>
                  {listingType === "free" && (
                    <span className="ml-auto text-[var(--ep-green)] text-lg shrink-0">●</span>
                  )}
                </button>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-gray-700">Food Name</label>
                  <input
                    placeholder="e.g. Extra Tomatoes from my garden"
                    className="rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[var(--ep-green-mid)] transition"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-gray-700">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[var(--ep-green-mid)] transition bg-white"
                  >
                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-gray-700">Quantity</label>
                  <input
                    placeholder="e.g. 5 kg, 10 bunches, 2 bags"
                    className="rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[var(--ep-green-mid)] transition"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-gray-700">Best Before / Expiry</label>
                  <input
                    type="date"
                    className="rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[var(--ep-green-mid)] transition"
                  />
                </div>

                {/* Price fields — only shown for discounted */}
                {listingType === "discounted" && (
                  <>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-medium text-gray-700">Original Value (XAF)</label>
                      <input
                        type="number"
                        placeholder="What it would normally cost"
                        min={100}
                        className="rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[var(--ep-orange)] transition"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-medium text-gray-700">
                        Your Discounted Price (XAF)
                        <span className="ml-1 text-[var(--ep-green-mid)]">← what you'll receive</span>
                      </label>
                      <input
                        type="number"
                        placeholder="e.g. 500 — to recover pickup cost"
                        min={100}
                        className="rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[var(--ep-orange)] transition"
                      />
                    </div>
                  </>
                )}

                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-xs font-medium text-gray-700">Pickup Location / Notes</label>
                  <input
                    placeholder="e.g. Biyem-Assi market area, call before coming"
                    className="rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[var(--ep-green-mid)] transition"
                  />
                </div>
              </div>

              {listingType === "discounted" && (
                <div className="rounded-xl bg-[var(--ep-orange-light)] border border-[var(--ep-orange)]/20 px-4 py-3 text-xs text-gray-700">
                  💡 EcoPlate takes a small 5% platform fee from each sale to keep the service running. You keep the rest.
                </div>
              )}

              <button className="btn-cta self-start gap-1.5">
                <Leaf size={14} /> {listingType === "discounted" ? "Publish Listing" : "Donate Food"}
              </button>
            </div>
          )}

          {/* Existing listings */}
          <div className="rounded-2xl bg-white border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">Active Listings</h2>
              <span className="text-xs text-[var(--ep-neutral)]">{EXISTING.length} items</span>
            </div>
            <div className="divide-y divide-gray-50">
              {EXISTING.map((item) => (
                <div key={item.id} className="px-5 py-4 flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-[var(--ep-green-light)] flex items-center justify-center text-lg shrink-0">
                    🥬
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-gray-900">{item.name}</p>
                    <p className="text-xs text-[var(--ep-neutral)]">
                      {item.qty} · {item.category} · Expires {item.expires}
                    </p>
                    <p className="text-xs mt-0.5">
                      {item.type === "discounted"
                        ? <span className="text-[var(--ep-orange)] font-medium">{item.price.toLocaleString()} XAF</span>
                        : <span className="text-[var(--ep-green-mid)] font-medium">Free donation</span>
                      }
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {item.status === "claimed"
                      ? <span className="badge-impact text-xs">Claimed</span>
                      : <span className="badge-urgent text-xs">Available</span>
                    }
                    <button className="text-xs text-red-400 hover:underline">Remove</button>
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
