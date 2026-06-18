// Fapshi API client — server-side only (credentials never reach the browser)
// Docs: https://sandbox.fapshi.com
// Minimum transaction: 100 XAF.

const BASE = "https://sandbox.fapshi.com";

// Headers built inside each call so env vars are read at request time, not module load
function buildHeaders() {
  const apiuser = process.env.FAPSHI_API_USER;
  const apikey  = process.env.FAPSHI_API_KEY;
  if (!apiuser || !apikey) {
    throw new Error("Fapshi credentials missing — check FAPSHI_API_USER and FAPSHI_API_KEY in .env");
  }
  return {
    "Content-Type": "application/json",
    apiuser,
    apikey,
  };
}

// ─── Types ────────────────────────────────────────────────────────────────────

export type PayLinkPayload = {
  amount: number;
  email?: string;
  redirectUrl?: string;
  userId?: string;
  externalId?: string;
  message?: string;
};

export type PayLinkResponse = {
  message: string;
  link: string;
  transId: string;
  dateInitiated: string;
};

export type DirectPayPayload = {
  amount: number;
  phone: string;
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

export async function createPaymentLink(payload: PayLinkPayload): Promise<PayLinkResponse> {
  const res = await fetch(`${BASE}/initiate-pay`, {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.message ?? `Fapshi error ${res.status}`);
  return data as PayLinkResponse;
}

// ─── Direct Pay ───────────────────────────────────────────────────────────────

export async function initiateDirectPay(payload: DirectPayPayload): Promise<DirectPayResponse> {
  const res = await fetch(`${BASE}/direct-pay`, {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.message ?? `Fapshi error ${res.status}`);
  return data as DirectPayResponse;
}

// ─── Transaction Status ───────────────────────────────────────────────────────

export async function getTransactionStatus(transId: string): Promise<TransactionStatus> {
  const res = await fetch(`${BASE}/payment-status/${transId}`, {
    method: "GET",
    headers: buildHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.message ?? `Fapshi error ${res.status}`);
  return data as TransactionStatus;
}
