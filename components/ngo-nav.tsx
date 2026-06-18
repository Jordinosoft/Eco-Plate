"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingBag, ClipboardList, Truck, Leaf, Settings, Plus, Bell } from "lucide-react";
import MobileBottomNav from "./mobile-bottom-nav";

const NAV = [
  { label: "Dashboard",   href: "/ngo",             icon: LayoutDashboard },
  { label: "Marketplace", href: "/ngo/marketplace",  icon: ShoppingBag },
  { label: "My Claims",   href: "/ngo/claims",       icon: ClipboardList },
  { label: "Logistics",   href: "/ngo/logistics",    icon: Truck },
  { label: "Impact Hub",  href: "/ngo/impact",       icon: Leaf },
];

const MOBILE_NAV = [
  { label: "Home",        href: "/ngo",             icon: LayoutDashboard, exact: true },
  { label: "Donations",   href: "/ngo/marketplace",  icon: ShoppingBag },
  { label: "Claims",      href: "/ngo/claims",       icon: ClipboardList },
  { label: "Logistics",   href: "/ngo/logistics",    icon: Truck },
  { label: "Impact",      href: "/ngo/impact",       icon: Leaf },
];

export default function NGONav() {
  const pathname = usePathname();

  return (
    <>
      <aside className="hidden lg:flex flex-col w-52 shrink-0 border-r border-gray-100 bg-white min-h-screen sticky top-0">
        <div className="px-4 py-4 border-b border-gray-100">
          <div className="flex items-center gap-1.5">
            <div className="h-6 w-6 rounded-md bg-[var(--ep-green)] flex items-center justify-center">
              <Leaf size={12} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-[var(--ep-green)] text-sm leading-none">EcoPlate</p>
              <p className="text-xs text-[var(--ep-neutral)]">NGO Portal</p>
            </div>
          </div>
          <div className="mt-2">
            <span className="badge-impact text-xs">Verified NGO Partner</span>
          </div>
        </div>

        <nav className="flex flex-col gap-0.5 px-3 py-3 flex-1">
          {NAV.map(({ label, href, icon: Icon }) => {
            const active = href === "/ngo" ? pathname === "/ngo" : pathname.startsWith(href);
            return (
              <Link key={href} href={href} className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition ${active ? "bg-[var(--ep-green)] text-white" : "text-[var(--ep-neutral)] hover:bg-gray-50 hover:text-gray-900"}`}>
                <Icon size={15} />{label}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 pb-3 border-t border-gray-100 pt-3">
          <Link href="#" className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-[var(--ep-neutral)] hover:bg-gray-50 transition">
            <Settings size={15} /> Settings
          </Link>
        </div>
        <div className="px-3 pb-4">
          <Link href="/ngo/marketplace" className="btn-cta w-full justify-center text-xs py-2 gap-1.5">
            <Plus size={14} /> New Pickup Request
          </Link>
        </div>
      </aside>

      <MobileBottomNav items={MOBILE_NAV} />
    </>
  );
}

export function NGOHeader() {
  return (
    <header className="flex items-center justify-between px-4 sm:px-6 py-3 bg-white border-b border-gray-100 sticky top-0 z-10">
      <div className="lg:hidden flex items-center gap-1.5 mr-3">
        <div className="h-6 w-6 rounded-md bg-[var(--ep-green)] flex items-center justify-center">
          <Leaf size={12} className="text-white" />
        </div>
        <span className="font-bold text-[var(--ep-green)] text-sm">EcoPlate</span>
      </div>
      <div className="relative flex-1 max-w-xs">
        <input type="text" placeholder="Search food batches..." className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[var(--ep-green-mid)] transition" />
      </div>
      <div className="flex items-center gap-3 ml-4">
        <button className="p-1.5 rounded-full hover:bg-gray-100 transition text-[var(--ep-neutral)]"><Bell size={17} /></button>
        <div className="h-8 w-8 rounded-full bg-[var(--ep-green-light)] flex items-center justify-center text-xs font-bold text-[var(--ep-green)]">NG</div>
      </div>
    </header>
  );
}
