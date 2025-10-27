import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

// GET /api/admin/analytics/dashboard
export async function GET() {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  // Aggregate counts
  const [{ data: pendingEscrows }, { data: awaitingVerify }, { data: completedEscrows }, { data: revenue }] = await Promise.all([
    supabaseAdmin.rpc("count_pending_escrows"),
    supabaseAdmin.rpc("count_awaiting_verification"),
    supabaseAdmin.rpc("count_completed_escrows"),
    supabaseAdmin.rpc("sum_revenue")
  ]);

  return NextResponse.json({
    pendingEscrows: pendingEscrows?.count ?? 0,
    awaitingVerification: awaitingVerify?.count ?? 0,
    completedEscrows: completedEscrows?.count ?? 0,
    revenue: revenue?.sum ?? 0
  });
}
