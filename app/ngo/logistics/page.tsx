import NGONav, { NGOHeader } from "@/components/ngo-nav";
import { MapPin, CheckCircle2, Clock, Truck, Phone, MessageSquare } from "lucide-react";

const ROUTES = [
  {
    id: "NHC",
    name: "North Hub Circuit",
    status: "active",
    steps: "All Steps",
    driver: "Marcus Chen",
    driverSub: "4.9 ★ · 3 yrs",
    coordinator: "Bakery Central Network",
    coordinatorSub: "Sponsored by City Hall",
  },
  {
    id: "DE",
    name: "Downtown Express",
    status: "paused",
    steps: "Pending",
    driver: "Sarah Jenkins",
    driverSub: "4.7 ★ · 5 Days",
    coordinator: null,
    coordinatorSub: null,
  },
];

const REAL_TIME = [
  { name: "Community Kitchen A", time: "10:30 AM", sub: "Scheduled Pickup" },
  { name: "Hope Shelter", time: "11:45 AM", sub: "Pickup: Ready to Go" },
];

export default function NGOLogisticsPage() {
  return (
    <div className="flex min-h-screen bg-[var(--ep-cream)]">
      <NGONav />

      <div className="flex-1 flex flex-col">
        <NGOHeader />

        <main className="p-0 flex flex-col">
          {/* Top status bar */}
          <div className="flex items-center gap-4 px-6 py-2 bg-white border-b border-gray-100 text-xs">
            <div className="flex items-center gap-1.5 text-[var(--ep-green-mid)]">
              <span className="h-2 w-2 rounded-full bg-[var(--ep-green-mid)]" />
              System Optimised
            </div>
            <div className="flex items-center gap-1.5 text-[var(--ep-neutral)]">
              Fleet Management · Live Logistics Operations
            </div>
          </div>

          <div className="flex flex-1">
            {/* Left panel */}
            <div className="w-80 shrink-0 border-r border-gray-100 bg-white flex flex-col overflow-y-auto">
              <div className="px-4 py-3 border-b border-gray-100">
                <h1 className="font-bold text-gray-900">Live Routes</h1>
                <div className="flex gap-3 mt-2 text-xs">
                  <span className="badge-impact">Active 26</span>
                  <span className="badge-urgent">Queued 12</span>
                </div>
              </div>

              <div className="flex flex-col gap-0 divide-y divide-gray-50">
                {ROUTES.map((route) => (
                  <div key={route.id} className="p-4 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-sm text-gray-900">{route.name}</p>
                        <p className="text-xs text-[var(--ep-neutral)] mt-0.5">{route.steps}</p>
                      </div>
                      <span className={`text-xs rounded-full px-2 py-0.5 font-medium ${
                        route.status === "active"
                          ? "bg-[var(--ep-green-light)] text-[var(--ep-green)]"
                          : "bg-[var(--ep-orange-light)] text-[var(--ep-orange)]"
                      }`}>
                        {route.status === "active" ? "↑ Target" : "Pending"}
                      </span>
                    </div>

                    {/* Driver */}
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-[var(--ep-green-light)] flex items-center justify-center text-xs font-bold text-[var(--ep-green)] shrink-0">
                        {route.driver.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-900">{route.driver}</p>
                        <p className="text-xs text-[var(--ep-neutral)]">{route.driverSub}</p>
                      </div>
                      <div className="flex gap-1">
                        <button className="p-1 rounded-lg border border-gray-200 hover:bg-gray-50 transition">
                          <Phone size={11} className="text-[var(--ep-neutral)]" />
                        </button>
                        <button className="p-1 rounded-lg border border-gray-200 hover:bg-gray-50 transition">
                          <MessageSquare size={11} className="text-[var(--ep-neutral)]" />
                        </button>
                      </div>
                    </div>

                    {route.coordinator && (
                      <div className="rounded-xl bg-[var(--ep-green-light)] px-3 py-2 text-xs">
                        <p className="font-medium text-[var(--ep-green)]">{route.coordinator}</p>
                        <p className="text-[var(--ep-neutral)]">{route.coordinatorSub}</p>
                      </div>
                    )}

                    {!route.coordinator && (
                      <button className="btn-cta text-xs py-1.5 w-full justify-center gap-1">
                        <Truck size={12} /> Assign Logistics Partner
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Real-time tracker */}
              <div className="p-4 border-t border-gray-100 flex flex-col gap-2">
                <p className="text-xs font-semibold text-[var(--ep-neutral)] uppercase tracking-widest">
                  Real-Time Tracker
                </p>
                {REAL_TIME.map((r) => (
                  <div key={r.name} className="flex items-center justify-between text-xs">
                    <div>
                      <p className="font-medium text-gray-900">{r.name}</p>
                      <p className="text-[var(--ep-neutral)]">{r.sub}</p>
                    </div>
                    <span className="text-[var(--ep-green-mid)] font-semibold">{r.time}</span>
                  </div>
                ))}
              </div>

              {/* Duty coordinator */}
              <div className="p-4 border-t border-gray-100">
                <p className="text-xs font-semibold text-[var(--ep-neutral)] uppercase tracking-widest mb-2">
                  On-Duty Coordinator
                </p>
                <div className="flex items-center gap-2">
                  <div className="h-9 w-9 rounded-full bg-[var(--ep-orange-light)] flex items-center justify-center text-xs font-bold text-[var(--ep-orange)] shrink-0">
                    DZ
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Delia Zurce</p>
                    <div className="flex gap-2 text-xs text-[var(--ep-neutral)]">
                      <span>1.2 hrs</span>
                      <span>23 calls</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map area */}
            <div className="flex-1 relative bg-gray-100 flex flex-col items-center justify-center gap-3 text-[var(--ep-neutral)]">
              <div className="absolute inset-4 rounded-2xl bg-gray-200/80 flex flex-col items-center justify-center gap-4">
                <MapPin size={32} className="text-[var(--ep-orange)]" />
                <p className="font-semibold text-gray-700">Live Fleet Map</p>
                <p className="text-sm text-gray-500 text-center max-w-xs">
                  Real-time GPS tracking of active routes across the city. Drivers
                  shown as moving markers.
                </p>

                {/* Merchant callout */}
                <div className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm max-w-xs w-full">
                  <p className="font-semibold text-sm text-gray-900">City Harvest Market</p>
                  <p className="text-xs text-[var(--ep-neutral)] mt-0.5">
                    Fresh Vegetables · Available for immediate dispatch
                  </p>
                  <div className="flex gap-2 mt-3">
                    <button className="flex-1 btn-cta text-xs py-1.5 justify-center">
                      Assign to Nearest Driver
                    </button>
                    <button className="flex-1 rounded-xl border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition">
                      View Inventory
                    </button>
                  </div>
                </div>
              </div>

              {/* Fleet analytics strip */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="rounded-2xl bg-white border border-gray-100 p-3 flex items-center justify-between gap-4 shadow-sm">
                  <p className="text-xs font-semibold text-gray-700">Fleet Analytics</p>
                  <div className="flex gap-4 text-center text-xs">
                    <div>
                      <p className="font-bold text-[var(--ep-green)] text-base">1.2t</p>
                      <p className="text-[var(--ep-neutral)]">Active Rescue</p>
                    </div>
                    <div>
                      <p className="font-bold text-[var(--ep-orange)] text-base">82</p>
                      <p className="text-[var(--ep-neutral)]">Pickups</p>
                    </div>
                    <div>
                      <p className="font-bold text-[var(--ep-green-mid)] text-base">52%</p>
                      <p className="text-[var(--ep-neutral)]">Efficiency</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
