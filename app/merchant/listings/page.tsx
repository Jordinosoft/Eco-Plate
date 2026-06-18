"use client";

import { useState } from "react";
import MerchantNav, { MerchantHeader } from "@/components/merchant-nav";
import { LISTINGS, formatXAF } from "@/lib/data";
import { Filter, Archive, Trash2, Plus, Edit2, Check, Clock } from "lucide-react";

const MERCHANT_ID = "m1";

type Status = "active" | "collected" | "expired";

const MOCK_LISTINGS = LISTINGS.filter((l) => l.merchantId === MERCHANT_ID).map(
  (l, i) => ({
    ...l,
    status: (["active", "active", "collected"] as Status[])[i % 3],
  })
);

// Add a couple extras for demo
const ALL_LISTINGS = [
  ...MOCK_LISTINGS,
  {
    ...LISTINGS[2],
    id: "demo1",
    title: "Artisan Bagel Set",
    merchantId: MERCHANT_ID,
    quantityLeft: 6,
    discountedPrice: 3000,
    originalPrice: 5000,
    status: "active" as Status,
  },
  {
    ...LISTINGS[4],
    id: "demo2",
    title: "Daily Cupcake Mix",
    merchantId: MERCHANT_ID,
    quantityLeft: 0,
    discountedPrice: 1500,
    originalPrice: 2500,
    status: "collected" as Status,
  },
];

function StatusBadge({ status }: { status: Status }) {
  const map = {
    active: "badge-urgent",
    collected: "badge-impact",
    expired: "inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-500",
  };
  const labels = { active: "Active", collected: "Collected by User", expired: "Expired" };
  return <span className={map[status]}>{labels[status]}</span>;
}

export default function MerchantListingsPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);

  function toggleAll() {
    setSelected(selected.length === ALL_LISTINGS.length ? [] : ALL_LISTINGS.map((l) => l.id));
  }

  function toggle(id: string) {
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  }

  return (
    <div className="flex min-h-screen bg-[var(--ep-cream)]">
      <MerchantNav />

      <div className="flex-1 flex flex-col">
        <MerchantHeader title="Listings" />

        <main className="p-4 sm:p-6 flex flex-col gap-6 pb-24 lg:pb-6">
          {/* Header */}
          <div>
            <h1 className="text-xl font-bold text-gray-900">Merchant Listings</h1>
            <p className="text-sm text-[var(--ep-neutral)]">
              Manage your active surplus offers and rescue requests.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Total Active", value: ALL_LISTINGS.filter((l) => l.status === "active").length },
              { label: "Items Rescued", value: 58 },
              { label: "Daily Rescue Revenue", value: formatXAF(41250) },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl bg-white border border-gray-100 p-4">
                <p className="text-xl font-bold text-gray-900">{s.value}</p>
                <p className="text-xs text-[var(--ep-neutral)]">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Toolbar */}
          <div className="flex items-center gap-3 flex-wrap">
            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={selected.length === ALL_LISTINGS.length}
                onChange={toggleAll}
                className="rounded border-gray-300"
              />
              Select All ({selected.length} selected)
            </label>
            <div className="flex-1" />
            {selected.length > 0 && (
              <>
                <button className="flex items-center gap-1.5 text-sm font-medium text-[var(--ep-neutral)] hover:text-gray-900 transition">
                  <Archive size={14} /> Freeze Entry
                </button>
                <button className="flex items-center gap-1.5 text-sm font-medium text-[var(--ep-neutral)] hover:text-gray-900 transition">
                  <Check size={14} /> Mark as Collected
                </button>
                <button className="flex items-center gap-1.5 text-sm font-medium text-red-500 hover:text-red-600 transition">
                  <Trash2 size={14} /> Remove
                </button>
              </>
            )}
            <button className="flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
              <Filter size={14} /> Filters
            </button>
            <button
              onClick={() => setShowForm(true)}
              className="btn-cta text-sm gap-1.5"
            >
              <Plus size={14} /> Create Listing
            </button>
          </div>

          {/* Listings grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ALL_LISTINGS.map((l) => (
              <div
                key={l.id}
                className={`card-food flex flex-col relative ${
                  selected.includes(l.id) ? "ring-2 ring-[var(--ep-green)]" : ""
                }`}
              >
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={selected.includes(l.id)}
                  onChange={() => toggle(l.id)}
                  className="absolute top-2 left-2 z-10 rounded border-gray-300"
                />

                {/* Image */}
                <div className="relative h-40">
                  <img src={l.image} alt={l.title} className="h-full w-full object-cover" />
                  <div className="absolute top-2 right-2">
                    <StatusBadge status={l.status} />
                  </div>
                  {l.status === "collected" && (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-gray-700">
                        COLLECTED BY USER
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-4 flex flex-col gap-2">
                  <h3 className="text-sm font-semibold text-gray-900">{l.title}</h3>
                  <div className="flex items-center justify-between text-xs text-[var(--ep-neutral)]">
                    <span>ORIGINAL: {formatXAF(l.originalPrice)}</span>
                    <span className="text-[var(--ep-green)] font-semibold">
                      RESCUE: {formatXAF(l.discountedPrice)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <button className="flex-1 btn-outline text-xs py-1.5 justify-center gap-1">
                      <Edit2 size={12} /> Edit Listing
                    </button>
                    {l.status === "active" && (
                      <button className="flex-1 btn-primary text-xs py-1.5 justify-center">
                        Mark as Collected
                      </button>
                    )}
                    {l.status === "collected" && (
                      <button className="flex-1 rounded-xl border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 transition">
                        Relist Item
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Create new */}
            <button
              onClick={() => setShowForm(true)}
              className="rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-3 p-8 text-[var(--ep-neutral)] hover:border-[var(--ep-green-mid)] hover:text-[var(--ep-green)] transition min-h-[240px]"
            >
              <Plus size={28} />
              <span className="text-sm font-medium">Create New Offer</span>
              <span className="text-xs text-center">
                Add your surplus items now
              </span>
            </button>
          </div>
        </main>
      </div>

      {/* Create listing modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-gray-900">Create New Listing</h2>
              <button onClick={() => setShowForm(false)} className="text-[var(--ep-neutral)] hover:text-gray-900 text-xl leading-none">×</button>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { label: "Item Title", placeholder: "e.g. Today's Bread Surplus" },
                { label: "Original Price (XAF)", placeholder: "5000" },
                { label: "Rescue Price (XAF)", placeholder: "2500" },
                { label: "Quantity Available", placeholder: "10" },
                { label: "Pickup Window", placeholder: "Today, 18:00 – 19:30" },
              ].map((f) => (
                <div key={f.label} className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">{f.label}</label>
                  <input placeholder={f.placeholder} className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[var(--ep-green-mid)] transition" />
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowForm(false)} className="flex-1 btn-outline justify-center">Cancel</button>
              <button onClick={() => setShowForm(false)} className="flex-1 btn-primary justify-center">Publish Listing</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
