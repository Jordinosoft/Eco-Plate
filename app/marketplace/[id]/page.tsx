"use client";

import { use, useState } from "react";
import Link from "next/link";
import AppNav from "@/components/app-nav";
import { getListing, formatXAF } from "@/lib/data";
import { ArrowLeft, Clock, Leaf, MapPin, Info, Loader2, Phone } from "lucide-react";

type PayMethod = "orange" | "mtn" | "link";
type Step = "detail" | "phone" | "processing" | "done";

export default function ListingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const listing = getListing(id);

  const [step, setStep] = useState<Step>("detail");
  const [payMethod, setPayMethod] = useState<PayMethod>("orange");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [transId, setTransId] = useState<string | null>(null);

  if (!listing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[var(--ep-neutral)]">Listing not found.</p>
      </div>
    );
  }

  const feeXAF = Math.round(listing.discountedPrice * 0.03);
  const totalXAF = listing.discountedPrice + feeXAF;

  const FAPSHI_HEADERS = {
    "Content-Type": "application/json",
    apiuser: "eaf4374a-953c-4bbd-89de-982954a09bdf",
    apikey:  "FAK_8689e8977be85885a16101fb4103b104",
  };

  async function handleConfirm() {
    setError(null);
    if (payMethod === "orange" || payMethod === "mtn") {
      setStep("phone");
      return;
    }
    // Fapshi Checkout — redirect to payment page
    setStep("processing");
    try {
      const res = await fetch("https://sandbox.fapshi.com/initiate-pay", {
        method: "POST",
        headers: FAPSHI_HEADERS,
        body: JSON.stringify({
          amount: totalXAF,
          message: `EcoPlate: ${listing!.title}`,
          externalId: listing!.id,
          redirectUrl: `${window.location.origin}/orders/pending`,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message ?? "Payment failed");
      window.location.href = data.link;
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Payment failed");
      setStep("detail");
    }
  }

  async function handleDirectPay() {
    if (!phone || phone.length < 8) {
      setError("Enter a valid phone number");
      return;
    }
    setError(null);
    setStep("processing");
    try {
      const res = await fetch("https://sandbox.fapshi.com/direct-pay", {
        method: "POST",
        headers: FAPSHI_HEADERS,
        body: JSON.stringify({
          amount: totalXAF,
          phone: `237${phone.replace(/\s/g, "")}`,
          message: `EcoPlate: ${listing!.title}`,
          externalId: listing!.id,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message ?? "Payment failed");
      setTransId(data.transId);
      setStep("done");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Payment failed");
      setStep("phone");
    }
  }

  // ── Processing ───────────────────────────────────────────────────────────────
  if (step === "processing") {
    return (
      <div className="min-h-screen bg-[var(--ep-cream)] flex flex-col items-center justify-center gap-4">
        <Loader2 size={40} className="animate-spin text-[var(--ep-orange)]" />
        <p className="font-semibold text-gray-900">Processing payment…</p>
        <p className="text-sm text-[var(--ep-neutral)]">Please wait</p>
      </div>
    );
  }

  // ── Done ─────────────────────────────────────────────────────────────────────
  if (step === "done") {
    const isOrange = payMethod === "orange";
    return (
      <div className="min-h-screen bg-[var(--ep-cream)] flex flex-col items-center justify-center gap-6 px-4">
        <div className={`flex h-16 w-16 items-center justify-center rounded-full ${isOrange ? "bg-[var(--ep-orange-light)]" : "bg-yellow-50"}`}>
          <span className="text-3xl">{isOrange ? "🟠" : "🟡"}</span>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900">Payment Initiated!</h2>
          <p className="text-sm text-[var(--ep-neutral)] mt-1">
            A prompt was sent to your {isOrange ? "Orange Money" : "MTN Mobile Money"} number. Approve it to confirm your rescue.
          </p>
          {transId && (
            <p className="mt-2 text-xs font-mono text-[var(--ep-neutral)]">Ref: {transId}</p>
          )}
        </div>
        <Link href="/orders/o1" className="btn-cta">View My Order →</Link>
        <Link href="/marketplace" className="text-sm text-[var(--ep-neutral)] hover:underline">Back to Marketplace</Link>
      </div>
    );
  }

  // ── Phone modal ───────────────────────────────────────────────────────────────
  if (step === "phone") {
    const isOrange = payMethod === "orange";
    return (
      <div className="min-h-screen bg-[var(--ep-cream)] flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-sm bg-white rounded-2xl border border-gray-100 p-6 flex flex-col gap-5 shadow-sm">
          <div className="text-center">
            <div className={`inline-flex h-12 w-12 items-center justify-center rounded-full mb-3 ${isOrange ? "bg-[var(--ep-orange-light)]" : "bg-yellow-50"}`}>
              <Phone size={22} className={isOrange ? "text-[var(--ep-orange)]" : "text-yellow-500"} />
            </div>
            <h2 className="text-lg font-bold text-gray-900">
              Enter {isOrange ? "Orange Money" : "MTN Mobile Money"} Number
            </h2>
            <p className="text-sm text-[var(--ep-neutral)] mt-1">
              A payment prompt of <strong>{formatXAF(totalXAF)}</strong> will be sent to your phone.
            </p>
          </div>

          <div className="flex">
            <span className="flex items-center rounded-l-xl border border-r-0 border-gray-200 bg-gray-50 px-3 text-sm text-gray-500">
              +237
            </span>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="67 000 00 00"
              className="flex-1 rounded-r-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[var(--ep-orange)] focus:ring-2 focus:ring-[var(--ep-orange)]/20 transition"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-2">{error}</p>
          )}

          <button onClick={handleDirectPay} className="btn-cta w-full justify-center py-3">
            Send Payment Prompt →
          </button>
          <button
            onClick={() => { setStep("detail"); setError(null); }}
            className="text-sm text-center text-[var(--ep-neutral)] hover:underline"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  // ── Detail page ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[var(--ep-cream)]">
      <AppNav />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 pb-24 md:pb-6">
        <Link href="/marketplace" className="inline-flex items-center gap-1.5 text-sm text-[var(--ep-neutral)] hover:text-gray-900 mb-5">
          <ArrowLeft size={14} /> Back to Marketplace
        </Link>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8">
          {/* Left */}
          <div className="flex flex-col gap-6">
            <div className="relative rounded-2xl overflow-hidden h-56 sm:h-72 lg:h-80">
              <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" />
              <span className="absolute top-3 left-3 badge-urgent">
                <Clock size={11} /> Expires in {listing.expiresInHours}hr
              </span>
            </div>

            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{listing.title}</h1>
                <div className="flex items-center gap-1 text-sm text-[var(--ep-neutral)] mt-1">
                  <MapPin size={13} />
                  {listing.merchantAddress} · <span className="text-[var(--ep-green-mid)]">0.8 km away</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xl sm:text-2xl font-bold text-[var(--ep-green)]">{formatXAF(listing.discountedPrice)}</p>
                <p className="text-sm text-[var(--ep-neutral)] line-through">{formatXAF(listing.originalPrice)}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-xl bg-white border border-gray-100 px-4 py-2.5 text-sm">
                <Clock size={14} className="text-[var(--ep-orange)]" />
                <div>
                  <p className="font-semibold text-gray-900 text-xs">PICKUP WINDOW</p>
                  <p className="text-[var(--ep-neutral)]">{listing.pickupWindow}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-[var(--ep-green-light)] border border-[var(--ep-green-mid)]/20 px-4 py-2.5 text-sm">
                <Leaf size={14} className="text-[var(--ep-green)]" />
                <div>
                  <p className="font-semibold text-[var(--ep-green)] text-xs">CLIMATE IMPACT</p>
                  <p className="text-[var(--ep-green)]">{listing.co2SavedKg}kg CO₂ saved</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white border border-gray-100 p-5">
              <h2 className="font-semibold text-gray-900 mb-2">What's in the box?</h2>
              <p className="text-sm text-[var(--ep-neutral)] leading-relaxed">{listing.description}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {listing.tags.map((t) => (
                  <span key={t} className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Checkout (sticky on desktop, fixed bottom sheet hint on mobile) */}
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl bg-white border border-gray-100 p-5 lg:sticky lg:top-20 flex flex-col gap-4">
              <h2 className="font-semibold text-gray-900">Checkout</h2>

              <div className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--ep-neutral)] truncate pr-2">{listing.title}</span>
                  <span className="font-medium shrink-0">{formatXAF(listing.originalPrice)}</span>
                </div>
                <div className="flex justify-between text-[var(--ep-green-mid)]">
                  <span>Surplus Discount</span>
                  <span>-{formatXAF(listing.originalPrice - listing.discountedPrice)}</span>
                </div>
                <div className="flex justify-between text-[var(--ep-neutral)]">
                  <span>Admin Fee (3%)</span>
                  <span>{formatXAF(feeXAF)}</span>
                </div>
              </div>

              <hr className="border-gray-100" />

              <div className="flex items-center justify-between font-bold">
                <span>Total</span>
                <div className="text-right">
                  <p className="text-[var(--ep-green)] text-lg">{formatXAF(totalXAF)}</p>
                  <p className="text-xs text-[var(--ep-green-mid)] font-normal">Saves {listing.co2SavedKg}kg CO₂</p>
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* Payment method */}
              <div>
                <p className="text-xs font-semibold text-[var(--ep-neutral)] uppercase tracking-widest mb-2">
                  Payment Method
                </p>
                <div className="flex flex-col gap-2">
                  {/* Orange Money — primary */}
                  <button
                    onClick={() => setPayMethod("orange")}
                    className={`w-full flex items-center gap-3 rounded-xl border-2 px-4 py-3 text-left transition ${
                      payMethod === "orange" ? "border-[var(--ep-orange)] bg-[var(--ep-orange-light)]" : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--ep-orange)] text-white text-xs font-bold shrink-0">
                      OM
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">Orange Money</p>
                      <p className="text-xs text-[var(--ep-neutral)]">Payment prompt to your phone</p>
                    </div>
                    {payMethod === "orange" && <span className="ml-auto text-[var(--ep-orange)] text-lg">●</span>}
                  </button>

                  {/* MTN Mobile Money */}
                  <button
                    onClick={() => setPayMethod("mtn")}
                    className={`w-full flex items-center gap-3 rounded-xl border-2 px-4 py-3 text-left transition ${
                      payMethod === "mtn" ? "border-yellow-400 bg-yellow-50" : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow-400 text-black text-xs font-bold shrink-0">
                      MTN
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">MTN Mobile Money</p>
                      <p className="text-xs text-[var(--ep-neutral)]">Payment prompt to your phone</p>
                    </div>
                    {payMethod === "mtn" && <span className="ml-auto text-yellow-500 text-lg">●</span>}
                  </button>

                  {/* Fapshi Checkout */}
                  <button
                    onClick={() => setPayMethod("link")}
                    className={`w-full flex items-center gap-3 rounded-xl border-2 px-4 py-3 text-left transition ${
                      payMethod === "link" ? "border-[var(--ep-green)] bg-[var(--ep-green-light)]" : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--ep-green)] text-white text-xs font-bold shrink-0">
                      EP
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">Fapshi Checkout</p>
                      <p className="text-xs text-[var(--ep-neutral)]">Redirect to secure payment page</p>
                    </div>
                    {payMethod === "link" && <span className="ml-auto text-[var(--ep-green)] text-lg">●</span>}
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-2">{error}</p>
              )}

              <button onClick={handleConfirm} className="btn-cta w-full justify-center py-3 text-base">
                {payMethod === "orange" ? "Pay with Orange Money →"
                  : payMethod === "mtn" ? "Pay with MTN MoMo →"
                  : "Go to Secure Checkout →"}
              </button>

              <div className="flex items-start gap-2 text-xs text-[var(--ep-neutral)] bg-gray-50 rounded-xl p-3">
                <Info size={12} className="mt-0.5 shrink-0 text-[var(--ep-green-mid)]" />
                <span>Powered by Fapshi. Your payment is secure and encrypted.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
