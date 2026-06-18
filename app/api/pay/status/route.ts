import { NextRequest, NextResponse } from "next/server";
import { getTransactionStatus } from "@/lib/fapshi";

// GET /api/pay/status?transId=xxx
export async function GET(req: NextRequest) {
  const transId = req.nextUrl.searchParams.get("transId");
  if (!transId) {
    return NextResponse.json({ error: "transId is required" }, { status: 400 });
  }
  try {
    const status = await getTransactionStatus(transId);
    return NextResponse.json(status);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Status check failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
