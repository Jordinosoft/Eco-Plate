"use client";

import { useState } from "react";
import MerchantNav, { MerchantHeader } from "@/components/merchant-nav";
import { Camera, MapPin, Shield, Smartphone, Lock } from "lucide-react";

type NotifKey = "newReservations" | "lowStock" | "impactMilestones";

const NOTIF_ROWS: { key: NotifKey; label: string; sub: string }[] = [
  { key: "newReservations", label: "New Reservations", sub: "Alert when a user makes a buy" },
  { key: "lowStock", label: "Low Stock Warnings", sub: "Notifications for listings below threshold" },
  { key: "impactMilestones", label: "Impact Milestones", sub: "Celebrating food waste reduction goals" },
];

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`relative inline-flex h-5 w-9 rounded-full transition ${on ? "bg-[var(--ep-green)]" : "bg-gray-200"}`}
    >
      <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${on ? "translate-x-4" : "translate-x-0.5"}`} />
    </button>
  );
}

export default function MerchantSettingsPage() {
  const [notifs, setNotifs] = useState<Record<NotifKey, { push: boolean; sms: boolean; email: boolean }>>({
    newReservations: { push: true, sms: true, email: false },
    lowStock: { push: true, sms: false, email: true },
    impactMilestones: { push: false, sms: false, email: true },
  });

  const [rescueStart, setRescueStart] = useState("16:00");
  const [rescueEnd, setRescueEnd] = useState("18:00");
  const [autoListingStart, setAutoListingStart] = useState("00:00");
  const [holidayShutdown, setHolidayShutdown] = useState(false);

  function toggle(key: NotifKey, channel: "push" | "sms" | "email") {
    setNotifs((n) => ({ ...n, [key]: { ...n[key], [channel]: !n[key][channel] } }));
  }

  return (
    <div className="flex min-h-screen bg-[var(--ep-cream)]">
      <MerchantNav />

      <div className="flex-1 flex flex-col">
        <MerchantHeader title="Settings" />

        <div className="flex">
          {/* Settings sub-nav */}
          <nav className="w-52 shrink-0 border-r border-gray-100 bg-white min-h-full py-4 flex flex-col gap-0.5 px-3">
            {[
              { label: "Business Profile", icon: Camera },
              { label: "Operational Hours", icon: MapPin },
              { label: "Notifications", icon: Smartphone },
              { label: "Payout Settings", icon: Shield },
              { label: "Security", icon: Lock },
            ].map(({ label, icon: Icon }, i) => (
              <button
                key={label}
                className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-left transition ${
                  i === 0 ? "bg-[var(--ep-green)] text-white font-medium" : "text-[var(--ep-neutral)] hover:bg-gray-50"
                }`}
              >
                <Icon size={14} />
                {label}
              </button>
            ))}
          </nav>

          <main className="flex-1 p-6 flex flex-col gap-6 max-w-3xl">
            {/* Business Profile */}
            <section className="rounded-2xl bg-white border border-gray-100 p-6 flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-gray-900">Business Profile</h2>
                <span className="badge-impact text-xs">● Verified</span>
              </div>

              <div className="flex items-start gap-4">
                <div className="relative h-16 w-16 rounded-2xl overflow-hidden bg-[var(--ep-green-light)] flex items-center justify-center shrink-0">
                  <span className="text-xl font-bold text-[var(--ep-green)]">AB</span>
                  <button className="absolute bottom-0 inset-x-0 bg-black/40 py-1 flex justify-center">
                    <Camera size={11} className="text-white" />
                  </button>
                </div>
                <div className="grid sm:grid-cols-2 gap-4 flex-1">
                  {[
                    { label: "Business Name", value: "Green Harvest Organic" },
                    { label: "Owner", value: "Deli" },
                    { label: "Contact Phone", value: "+221 77 123 4567" },
                    { label: "Contact Email", value: "contact@greenharvestcm.com" },
                  ].map((f) => (
                    <div key={f.label} className="flex flex-col gap-1">
                      <label className="text-xs font-medium text-[var(--ep-neutral)] uppercase tracking-wide">{f.label}</label>
                      <input
                        defaultValue={f.value}
                        className="rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[var(--ep-green-mid)] transition"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Discovery address + map */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-[var(--ep-neutral)] uppercase tracking-wide">Discovery Address</label>
                <div className="grid sm:grid-cols-[1fr_160px] gap-3">
                  <input
                    defaultValue="Rue de la République, 102"
                    className="rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[var(--ep-green-mid)] transition"
                  />
                  <input
                    defaultValue="Dakar"
                    className="rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[var(--ep-green-mid)] transition"
                    placeholder="City"
                  />
                </div>
                {/* Map placeholder */}
                <div className="h-32 rounded-xl bg-gray-100 flex items-center justify-center relative overflow-hidden mt-1">
                  <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(45deg,#ccc,#ccc_1px,transparent_1px,transparent_10px)]" />
                  <div className="flex flex-col items-center gap-1 text-[var(--ep-neutral)] z-10">
                    <MapPin size={20} className="text-[var(--ep-orange)]" />
                    <p className="text-xs">Adjust Location</p>
                  </div>
                </div>
              </div>

              <button className="btn-cta self-end text-sm py-2 px-5">Save Changes</button>
            </section>

            {/* Operational Hours */}
            <section className="rounded-2xl bg-white border border-gray-100 p-6 flex flex-col gap-4">
              <h2 className="font-semibold text-gray-900">Operational Hours</h2>
              <p className="text-xs text-[var(--ep-neutral)]">Define when customers can pick up reservations during this time.</p>

              {/* Daily rescue window */}
              <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3">
                <div className="h-8 w-8 rounded-lg bg-[var(--ep-orange-light)] flex items-center justify-center shrink-0">
                  <span className="text-[var(--ep-orange)] text-sm">🕓</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">Daily Rescue Window</p>
                  <p className="text-xs text-[var(--ep-neutral)]">Customers can pick up reservations during this time</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <input
                    type="time"
                    value={rescueStart}
                    onChange={(e) => setRescueStart(e.target.value)}
                    className="rounded-lg border border-gray-200 px-2 py-1 text-sm outline-none focus:border-[var(--ep-green-mid)] w-24"
                  />
                  <span className="text-[var(--ep-neutral)] text-sm">to</span>
                  <input
                    type="time"
                    value={rescueEnd}
                    onChange={(e) => setRescueEnd(e.target.value)}
                    className="rounded-lg border border-gray-200 px-2 py-1 text-sm outline-none focus:border-[var(--ep-green-mid)] w-24"
                  />
                </div>
              </div>

              {/* Auto-listing + holiday */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 flex-1 min-w-52">
                  <div className="h-5 w-5 rounded bg-[var(--ep-green-light)] flex items-center justify-center shrink-0">
                    <span className="text-[var(--ep-green)] text-xs">⚡</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Auto-listing Start</p>
                  </div>
                  <input
                    type="time"
                    value={autoListingStart}
                    onChange={(e) => setAutoListingStart(e.target.value)}
                    className="rounded-lg border border-gray-200 px-2 py-1 text-sm outline-none focus:border-[var(--ep-green-mid)] w-24"
                  />
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 flex-1 min-w-52">
                  <div className="h-5 w-5 rounded bg-red-50 flex items-center justify-center shrink-0">
                    <span className="text-red-500 text-xs">🏖</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Holiday Shutdown</p>
                  </div>
                  <Toggle on={holidayShutdown} onToggle={() => setHolidayShutdown((v) => !v)} />
                </div>
              </div>
            </section>

            {/* Notification Preferences */}
            <section className="rounded-2xl bg-white border border-gray-100 p-6 flex flex-col gap-4">
              <h2 className="font-semibold text-gray-900">Notification Preferences</h2>
              <p className="text-xs text-[var(--ep-neutral)]">Control how and when you want to be notified.</p>

              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-[var(--ep-neutral)] uppercase tracking-wide border-b border-gray-100">
                    <th className="text-left py-2 pr-4 font-medium">Alert Type</th>
                    <th className="text-center py-2 px-3 font-medium">Push</th>
                    <th className="text-center py-2 px-3 font-medium">SMS</th>
                    <th className="text-center py-2 px-3 font-medium">Email</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {NOTIF_ROWS.map((row) => (
                    <tr key={row.key}>
                      <td className="py-3 pr-4">
                        <p className="font-medium text-gray-900 text-sm">{row.label}</p>
                        <p className="text-xs text-[var(--ep-neutral)]">{row.sub}</p>
                      </td>
                      {(["push", "sms", "email"] as const).map((ch) => (
                        <td key={ch} className="py-3 px-3 text-center">
                          <div className="flex justify-center">
                            <Toggle on={notifs[row.key][ch]} onToggle={() => toggle(row.key, ch)} />
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            {/* Payout Settings */}
            <section className="rounded-2xl bg-white border border-gray-100 p-6 flex flex-col gap-4">
              <h2 className="font-semibold text-gray-900">Payout Settings</h2>
              <p className="text-xs text-[var(--ep-neutral)]">Manage where your income is deposited.</p>

              {/* Primary payout card */}
              <div className="relative rounded-2xl bg-gradient-to-br from-[#5C2D00] to-[#2D1500] p-5 text-white overflow-hidden">
                <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-[var(--ep-orange)]/20 -translate-y-6 translate-x-6" />
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-white/60 mb-1">Primary Payout Method</p>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="h-7 w-7 rounded-full bg-[var(--ep-orange)] flex items-center justify-center text-xs font-bold shrink-0">
                        OM
                      </div>
                      <span className="font-semibold text-white">Orange Money</span>
                    </div>
                    <p className="text-white/70 text-xs font-mono">Account: •••• •••• 4321</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-white/60">Last Payout</p>
                    <p className="text-sm font-semibold">Oct 17, 2025</p>
                    <button className="mt-2 rounded-lg bg-[var(--ep-orange)] px-3 py-1 text-xs font-semibold hover:opacity-90 transition">
                      Edit Details
                    </button>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-white/70">Weekly Auto-Payout</span>
                  <span className="font-semibold">Every Monday, 10:00 AM</span>
                </div>
                <button className="text-[10px] text-[var(--ep-orange)] hover:underline mt-1">
                  Manage Schedule
                </button>
              </div>

              <button className="flex items-center gap-1.5 text-sm text-[var(--ep-neutral)] hover:text-gray-900 transition self-start">
                <span className="text-lg leading-none">⊕</span> Add Backup Method
              </button>
            </section>

            {/* Security */}
            <section className="rounded-2xl bg-white border border-gray-100 p-6 flex flex-col gap-4">
              <h2 className="font-semibold text-gray-900">Security</h2>
              <p className="text-xs text-[var(--ep-neutral)]">Protect your account and managed data.</p>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3">
                  <div className="h-8 w-8 rounded-lg bg-[var(--ep-green-light)] flex items-center justify-center shrink-0">
                    <Lock size={14} className="text-[var(--ep-green)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">Change Password</p>
                    <p className="text-xs text-[var(--ep-neutral)]">Last updated 3 months ago</p>
                  </div>
                  <button className="text-xs text-[var(--ep-orange)] font-medium hover:underline shrink-0">
                    Update
                  </button>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3">
                  <div className="h-8 w-8 rounded-lg bg-[var(--ep-orange-light)] flex items-center justify-center shrink-0">
                    <Smartphone size={14} className="text-[var(--ep-orange)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">Two-Factor Authentication</p>
                    <p className="text-xs text-[var(--ep-neutral)]">Protect your account with an extra login step</p>
                  </div>
                  <button className="text-xs text-[var(--ep-neutral)] border border-gray-200 rounded-lg px-3 py-1 hover:bg-gray-50 transition shrink-0">
                    Disable
                  </button>
                </div>
              </div>

              {/* Active Sessions */}
              <div className="flex flex-col gap-2">
                <p className="text-xs font-semibold text-[var(--ep-neutral)] uppercase tracking-widest">Active Sessions</p>
                {[
                  { device: "MacBook Pro — Dubai, SB", session: "Thursday · Current Session" },
                  { device: "Galaxy S21 — Dubai, SB", session: "Thursday, 4 hours ago" },
                ].map((s) => (
                  <div key={s.device} className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-2.5 text-xs">
                    <div>
                      <p className="font-medium text-gray-900">{s.device}</p>
                      <p className="text-[var(--ep-neutral)]">{s.session}</p>
                    </div>
                    <button className="text-red-500 hover:underline">Revoke</button>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
