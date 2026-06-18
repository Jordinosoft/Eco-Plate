import NGONav, { NGOHeader } from "@/components/ngo-nav";
import { NGO_CLAIMS } from "@/lib/data";
import { CheckCircle2, Clock, Circle, MapPin } from "lucide-react";

type ClaimStatus = "pending" | "confirmed" | "collected";

function StatusBadge({ status }: { status: ClaimStatus }) {
  const config = {
    pending: { class: "badge-urgent", label: "Pending", icon: <Clock size={11} /> },
    confirmed: { class: "badge-impact", label: "Confirmed", icon: <CheckCircle2 size={11} /> },
    collected: { class: "inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-500", label: "Collected", icon: <Circle size={11} /> },
  };
  const { class: cls, label, icon } = config[status];
  return (
    <span className={cls}>
      {icon}
      {label}
    </span>
  );
}

export default function NGOClaimsPage() {
  const pending = NGO_CLAIMS.filter((c) => c.status === "pending");
  const confirmed = NGO_CLAIMS.filter((c) => c.status === "confirmed");
  const collected = NGO_CLAIMS.filter((c) => c.status === "collected");

  return (
    <div className="flex min-h-screen bg-[var(--ep-cream)]">
      <NGONav />

      <div className="flex-1 flex flex-col">
        <NGOHeader />

        <main className="p-6 flex flex-col gap-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900">My Claims</h1>
            <p className="text-sm text-[var(--ep-neutral)]">
              Track all your donation claims and collection status.
            </p>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Pending", value: pending.length, color: "text-[var(--ep-orange)]" },
              { label: "Confirmed", value: confirmed.length, color: "text-[var(--ep-green)]" },
              { label: "Collected", value: collected.length, color: "text-[var(--ep-neutral)]" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl bg-white border border-gray-100 p-4">
                <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                <p className="text-xs text-[var(--ep-neutral)]">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Claims list */}
          <div className="rounded-2xl bg-white border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">All Claims</h2>
              <span className="text-xs text-[var(--ep-neutral)]">{NGO_CLAIMS.length} total</span>
            </div>
            <div className="divide-y divide-gray-50">
              {NGO_CLAIMS.map((claim) => (
                <div key={claim.id} className="px-5 py-4 flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-[var(--ep-green-light)] flex items-center justify-center text-lg shrink-0">
                    🍱
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900">
                      {claim.listingTitle}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5 text-xs text-[var(--ep-neutral)]">
                      <MapPin size={10} />
                      {claim.merchant}
                      <span>·</span>
                      <Clock size={10} />
                      {new Date(claim.claimedAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                    <p className="text-xs text-[var(--ep-green-mid)] mt-0.5">
                      {claim.quantity} units · ~{claim.servings} servings
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <StatusBadge status={claim.status} />
                    {claim.status === "confirmed" && (
                      <button className="btn-primary text-xs py-1 px-3">
                        Mark Collected
                      </button>
                    )}
                    {claim.status === "pending" && (
                      <button className="text-xs text-red-500 hover:underline">
                        Cancel
                      </button>
                    )}
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
