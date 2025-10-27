import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

// GET /api/admin/users/[id] - Get user details
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  const { data, error } = await supabaseAdmin
    .from("profiles")
    .select(`
      *,
      transactions:escrow_transactions(*)
    `)
    .eq("id", id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(data);
}

// PUT /api/admin/users/[id] - Update user
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  const { data: { user } } = await supabaseAdmin.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const updateData = await req.json();
    
    // Get current user data for audit log
    const { data: currentUser } = await supabaseAdmin
      .from("profiles")
      .select("*")
      .eq("id", id)
      .single();

    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Prevent admins from changing their own role to non-admin
    if (user.id === id && updateData.role && updateData.role !== "admin") {
      return NextResponse.json({ 
        error: "Cannot change your own admin role" 
      }, { status: 400 });
    }

    // Update user profile
    const { data, error } = await supabaseAdmin
      .from("profiles")
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
    await supabaseAdmin
      .from("audit_logs")
      .insert({
        action: "UPDATE_USER",
        entity_type: "user",
        entity_id: id,
        old_value: currentUser,
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

// DELETE /api/admin/users/[id] - Deactivate user
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  const { data: { user } } = await supabaseAdmin.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Prevent admins from deactivating themselves
    if (user.id === id) {
      return NextResponse.json({ 
        error: "Cannot deactivate your own account" 
      }, { status: 400 });
    }

    // Get current user data for audit log
    const { data: currentUser } = await supabaseAdmin
      .from("profiles")
      .select("*")
      .eq("id", id)
      .single();

    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update user status to inactive instead of deleting
    const { data, error } = await supabaseAdmin
      .from("profiles")
      .update({
        status: "inactive",
        updated_at: new Date().toISOString()
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Log the deactivation in audit logs
    await supabaseAdmin
      .from("audit_logs")
      .insert({
        action: "DEACTIVATE_USER",
        entity_type: "user",
        entity_id: id,
        old_value: currentUser,
        new_value: data,
        performed_by: user.id,
        ip_address: req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown",
        user_agent: req.headers.get("user-agent") || "unknown"
      });

    return NextResponse.json({ 
      message: "User deactivated successfully",
      user: data 
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to deactivate user" }, { status: 500 });
  }
}
