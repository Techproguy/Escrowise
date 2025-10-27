import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { requireAdminPermission, logAdminAction } from "@/lib/adminPermissions";
import { ADMIN_PERMISSIONS } from "@/lib/adminPermissions";

// GET /api/admin/transactions/[id] - Get transaction details
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  // Check permission
  const hasPermission = await requireAdminPermission(auth.adminId, ADMIN_PERMISSIONS.VIEW_TRANSACTIONS);
  if (!hasPermission) {
    return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 });
  }

  const { data, error } = await supabaseAdmin
    .from("escrow_transactions")
    .select(`
      *,
      buyer:profiles!escrow_transactions_buyer_id_fkey(*),
      seller:profiles!escrow_transactions_seller_id_fkey(*)
    `)
    .eq("id", id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
  }

  return NextResponse.json(data);
}

// PUT /api/admin/transactions/[id] - Update transaction
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  // Check permission
  const hasPermission = await requireAdminPermission(auth.adminId, ADMIN_PERMISSIONS.EDIT_TRANSACTIONS);
  if (!hasPermission) {
    return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 });
  }

  try {
    const updateData = await req.json();
    
    // Get current transaction data for audit log
    const { data: currentTransaction } = await supabaseAdmin
      .from("escrow_transactions")
      .select("*")
      .eq("id", id)
      .single();

    if (!currentTransaction) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
    }

    // Update transaction
    const { data, error } = await supabaseAdmin
      .from("escrow_transactions")
      .update({
        ...updateData,
        updated_at: new Date().toISOString()
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Log the change in audit logs
    await logAdminAction(
      auth.adminId,
      "UPDATE_TRANSACTION",
      "transaction",
      id,
      currentTransaction,
      data,
      req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || null,
      req.headers.get("user-agent") || null
    );

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request data" }, { status: 400 });
  }
}

// DELETE /api/admin/transactions/[id] - Cancel/Delete transaction
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  // Check permission
  const hasPermission = await requireAdminPermission(auth.adminId, ADMIN_PERMISSIONS.CANCEL_TRANSACTIONS);
  if (!hasPermission) {
    return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 });
  }

  try {
    // Get current transaction data for audit log
    const { data: currentTransaction } = await supabaseAdmin
      .from("escrow_transactions")
      .select("*")
      .eq("id", id)
      .single();

    if (!currentTransaction) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
    }

    // Check if transaction can be cancelled (not completed)
    if (currentTransaction.status === "completed") {
      return NextResponse.json({ 
        error: "Cannot cancel completed transaction" 
      }, { status: 400 });
    }

    // Update transaction status to cancelled instead of deleting
    const { data, error } = await supabaseAdmin
      .from("escrow_transactions")
      .update({
        status: "cancelled",
        updated_at: new Date().toISOString()
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Log the cancellation in audit logs
    await logAdminAction(
      auth.adminId,
      "CANCEL_TRANSACTION",
      "transaction",
      id,
      currentTransaction,
      data,
      req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || null,
      req.headers.get("user-agent") || null
    );

    return NextResponse.json({ 
      message: "Transaction cancelled successfully",
      transaction: data 
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to cancel transaction" }, { status: 500 });
  }
}