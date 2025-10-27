import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { requireAdmin } from '@/lib/auth';

export async function GET() {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  // Get all admin users (profiles with admin role)
  const { data: admins, error } = await supabaseAdmin
    .from('profiles')
    .select(`
      *,
      roles:admin_user_roles(role:admin_roles(*))
    `)
    .eq('role', 'admin');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Format the data
  const formattedAdmins = admins.map(admin => ({
    ...admin,
    roles: admin.roles?.map((r: any) => r.role?.name) || []
  }));

  return NextResponse.json(formattedAdmins, { status: 200 });
}
