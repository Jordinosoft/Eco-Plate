"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ShoppingBag, Store, Heart, Sprout, Check, Leaf } from "lucide-react";
import { Suspense } from "react";

type Role = "customer" | "merchant" | "ngo" | "donor";

const ROLES: { id: Role; icon: React.ReactNode; title: string; description: string; dest: string }[] = [
  {
    id: "customer",
    icon: <ShoppingBag size={20} />,
    title: "Rescuer",
    description: "Buy surplus food at a discount & track your climate impact.",
    dest: "/marketplace",
  },
  {
    id: "merchant",
    icon: <Store size={20} />,
    title: "Merchant",
    description: "List surplus inventory and turn waste into revenue.",
    dest: "/merchant",
  },
  {
    id: "ngo",
    icon: <Heart size={20} />,
    title: "NGO",
    description: "Claim food donations and manage collection logistics.",
    dest: "/ngo",
  },
  {
    id: "donor",
    icon: <Sprout size={20} />,
    title: "Donor / Farmer",
    description: "Sell excess harvest at a discount or donate — farmers, gardeners & households.",
    dest: "/donor",
  },
];

function SignUpForm() {
  const router = useRouter();
  const params = useSearchParams();
  const defaultRole = (params.get("role") as Role) || "customer";
  const [role, setRole] = useState<Role>(defaultRole);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const dest = ROLES.find((r) => r.id === role)?.dest ?? "/marketplace";
    router.push(dest);
  }

  const selectedRole = ROLES.find((r) => r.id === role)!;

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left panel */}
      <div
        className="hidden lg:flex flex-col justify-end p-12 text-white relative overflow-hidden"
        style={{ backgroundImage: "url(https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=900&q=80)", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-[var(--ep-green)]/80" />
        <div className="relative z-10 flex flex-col gap-6">
          <Link href="/" className="absolute top-12 left-12 flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-white/20 flex items-center justify-center">
              <Leaf size={16} className="text-white" />
            </div>
            <span className="text-xl font-bold">EcoPlate</span>
          </Link>

          <div className="flex flex-col gap-2 mt-24">
            <h2 className="text-4xl font-bold leading-tight">Join the Movement</h2>
            <p className="text-white/85 leading-relaxed max-w-sm">
              Whether you're a farmer with excess harvest, a restaurant with surplus, an NGO fighting hunger, or someone who hates food waste — there's a place for you here.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            {[
              { value: "1.2M+", label: "Meals Saved" },
              { value: "50k+", label: "Active Users" },
              { value: "850+", label: "Partner Merchants" },
              { value: "3.4Mt", label: "CO₂ Prevented" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col">
                <span className="text-2xl font-bold">{s.value}</span>
                <span className="text-xs text-white/70">{s.label}</span>
              </div>
            ))}
          </div>

          <blockquote className="mt-2 border-l-2 border-white/40 pl-4 text-sm text-white/80 italic">
            "EcoPlate helped me sell tomatoes that would have rotted. I made 4,000 XAF and a family ate well."
            <footer className="mt-1 font-semibold not-italic text-white">— Jean-Pierre Fonkou, Farmer, Bafoussam</footer>
          </blockquote>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex flex-col items-center justify-center px-6 py-12 bg-white min-h-screen">
        <div className="w-full max-w-sm flex flex-col gap-6">
          <Link href="/" className="lg:hidden flex items-center gap-1.5 mb-2">
            <div className="h-7 w-7 rounded-lg bg-[var(--ep-green)] flex items-center justify-center">
              <Leaf size={13} className="text-white" />
            </div>
            <span className="font-bold text-[var(--ep-green)]">EcoPlate</span>
          </Link>

          <div>
            <p className="text-xs font-medium text-[var(--ep-neutral)] uppercase tracking-widest mb-1">Step 1 of 2</p>
            <h1 className="text-2xl font-bold text-gray-900">Create Your Account</h1>
          </div>

          {/* Role selector — 2×2 grid */}
          <div className="grid grid-cols-2 gap-3">
            {ROLES.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRole(r.id)}
                className={`relative flex flex-col items-center gap-2 rounded-2xl border-2 p-3 text-center transition-all ${
                  role === r.id ? "border-[var(--ep-green)] bg-[var(--ep-green-light)]" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                {role === r.id && (
                  <span className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--ep-green)] text-white">
                    <Check size={10} />
                  </span>
                )}
                <span className={role === r.id ? "text-[var(--ep-green)]" : "text-[var(--ep-neutral)]"}>
                  {r.icon}
                </span>
                <span className={`text-xs font-semibold leading-tight ${role === r.id ? "text-[var(--ep-green)]" : "text-gray-700"}`}>
                  {r.title}
                </span>
              </button>
            ))}
          </div>

          <p className="text-xs text-[var(--ep-neutral)] -mt-2 bg-gray-50 rounded-xl px-3 py-2">
            {selectedRole.description}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <input type="text" placeholder="John Doe" required className="rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[var(--ep-green-mid)] focus:ring-2 focus:ring-[var(--ep-green-mid)]/20 transition" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">
                  {role === "merchant" ? "Business Name" : role === "ngo" ? "Organisation" : role === "donor" ? "Farm / Location" : "City / Area"}
                </label>
                <input type="text" placeholder={role === "merchant" ? "My Bakery" : role === "ngo" ? "NGO Name" : role === "donor" ? "e.g. Bafoussam" : "Buea"} required className="rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[var(--ep-green-mid)] focus:ring-2 focus:ring-[var(--ep-green-mid)]/20 transition" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Email Address</label>
              <input type="email" placeholder="you@example.com" required className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[var(--ep-green-mid)] focus:ring-2 focus:ring-[var(--ep-green-mid)]/20 transition" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Phone</label>
              <div className="flex">
                <span className="flex items-center px-3 rounded-l-xl border border-r-0 border-gray-200 bg-gray-50 text-sm text-gray-500">+237</span>
                <input type="tel" placeholder="67 000 00 00" required className="flex-1 rounded-r-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[var(--ep-green-mid)] focus:ring-2 focus:ring-[var(--ep-green-mid)]/20 transition" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <input type="password" placeholder="••••••••" required className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[var(--ep-green-mid)] focus:ring-2 focus:ring-[var(--ep-green-mid)]/20 transition" />
            </div>

            <p className="text-xs text-[var(--ep-neutral)]">
              I agree to the{" "}
              <Link href="#" className="underline text-[var(--ep-green)]">Terms of Service</Link>
              {" "}and{" "}
              <Link href="#" className="underline text-[var(--ep-green)]">Privacy Policy</Link>.
            </p>

            <button type="submit" className="btn-cta w-full justify-center">
              Start My EcoPlate Journey →
            </button>
          </form>

          <p className="text-center text-sm text-[var(--ep-neutral)]">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-[var(--ep-orange)] hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <Suspense>
      <SignUpForm />
    </Suspense>
  );
}
