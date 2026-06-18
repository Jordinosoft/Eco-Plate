import { NextRequest, NextResponse } from "next/server";
import { initiateDirectPay } from "@/lib/fapshi";

// POST /api/pay/direct
// Pushes an Orange Money / Mobile Money payment request directly to the user's phone.
// Body: { amount, phone, medium?, name?, email?, externalId?, message? }

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, phone, medium, name, email, externalId, message } = body;

    if (!amount || amount < 100) {
      return NextResponse.json(
        { error: "Amount must be at least 100 XAF" },
        { status: 400 }
      );
    }
    if (!phone) {
      return NextResponse.json(
        { error: "Phone number is required" },
        { status: 400 }
      );
    }

    const result = await initiateDirectPay({
      amount: Math.round(amount),
      phone,
      medium: medium ?? "orange money",
      name,
      email,
      externalId,
      message: message ?? "FoodLoop rescue payment",
    });

    return NextResponse.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Direct pay failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
