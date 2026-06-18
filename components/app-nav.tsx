"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, User, ShoppingBag, Leaf, BarChart2, Users } from "lucide-react";
import MobileBottomNav from "./mobile-bottom-nav";

const NAV_LINKS = [
  { label: "Marketplace", href: "/marketplace" },
  { label: "Impact",      href: "/impact" },
  { label: "Community",   href: "/community" },
  { label: "Analytics",   href: "/analytics" },
];

const MOBILE_NAV = [
  { label: "Market",    href: "/marketplace", icon: ShoppingBag },
  { label: "Impact",    href: "/impact",      icon: Leaf },
  { label: "Community", href: "/community",   icon: Users },
  { label: "Analytics", href: "/analytics",   icon: BarChart2 },
];

export default function AppNav({ balance = 24.5 }: { balance?: number }) {
  const pathname = usePathname();

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-black/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/marketplace" className="flex items-center gap-1.5">
                <div className="h-6 w-6 rounded-md bg-[var(--ep-green)] flex items-center justify-center">
                  <Leaf size={12} className="text-white" />
                </div>
                <span className="font-bold text-[var(--ep-green)]">EcoPlate</span>
              </Link>
              <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                {NAV_LINKS.map((l) => (
                  <Link key={l.href} href={l.href} className={`transition-colors ${pathname.startsWith(l.href) ? "text-[var(--ep-green)] font-semibold" : "text-[var(--ep-neutral)] hover:text-gray-900"}`}>
                    {l.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden sm:block text-sm font-semibold text-gray-700">{balance.toFixed(0)} XAF</span>
              <button className="p-1.5 rounded-full hover:bg-gray-100 transition text-[var(--ep-neutral)]"><Bell size={18} /></button>
              <Link href="/impact" className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--ep-green)] text-white"><User size={16} /></Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile bottom nav for customer */}
      <MobileBottomNav items={MOBILE_NAV} />
    </>
  );
}
