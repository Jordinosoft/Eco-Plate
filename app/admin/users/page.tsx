"use client";

import { useState } from "react";
import AdminNav, { AdminHeader } from "@/components/admin-nav";
import { MERCHANTS } from "@/lib/data";
import { Download, UserPlus, ChevronLeft, ChevronRight } from "lucide-react";

type UserRole = "rescuer" | "merchant" | "ngo";
type VerifLevel = "verified" | "pending" | "unverified";

const USERS = [
  { id: "u1", initials: "EM", name: "Elena Martinez", email: "elena.m@example.com", role: "rescuer" as UserRole, joined: "Oct 12, 2023", score: 842, scoreMax: 1000, status: "active" },
  { id: "u2", initials: "GP", name: "Green Plate Bistro", email: "Merchant #88219", role: "merchant" as UserRole, joined: "Jan 05, 2024", score: 210, scoreMax: 1000, status: "active" },
  { id: "u3", initials: "SK", name: "Samuel Kojo", email: "s.kojo@rescue.org", role: "rescuer" as UserRole, joined: "Mar 22, 2024", score: 0, scoreMax: 1000, status: "suspended" },
  { id: "u4", initials: "HH", name: "Harvest Help NGO", email: "admin@harvesthelp.ngo", role: "ngo" as UserRole, joined: "Sep 18, 2023", score: 1240, scoreMax: 1500, status: "active" },
];

const ROLE_COLORS: Record<UserRole, string> = {
  rescuer: "bg-[var(--ep-green-light)] text-[var(--ep-green)]",
  merchant: "bg-[var(--ep-orange-light)] text-[var(--ep-orange)]",
  ngo: "bg-purple-50 text-purple-600",
};

export default function AdminUsersPage() {
  const [filterRoles, setFilterRoles] = useState<UserRole[]>(["rescuer", "merchant", "ngo"]);
  const [verif, setVerif] = useState<VerifLevel[]>(["verified", "pending", "unverified"]);

  function toggleRole(role: UserRole) {
    setFilterRoles((r) => r.includes(role) ? r.filter((x) => x !== role) : [...r, role]);
  }

  function toggleVerif(v: VerifLevel) {
    setVerif((a) => a.includes(v) ? a.filter((x) => x !== v) : [...a, v]);
  }

  return (
    <div className="flex min-h-screen bg-[var(--ep-cream)]">
      <AdminNav />

      <div className="flex-1 flex flex-col">
        <AdminHeader />

        <main className="p-4 sm:p-6 flex flex-col lg:flex-row gap-6 pb-24 lg:pb-6">
          {/* Filters panel */}
          <aside className="w-full lg:w-48 shrink-0 flex flex-col gap-4">
            <div className="rounded-2xl bg-white border border-gray-100 p-4 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-gray-900 text-sm">FILTERS</h2>
                <button className="text-xs text-[var(--ep-orange)] hover:underline">Clear all</button>
              </div>

              <div>
                <p className="text-xs font-semibold text-[var(--ep-neutral)] uppercase tracking-widest mb-2">
                  User Categories
                </p>
                <div className="flex flex-col gap-2">
                  {[
                    { key: "all", label: "All Users" },
                    { key: "rescuer", label: "Rescuers" },
                    { key: "merchant", label: "Merchants" },
                    { key: "ngo", label: "NGO Partners" },
                  ].map((r) => (
                    <label key={r.key} className="flex items-center gap-2 text-sm cursor-pointer text-gray-700">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                        checked={r.key === "all" ? filterRoles.length === 3 : filterRoles.includes(r.key as UserRole)}
                        onChange={() => r.key !== "all" && toggleRole(r.key as UserRole)}
                      />
                      {r.label}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-[var(--ep-neutral)] uppercase tracking-widest mb-2">
                  Verification Level
                </p>
                <div className="flex flex-wrap gap-2">
                  {(["verified", "pending", "unverified"] as VerifLevel[]).map((v) => (
                    <button
                      key={v}
                      onClick={() => toggleVerif(v)}
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize transition ${
                        verif.includes(v)
                          ? v === "verified" ? "bg-[var(--ep-green)] text-white" :
                            v === "pending" ? "bg-[var(--ep-orange)] text-white" :
                            "bg-gray-500 text-white"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-[var(--ep-neutral)] uppercase tracking-widest mb-2">
                  Impact Score (Min)
                </p>
                <input type="range" min={0} max={1000} className="w-full accent-[var(--ep-green)]" />
                <div className="flex justify-between text-xs text-[var(--ep-neutral)]">
                  <span>0</span><span>1000+</span>
                </div>
              </div>
            </div>
          </aside>

          {/* User registry */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="rounded-2xl bg-white border border-gray-100 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h2 className="font-semibold text-gray-900">User Registry</h2>
                  <p className="text-xs text-[var(--ep-neutral)]">
                    Displaying 1,482 total members across all sectors
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1.5 rounded-xl border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
                    <Download size={14} /> Export CSV
                  </button>
                  <button className="btn-cta text-sm gap-1.5">
                    <UserPlus size={14} /> Register User
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[600px]">
                <thead>
                  <tr className="border-b border-gray-100 text-xs text-[var(--ep-neutral)] uppercase tracking-wide">
                    {["User Details", "Role", "Join Date", "Impact Score", "Status", "Actions"].map((h) => (
                      <th key={h} className="px-5 py-3 text-left font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {USERS.map((u) => (
                    <tr key={u.id} className="hover:bg-gray-50 transition">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div className={`h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${ROLE_COLORS[u.role]}`}>
                            {u.initials}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{u.name}</p>
                            <p className="text-xs text-[var(--ep-neutral)]">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase ${ROLE_COLORS[u.role]}`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-xs text-[var(--ep-neutral)]">{u.joined}</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-1.5 rounded-full bg-gray-100">
                            <div
                              className="h-1.5 rounded-full bg-[var(--ep-green-mid)]"
                              style={{ width: `${(u.score / u.scoreMax) * 100}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium text-gray-900">{u.score}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <span className={`flex items-center gap-1 text-xs font-medium ${u.status === "active" ? "text-[var(--ep-green-mid)]" : "text-[var(--ep-neutral)]"}`}>
                          <span className={`h-2 w-2 rounded-full ${u.status === "active" ? "bg-[var(--ep-green-mid)]" : "bg-gray-400"}`} />
                          {u.status === "active" ? "Active" : "Suspended"}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex gap-2">
                          <button className="text-xs text-[var(--ep-orange)] hover:underline">Edit</button>
                          {u.status === "active" ? (
                            <button className="text-xs text-red-500 hover:underline">Suspend</button>
                          ) : (
                            <button className="text-xs text-[var(--ep-green)] hover:underline">Restore</button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>

              {/* Pagination */}
              <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between">
                <p className="text-xs text-[var(--ep-neutral)]">Showing 1 – 10 of 1,482 users</p>
                <div className="flex items-center gap-1">
                  <button className="p-1.5 rounded hover:bg-gray-100 transition text-[var(--ep-neutral)]">
                    <ChevronLeft size={14} />
                  </button>
                  {[1, 2, 3].map((p) => (
                    <button
                      key={p}
                      className={`h-7 w-7 rounded text-xs font-medium transition ${p === 1 ? "bg-[var(--ep-orange)] text-white" : "text-[var(--ep-neutral)] hover:bg-gray-100"}`}
                    >
                      {p}
                    </button>
                  ))}
                  <span className="text-xs text-[var(--ep-neutral)] px-1">...</span>
                  <button className="h-7 px-2 rounded text-xs text-[var(--ep-neutral)] hover:bg-gray-100 transition">149</button>
                  <button className="p-1.5 rounded hover:bg-gray-100 transition text-[var(--ep-neutral)]">
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: "New Registrations", value: "+128", sub: "↑ 14%  Past 30 days", color: "text-[var(--ep-green)]" },
                { label: "Pending Verifications", value: "42", sub: "Requires attention", subColor: "text-[var(--ep-orange)]", color: "text-[var(--ep-orange)]" },
                { label: "Impact Generation", value: "8.2 Tons", sub: "Food waste diverted", color: "text-[var(--ep-green-mid)]" },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl bg-white border border-gray-100 p-4">
                  <p className="text-xs text-[var(--ep-neutral)] uppercase tracking-widest mb-1">{s.label}</p>
                  <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                  <p className={`text-xs mt-1 ${s.subColor ?? "text-[var(--ep-neutral)]"}`}>{s.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
