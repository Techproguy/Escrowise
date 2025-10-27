import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { requireAdmin } from "@/lib/adminAuth";

// POST /api/admin/verifications/[id]/review
// Body: { status: 'approved' | 'rejected', notes?: string }
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  // Admin auth
  const authResult = await requireAdmin();
  if (authResult instanceof NextResponse) return authResult;
  const { adminId } = authResult;

  const { status, notes } = await req.json();
  if (!status || !["approved", "rejected"].includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const verificationId = id;

  // Determine verification type
  const { data: verification, error } = await supabaseAdmin
    .from("verification_queue")
    .select("type")
    .eq("id", verificationId)
    .single();

  if (error || !verification) {
    return NextResponse.json({ error: "Verification not found" }, { status: 404 });
  }

  const functionName = verification.type === "identity" ? "verify-identity" : "verify-payment";

  const { data, error: fnErr } = await supabaseAdmin.functions.invoke(functionName, {
    body: {
      verification_id: verificationId,
      status,
      notes,
      admin_id: adminId
    }
  });

  if (fnErr) {
    return NextResponse.json({ error: fnErr.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, data });
}
