# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev       # Start dev server (Next.js 16)
npm run build     # Production build
npm run lint      # ESLint (no test suite configured)
```

## Project: Eco-Plate / FoodLoop

A food rescue marketplace for Cameroon — connects restaurants with surplus food to buyers and NGOs, reducing food waste and methane emissions. Built as a hackathon demo using hardcoded JSON data and Fapshi (Orange Money) for payments.

### User Roles

Three distinct user types each with their own dashboard flows:
- **Customer** — browse/buy discounted surplus food
- **Merchant** — list surplus inventory, track sales & impact
- **NGO** — claim food donations, manage logistics

### Design System (from mockups)

Colors (set as CSS variables in `globals.css`):
- Primary: `#064E3B` (dark green)
- Secondary: `#F97316` (orange)
- Tertiary: `#10B981` (mid green)
- Neutral: `#64748B`

Fonts (loaded from `public/fonts/` via `@font-face` in `globals.css`, **not** Google Fonts):
- **Headline & Body**: Hanken Grotesk (variable font — `HankenGrotesk-VariableFont_wght.ttf`)
- **Label/Mono**: JetBrains Mono (must be added to `public/fonts/` if needed)

Font loading: use `@font-face` in `globals.css` pointing to `/fonts/HankenGrotesk-VariableFont_wght.ttf`. Do **not** use `next/font/google` for Hanken Grotesk since the font files are self-hosted.

### Payment Integration

Fapshi API (Orange Money first):
- Payment link: `POST /initiate-pay` — redirects user to Fapshi checkout, link expires 24h
- Direct pay: `POST /direct-pay` — pushes request to user's mobile (disabled by default in live, must be enabled via Fapshi dashboard)
- Both require `apiuser` and `apikey` headers
- Minimum amount: 100 XAF
- Track status via `transId` returned on initiation

### Data

Demo uses hardcoded JSON (no database). Food catalog seeded from `Cameroonian_Food_Archives_Precious_Core.csv` (107 Cameroonian recipes with titles, URLs, and images from preciouscore.com). Many CSV image entries are SVG placeholders — use only the real image URLs (rows 2–5, 42–43, 78–107 have real images).

### Tech Stack

- Next.js 16 (App Router) — check `node_modules/next/dist/docs/` for this version's conventions before writing routing or data-fetching code
- React 19, TypeScript
- Tailwind CSS v4 (`@tailwindcss/postcss`)
- shadcn/ui components (`radix-ui`, `class-variance-authority`, `clsx`, `tailwind-merge`)
- `lucide-react` for icons

### Design Screens

Reference mockups are in `Eco_Plate_Design_Screens/`. Key screens:
- `Home page.png`, `Sign up.png` — landing/auth
- `Food Discovery.png`, `Food Details & Checkout.png`, `Pickup QR Code.png` — customer flow
- `Merchant Listings.png`, `Merchant Inventory.png`, `Merchant Analytics.png`, `Merchant Impact Dashboard.png` — merchant flow
- `NGO Home Dashboard - Redesign.png`, `NGO Donation Marketplace.png`, `NGO My Claims - Redesign.png` — NGO flow
- `Admin Global Overview.png`, `User Management Hub.png`, `Activity Monitor & Reports.png` — admin
