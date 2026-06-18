"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  Activity,
  BarChart2,
  Settings,
  LogOut,
  Plus,
  Bell,
  HelpCircle,
} from "lucide-react";

const NAV = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "User Management", href: "/admin/users", icon: Users },
  { label: "Merchant Verification", href: "/admin/verification", icon: ShieldCheck },
  { label: "Activity Monitor", href: "/admin/activity", icon: Activity },
  { label: "Reporting", href: "/admin/reporting", icon: BarChart2 },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-56 shrink-0 border-r border-gray-100 bg-white min-h-screen sticky top-0">
      <div className="px-5 py-4 border-b border-gray-100">
        <p className="font-bold text-[var(--ep-orange)] text-base leading-none">FoodLoop</p>
        <p className="font-bold text-[var(--ep-green)] text-base">Admin</p>
        <p className="text-xs text-[var(--ep-neutral)]">System Control</p>
      </div>

      <nav className="flex flex-col gap-0.5 px-3 py-3 flex-1">
        {NAV.map(({ label, href, icon: Icon }) => {
          const active = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition ${
                active
                  ? "bg-[var(--ep-green)] text-white"
                  : "text-[var(--ep-neutral)] hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon size={15} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 pb-3 border-t border-gray-100 pt-3 flex flex-col gap-0.5">
        <Link href="#" className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-[var(--ep-neutral)] hover:bg-gray-50 transition">
          <Settings size={15} /> Settings
        </Link>
        <Link href="/login" className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-[var(--ep-neutral)] hover:bg-gray-50 transition">
          <LogOut size={15} /> Log Out
        </Link>
      </div>

      <div className="px-3 pb-4">
        <button className="btn-cta w-full justify-center text-xs py-2 gap-1.5">
          <Plus size={14} /> Add New Partner
        </button>
      </div>
    </aside>
  );
}

export function AdminHeader() {
  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-100 sticky top-0 z-10">
      <div className="relative flex-1 max-w-sm">
        <input
          type="text"
          placeholder="Search system logs, merchants, or users..."
          className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[var(--ep-green-mid)] transition"
        />
      </div>
      <div className="flex items-center gap-3 ml-4">
        <button className="p-1.5 rounded-full hover:bg-gray-100 transition text-[var(--ep-neutral)]">
          <Bell size={17} />
        </button>
        <button className="p-1.5 rounded-full hover:bg-gray-100 transition text-[var(--ep-neutral)]">
          <HelpCircle size={17} />
        </button>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-[var(--ep-orange-light)] flex items-center justify-center text-xs font-bold text-[var(--ep-orange)]">
            AR
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-semibold text-gray-900">Alex Rivera</p>
            <p className="text-xs text-[var(--ep-neutral)]">Lead Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
