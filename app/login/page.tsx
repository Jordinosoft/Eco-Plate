"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

type Tab = "rescuer" | "business";

const DEMO_ROUTES: Record<Tab, Record<string, string>> = {
  rescuer: {
    customer: "/marketplace",
    ngo: "/ngo",
  },
  business: {
    merchant: "/merchant",
    admin: "/admin",
  },
};

export default function LoginPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("rescuer");
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    // Demo routing based on email prefix
    if (email.includes("ngo")) {
      router.push("/ngo");
    } else if (email.includes("merchant") || email.includes("shop")) {
      router.push("/merchant");
    } else if (email.includes("admin")) {
      router.push("/admin");
    } else {
      router.push("/marketplace");
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left panel — brand */}
      <div
        className="hidden lg:flex flex-col justify-end p-12 text-white relative overflow-hidden"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1543362906-acfc16c67564?w=900&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[var(--ep-green)]/75" />
        <div className="relative z-10 flex flex-col gap-6">
          <Link href="/" className="absolute top-0 left-0 flex items-center gap-1.5 p-12">
            <span className="text-2xl">🍃</span>
            <span className="text-xl font-bold">FoodLoop</span>
          </Link>

          <div className="flex flex-col gap-2 mt-20">
            <span className="badge-impact text-xs w-fit bg-white/20 text-white border-0">
              Join 2026
            </span>
            <h2 className="text-4xl font-bold leading-tight">
              Closing the loop
              <br />
              on food waste.
            </h2>
            <p className="text-white/80 leading-relaxed max-w-sm">
              Every rescued meal prevents methane, conserves water, and feeds
              someone who needs it. Log in and keep building a greener future.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4">
            {[
              { value: "4.2M", label: "Meals Saved" },
              { value: "12k", label: "Active Rescuers" },
              { value: "320t", label: "CO₂ Averted" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col">
                <span className="text-2xl font-bold">{s.value}</span>
                <span className="text-xs text-white/70">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex flex-col items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-sm flex flex-col gap-6">
          {/* Mobile logo */}
          <Link href="/" className="lg:hidden flex items-center gap-1.5 mb-2">
            <span>🍃</span>
            <span className="font-bold text-[var(--ep-green)]">FoodLoop</span>
          </Link>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-sm text-[var(--ep-neutral)] mt-1">
              Please enter your details to access your dashboard.
            </p>
          </div>

          {/* Tabs */}
          <div className="grid grid-cols-2 rounded-xl bg-gray-100 p-1">
            {(["rescuer", "business"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded-lg py-2 text-sm font-medium transition-all capitalize ${
                  tab === t
                    ? "bg-[var(--ep-green)] text-white shadow-sm"
                    : "text-[var(--ep-neutral)] hover:text-gray-700"
                }`}
              >
                {t === "rescuer" ? "Rescuer" : "Business / NGO"}
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">
                Email or Username
              </label>
              <input
                type="email"
                placeholder="hello@foodloop.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[var(--ep-green-mid)] focus:ring-2 focus:ring-[var(--ep-green-mid)]/20 transition"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs text-[var(--ep-orange)] hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  defaultValue="••••••••"
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[var(--ep-green-mid)] focus:ring-2 focus:ring-[var(--ep-green-mid)]/20 transition pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--ep-neutral)]"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-[var(--ep-green)] focus:ring-[var(--ep-green-mid)]"
              />
              Remember me for 30 days
            </label>

            <button type="submit" className="btn-cta w-full justify-center mt-1">
              Login to Rescue →
            </button>

            <div className="flex items-center gap-3 text-xs text-[var(--ep-neutral)]">
              <hr className="flex-1 border-gray-200" />
              OR CONTINUE WITH
              <hr className="flex-1 border-gray-200" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              {["Google", "Apple"].map((p) => (
                <button
                  key={p}
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                >
                  {p}
                </button>
              ))}
            </div>
          </form>

          <p className="text-center text-sm text-[var(--ep-neutral)]">
            New to FoodLoop?{" "}
            <Link
              href="/signup"
              className="font-semibold text-[var(--ep-orange)] hover:underline"
            >
              Sign Up
            </Link>
          </p>

          {/* Demo shortcuts */}
          <div className="rounded-xl bg-[var(--ep-green-light)] p-4 flex flex-col gap-2 text-xs">
            <p className="font-semibold text-[var(--ep-green)]">Demo shortcuts</p>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "Customer", href: "/marketplace" },
                { label: "Merchant", href: "/merchant" },
                { label: "NGO", href: "/ngo" },
                { label: "Admin", href: "/admin" },
              ].map((d) => (
                <Link
                  key={d.label}
                  href={d.href}
                  className="rounded-full bg-[var(--ep-green)] text-white px-3 py-1 text-xs font-medium hover:opacity-90 transition"
                >
                  {d.label} →
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
