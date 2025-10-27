import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

// PUT /api/admin/transactions/[id]/status
// Body: { status: string, notes?: string }
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;
  const { adminId } = auth;

  const { status, notes } = await req.json();
  if (!status) return NextResponse.json({ error: "Missing status" }, { status: 400 });

  // Direct status update + log action
  const { error } = await supabaseAdmin
    .from("escrow_transactions")
    .update({ status })
    .eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await supabaseAdmin.from("admin_actions").insert({
    admin_id: adminId,
    action_type: "transaction_status_update",
    target_id: id,
    target_type: "transaction",
    details: { status, notes }
  });

  return NextResponse.json({ success: true });
}
