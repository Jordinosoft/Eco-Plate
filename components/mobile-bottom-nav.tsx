"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";

export interface BottomNavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  exact?: boolean;
}

export default function MobileBottomNav({ items, accentColor = "var(--ep-green)" }: { items: BottomNavItem[]; accentColor?: string }) {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-50 lg:hidden bg-white border-t border-gray-100 safe-area-pb"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-stretch h-16">
        {items.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className="flex-1 flex flex-col items-center justify-center gap-0.5 text-xs font-medium transition"
              style={{ color: active ? accentColor : "var(--ep-neutral)" }}
            >
              <Icon size={20} strokeWidth={active ? 2.2 : 1.8} />
              <span className="text-[10px] leading-none">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
