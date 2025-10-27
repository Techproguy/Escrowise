import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { requireAdmin } from '@/lib/auth';

export async function GET() {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  const { data, error } = await supabaseAdmin
    .from('admin_roles')
    .select('*, permissions:role_permissions(permission:permission_types(*))')
    .order('created_at', { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Format the data
  const formattedData = data.map(role => ({
    ...role,
    permissions: role.permissions.map((rp: any) => rp.permission)
  }));

  return NextResponse.json(formattedData, { status: 200 });
}
