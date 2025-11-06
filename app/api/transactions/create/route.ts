import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { requireAuth } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    // Require user to be authenticated
    const auth = await requireAuth();
    if (auth instanceof NextResponse) return auth;

    const { title, role, currency, items, buyerEmail, sellerEmail, inspectionPeriod } = await request.json();

    // Assuming we have buyer and seller emails to find or create users
    // For now, assume the creator is the seller or buyer based on role
    let buyerId: string | null = null;
    let sellerId: string | null = auth.user.id;

    if (role === "Buyer") {
      buyerId = auth.user.id;
      sellerId = null; // Will be set later when seller joins
    }

    const { data, error } = await supabaseAdmin
      .from("escrow_transactions")
      .insert({
        title,
        seller_id: sellerId,
        buyer_id: buyerId,
        currency,
        status: "pending",
        inspection_period: inspectionPeriod,
        items: items, // JSON array
        created_at: new Date(),
      })
      .select();

    if (error) {
      console.error("Error creating transaction:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: "Failed to create transaction" }, { status: 500 });
    }

    return NextResponse.json({ success: true, transaction: data[0] }, { status: 200 });
  } catch (err) {
    console.error("Transaction create error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}