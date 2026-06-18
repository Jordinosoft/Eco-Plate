import CustomerSidebar from "@/components/customer-sidebar";
import { Users, Zap, Leaf, Globe } from "lucide-react";

const LEADERBOARD = [
  { rank: 1, name: "Amara Diallo", meals: 412, co2: "1.2t", badge: "🏆", streak: "42 days" },
  { rank: 2, name: "Chisom Obi", meals: 380, co2: "1.1t", badge: "🥈", streak: "38 days" },
  { rank: 3, name: "Jean-Paul Mbarga", meals: 341, co2: "982kg", badge: "🥉", streak: "31 days" },
  { rank: 4, name: "Fatima Bah", meals: 298, co2: "860kg", badge: "", streak: "27 days" },
  { rank: 5, name: "Marcus Tabi", meals: 272, co2: "784kg", badge: "", streak: "22 days" },
];

const LIVE_FEED = [
  { avatar: "AM", name: "Amara M.", action: "rescued 2.4kg of Fresh Bread from City Bakery", time: "2 min ago" },
  { avatar: "CK", name: "Chisom K.", action: "completed the Earth Guardian milestone! 🌍", time: "8 min ago" },
  { avatar: "JP", name: "Jean-Paul", action: "rescued 5kg of Organic Tomatoes from Green Farm", time: "15 min ago" },
  { avatar: "FB", name: "Fatima B.", action: "shared a rescue recipe to the community hub", time: "23 min ago" },
];

const ACHIEVEMENTS = [
  { icon: "🌱", title: "First Rescue", desc: "Rescued your first meal", awardedTo: "You" },
  { icon: "🔥", title: "7-Day Streak", desc: "Rescued meals 7 days in a row", awardedTo: "Chisom K." },
  { icon: "🌍", title: "Earth Guardian", desc: "Rescued 100+ meals", awardedTo: "Amara M." },
];

const PARTNERS = [
  { name: "City Hall Douala", type: "Government Partner" },
  { name: "Green Cameroon", type: "NGO" },
  { name: "Orange Foundation", type: "Corporate Partner" },
];

export default function CommunityPage() {
  return (
    <div className="flex min-h-screen bg-[var(--ep-cream)]">
      <CustomerSidebar />

      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100 bg-white">
          <h1 className="text-xl font-bold text-gray-900">Community Hub</h1>
          <p className="text-sm text-[var(--ep-neutral)]">Our Collective Ripple — together we're changing the food system</p>
        </div>

        <main className="p-8 flex flex-col gap-8">
          {/* Community stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Active Rescuers", value: "50,000", icon: Users, color: "text-[var(--ep-green)]", bg: "bg-[var(--ep-green-light)]" },
              { label: "Meals Rescued", value: "1.2M", icon: Zap, color: "text-[var(--ep-orange)]", bg: "bg-[var(--ep-orange-light)]" },
              { label: "CO₂ Prevented", value: "3,400t", icon: Leaf, color: "text-[var(--ep-green-mid)]", bg: "bg-[var(--ep-green-light)]" },
              { label: "Cities Active", value: "12", icon: Globe, color: "text-blue-500", bg: "bg-blue-50" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl bg-white border border-gray-100 p-5 flex flex-col gap-3">
                <div className={`h-10 w-10 rounded-xl ${s.bg} flex items-center justify-center`}>
                  <s.icon size={18} className={s.color} />
                </div>
                <div>
                  <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-[var(--ep-neutral)]">{s.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Top Rescuers */}
            <div className="rounded-2xl bg-white border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-900">Top Rescuers</h2>
                <span className="text-xs text-[var(--ep-neutral)]">This month</span>
              </div>
              <div className="flex flex-col gap-2">
                {LEADERBOARD.map((r) => (
                  <div key={r.rank} className={`flex items-center gap-3 rounded-xl p-3 ${r.rank === 1 ? "bg-[var(--ep-green-light)]" : "hover:bg-gray-50"} transition`}>
                    <span className="text-sm font-bold text-[var(--ep-neutral)] w-5 shrink-0">
                      {r.badge || `#${r.rank}`}
                    </span>
                    <div className="h-8 w-8 rounded-full bg-[var(--ep-green)] flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {r.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{r.name}</p>
                      <p className="text-xs text-[var(--ep-neutral)]">{r.streak} streak</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-semibold text-[var(--ep-green)]">{r.meals} meals</p>
                      <p className="text-xs text-[var(--ep-neutral)]">{r.co2} CO₂</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Activity Feed */}
            <div className="rounded-2xl bg-white border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-900">Live Activity Feed</h2>
                <span className="badge-urgent text-xs">● Live</span>
              </div>
              <div className="flex flex-col gap-4">
                {LIVE_FEED.map((f, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm">
                    <div className="h-8 w-8 rounded-full bg-[var(--ep-orange-light)] flex items-center justify-center text-[var(--ep-orange)] text-xs font-bold shrink-0">
                      {f.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-700 leading-snug">
                        <span className="font-semibold text-gray-900">{f.name}</span>{" "}
                        {f.action}
                      </p>
                      <p className="text-xs text-[var(--ep-neutral)] mt-0.5">{f.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Achievements */}
          <div className="rounded-2xl bg-white border border-gray-100 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Recent Achievements</h2>
            <div className="grid grid-cols-3 gap-4">
              {ACHIEVEMENTS.map((a) => (
                <div key={a.title} className="rounded-xl border border-gray-100 p-4 flex flex-col items-center text-center gap-2">
                  <span className="text-3xl">{a.icon}</span>
                  <p className="font-semibold text-sm text-gray-900">{a.title}</p>
                  <p className="text-xs text-[var(--ep-neutral)]">{a.desc}</p>
                  <span className="text-xs rounded-full bg-[var(--ep-green-light)] px-2.5 py-0.5 text-[var(--ep-green)] font-medium">
                    {a.awardedTo}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Impact Partners */}
          <div className="rounded-2xl bg-white border border-gray-100 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Impact Partners</h2>
            <div className="flex flex-wrap gap-3">
              {PARTNERS.map((p) => (
                <div key={p.name} className="rounded-xl border border-gray-100 px-5 py-3 flex flex-col gap-0.5">
                  <p className="text-sm font-semibold text-gray-900">{p.name}</p>
                  <p className="text-xs text-[var(--ep-neutral)]">{p.type}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
