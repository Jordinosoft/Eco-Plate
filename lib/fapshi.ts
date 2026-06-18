// ─── Fapshi API client ────────────────────────────────────────────────────────
// Docs: https://sandbox.fapshi.com
// Both endpoints require apiuser + apikey headers.
// Minimum transaction: 100 XAF.

const BASE = "https://sandbox.fapshi.com";

const HEADERS = {
  "Content-Type": "application/json",
  apiuser: process.env.FAPSHI_API_USER!,
  apikey: process.env.FAPSHI_API_KEY!,
};

// ─── Types ────────────────────────────────────────────────────────────────────

export type PayLinkPayload = {
  amount: number;         // XAF, min 100
  email?: string;
  redirectUrl?: string;
  userId?: string;
  externalId?: string;
  message?: string;
};

export type PayLinkResponse = {
  message: string;
  link: string;           // URL to redirect user to
  transId: string;
  dateInitiated: string;
};

export type DirectPayPayload = {
  amount: number;         // XAF, min 100
  phone: string;          // e.g. "67XXXXXXX"
  medium?: "mobile money" | "orange money";
  name?: string;
  email?: string;
  userId?: string;
  externalId?: string;
  message?: string;
};

export type DirectPayResponse = {
  message: string;
  transId: string;
  dateInitiated: string;
};

export type TransactionStatus = {
  transId: string;
  status: "CREATED" | "PENDING" | "SUCCESSFUL" | "FAILED" | "EXPIRED";
  amount: number;
  currency: string;
  financialTransId?: string;
  dateInitiated: string;
  dateConfirmed?: string;
};

// ─── Payment Link ─────────────────────────────────────────────────────────────
// Redirects user to a hosted Fapshi checkout page. Link expires in 24h.

export async function createPaymentLink(
  payload: PayLinkPayload
): Promise<PayLinkResponse> {
  const res = await fetch(`${BASE}/initiate-pay`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.message ?? `Fapshi error ${res.status}`);
  }
  return data as PayLinkResponse;
}

// ─── Direct Pay ───────────────────────────────────────────────────────────────
// Pushes a payment request to the user's phone directly.
// Note: disabled by default in live env — must be enabled via Fapshi dashboard.
// Direct pay transactions cannot be expired; final state is SUCCESSFUL or FAILED.

export async function initiateDirectPay(
  payload: DirectPayPayload
): Promise<DirectPayResponse> {
  const res = await fetch(`${BASE}/direct-pay`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.message ?? `Fapshi error ${res.status}`);
  }
  return data as DirectPayResponse;
}

// ─── Check Transaction Status ─────────────────────────────────────────────────

export async function getTransactionStatus(
  transId: string
): Promise<TransactionStatus> {
  const res = await fetch(`${BASE}/payment-status/${transId}`, {
    method: "GET",
    headers: HEADERS,
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.message ?? `Fapshi error ${res.status}`);
  }
  return data as TransactionStatus;
}
