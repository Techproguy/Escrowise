import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

// GET /api/admin/data/[table] - Get table data
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ table: string }> }
) {
  const { table } = await params;
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  // Validate table name to prevent SQL injection
  const allowedTables = [
    "profiles",
    "transactions", 
    "escrow_transactions",
    "disputes",
    "audit_logs",
    "verification_queue"
  ];

  if (!allowedTables.includes(table)) {
    return NextResponse.json({ error: "Table not allowed" }, { status: 403 });
  }

  try {
    const { data, error } = await supabaseAdmin
      .from(table)
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100); // Limit to prevent large data loads

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}



