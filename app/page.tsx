import Link from "next/link";
import Nav from "@/components/nav";
import { IMPACT } from "@/lib/data";
import {
  Utensils,
  Leaf,
  Users,
  ArrowRight,
  ShoppingBag,
  Store,
  Heart,
} from "lucide-react";

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({
  value,
  label,
  icon,
}: {
  value: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--ep-green-light)] text-[var(--ep-green)]">
        {icon}
      </div>
      <p className="text-3xl font-bold text-[var(--ep-green)]">{value}</p>
      <p className="text-sm text-[var(--ep-neutral)]">{label}</p>
    </div>
  );
}

// ─── Path Card ────────────────────────────────────────────────────────────────
function PathCard({
  icon,
  title,
  bullets,
  href,
  imageBg,
}: {
  icon: React.ReactNode;
  title: string;
  bullets: string[];
  href: string;
  imageBg: string;
}) {
  return (
    <div className="card-food flex flex-col">
      {/* Image area */}
      <div
        className="h-40 w-full bg-cover bg-center relative"
        style={{ backgroundImage: imageBg }}
      >
        <div className="absolute inset-0 bg-[var(--ep-green)]/60 flex items-center justify-center">
          <div className="text-white">{icon}</div>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5 gap-4">
        <h3 className="text-lg font-semibold text-[var(--ep-green)]">{title}</h3>
        <ul className="flex flex-col gap-2">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-2 text-sm text-[var(--ep-neutral)]">
              <Leaf size={14} className="mt-0.5 shrink-0 text-[var(--ep-green-mid)]" />
              {b}
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-2">
          <Link href={href} className="btn-cta text-sm w-full justify-center">
            Join Now
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Step ─────────────────────────────────────────────────────────────────────
function Step({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center text-center gap-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--ep-orange)] text-white text-lg font-bold">
        {number}
      </div>
      <h3 className="font-semibold text-[var(--ep-green)]">{title}</h3>
      <p className="text-sm text-[var(--ep-neutral)] leading-relaxed">{description}</p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--ep-cream)] px-4 py-20 sm:px-6 lg:px-8">
        {/* Decorative blob */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full opacity-10"
          style={{ background: "var(--ep-orange)" }}
        />

        <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-12 items-center">
          {/* Copy */}
          <div className="flex flex-col gap-6">
            <span className="badge-impact w-fit text-sm">
              🌍 Join the Movement
            </span>
            <h1 className="text-5xl sm:text-6xl font-bold leading-tight text-[var(--ep-green)]">
              Rescue Food.
              <br />
              <span className="text-[var(--ep-orange)]">Protect the Planet.</span>
            </h1>
            <p className="text-lg text-[var(--ep-neutral)] leading-relaxed max-w-md">
              Join the movement to eliminate food waste in your community. Every
              meal saved is a step toward a sustainable future.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/marketplace" className="btn-cta">
                Start Rescuing Now
              </Link>
              <Link
                href="/#how-it-works"
                className="btn-outline flex items-center gap-2 justify-center"
              >
                How It Works <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Hero image */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl h-72 lg:h-[420px]">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1543362906-acfc16c67564?w=800&q=80)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--ep-green)]/40 to-transparent" />
          </div>
        </div>
      </section>

      {/* Impact stats */}
      <section
        id="impact"
        className="bg-white px-4 py-16 sm:px-6 lg:px-8 border-y border-black/5"
      >
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-2xl font-bold text-[var(--ep-green)] mb-2">Why FoodLoop?</h2>
          <p className="text-center text-sm text-[var(--ep-neutral)] mb-10">Our community impact grows every day.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            <StatCard
              icon={<Utensils size={20} />}
              value={`${(IMPACT.mealsRescued / 1_000_000).toFixed(1)}M+`}
              label="Meals Rescued"
            />
            <StatCard
              icon={<Leaf size={20} />}
              value={`${(IMPACT.co2PreventedKg / 1_000_000).toFixed(1)}M kg`}
              label="CO₂ Prevented"
            />
            <StatCard
              icon={<Users size={20} />}
              value={`${(IMPACT.activeRescuers / 1000).toFixed(0)}k+`}
              label="Active Rescuers"
            />
          </div>
        </div>
      </section>

      {/* Choose Your Path */}
      <section className="bg-[var(--ep-cream)] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-center text-[var(--ep-green)] mb-3">
            Choose Your Path
          </h2>
          <p className="text-center text-[var(--ep-neutral)] mb-12 max-w-lg mx-auto">
            Whether you're saving money on meals, reducing business waste, or
            solving food insecurity — there's a place for you on FoodLoop.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PathCard
              icon={<ShoppingBag size={32} />}
              title="Rescuers"
              bullets={[
                "Get 30–70% off high-quality surplus food from your favourite local spots.",
                "Eat with purpose, reducing business waste.",
                "Track your CO₂ savings with every purchase.",
              ]}
              href="/signup?role=customer"
              imageBg="url(https://images.unsplash.com/photo-1506354666786-959d6d497f1a?w=600&q=80)"
            />
            <PathCard
              icon={<Store size={32} />}
              title="Merchants"
              bullets={[
                "Turn unsold surplus into extra revenue.",
                "Reduce your environmental footprint.",
                "Discover customers and make a difference.",
              ]}
              href="/signup?role=merchant"
              imageBg="url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80)"
            />
            <PathCard
              icon={<Heart size={32} />}
              title="NGOs"
              bullets={[
                "Focus your redistribution efforts only on legitimate demand.",
                "Connect with more merchants near you.",
                "Streamline logistics and collection.",
              ]}
              href="/signup?role=ngo"
              imageBg="url(https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80)"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="bg-white px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-[var(--ep-green)] mb-3">
            How It Works
          </h2>
          <p className="text-center text-[var(--ep-neutral)] mb-14">
            Three simple steps to join the circular food economy.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 relative">
            {/* Connector line (desktop) */}
            <div className="hidden sm:block absolute top-6 left-[calc(16.67%+1.5rem)] right-[calc(16.67%+1.5rem)] h-0.5 bg-[var(--ep-green-light)]" />
            <Step
              number="1"
              title="Browse Surplus"
              description="Discover discounted meals and produce from restaurants, bakeries, and markets near you."
            />
            <Step
              number="2"
              title="Rescue & Pay"
              description="Pay securely with Orange Money or Mobile Money. A QR code lands in your app instantly."
            />
            <Step
              number="3"
              title="Collect & Impact"
              description="Pick up your order at the merchant. Track your personal CO₂ savings in real time."
            />
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-[var(--ep-green)] px-4 py-16 sm:px-6 lg:px-8 text-white text-center">
        <div className="mx-auto max-w-2xl flex flex-col items-center gap-6">
          <h2 className="text-3xl font-bold">Ready to make a difference?</h2>
          <p className="text-white/80 leading-relaxed">
            Download the FoodLoop app and start your rescue journey today.
            Available on iOS and Android.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            {/* App Store badge */}
            <Link
              href="/signup"
              className="inline-flex items-center gap-3 rounded-xl bg-black/60 border border-white/20 hover:bg-black/80 transition px-5 py-3"
            >
              <span className="text-2xl leading-none">🍎</span>
              <div className="text-left">
                <p className="text-[10px] text-white/60 uppercase tracking-widest leading-none mb-0.5">Download on the</p>
                <p className="text-sm font-semibold text-white leading-none">App Store</p>
              </div>
            </Link>
            {/* Play Store badge */}
            <Link
              href="/signup"
              className="inline-flex items-center gap-3 rounded-xl bg-black/60 border border-white/20 hover:bg-black/80 transition px-5 py-3"
            >
              <span className="text-2xl leading-none">▶️</span>
              <div className="text-left">
                <p className="text-[10px] text-white/60 uppercase tracking-widest leading-none mb-0.5">Get it on</p>
                <p className="text-sm font-semibold text-white leading-none">Google Play</p>
              </div>
            </Link>
          </div>
          <Link href="/marketplace" className="text-sm text-white/60 hover:text-white transition underline underline-offset-4">
            Or browse the web app →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--ep-green)] border-t border-white/10 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/60">
          <span className="font-semibold text-white">🍃 FoodLoop</span>
          <p>© {new Date().getFullYear()} FoodLoop. All rights reserved.</p>
          <nav className="flex flex-wrap justify-center gap-4">
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition-colors">Data Report</Link>
            <Link href="/merchant" className="hover:text-white transition-colors">Merchant Portal</Link>
            <Link href="#" className="hover:text-white transition-colors">Contact</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
