import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

// GET /api/admin/verifications/pending
// Returns { identity: [...], payment: [...] }
export async function GET() {
  // Ensure caller is admin: this example expects client to include X-Admin-Id header.
  const headersList = await headers();
  const adminId = headersList.get("x-admin-id");
  if (!adminId) {
    return NextResponse.json({ error: "Missing admin id" }, { status: 401 });
  }

  const { data: admin, error: adminErr } = await supabaseAdmin
    .from("user_profiles")
    .select("role")
    .eq("id", adminId)
    .single();

  if (adminErr || !admin || admin.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { data: identity } = await supabaseAdmin
    .from("verification_queue")
    .select("*")
    .eq("type", "identity")
    .eq("status", "pending");

  const { data: payment } = await supabaseAdmin
    .from("verification_queue")
    .select("*")
    .eq("type", "payment")
    .eq("status", "pending");

  return NextResponse.json({ identity, payment });
}