"use client";

import { useState } from "react";
import MerchantNav, { MerchantHeader } from "@/components/merchant-nav";
import { Camera, MapPin, Shield, Smartphone, Lock, Bell } from "lucide-react";

type NotifKey = "newReservations" | "lowStock" | "impactMilestones";
type SettingsTab = "profile" | "hours" | "notifications" | "payout" | "security";

const TABS: { id: SettingsTab; label: string; icon: React.ElementType }[] = [
  { id: "profile",       label: "Business Profile",  icon: Camera },
  { id: "hours",         label: "Operational Hours", icon: MapPin },
  { id: "notifications", label: "Notifications",     icon: Bell },
  { id: "payout",        label: "Payout",            icon: Shield },
  { id: "security",      label: "Security",          icon: Lock },
];

const NOTIF_ROWS: { key: NotifKey; label: string; sub: string }[] = [
  { key: "newReservations", label: "New Reservations",  sub: "Alert when a user makes a buy" },
  { key: "lowStock",        label: "Low Stock Warnings", sub: "Listings below threshold" },
  { key: "impactMilestones",label: "Impact Milestones", sub: "Food waste reduction goals" },
];

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      aria-pressed={on}
      className={`relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors ${on ? "bg-[var(--ep-green)]" : "bg-gray-200"}`}
    >
      <span className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-transform ${on ? "translate-x-6" : "translate-x-1"}`} />
    </button>
  );
}

function InputField({ label, defaultValue, placeholder }: { label: string; defaultValue?: string; placeholder?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-[var(--ep-neutral)] uppercase tracking-wide">{label}</label>
      <input
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[var(--ep-green-mid)] focus:ring-2 focus:ring-[var(--ep-green-mid)]/20 transition"
      />
    </div>
  );
}

export default function MerchantSettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");
  const [notifs, setNotifs] = useState<Record<NotifKey, { push: boolean; sms: boolean; email: boolean }>>({
    newReservations: { push: true,  sms: true,  email: false },
    lowStock:        { push: true,  sms: false, email: true  },
    impactMilestones:{ push: false, sms: false, email: true  },
  });
  const [rescueStart,      setRescueStart]      = useState("16:00");
  const [rescueEnd,        setRescueEnd]        = useState("18:00");
  const [autoListingStart, setAutoListingStart] = useState("00:00");
  const [holidayShutdown,  setHolidayShutdown]  = useState(false);

  function toggle(key: NotifKey, channel: "push" | "sms" | "email") {
    setNotifs((n) => ({ ...n, [key]: { ...n[key], [channel]: !n[key][channel] } }));
  }

  return (
    <div className="flex min-h-screen bg-[var(--ep-cream)]">
      <MerchantNav />

      <div className="flex-1 flex flex-col min-w-0">
        <MerchantHeader title="Settings" />

        <div className="flex flex-col lg:flex-row flex-1 min-h-0">

          {/* ── Sub-nav: horizontal scroll on mobile, sidebar on desktop ── */}
          <nav className="
            flex flex-row overflow-x-auto gap-1 px-4 py-3 bg-white border-b border-gray-100 shrink-0
            lg:flex-col lg:w-52 lg:overflow-x-visible lg:border-b-0 lg:border-r lg:px-3 lg:py-4 lg:gap-0.5
          ">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm whitespace-nowrap shrink-0 transition
                  ${activeTab === id
                    ? "bg-[var(--ep-green)] text-white font-medium"
                    : "text-[var(--ep-neutral)] hover:bg-gray-50"
                  }`}
              >
                <Icon size={14} />
                {label}
              </button>
            ))}
          </nav>

          {/* ── Content ── */}
          <main className="flex-1 p-4 sm:p-6 flex flex-col gap-5 pb-24 lg:pb-6 min-w-0 max-w-2xl">

            {/* ── Business Profile ── */}
            {activeTab === "profile" && (
              <section className="rounded-2xl bg-white border border-gray-100 p-5 flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-gray-900">Business Profile</h2>
                  <span className="badge-impact text-xs">● Verified</span>
                </div>

                {/* Avatar */}
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 rounded-2xl overflow-hidden bg-[var(--ep-green-light)] flex items-center justify-center shrink-0">
                    <span className="text-xl font-bold text-[var(--ep-green)]">AB</span>
                    <button className="absolute bottom-0 inset-x-0 bg-black/40 py-1 flex justify-center">
                      <Camera size={11} className="text-white" />
                    </button>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Green Harvest Organic</p>
                    <p className="text-xs text-[var(--ep-neutral)]">Tap the avatar to update your logo</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField label="Business Name"  defaultValue="Green Harvest Organic" />
                  <InputField label="Owner"           defaultValue="Deli" />
                  <InputField label="Contact Phone"   defaultValue="+237 67 123 4567" />
                  <InputField label="Contact Email"   defaultValue="contact@greenharvestcm.com" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-[var(--ep-neutral)] uppercase tracking-wide">Discovery Address</label>
                  <div className="grid grid-cols-1 sm:grid-cols-[1fr_140px] gap-3">
                    <input defaultValue="Rue de la République, 102"
                      className="rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[var(--ep-green-mid)] transition" />
                    <input defaultValue="Yaoundé" placeholder="City"
                      className="rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[var(--ep-green-mid)] transition" />
                  </div>
                  <div className="h-28 rounded-xl bg-gray-100 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(45deg,#ccc,#ccc_1px,transparent_1px,transparent_10px)]" />
                    <div className="flex flex-col items-center gap-1 text-[var(--ep-neutral)] z-10">
                      <MapPin size={20} className="text-[var(--ep-orange)]" />
                      <p className="text-xs">Adjust Location</p>
                    </div>
                  </div>
                </div>

                <button className="btn-cta self-start sm:self-end text-sm py-2 px-5 w-full sm:w-auto">Save Changes</button>
              </section>
            )}

            {/* ── Operational Hours ── */}
            {activeTab === "hours" && (
              <section className="rounded-2xl bg-white border border-gray-100 p-5 flex flex-col gap-4">
                <h2 className="font-semibold text-gray-900">Operational Hours</h2>
                <p className="text-xs text-[var(--ep-neutral)]">Define when customers can pick up reservations.</p>

                {/* Rescue window */}
                <div className="rounded-xl border border-gray-200 p-4 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-[var(--ep-orange-light)] flex items-center justify-center shrink-0">
                      <span className="text-[var(--ep-orange)] text-sm">🕓</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Daily Rescue Window</p>
                      <p className="text-xs text-[var(--ep-neutral)]">Customers can pick up during this time</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex flex-col gap-1 flex-1 min-w-[120px]">
                      <label className="text-xs text-[var(--ep-neutral)]">From</label>
                      <input type="time" value={rescueStart} onChange={(e) => setRescueStart(e.target.value)}
                        className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[var(--ep-green-mid)] w-full" />
                    </div>
                    <div className="flex flex-col gap-1 flex-1 min-w-[120px]">
                      <label className="text-xs text-[var(--ep-neutral)]">To</label>
                      <input type="time" value={rescueEnd} onChange={(e) => setRescueEnd(e.target.value)}
                        className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[var(--ep-green-mid)] w-full" />
                    </div>
                  </div>
                </div>

                {/* Auto-listing */}
                <div className="rounded-xl border border-gray-200 p-4 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-[var(--ep-green-light)] flex items-center justify-center shrink-0">
                    <span className="text-[var(--ep-green)] text-sm">⚡</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">Auto-listing Start</p>
                    <p className="text-xs text-[var(--ep-neutral)]">Automatically go live at this time</p>
                  </div>
                  <input type="time" value={autoListingStart} onChange={(e) => setAutoListingStart(e.target.value)}
                    className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[var(--ep-green-mid)] w-28 shrink-0" />
                </div>

                {/* Holiday shutdown */}
                <div className="rounded-xl border border-gray-200 p-4 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                    <span className="text-sm">🏖️</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">Holiday Shutdown</p>
                    <p className="text-xs text-[var(--ep-neutral)]">Pause all listings for a period</p>
                  </div>
                  <Toggle on={holidayShutdown} onToggle={() => setHolidayShutdown((v) => !v)} />
                </div>

                <button className="btn-cta self-start text-sm py-2 px-5 w-full sm:w-auto">Save Hours</button>
              </section>
            )}

            {/* ── Notifications ── */}
            {activeTab === "notifications" && (
              <section className="rounded-2xl bg-white border border-gray-100 p-5 flex flex-col gap-4">
                <h2 className="font-semibold text-gray-900">Notification Preferences</h2>
                <p className="text-xs text-[var(--ep-neutral)]">Control how and when you want to be notified.</p>

                {/* Mobile: stacked cards */}
                <div className="flex flex-col gap-3 sm:hidden">
                  {NOTIF_ROWS.map((row) => (
                    <div key={row.key} className="rounded-xl border border-gray-100 p-4 flex flex-col gap-3">
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{row.label}</p>
                        <p className="text-xs text-[var(--ep-neutral)]">{row.sub}</p>
                      </div>
                      <div className="flex gap-6">
                        {(["push", "sms", "email"] as const).map((ch) => (
                          <div key={ch} className="flex flex-col items-center gap-1.5">
                            <span className="text-xs text-[var(--ep-neutral)] uppercase">{ch}</span>
                            <Toggle on={notifs[row.key][ch]} onToggle={() => toggle(row.key, ch)} />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop: table */}
                <table className="hidden sm:table w-full text-sm">
                  <thead>
                    <tr className="text-xs text-[var(--ep-neutral)] uppercase tracking-wide border-b border-gray-100">
                      <th className="text-left py-2 pr-4 font-medium">Alert Type</th>
                      <th className="text-center py-2 px-4 font-medium">Push</th>
                      <th className="text-center py-2 px-4 font-medium">SMS</th>
                      <th className="text-center py-2 px-4 font-medium">Email</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {NOTIF_ROWS.map((row) => (
                      <tr key={row.key}>
                        <td className="py-3 pr-4">
                          <p className="font-medium text-gray-900">{row.label}</p>
                          <p className="text-xs text-[var(--ep-neutral)]">{row.sub}</p>
                        </td>
                        {(["push", "sms", "email"] as const).map((ch) => (
                          <td key={ch} className="py-3 px-4 text-center">
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
            )}

            {/* ── Payout ── */}
            {activeTab === "payout" && (
              <section className="rounded-2xl bg-white border border-gray-100 p-5 flex flex-col gap-4">
                <h2 className="font-semibold text-gray-900">Payout Settings</h2>
                <p className="text-xs text-[var(--ep-neutral)]">Manage where your income is deposited.</p>

                <div className="relative rounded-2xl bg-gradient-to-br from-[#5C2D00] to-[#2D1500] p-5 text-white overflow-hidden">
                  <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-[var(--ep-orange)]/20 -translate-y-6 translate-x-6" />
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-white/60 mb-2">Primary Payout Method</p>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-7 w-7 rounded-full bg-[var(--ep-orange)] flex items-center justify-center text-xs font-bold shrink-0">OM</div>
                    <span className="font-semibold">Orange Money</span>
                  </div>
                  <p className="text-white/70 text-xs font-mono mb-4">Account: •••• •••• 4321</p>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-3 border-t border-white/10">
                    <div>
                      <p className="text-xs text-white/70">Weekly Auto-Payout</p>
                      <p className="text-sm font-semibold">Every Monday, 10:00 AM</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="rounded-lg bg-[var(--ep-orange)] px-4 py-2 text-xs font-semibold hover:opacity-90 transition">
                        Edit Details
                      </button>
                      <button className="rounded-lg border border-white/20 px-4 py-2 text-xs font-semibold hover:bg-white/10 transition">
                        Schedule
                      </button>
                    </div>
                  </div>
                </div>

                <button className="flex items-center gap-1.5 text-sm text-[var(--ep-neutral)] hover:text-gray-900 transition">
                  <span className="text-lg leading-none">⊕</span> Add Backup Method
                </button>
              </section>
            )}

            {/* ── Security ── */}
            {activeTab === "security" && (
              <section className="rounded-2xl bg-white border border-gray-100 p-5 flex flex-col gap-4">
                <h2 className="font-semibold text-gray-900">Security</h2>
                <p className="text-xs text-[var(--ep-neutral)]">Protect your account and managed data.</p>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3">
                    <div className="h-9 w-9 rounded-xl bg-[var(--ep-green-light)] flex items-center justify-center shrink-0">
                      <Lock size={15} className="text-[var(--ep-green)]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">Change Password</p>
                      <p className="text-xs text-[var(--ep-neutral)]">Last updated 3 months ago</p>
                    </div>
                    <button className="text-xs text-[var(--ep-orange)] font-medium hover:underline shrink-0">Update</button>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3">
                    <div className="h-9 w-9 rounded-xl bg-[var(--ep-orange-light)] flex items-center justify-center shrink-0">
                      <Smartphone size={15} className="text-[var(--ep-orange)]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">Two-Factor Authentication</p>
                      <p className="text-xs text-[var(--ep-neutral)]">Extra login step to protect your account</p>
                    </div>
                    <button className="text-xs text-[var(--ep-neutral)] border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition shrink-0">
                      Disable
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <p className="text-xs font-semibold text-[var(--ep-neutral)] uppercase tracking-widest">Active Sessions</p>
                  {[
                    { device: "MacBook Pro — Yaoundé, CM", session: "Thursday · Current Session" },
                    { device: "Galaxy S21 — Yaoundé, CM",  session: "Thursday, 4 hours ago" },
                  ].map((s) => (
                    <div key={s.device} className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3 gap-3">
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900 text-sm truncate">{s.device}</p>
                        <p className="text-xs text-[var(--ep-neutral)]">{s.session}</p>
                      </div>
                      <button className="text-xs text-red-500 hover:underline shrink-0">Revoke</button>
                    </div>
                  ))}
                </div>
              </section>
            )}

          </main>
        </div>
      </div>
    </div>
  );
}
