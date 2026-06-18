"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import AppNav from "@/components/app-nav";
import { ORDERS, formatXAF } from "@/lib/data";
import { CheckCircle2, Clock, MapPin, Leaf } from "lucide-react";

// Simple SVG QR placeholder
function QRCode({ value }: { value: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="rounded-2xl border-4 border-[var(--ep-orange)] p-2 bg-white shadow-lg">
        <svg viewBox="0 0 100 100" width={160} height={160} className="rounded-lg">
          {/* Outer position markers */}
          <rect x="5" y="5" width="30" height="30" fill="none" stroke="#064E3B" strokeWidth="4" />
          <rect x="12" y="12" width="16" height="16" fill="#064E3B" />
          <rect x="65" y="5" width="30" height="30" fill="none" stroke="#064E3B" strokeWidth="4" />
          <rect x="72" y="12" width="16" height="16" fill="#064E3B" />
          <rect x="5" y="65" width="30" height="30" fill="none" stroke="#064E3B" strokeWidth="4" />
          <rect x="12" y="72" width="16" height="16" fill="#064E3B" />
          {/* Data modules (decorative) */}
          {[
            [40,5],[45,5],[50,5],[55,5],
            [40,10],[50,10],[60,10],
            [40,15],[45,15],[55,15],[60,15],
            [45,20],[50,20],[60,20],
            [40,25],[50,25],[55,25],
            [40,40],[45,40],[55,40],[60,40],[65,40],[75,40],[85,40],
            [40,45],[50,45],[70,45],[80,45],
            [40,50],[45,50],[55,50],[65,50],[75,50],[85,50],
            [40,55],[50,55],[60,55],[70,55],
            [40,60],[45,60],[55,60],[65,60],[80,60],[85,60],
            [65,65],[70,65],[80,65],
            [65,70],[75,70],[85,70],
            [65,75],[70,75],[80,75],[85,75],
            [65,80],[75,80],
            [65,85],[70,85],[75,85],[80,85],[85,85],
          ].map(([x, y], i) => (
            <rect key={i} x={x} y={y} width="4" height="4" fill="#064E3B" />
          ))}
          {/* FoodLoop leaf in center */}
          <circle cx="50" cy="50" r="8" fill="white" />
          <text x="50" y="54" textAnchor="middle" fontSize="10">🍃</text>
        </svg>
      </div>
    </div>
  );
}

function Countdown({ minutes }: { minutes: number }) {
  const [secs, setSecs] = useState(minutes * 60);

  useEffect(() => {
    const t = setInterval(() => setSecs((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const mm = String(Math.floor(secs / 60)).padStart(2, "0");
  const ss = String(secs % 60).padStart(2, "0");

  return (
    <span className="badge-urgent gap-1.5 text-sm">
      <Clock size={13} />
      PICKUP WINDOW: {mm}:{ss}
    </span>
  );
}

export default function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const order = ORDERS.find((o) => o.id === id) ?? ORDERS[0];

  return (
    <div className="min-h-screen bg-[var(--ep-cream)]">
      <AppNav />

      <div className="mx-auto max-w-lg px-4 py-8 flex flex-col gap-6">
        {/* Confirmation banner */}
        <div className="rounded-2xl bg-[var(--ep-green-light)] border border-[var(--ep-green-mid)]/30 p-4 flex flex-col items-center gap-2 text-center">
          <CheckCircle2 size={36} className="text-[var(--ep-green-mid)]" />
          <p className="font-semibold text-[var(--ep-green)]">Order Confirmed!</p>
          <p className="text-sm text-[var(--ep-neutral)]">
            Your contribution helps reduce food waste.
          </p>
        </div>

        {/* QR card */}
        <div className="rounded-2xl bg-white border border-gray-100 p-6 flex flex-col items-center gap-4">
          <div className="text-center">
            <p className="text-sm text-[var(--ep-neutral)]">
              Show this to the Merchant
            </p>
            <p className="text-xs text-gray-400 font-mono mt-0.5">
              Order ID: #{order.pickupCode}
            </p>
          </div>

          <QRCode value={order.pickupCode} />
          <Countdown minutes={14} />
        </div>

        {/* Pickup info */}
        <div className="rounded-2xl bg-white border border-gray-100 p-5 grid sm:grid-cols-2 gap-6">
          <div>
            <p className="text-xs font-semibold text-[var(--ep-neutral)] uppercase tracking-widest mb-3">
              Pickup Instructions
            </p>
            <ol className="flex flex-col gap-3">
              {[
                `Head to ${order.merchant}.`,
                "Inform the staff you're picking up a FoodLoop Surplus Bag.",
                "Scan the QR code at the counter to finalise collection.",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--ep-green)] text-white text-xs font-bold mt-0.5">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <div>
            <p className="text-xs font-semibold text-[var(--ep-neutral)] uppercase tracking-widest mb-3">
              Location
            </p>
            <div className="rounded-xl bg-gray-100 h-28 flex items-center justify-center text-xs text-gray-400 mb-2">
              <MapPin size={14} className="mr-1" /> Map View
            </div>
            <p className="text-sm font-semibold text-gray-900">{order.merchant}</p>
            <p className="text-xs text-[var(--ep-neutral)]">Closes at 10:00 PM · 0.4 miles away</p>
          </div>
        </div>

        {/* Impact nudge */}
        <div className="rounded-2xl bg-[var(--ep-green)] text-white p-5 flex items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <Leaf size={20} className="shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm">You just saved a meal!</p>
              <p className="text-xs text-white/80 mt-1 leading-relaxed">
                This order prevented {order.co2Saved}kg of CO₂ emissions and
                diverted perfectly good food from a landfill. Amazing work!
              </p>
            </div>
          </div>
          <Link
            href="/impact"
            className="shrink-0 rounded-xl bg-white/10 border border-white/20 px-3 py-2.5 text-center text-xs font-semibold hover:bg-white/20 transition"
          >
            View<br />Impact
          </Link>
        </div>

        <p className="text-center text-sm text-[var(--ep-neutral)]">
          Having trouble with your pickup?{" "}
          <Link href="#" className="font-semibold text-[var(--ep-orange)] underline">
            Contact Support
          </Link>
        </p>
      </div>

      {/* Footer */}
      <footer className="bg-[var(--ep-green)] text-white mt-8 px-4 py-6">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
          <span className="font-bold">🍃 FoodLoop</span>
          <span className="text-white/60 text-xs">© 2024 FoodLoop. Towards Zero Waste.</span>
          <nav className="flex gap-4 text-xs text-white/70">
            {["Mission", "Privacy", "Partnerships", "Contact"].map((l) => (
              <Link key={l} href="#" className="hover:text-white transition">{l}</Link>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}
