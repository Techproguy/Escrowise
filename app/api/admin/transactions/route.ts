import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

// GET /api/admin/transactions
export async function GET(req: Request) {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const search = searchParams.get("search");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  const offset = (page - 1) * limit;

  let query = supabaseAdmin
    .from("escrow_transactions")
    .select(`
      *,
      buyer:profiles!escrow_transactions_buyer_id_fkey(*),
      seller:profiles!escrow_transactions_seller_id_fkey(*)
    `, { count: "exact" })
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (status) {
    query = query.eq("status", status);
  }

  if (search) {
    query = query.or(
      `id.ilike.%${search}%,description.ilike.%${search}%,buyer.full_name.ilike.%${search}%,seller.full_name.ilike.%${search}%`
    );
  }

  const { data, error, count } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data, total: count }, { status: 200 });
}
