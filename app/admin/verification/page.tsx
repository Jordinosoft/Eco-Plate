import AdminNav, { AdminHeader } from "@/components/admin-nav";
import { ShieldCheck, Clock, CheckCircle2, XCircle, TrendingUp } from "lucide-react";

const APPLICATIONS = [
  {
    id: "APP-001",
    name: "The Green Pantry",
    sub: "Certified Organic · Douala, Renew",
    type: "Certified Organic",
    location: "Douala",
    dateApplied: "Oct 21, 2023",
    status: "pending",
  },
  {
    id: "APP-002",
    name: "City Cycle Composting",
    sub: "Industrial Waste Handling · Seattle, WA",
    type: "Industrial Waste Handling",
    location: "Douala, WA",
    dateApplied: "Oct 21, 2023",
    status: "rejected",
  },
  {
    id: "APP-003",
    name: "SkyFarms Urban",
    sub: "Aquaponics · Urban Produce",
    type: "Aquaponics",
    location: "Buea",
    dateApplied: "Oct 19, 2023",
    status: "approved",
  },
];

function StatusBadge({ status }: { status: string }) {
  if (status === "pending")
    return <span className="badge-urgent text-xs">Pending Review</span>;
  if (status === "approved")
    return <span className="badge-impact text-xs">Approved</span>;
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-600">
      Rejected
    </span>
  );
}

export default function MerchantVerificationPage() {
  return (
    <div className="flex min-h-screen bg-[var(--ep-cream)]">
      <AdminNav />

      <div className="flex-1 flex flex-col">
        <AdminHeader />

        <main className="p-6 flex flex-col gap-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Merchant Approval Center
              </h1>
              <p className="text-sm text-[var(--ep-neutral)]">
                Review and verify business credentials for FoodLoop sustainability
                partners.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-white border border-gray-100 px-4 py-2 text-center">
                <p className="text-lg font-bold text-[var(--ep-orange)]">24</p>
                <p className="text-xs text-[var(--ep-neutral)]">Pending</p>
              </div>
              <div className="rounded-xl bg-white border border-gray-100 px-4 py-2 text-center">
                <p className="text-lg font-bold text-[var(--ep-green)]">08</p>
                <p className="text-xs text-[var(--ep-neutral)]">Submitted Today</p>
              </div>
            </div>
          </div>

          {/* Filter bar */}
          <div className="flex items-center gap-3 flex-wrap">
            <button className="flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
              ☰ Filter Applications
            </button>
            {["Lender Organic ✕", "Status Pending ✕"].map((f) => (
              <span key={f} className="rounded-full bg-[var(--ep-green-light)] border border-[var(--ep-green-mid)]/30 px-3 py-1 text-xs font-medium text-[var(--ep-green)]">
                {f}
              </span>
            ))}
            <span className="ml-auto text-xs text-[var(--ep-neutral)]">
              Showing 1–14 of 34 results →
            </span>
          </div>

          {/* Application cards */}
          <div className="flex flex-col gap-4">
            {APPLICATIONS.map((app) => (
              <div
                key={app.id}
                className="rounded-2xl bg-white border border-gray-100 p-5 flex items-center gap-4"
              >
                {/* Icon */}
                <div className="h-12 w-12 rounded-2xl bg-[var(--ep-green-light)] flex items-center justify-center shrink-0">
                  <ShieldCheck size={22} className="text-[var(--ep-green)]" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <p className="font-semibold text-gray-900">{app.name}</p>
                    <StatusBadge status={app.status} />
                    {app.status === "approved" && (
                      <span className="badge-impact text-xs">Approved</span>
                    )}
                  </div>
                  <p className="text-sm text-[var(--ep-neutral)]">{app.sub}</p>
                  <div className="flex items-center gap-4 mt-1 text-xs text-[var(--ep-neutral)]">
                    <span className="flex items-center gap-1">
                      <Clock size={11} /> DATE APPLIED: {app.dateApplied}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  {app.status === "pending" && (
                    <>
                      <button className="btn-outline text-xs py-1.5 px-3">Review</button>
                      <button className="btn-cta text-xs py-1.5 px-3">Quick Approve</button>
                    </>
                  )}
                  {app.status === "rejected" && (
                    <button className="btn-outline text-xs py-1.5 px-3 text-red-500 border-red-200">
                      Appeal Review
                    </button>
                  )}
                  {app.status === "approved" && (
                    <button className="text-xs text-[var(--ep-neutral)] border border-gray-200 rounded-xl px-3 py-1.5 hover:bg-gray-50 transition">
                      View Log
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom row */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white border border-gray-100 p-5">
              <h2 className="font-semibold text-gray-900 mb-4">Onboarding Funnel</h2>
              {[
                { label: "Documents Uploaded", pct: 88 },
                { label: "Compliance Passes", pct: 72 },
              ].map((f) => (
                <div key={f.label} className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-[var(--ep-neutral)]">{f.label}</span>
                    <span className="font-semibold text-gray-900">{f.pct}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100">
                    <div
                      className="h-2 rounded-full bg-[var(--ep-green-mid)]"
                      style={{ width: `${f.pct}%` }}
                    />
                  </div>
                </div>
              ))}
              <p className="text-xs text-[var(--ep-neutral)] mt-2">
                Average approval time: 1–2 days
              </p>
            </div>

            <div className="rounded-2xl bg-[var(--ep-green)] text-white p-5 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <TrendingUp size={18} />
                <h2 className="font-semibold">Regional Expansion Drive</h2>
              </div>
              <p className="text-sm text-white/85">
                Targeting 50 new waste-recovery partners in the Pacific Northwest in Q4. Monitor application surge trends in real time.
              </p>
              <button className="btn-cta bg-white text-[var(--ep-green)] hover:bg-gray-50 text-sm self-start">
                View Growth Data
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
