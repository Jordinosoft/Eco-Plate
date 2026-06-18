# FoodLoop / Eco-Plate

A food rescue marketplace for Cameroon that connects restaurants with surplus food to buyers and NGOs — reducing food waste and methane emissions. Built as a hackathon demo.

---

## Quick Start

**Prerequisites:** Node.js 18+, npm

```bash
# 1. Clone and install
git clone <repo-url>
cd eco-plate
npm install

# 2. Set up environment variables
# Create a .env file in the root with:
FAPSHI_API_USER=<your-test-api-user>
FAPSHI_API_KEY=<your-test-api-key>

# 3. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Other commands:
```bash
npm run build   # Production build (check for errors)
npm run lint    # Run ESLint
```

---

## Navigating the App

The app has four user roles. Use the **Login page** demo shortcuts to jump into any role instantly — no real auth is required for the demo.

### Landing Page → [/](http://localhost:3000)
Marketing homepage. Shows the mission, impact stats, and role selector (Rescuer / Merchant / NGO). Links to Login and Sign Up.

---

### Customer (Rescuer) Flow

| Page | Route | What it does |
|------|-------|-------------|
| Marketplace | `/marketplace` | Browse & search surplus food listings |
| Food Detail + Checkout | `/marketplace/[id]` | View item, pay via Orange Money or Fapshi Checkout |
| Order / QR Code | `/orders/[id]` | QR pickup code + countdown timer |
| Impact | `/impact` | Personal impact stats, CO₂ saved, milestones |
| Analytics | `/analytics` | Detailed rescuer analytics with sidebar |
| Community | `/community` | Leaderboard, live feed, achievements |

---

### Merchant Flow

| Page | Route | What it does |
|------|-------|-------------|
| Dashboard | `/merchant` | Sales overview, active listings, quick actions |
| Inventory | `/merchant/inventory` | Stock management table with SKU tracking |
| Listings | `/merchant/listings` | Active surplus listings, create new |
| Analytics | `/merchant/analytics` | Revenue trends, waste heatmap, AI insights |
| Impact | `/merchant/impact` | Green legacy stats, milestones, share kit |
| Settings | `/merchant/settings` | Business profile, operational hours, payout |

---

### NGO Flow

| Page | Route | What it does |
|------|-------|-------------|
| Dashboard | `/ngo` | Overview, logistics feed, live activity |
| Donation Marketplace | `/ngo/marketplace` | Browse available food donations |
| My Claims | `/ngo/claims` | Active claims with driver assignment, tracking |
| Logistics | `/ngo/logistics` | Live routes map, driver assignments, fleet |
| Impact Hub | `/ngo/impact` | NGO-level impact stats and mission tracker |

---

### Admin Flow

| Page | Route | What it does |
|------|-------|-------------|
| Global Overview | `/admin` | Platform KPIs, system health, alerts |
| User Management | `/admin/users` | User registry with filters and pagination |
| Merchant Verification | `/admin/verification` | Approve / reject merchant applications |
| Activity Monitor | `/admin/activity` | Live feed, waste reduction chart, audit log |

---

## Payment Integration (Fapshi / Orange Money)

Payments go through [Fapshi](https://fapshi.com) (sandbox for demo):

- **Orange Money direct pay** — pushes a payment prompt to the user's phone. Requires a phone number input.
- **Fapshi Checkout** — redirects to Fapshi's hosted checkout page.

API calls are proxied through Next.js API routes (`/api/pay`, `/api/pay/direct`, `/api/pay/status`) so credentials never reach the browser. The `.env` file holds `FAPSHI_API_USER` and `FAPSHI_API_KEY` — **never commit these**.

---

## Project Structure

```
app/                   # Next.js App Router pages
  api/                 # Fapshi payment proxy routes
  marketplace/         # Customer food discovery + checkout
  merchant/            # Merchant dashboard flows
  ngo/                 # NGO dashboard flows
  admin/               # Admin panel flows
  analytics/           # Customer impact analytics
  community/           # Community hub

components/
  nav.tsx              # Marketing site navbar
  app-nav.tsx          # Customer top navbar
  customer-sidebar.tsx # Customer sidebar (analytics/community)
  merchant-nav.tsx     # Merchant left sidebar
  ngo-nav.tsx          # NGO left sidebar
  admin-nav.tsx        # Admin left sidebar

lib/
  data.ts              # Hardcoded demo data (food listings, merchants, NGOs)
  fapshi.ts            # Fapshi API client (server-side only)

public/fonts/          # Self-hosted Hanken Grotesk variable font
```

---

## Design System

Colors (CSS custom properties in `globals.css`):
- `--ep-green` `#064E3B` — primary dark green
- `--ep-orange` `#FF7900` — Orange Cameroon brand
- `--ep-green-mid` `#10B981` — accents / badges
- `--ep-cream` `#FFFBF7` — page background

Font: **Hanken Grotesk** (variable font, self-hosted from `public/fonts/`)

---

## Tech Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS v4** (`@tailwindcss/postcss`)
- **shadcn/ui** (Radix UI primitives)
- **Fapshi** — Orange Money payment gateway
- Demo data: hardcoded JSON in `lib/data.ts` (no database)
