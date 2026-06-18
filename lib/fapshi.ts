// Fapshi API client — server-side only (credentials never reach the browser)
// Base URL: https://sandbox.fapshi.com
// Minimum transaction: 100 XAF

const BASE = "https://sandbox.fapshi.com";

// Fallback credentials (sandbox/test only — safe to embed)
const FALLBACK_APIUSER = "e9db3ae1-ca2c-4de5-bb6b-fb641824c5f5";
const FALLBACK_APIKEY = "FAK_TEST_a2896f113e3b15f7921d";

function buildHeaders() {
  const apiuser = process.env.FAPSHI_API_USER || FALLBACK_APIUSER;
  const apikey = process.env.FAPSHI_API_KEY || FALLBACK_APIKEY;
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
  serviceName?: string;
  amount: number;
  revenue?: number;
  payerName?: string;
  email?: string;
  redirectUrl?: string;
  externalId?: string;
  userId?: string;
  webhook?: string;
  reason?: string;
  financialTransId?: string;
  dateInitiated: string;
  dateConfirmed?: string;
};

// ─── Payment Link ─────────────────────────────────────────────────────────────

export async function createPaymentLink(
  payload: PayLinkPayload,
): Promise<PayLinkResponse> {
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

export async function initiateDirectPay(
  payload: DirectPayPayload,
): Promise<DirectPayResponse> {
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

export async function getTransactionStatus(
  transId: string,
): Promise<TransactionStatus> {
  const res = await fetch(`${BASE}/payment-status/${transId}`, {
    method: "GET",
    headers: buildHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.message ?? `Fapshi error ${res.status}`);
  return data as TransactionStatus;
}
