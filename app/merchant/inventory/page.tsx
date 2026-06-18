"use client";

import { useState } from "react";
import MerchantNav, { MerchantHeader } from "@/components/merchant-nav";
import { Download, Plus, Zap, ChevronLeft, ChevronRight } from "lucide-react";

type Cat = "All Items" | "Bakery" | "Dairy" | "Produce";

const ITEMS = [
  { id: "BAK-001", name: "Artisan Sourdough", category: "Bakery", basePrice: 2750, stock: 42, stockMax: 60, image: "https://www.preciouscore.com/wp-content/uploads/2017/05/cameroonian-plantain-porridge-recipe-1-of-1-378x378.jpg" },
  { id: "PRO-042", name: "Organic Avocados", category: "Produce", basePrice: 600, stock: 8, stockMax: 50, image: "https://www.preciouscore.com/wp-content/uploads/2016/04/Folere-Drink-thumbnail-378x378.jpg" },
  { id: "DRY-088", name: "Full Cream Milk 1L", category: "Dairy", basePrice: 1600, stock: 15, stockMax: 30, image: "https://www.preciouscore.com/wp-content/uploads/2015/09/Cameroonian-Snails-Recipe-thumbnail-378x378.jpg" },
  { id: "BAK-102", name: "Choco Chip Batch", category: "Bakery", basePrice: 6000, stock: 60, stockMax: 60, image: "https://www.preciouscore.com/wp-content/uploads/2024/10/Fried-Pork-and-Plantains-thumbnail-378x378.jpg" },
];

function StockBar({ stock, max }: { stock: number; max: number }) {
  const pct = (stock / max) * 100;
  const color =
    pct > 60 ? "bg-[var(--ep-green-mid)]" : pct > 25 ? "bg-[var(--ep-orange)]" : "bg-red-400";
  return (
    <div className="flex items-center gap-2">
      <div className="w-20 h-1.5 rounded-full bg-gray-100">
        <div className={`h-1.5 rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-sm text-gray-700 font-medium">{stock} units</span>
    </div>
  );
}

export default function MerchantInventoryPage() {
  const [activeTab, setActiveTab] = useState<Cat>("All Items");
  const tabs: Cat[] = ["All Items", "Bakery", "Dairy", "Produce"];

  const filtered =
    activeTab === "All Items" ? ITEMS : ITEMS.filter((i) => i.category === activeTab);
  const lowStock = ITEMS.filter((i) => i.stock / i.stockMax < 0.25).length;

  return (
    <div className="flex min-h-screen bg-[var(--ep-cream)]">
      <MerchantNav />

      <div className="flex-1 flex flex-col">
        <MerchantHeader title="Inventory" />

        <main className="p-4 sm:p-6 flex flex-col gap-6 pb-24 lg:pb-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Inventory Management</h1>
              <p className="text-sm text-[var(--ep-neutral)]">
                Optimise your stock and minimise waste through efficient surplus management.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
                <Download size={14} /> Export CSV
              </button>
              <button className="btn-cta text-sm gap-1.5">
                <Plus size={14} /> New Item
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-2xl bg-white border border-gray-100 p-4">
              <p className="text-2xl font-bold text-gray-900">142</p>
              <p className="text-xs text-[var(--ep-neutral)]">Total SKU</p>
              <p className="text-xs text-[var(--ep-green-mid)] mt-0.5">+3 today</p>
            </div>
            <div className="rounded-2xl bg-white border border-gray-100 p-4">
              <p className="text-2xl font-bold text-[var(--ep-orange)]">{lowStock}</p>
              <p className="text-xs text-[var(--ep-neutral)]">Low Stock Alerts</p>
              <p className="text-xs text-[var(--ep-orange)] mt-0.5">Requires action</p>
            </div>
            <div className="rounded-2xl bg-white border border-gray-100 p-4">
              <p className="text-2xl font-bold text-[var(--ep-green)]">1,240</p>
              <p className="text-xs text-[var(--ep-neutral)]">Surplus Savings (XAF)</p>
              <p className="text-xs text-[var(--ep-green-mid)] mt-0.5">This month</p>
            </div>
            <div className="rounded-2xl bg-white border border-gray-100 p-4">
              <p className="text-2xl font-bold text-[var(--ep-green-mid)]">84 kg</p>
              <p className="text-xs text-[var(--ep-neutral)]">Food Waste Prevented</p>
              <div className="w-full h-1 bg-gray-100 rounded-full mt-1.5">
                <div className="h-1 bg-[var(--ep-green-mid)] rounded-full w-3/4" />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-2xl bg-white border border-gray-100 overflow-hidden">
            {/* Tabs + sort */}
            <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between gap-4 flex-wrap">
              <div className="flex gap-1">
                {tabs.map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveTab(t)}
                    className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                      activeTab === t
                        ? "bg-[var(--ep-green)] text-white"
                        : "text-[var(--ep-neutral)] hover:bg-gray-50"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 text-sm text-[var(--ep-neutral)]">
                Sort by:{" "}
                <span className="font-semibold text-gray-900">
                  Stock Level (Low to High) ▾
                </span>
              </div>
            </div>

            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-xs text-[var(--ep-neutral)] uppercase tracking-wide">
                  {["Item Details", "Category", "Base Price", "Current Stock", "Actions"].map((h) => (
                    <th key={h} className="px-5 py-3 text-left font-medium">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-10 w-10 rounded-lg object-cover shrink-0"
                        />
                        <div>
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-xs text-[var(--ep-neutral)]">
                            SKU: {item.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-600">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-5 py-3 font-medium text-gray-900">
                      {(item.basePrice / 100).toFixed(2).replace(".", ".")} XAF
                    </td>
                    <td className="px-5 py-3">
                      <StockBar stock={item.stock} max={item.stockMax} />
                    </td>
                    <td className="px-5 py-3">
                      <button className="flex items-center gap-1.5 btn-cta text-xs py-1.5 px-3">
                        <Zap size={12} /> Quick List
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between">
              <p className="text-xs text-[var(--ep-neutral)]">
                Showing 1 to {filtered.length} of 142 items
              </p>
              <div className="flex items-center gap-1">
                <button className="p-1.5 rounded hover:bg-gray-100 transition text-[var(--ep-neutral)]">
                  <ChevronLeft size={14} />
                </button>
                {[1, 2, 3].map((p) => (
                  <button
                    key={p}
                    className={`h-7 w-7 rounded text-xs font-medium transition ${
                      p === 1
                        ? "bg-[var(--ep-orange)] text-white"
                        : "text-[var(--ep-neutral)] hover:bg-gray-100"
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button className="p-1.5 rounded hover:bg-gray-100 transition text-[var(--ep-neutral)]">
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
