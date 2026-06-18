import { NextRequest, NextResponse } from "next/server";
import { createPaymentLink } from "@/lib/fapshi";

// POST /api/pay
// Creates a Fapshi payment link and returns the checkout URL.
// Body: { amount: number, email?: string, externalId?: string, message?: string, redirectUrl?: string }

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, email, externalId, message } = body;

    if (!amount || amount < 100) {
      return NextResponse.json(
        { error: "Amount must be at least 100 XAF" },
        { status: 400 }
      );
    }

    const origin = req.nextUrl.origin;

    const result = await createPaymentLink({
      amount: Math.round(amount),
      email,
      externalId,
      message: message ?? "FoodLoop rescue payment",
      redirectUrl: `${origin}/orders/pending?transId={transId}`,
    });

    return NextResponse.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Payment failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
