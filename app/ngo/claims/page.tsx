"use client";

import { useState } from "react";
import NGONav, { NGOHeader } from "@/components/ngo-nav";
import { Truck, Phone, X, MapPin, MessageSquare, Calendar, ShoppingBag, Edit } from "lucide-react";

type ActionStatus = "awaiting_driver" | "pending" | "scheduled";

interface ActionClaim {
  id: string;
  merchant: string;
  type: string;
  closesIn?: string;
  pickupWindow?: string;
  status: ActionStatus;
  statusLabel: string;
  driverNote?: string;
  urgent: boolean;
}

const CLAIMS: ActionClaim[] = [
  {
    id: "c1",
    merchant: "Green Earth Market",
    type: "Fresh Organic Produce",
    closesIn: "45m",
    status: "awaiting_driver",
    statusLabel: "Awaiting Driver",
    urgent: true,
  },
  {
    id: "c2",
    merchant: "Morning Flour Bakery",
    type: "Mixed Fresh Sandwiches & Pastries",
    closesIn: "20m",
    status: "pending",
    statusLabel: "Pending",
    urgent: true,
  },
  {
    id: "c3",
    merchant: "City Wholesale Hub",
    type: "Bulk Dairy & Cheese",
    pickupWindow: "Tomorrow, 9:00 AM",
    status: "scheduled",
    statusLabel: "Refrigerated Van",
    driverNote: "Requires Refrigerated Van",
    urgent: false,
  },
];

function statusColor(s: ActionStatus) {
  if (s === "awaiting_driver") return "bg-[var(--ep-orange-light)] text-[var(--ep-orange)]";
  if (s === "pending") return "bg-[var(--ep-green-light)] text-[var(--ep-green)]";
  return "bg-gray-100 text-gray-500";
}

export default function NGOClaimsPage() {
  const [dismissed, setDismissed] = useState<string[]>([]);
  const visible = CLAIMS.filter((c) => !dismissed.includes(c.id));

  return (
    <div className="flex min-h-screen bg-[var(--ep-cream)]">
      <NGONav />

      <div className="flex-1 flex flex-col">
        <NGOHeader />

        <main className="p-6 flex flex-col gap-6">
          {/* Header row */}
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">Active Claims</h1>
            <button className="btn-cta text-sm gap-1.5">
              <ShoppingBag size={14} /> New Pickup Request
            </button>
          </div>

          {/* Stats strip */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="rounded-xl bg-white border border-gray-100 px-5 py-3 flex flex-col items-center min-w-24">
              <p className="text-2xl font-bold text-[var(--ep-green)]">12</p>
              <p className="text-xs text-[var(--ep-neutral)]">Active Actions</p>
            </div>
            <div className="rounded-xl bg-white border border-gray-100 px-5 py-3 flex flex-col items-center min-w-24">
              <p className="text-2xl font-bold text-[var(--ep-orange)]">4</p>
              <p className="text-xs text-[var(--ep-neutral)]">Urgent Pending</p>
            </div>
            <div className="rounded-xl bg-white border border-gray-100 px-5 py-3 flex flex-col items-center min-w-24">
              <p className="text-2xl font-bold text-[var(--ep-green-mid)]">840</p>
              <p className="text-xs text-[var(--ep-neutral)]">kg Claimed</p>
            </div>
            <button className="ml-auto badge-urgent text-xs py-1.5 px-3">
              ↑ Urgent First
            </button>
          </div>

          {/* Immediate Actions */}
          <div>
            <p className="text-xs font-semibold text-[var(--ep-neutral)] uppercase tracking-widest mb-3">
              Immediate Actions
            </p>

            <div className="grid lg:grid-cols-2 gap-4">
              {visible.map((claim) => (
                <div
                  key={claim.id}
                  className={`rounded-2xl bg-white border flex flex-col gap-3 p-4 ${
                    claim.urgent ? "border-[var(--ep-orange)]/30" : "border-gray-100"
                  }`}
                >
                  {/* Top row */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-xl bg-[var(--ep-green-light)] flex items-center justify-center text-lg shrink-0">
                        🥦
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-gray-900">{claim.merchant}</p>
                        <p className="text-xs text-[var(--ep-neutral)]">{claim.type}</p>
                      </div>
                    </div>
                    {claim.urgent && (
                      <span className="badge-urgent text-xs shrink-0">Urgent</span>
                    )}
                  </div>

                  {/* Meta row */}
                  <div className="flex items-center gap-4 text-xs text-[var(--ep-neutral)]">
                    {claim.closesIn && (
                      <span className="flex items-center gap-1">
                        🕓 Closes in <strong className="text-gray-900">{claim.closesIn}</strong>
                      </span>
                    )}
                    {claim.pickupWindow && (
                      <span className="flex items-center gap-1">
                        <Calendar size={11} /> {claim.pickupWindow}
                      </span>
                    )}
                    <span className={`rounded-full px-2.5 py-0.5 font-medium ${statusColor(claim.status)}`}>
                      {claim.statusLabel}
                    </span>
                  </div>

                  {claim.driverNote && (
                    <p className="text-xs text-[var(--ep-neutral)] bg-gray-50 rounded-xl px-3 py-2">
                      {claim.driverNote}
                    </p>
                  )}

                  {/* Action buttons */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {claim.status === "awaiting_driver" && (
                      <>
                        <button className="btn-cta text-xs py-1.5 px-3 gap-1 flex-1 justify-center">
                          <Truck size={12} /> Assign Driver
                        </button>
                        <button className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition">
                          <Phone size={13} className="text-[var(--ep-neutral)]" />
                        </button>
                        <button
                          onClick={() => setDismissed((d) => [...d, claim.id])}
                          className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition"
                        >
                          <X size={13} className="text-[var(--ep-neutral)]" />
                        </button>
                      </>
                    )}
                    {claim.status === "pending" && (
                      <>
                        <button className="btn-primary text-xs py-1.5 px-3 gap-1 flex-1 justify-center">
                          <MapPin size={12} /> Track Pickup
                        </button>
                        <button className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition">
                          <MessageSquare size={13} className="text-[var(--ep-neutral)]" />
                        </button>
                        <button className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition">
                          <Calendar size={13} className="text-[var(--ep-neutral)]" />
                        </button>
                      </>
                    )}
                    {claim.status === "scheduled" && (
                      <button className="btn-outline text-xs py-1.5 px-3 gap-1 flex-1 justify-center">
                        <Edit size={12} /> Modify Request
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {/* Need more supplies card */}
              <div className="rounded-2xl border border-dashed border-gray-200 bg-white flex flex-col items-center justify-center gap-3 p-6 text-center min-h-40">
                <span className="text-3xl">🏪</span>
                <p className="font-semibold text-sm text-gray-900">Need more supplies?</p>
                <p className="text-xs text-[var(--ep-neutral)]">
                  Browse the marketplace for new food batches ready for collection.
                </p>
                <button className="btn-primary text-xs py-1.5 px-4 gap-1">
                  <ShoppingBag size={12} /> Explore Marketplace
                </button>
              </div>
            </div>
          </div>

          {/* Fleet Monitoring */}
          <div className="rounded-2xl bg-white border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-gray-900">Fleet Monitoring</h2>
              <span className="text-xs text-[var(--ep-neutral)]">1 car active · 3 pending</span>
            </div>
            <div className="h-32 rounded-xl bg-gray-100 relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 opacity-15 bg-[repeating-linear-gradient(45deg,#ccc,#ccc_1px,transparent_1px,transparent_12px)]" />
              <div className="flex flex-col items-center gap-1 text-[var(--ep-neutral)]">
                <span className="text-3xl">🚚</span>
                <p className="text-xs">Live driver positions load here</p>
              </div>
              {/* Floating truck badge */}
              <div className="absolute top-4 left-4 rounded-full bg-[var(--ep-orange)] h-6 w-6 flex items-center justify-center text-white text-xs shadow-md">
                1
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
