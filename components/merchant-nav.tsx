"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, ShoppingBag, Package, BarChart2,
  Leaf, Settings, HelpCircle, LogOut, Bell, Plus,
} from "lucide-react";
import MobileBottomNav from "./mobile-bottom-nav";

const NAV = [
  { label: "Dashboard", href: "/merchant", icon: LayoutDashboard },
  { label: "Inventory",  href: "/merchant/inventory", icon: Package },
  { label: "Listings",   href: "/merchant/listings",  icon: ShoppingBag },
  { label: "Analytics",  href: "/merchant/analytics", icon: BarChart2 },
  { label: "Impact",     href: "/merchant/impact",    icon: Leaf },
  { label: "Settings",   href: "/merchant/settings",  icon: Settings },
];

const MOBILE_NAV = [
  { label: "Dashboard", href: "/merchant",           icon: LayoutDashboard, exact: true },
  { label: "Listings",  href: "/merchant/listings",  icon: ShoppingBag },
  { label: "Analytics", href: "/merchant/analytics", icon: BarChart2 },
  { label: "Impact",    href: "/merchant/impact",    icon: Leaf },
  { label: "Settings",  href: "/merchant/settings",  icon: Settings },
];

export default function MerchantNav() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-56 shrink-0 border-r border-gray-100 bg-white min-h-screen sticky top-0">
        <div className="px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-1.5">
            <div className="h-6 w-6 rounded-md bg-[var(--ep-green)] flex items-center justify-center">
              <Leaf size={12} className="text-white" />
            </div>
            <span className="font-bold text-[var(--ep-green)] text-sm">EcoPlate Merchant</span>
          </div>
        </div>

        <div className="px-4 py-3 border-b border-gray-50">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-[var(--ep-orange-light)] flex items-center justify-center text-xs font-bold text-[var(--ep-orange)]">AB</div>
            <div>
              <p className="text-xs font-semibold text-gray-900">Artisan Bakery</p>
              <p className="text-xs text-[var(--ep-neutral)]">ecoplate.cm</p>
            </div>
          </div>
        </div>

        <nav className="flex flex-col gap-0.5 px-3 py-3 flex-1">
          {NAV.map(({ label, href, icon: Icon }) => {
            const active = href === "/merchant" ? pathname === "/merchant" : pathname.startsWith(href);
            return (
              <Link key={href} href={href} className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition ${active ? "bg-[var(--ep-green)] text-white" : "text-[var(--ep-neutral)] hover:bg-gray-50 hover:text-gray-900"}`}>
                <Icon size={15} />{label}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 py-3 border-t border-gray-100 flex flex-col gap-0.5">
          <Link href="#" className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-[var(--ep-neutral)] hover:bg-gray-50 transition"><HelpCircle size={15} /> Help Center</Link>
          <Link href="/login" className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-[var(--ep-neutral)] hover:bg-gray-50 transition"><LogOut size={15} /> Logout</Link>
        </div>
        <div className="px-3 pb-4">
          <Link href="/merchant/listings" className="btn-cta w-full justify-center text-xs py-2 gap-1.5">
            <Plus size={14} /> Create Listing
          </Link>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <MobileBottomNav items={MOBILE_NAV} />
    </>
  );
}

export function MerchantHeader({ title }: { title: string }) {
  return (
    <header className="flex items-center justify-between px-4 sm:px-6 py-3 bg-white border-b border-gray-100 sticky top-0 z-10">
      <div className="lg:hidden flex items-center gap-1.5 mr-3">
        <div className="h-6 w-6 rounded-md bg-[var(--ep-green)] flex items-center justify-center">
          <Leaf size={12} className="text-white" />
        </div>
        <span className="font-bold text-[var(--ep-green)] text-sm">EcoPlate</span>
      </div>
      <div className="relative flex-1 max-w-xs">
        <input type="text" placeholder="Search..." className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[var(--ep-green-mid)] transition" />
      </div>
      <div className="flex items-center gap-3 ml-4">
        <button className="p-1.5 rounded-full hover:bg-gray-100 transition text-[var(--ep-neutral)]"><Bell size={17} /></button>
        <div className="h-8 w-8 rounded-full bg-[var(--ep-orange-light)] flex items-center justify-center text-xs font-bold text-[var(--ep-orange)]">AB</div>
      </div>
    </header>
  );
}
