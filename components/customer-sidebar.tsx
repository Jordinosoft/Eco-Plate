"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, BarChart2, Leaf, Settings, HelpCircle, ShoppingBag } from "lucide-react";

const NAV = [
  { href: "/marketplace", label: "Home",      icon: Home },
  { href: "/community",   label: "Community", icon: Users },
  { href: "/analytics",   label: "Analytics", icon: BarChart2 },
  { href: "/impact",      label: "Impact",    icon: Leaf },
];

export default function CustomerSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex w-64 shrink-0 min-h-screen bg-white border-r border-gray-100 flex-col">
      <div className="px-5 py-5 border-b border-gray-100">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-[var(--ep-green)] flex items-center justify-center">
            <Leaf size={16} className="text-white" />
          </div>
          <span className="font-bold text-gray-900">EcoPlate</span>
        </Link>
      </div>

      <nav className="flex flex-col gap-1 p-3 flex-1">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link key={href} href={href} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${active ? "bg-[var(--ep-green)] text-white" : "text-[var(--ep-neutral)] hover:bg-gray-50 hover:text-gray-900"}`}>
              <Icon size={16} />{label}
            </Link>
          );
        })}

        <Link href="/marketplace" className="mt-4 btn-cta justify-center text-sm py-2.5">
          <ShoppingBag size={14} /> Rescue Food Now
        </Link>
      </nav>

      <div className="p-3 border-t border-gray-100 flex flex-col gap-1">
        <Link href="#" className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-[var(--ep-neutral)] hover:bg-gray-50 transition"><Settings size={15} /> Settings</Link>
        <Link href="#" className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-[var(--ep-neutral)] hover:bg-gray-50 transition"><HelpCircle size={15} /> Help</Link>
      </div>
    </aside>
  );
}
