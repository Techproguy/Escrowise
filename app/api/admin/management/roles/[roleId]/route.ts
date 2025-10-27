import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { requireAdmin } from '@/lib/auth';
import { logAdminChange } from '@/lib/auditLogger';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ roleId: string }> }
) {
  const { roleId } = await params;
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  const { data: { user } } = await supabaseAdmin.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 401 });
  }
  const { name, description } = await req.json();

  // Get current role data for audit log
  const { data: currentRole } = await supabaseAdmin
    .from('admin_roles')
    .select('*')
    .eq('id', roleId)
    .single();

  const { data, error } = await supabaseAdmin
    .from('admin_roles')
    .update({
      name,
      description,
      updated_by: user.id // We've already checked that user is not null
    })
    .eq('id', roleId)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Log the change
  await logAdminChange(
    'update',
    roleId,
    currentRole,
    data
  );

  return NextResponse.json(data, { status: 200 });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ roleId: string }> }
) {
  const { roleId } = await params;
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  // Get current role data for audit log
  const { data: currentRole } = await supabaseAdmin
    .from('admin_roles')
    .select('*')
    .eq('id', roleId)
    .single();

  const { error } = await supabaseAdmin
    .from('admin_roles')
    .delete()
    .eq('id', roleId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Log the deletion
  await logAdminChange(
    'delete',
    roleId,
    currentRole,
    null
  );

  return NextResponse.json({ success: true }, { status: 200 });
}
