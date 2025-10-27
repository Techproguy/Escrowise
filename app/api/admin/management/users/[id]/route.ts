import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { requireAdmin } from '@/lib/auth';
import { logAdminChange } from '@/lib/auditLogger';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  const { data: { user } } = await supabaseAdmin.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 401 });
  }
  const { role_id } = await req.json();

  // Get current user data for audit log
  const { data: currentUser } = await supabaseAdmin
    .from('admin_user_roles')
    .select('*')
    .eq('user_id', id)
    .single();

  const { data, error } = await supabaseAdmin
    .from('admin_user_roles')
    .upsert({
      user_id: id,
      role_id,
      assigned_by: user.id // We've already checked that user is not null
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Log the change
  await logAdminChange(
    currentUser ? 'update' : 'create',
    id,
    currentUser || null,
    data
  );

  return NextResponse.json(data, { status: 200 });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  // Get current user data for audit log
  const { data: currentUser } = await supabaseAdmin
    .from('admin_user_roles')
    .select('*')
    .eq('user_id', id)
    .single();

  const { error } = await supabaseAdmin
    .from('admin_user_roles')
    .delete()
    .eq('user_id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Log the deletion
  await logAdminChange(
    'delete',
    id,
    currentUser,
    null
  );

  return NextResponse.json({ success: true }, { status: 200 });
}
