import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

// GET /api/admin/users/[id]/profile
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  const { data, error } = await supabaseAdmin
    .from("user_profiles")
    .select("*, escrow_transactions:escrow_transactions(*)")
    .eq("id", id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Fetch verification history
  const { data: verifications } = await supabaseAdmin
    .from("verification_queue")
    .select("*")
    .eq("user_id", id)
    .order("created_at", { ascending: false });

  return NextResponse.json({ profile: data, verifications });
}
