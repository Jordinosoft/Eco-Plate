// ─── Types ────────────────────────────────────────────────────────────────────

export type Role = "customer" | "merchant" | "ngo" | "admin";

export type FoodListing = {
  id: string;
  title: string;
  merchant: string;
  merchantAddress: string;
  merchantLat: number;
  merchantLng: number;
  image: string;
  originalPrice: number; // XAF
  discountedPrice: number; // XAF
  discountPercent: number;
  category: string;
  tags: string[];
  expiresInHours: number;
  quantityLeft: number;
  description: string;
  co2SavedKg: number;
  pickupWindow: string; // e.g. "Today, 18:00 – 19:30"
  isDonation: boolean;
  merchantId: string;
};

export type Merchant = {
  id: string;
  name: string;
  address: string;
  category: string;
  verified: boolean;
  totalRescued: number;
  co2Saved: number;
  rating: number;
};

export type NGOClaim = {
  id: string;
  listingId: string;
  listingTitle: string;
  merchant: string;
  claimedAt: string;
  status: "pending" | "confirmed" | "collected";
  quantity: number;
  servings: number;
};

export type Order = {
  id: string;
  listingId: string;
  listingTitle: string;
  merchant: string;
  amount: number;
  status: "pending" | "paid" | "ready" | "collected";
  placedAt: string;
  pickupCode: string;
  co2Saved: number;
};

// ─── Merchants ───────────────────────────────────────────────────────────────

export const MERCHANTS: Merchant[] = [
  {
    id: "m1",
    name: "Boulangerie de la Paix",
    address: "42 Rue du Commerce, Buea",
    category: "Bakery",
    verified: true,
    totalRescued: 1240,
    co2Saved: 820,
    rating: 4.8,
  },
  {
    id: "m2",
    name: "Green Garden Deli",
    address: "15 Molyko Street, Buea",
    category: "Deli",
    verified: true,
    totalRescued: 890,
    co2Saved: 540,
    rating: 4.6,
  },
  {
    id: "m3",
    name: "Urban Treats Bakery",
    address: "7 Mile 17 Road, Buea",
    category: "Bakery",
    verified: true,
    totalRescued: 340,
    co2Saved: 210,
    rating: 4.5,
  },
  {
    id: "m4",
    name: "La Petite Cantine",
    address: "3 GRA Avenue, Douala",
    category: "Restaurant",
    verified: false,
    totalRescued: 120,
    co2Saved: 75,
    rating: 4.3,
  },
  {
    id: "m5",
    name: "Farmers Market Hub",
    address: "Central Market, Yaoundé",
    category: "Market",
    verified: true,
    totalRescued: 2100,
    co2Saved: 1380,
    rating: 4.9,
  },
];

// ─── Food Listings ────────────────────────────────────────────────────────────

export const LISTINGS: FoodListing[] = [
  {
    id: "l1",
    title: "Artisan Pastry & Bread Medley",
    merchant: "Boulangerie de la Paix",
    merchantAddress: "42 Rue du Commerce, Buea",
    merchantLat: 4.1574,
    merchantLng: 9.2497,
    image:
      "https://www.preciouscore.com/wp-content/uploads/2023/04/default-image-378x378.jpg",
    originalPrice: 3500,
    discountedPrice: 1750,
    discountPercent: 50,
    category: "Bakery",
    tags: ["Bread", "Pastry", "Vegetarian"],
    expiresInHours: 2,
    quantityLeft: 4,
    description:
      "A surprise assortment of today's freshest surplus. Typically includes two butter croissants, a pain au chocolat, and an artisan grain sourdough loaf. Perfect for a sustainable breakfast or to freeze for later.",
    co2SavedKg: 1.2,
    pickupWindow: "Today, 18:00 – 19:30",
    isDonation: false,
    merchantId: "m1",
  },
  {
    id: "l2",
    title: "Zesty Quinoa Bowl",
    merchant: "Green Garden Deli",
    merchantAddress: "15 Molyko Street, Buea",
    merchantLat: 4.1612,
    merchantLng: 9.2358,
    image:
      "https://www.preciouscore.com/wp-content/uploads/2015/09/Cameroonian-Snails-Recipe-thumbnail-378x378.jpg",
    originalPrice: 2200,
    discountedPrice: 1300,
    discountPercent: 40,
    category: "Healthy",
    tags: ["Vegan", "Gluten-Free"],
    expiresInHours: 3,
    quantityLeft: 6,
    description:
      "Freshly prepared quinoa bowl with roasted vegetables, avocado, and our house citrus dressing. Packed with protein.",
    co2SavedKg: 0.8,
    pickupWindow: "Today, 17:00 – 19:00",
    isDonation: false,
    merchantId: "m2",
  },
  {
    id: "l3",
    title: "Pastry Box Assortment",
    merchant: "Urban Treats Bakery",
    merchantAddress: "7 Mile 17 Road, Buea",
    merchantLat: 4.148,
    merchantLng: 9.23,
    image:
      "https://www.preciouscore.com/wp-content/uploads/2016/04/Folere-Drink-thumbnail-378x378.jpg",
    originalPrice: 4000,
    discountedPrice: 2250,
    discountPercent: 44,
    category: "Bakery",
    tags: ["Pastry", "Sweet"],
    expiresInHours: 4,
    quantityLeft: 3,
    description:
      "A beautiful box of mixed pastries — croissants, muffins, and seasonal tarts baked this morning.",
    co2SavedKg: 0.9,
    pickupWindow: "Today, 16:00 – 18:00",
    isDonation: false,
    merchantId: "m3",
  },
  {
    id: "l4",
    title: "Rescue Produce Bag",
    merchant: "Farmers Market Hub",
    merchantAddress: "Central Market, Yaoundé",
    merchantLat: 3.8671,
    merchantLng: 11.5167,
    image:
      "https://www.preciouscore.com/wp-content/uploads/2024/10/Spaghetti-Omelette-Sandwich-thumbnail-378x378.jpg",
    originalPrice: 3000,
    discountedPrice: 1500,
    discountPercent: 50,
    category: "Produce",
    tags: ["Vegetarian", "Organic"],
    expiresInHours: 6,
    quantityLeft: 10,
    description:
      "A seasonal bag of fresh vegetables and fruits that are cosmetically imperfect but nutritionally perfect.",
    co2SavedKg: 2.1,
    pickupWindow: "Today, 15:00 – 18:00",
    isDonation: false,
    merchantId: "m5",
  },
  {
    id: "l5",
    title: "Choco-Fudge Muffin Set",
    merchant: "Urban Treats Bakery",
    merchantAddress: "7 Mile 17 Road, Buea",
    merchantLat: 4.148,
    merchantLng: 9.23,
    image:
      "https://www.preciouscore.com/wp-content/uploads/2024/10/Fried-Pork-and-Plantains-thumbnail-378x378.jpg",
    originalPrice: 1900,
    discountedPrice: 950,
    discountPercent: 50,
    category: "Bakery",
    tags: ["Sweet", "Dessert"],
    expiresInHours: 5,
    quantityLeft: 8,
    description:
      "Six rich chocolate fudge muffins baked fresh today. Perfect for an afternoon treat.",
    co2SavedKg: 0.6,
    pickupWindow: "Today, 17:30 – 19:00",
    isDonation: false,
    merchantId: "m3",
  },
  {
    id: "l6",
    title: "Signature Beef Burger",
    merchant: "La Petite Cantine",
    merchantAddress: "3 GRA Avenue, Douala",
    merchantLat: 4.0511,
    merchantLng: 9.7679,
    image:
      "https://www.preciouscore.com/wp-content/uploads/2017/06/african-egg-rolls-african-scotch-eggs-1-of-1-378x378.jpg",
    originalPrice: 4500,
    discountedPrice: 1800,
    discountPercent: 60,
    category: "Meals",
    tags: ["Beef", "Hot Meal"],
    expiresInHours: 1,
    quantityLeft: 2,
    description:
      "Our famous 200g beef burger with lettuce, tomato, caramelised onions and secret sauce. Tonight's final portions.",
    co2SavedKg: 1.4,
    pickupWindow: "Today, 20:00 – 21:00",
    isDonation: false,
    merchantId: "m4",
  },
  {
    id: "l7",
    title: "Ndolé & Plantain Donation Pack",
    merchant: "Green Garden Deli",
    merchantAddress: "15 Molyko Street, Buea",
    merchantLat: 4.1612,
    merchantLng: 9.2358,
    image:
      "https://www.preciouscore.com/wp-content/uploads/2017/05/cameroonian-plantain-porridge-recipe-1-of-1-378x378.jpg",
    originalPrice: 0,
    discountedPrice: 0,
    discountPercent: 100,
    category: "Meals",
    tags: ["Donation", "Hot Meal", "Cameroonian"],
    expiresInHours: 4,
    quantityLeft: 20,
    description:
      "A generous batch of Ndolé with boiled plantains, prepared this afternoon. Available for NGO collection only.",
    co2SavedKg: 3.5,
    pickupWindow: "Today, 17:00 – 18:30",
    isDonation: true,
    merchantId: "m2",
  },
  {
    id: "l8",
    title: "Mixed Vegetable Stew Box",
    merchant: "Farmers Market Hub",
    merchantAddress: "Central Market, Yaoundé",
    merchantLat: 3.8671,
    merchantLng: 11.5167,
    image:
      "https://www.preciouscore.com/wp-content/uploads/2023/04/default-image-378x378.jpg",
    originalPrice: 2800,
    discountedPrice: 1400,
    discountPercent: 50,
    category: "Meals",
    tags: ["Vegetarian", "Hot Meal", "Cameroonian"],
    expiresInHours: 3,
    quantityLeft: 5,
    description:
      "A hearty Cameroonian mixed vegetable stew with smoked fish. Comes with enough sauce for two servings.",
    co2SavedKg: 1.1,
    pickupWindow: "Today, 16:30 – 18:00",
    isDonation: false,
    merchantId: "m5",
  },
];

// ─── NGO Claims ───────────────────────────────────────────────────────────────

export const NGO_CLAIMS: NGOClaim[] = [
  {
    id: "c1",
    listingId: "l7",
    listingTitle: "Ndolé & Plantain Donation Pack",
    merchant: "Green Garden Deli",
    claimedAt: "2026-06-18T14:30:00",
    status: "confirmed",
    quantity: 20,
    servings: 40,
  },
  {
    id: "c2",
    listingId: "l4",
    listingTitle: "Rescue Produce Bag",
    merchant: "Farmers Market Hub",
    claimedAt: "2026-06-17T11:00:00",
    status: "collected",
    quantity: 5,
    servings: 15,
  },
  {
    id: "c3",
    listingId: "l8",
    listingTitle: "Mixed Vegetable Stew Box",
    merchant: "Farmers Market Hub",
    claimedAt: "2026-06-18T09:00:00",
    status: "pending",
    quantity: 3,
    servings: 9,
  },
];

// ─── Customer Orders ──────────────────────────────────────────────────────────

export const ORDERS: Order[] = [
  {
    id: "o1",
    listingId: "l1",
    listingTitle: "Artisan Pastry & Bread Medley",
    merchant: "Boulangerie de la Paix",
    amount: 1750,
    status: "ready",
    placedAt: "2026-06-18T16:45:00",
    pickupCode: "EP-4821",
    co2Saved: 1.2,
  },
  {
    id: "o2",
    listingId: "l2",
    listingTitle: "Zesty Quinoa Bowl",
    merchant: "Green Garden Deli",
    amount: 1300,
    status: "collected",
    placedAt: "2026-06-17T12:10:00",
    pickupCode: "EP-3370",
    co2Saved: 0.8,
  },
];

// ─── Impact stats (app-wide) ──────────────────────────────────────────────────

export const IMPACT = {
  mealsRescued: 1_200_000,
  co2PreventedKg: 3_400_000,
  activeRescuers: 50_000,
  partnerMerchants: 850,
  co2Averted: 320, // tonnes
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function formatXAF(amount: number): string {
  return new Intl.NumberFormat("fr-CM", {
    style: "currency",
    currency: "XAF",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getListing(id: string): FoodListing | undefined {
  return LISTINGS.find((l) => l.id === id);
}

export const CATEGORIES = [
  "All Items",
  "Bakery",
  "Meals",
  "Produce",
  "Healthy",
  "Dessert",
  "Drinks",
  "Dairy & Eggs",
];
