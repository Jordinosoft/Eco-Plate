"use client";

import { useState } from "react";
import MerchantNav, { MerchantHeader } from "@/components/merchant-nav";
import { Camera, Save } from "lucide-react";

export default function MerchantSettingsPage() {
  const [notifications, setNotifications] = useState({
    newOrders: true,
    lowStock: true,
    weeklyReport: false,
    impactUpdates: true,
  });

  return (
    <div className="flex min-h-screen bg-[var(--ep-cream)]">
      <MerchantNav />

      <div className="flex-1 flex flex-col">
        <MerchantHeader title="Settings" />

        <main className="p-6 max-w-2xl flex flex-col gap-6">
          <h1 className="text-xl font-bold text-gray-900">Settings</h1>

          {/* Business profile */}
          <section className="rounded-2xl bg-white border border-gray-100 p-5 flex flex-col gap-4">
            <h2 className="font-semibold text-gray-900">Business Profile</h2>

            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 rounded-2xl bg-[var(--ep-orange-light)] flex items-center justify-center text-xl font-bold text-[var(--ep-orange)]">
                AB
                <button className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--ep-green)] text-white">
                  <Camera size={12} />
                </button>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Artisan Bakery</p>
                <p className="text-sm text-[var(--ep-neutral)]">Verified Merchant</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { label: "Business Name", value: "Artisan Bakery" },
                { label: "Category", value: "Bakery" },
                { label: "Address", value: "42 Rue du Commerce, Buea" },
                { label: "Phone", value: "+237 6 70 00 00 00" },
                { label: "Email", value: "hello@artisanbakery.cm" },
                { label: "Opening Hours", value: "07:00 – 20:00" },
              ].map((f) => (
                <div key={f.label} className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">{f.label}</label>
                  <input
                    defaultValue={f.value}
                    className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[var(--ep-green-mid)] transition"
                  />
                </div>
              ))}
            </div>

            <button className="btn-primary text-sm gap-1.5 self-start">
              <Save size={14} /> Save Changes
            </button>
          </section>

          {/* Notifications */}
          <section className="rounded-2xl bg-white border border-gray-100 p-5 flex flex-col gap-4">
            <h2 className="font-semibold text-gray-900">Notifications</h2>
            <div className="flex flex-col gap-4">
              {(Object.keys(notifications) as (keyof typeof notifications)[]).map((key) => {
                const labels: Record<string, string> = {
                  newOrders: "New rescue orders",
                  lowStock: "Low stock alerts",
                  weeklyReport: "Weekly impact report",
                  impactUpdates: "Environmental impact updates",
                };
                return (
                  <div key={key} className="flex items-center justify-between">
                    <p className="text-sm text-gray-700">{labels[key]}</p>
                    <button
                      onClick={() =>
                        setNotifications((n) => ({ ...n, [key]: !n[key] }))
                      }
                      className={`relative inline-flex h-6 w-11 rounded-full transition ${
                        notifications[key] ? "bg-[var(--ep-green)]" : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                          notifications[key] ? "translate-x-5" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Payment */}
          <section className="rounded-2xl bg-white border border-gray-100 p-5 flex flex-col gap-4">
            <h2 className="font-semibold text-gray-900">Payment & Payouts</h2>
            <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3">
              <div className="h-8 w-8 rounded-full bg-[var(--ep-orange)] text-white text-xs font-bold flex items-center justify-center shrink-0">
                OM
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Orange Money — +237 6 70 00 00 00</p>
                <p className="text-xs text-[var(--ep-green-mid)]">Primary payout account</p>
              </div>
            </div>
            <button className="text-xs text-[var(--ep-orange)] hover:underline self-start">
              + Add Payout Method
            </button>
          </section>

          {/* Danger zone */}
          <section className="rounded-2xl border border-red-100 bg-red-50 p-5">
            <h2 className="font-semibold text-red-700 mb-2">Danger Zone</h2>
            <p className="text-sm text-red-600 mb-4">
              Deactivating your account will remove all your listings immediately.
            </p>
            <button className="rounded-xl border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100 transition">
              Deactivate Account
            </button>
          </section>
        </main>
      </div>
    </div>
  );
}
