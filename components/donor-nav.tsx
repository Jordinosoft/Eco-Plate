"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, List, Leaf, Bell, Plus, HelpCircle } from "lucide-react";
import MobileBottomNav from "./mobile-bottom-nav";

const NAV = [
  { label: "Dashboard", href: "/donor",          icon: LayoutDashboard },
  { label: "My Listings", href: "/donor/listings", icon: List },
  { label: "Impact",    href: "/donor/impact",    icon: Leaf },
];

const MOBILE_NAV = [
  { label: "Dashboard", href: "/donor",           icon: LayoutDashboard, exact: true },
  { label: "Listings",  href: "/donor/listings",  icon: List },
  { label: "Impact",    href: "/donor/impact",    icon: Leaf },
];

export default function DonorNav() {
  const pathname = usePathname();

  return (
    <>
      <aside className="hidden lg:flex flex-col w-56 shrink-0 border-r border-gray-100 bg-white min-h-screen sticky top-0">
        <div className="px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-1.5">
            <div className="h-6 w-6 rounded-md bg-[var(--ep-green)] flex items-center justify-center">
              <Leaf size={12} className="text-white" />
            </div>
            <span className="font-bold text-[var(--ep-green)] text-sm">EcoPlate Donor</span>
          </div>
          <p className="text-xs text-[var(--ep-neutral)] mt-0.5">Share your harvest</p>
        </div>

        <div className="px-4 py-3 border-b border-gray-50">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-[var(--ep-green-light)] flex items-center justify-center text-xs font-bold text-[var(--ep-green)]">FG</div>
            <div>
              <p className="text-xs font-semibold text-gray-900">Felix Gwanmesia</p>
              <p className="text-xs text-[var(--ep-neutral)]">Home Farmer</p>
            </div>
          </div>
        </div>

        <nav className="flex flex-col gap-0.5 px-3 py-3 flex-1">
          {NAV.map(({ label, href, icon: Icon }) => {
            const active = href === "/donor" ? pathname === "/donor" : pathname.startsWith(href);
            return (
              <Link key={href} href={href} className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition ${active ? "bg-[var(--ep-green)] text-white" : "text-[var(--ep-neutral)] hover:bg-gray-50 hover:text-gray-900"}`}>
                <Icon size={15} />{label}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 pb-3 border-t border-gray-100 pt-3">
          <Link href="#" className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-[var(--ep-neutral)] hover:bg-gray-50 transition"><HelpCircle size={15} /> Help</Link>
        </div>
        <div className="px-3 pb-4">
          <Link href="/donor/listings" className="btn-cta w-full justify-center text-xs py-2 gap-1.5">
            <Plus size={14} /> Share Food
          </Link>
        </div>
      </aside>

      <MobileBottomNav items={MOBILE_NAV} />
    </>
  );
}

export function DonorHeader() {
  return (
    <header className="flex items-center justify-between px-4 sm:px-6 py-3 bg-white border-b border-gray-100 sticky top-0 z-10">
      <div className="lg:hidden flex items-center gap-1.5 mr-3">
        <div className="h-6 w-6 rounded-md bg-[var(--ep-green)] flex items-center justify-center">
          <Leaf size={12} className="text-white" />
        </div>
        <span className="font-bold text-[var(--ep-green)] text-sm">EcoPlate</span>
      </div>
      <p className="text-sm font-semibold text-gray-700 flex-1">Donor Dashboard</p>
      <button className="p-1.5 rounded-full hover:bg-gray-100 transition text-[var(--ep-neutral)]"><Bell size={17} /></button>
    </header>
  );
}
