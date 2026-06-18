import { NextRequest, NextResponse } from "next/server";
import { initiateDirectPay } from "@/lib/fapshi";

// POST /api/pay/direct
// Pushes a Fapshi direct-pay request to the user's phone.
// Network (Orange vs MTN) is determined by phone number prefix — no medium field.
// Body: { amount, phone, name?, email?, externalId?, message? }

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, phone, name, email, externalId, message } = body;

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
      name,
      email,
      externalId,
      message: message ?? "EcoPlate rescue payment",
    });

    return NextResponse.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Direct pay failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
