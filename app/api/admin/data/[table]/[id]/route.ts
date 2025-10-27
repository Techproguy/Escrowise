import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

// PUT /api/admin/data/[table]/[id] - Update row
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ table: string; id: string }> }
) {
  const { table, id } = await params;
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

  const { data: { user } } = await supabaseAdmin.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const updateData = await req.json();
    
    // Get current data for audit log
    const { data: currentData } = await supabaseAdmin
      .from(table)
      .select("*")
      .eq("id", id)
      .single();

    if (!currentData) {
      return NextResponse.json({ error: "Row not found" }, { status: 404 });
    }

    // Remove system fields that shouldn't be updated
    const { id: _, created_at, ...allowedUpdates } = updateData;
    
    // Add updated_at timestamp
    const finalUpdateData = {
      ...allowedUpdates,
      updated_at: new Date().toISOString()
    };

    // Update the row
    const { data, error } = await supabaseAdmin
      .from(table)
      .update(finalUpdateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Log the change in audit logs
    await supabaseAdmin
      .from("audit_logs")
      .insert({
        action: `UPDATE_${table.toUpperCase()}`,
        entity_type: table,
        entity_id: id,
        old_value: currentData,
        new_value: data,
        performed_by: user.id,
        ip_address: req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown",
        user_agent: req.headers.get("user-agent") || "unknown"
      });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request data" }, { status: 400 });
  }
}

// DELETE /api/admin/data/[table]/[id] - Delete row
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ table: string; id: string }> }
) {
  const { table, id } = await params;
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

  const { data: { user } } = await supabaseAdmin.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Get current data for audit log
    const { data: currentData } = await supabaseAdmin
      .from(table)
      .select("*")
      .eq("id", id)
      .single();

    if (!currentData) {
      return NextResponse.json({ error: "Row not found" }, { status: 404 });
    }

    // Delete the row
    const { error } = await supabaseAdmin
      .from(table)
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Log the deletion in audit logs
    await supabaseAdmin
      .from("audit_logs")
      .insert({
        action: `DELETE_${table.toUpperCase()}`,
        entity_type: table,
        entity_id: id,
        old_value: currentData,
        new_value: null,
        performed_by: user.id,
        ip_address: req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown",
        user_agent: req.headers.get("user-agent") || "unknown"
      });

    return NextResponse.json({ message: "Row deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete row" }, { status: 500 });
  }
}
