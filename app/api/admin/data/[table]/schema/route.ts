import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

// GET /api/admin/data/[table]/schema - Get table schema
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
      .rpc('get_table_schema', { table_name: table });

    if (error) {
      // Fallback to a simple query if the RPC doesn't exist
      const { data: fallbackData, error: fallbackError } = await supabaseAdmin
        .from('information_schema.columns')
        .select('column_name, data_type, is_nullable, column_default')
        .eq('table_name', table)
        .eq('table_schema', 'public');

      if (fallbackError) {
        return NextResponse.json({ error: fallbackError.message }, { status: 500 });
      }

      return NextResponse.json(fallbackData);
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch schema" }, { status: 500 });
  }
}






