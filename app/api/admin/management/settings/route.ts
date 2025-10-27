import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { requireAdmin } from '@/lib/auth';

export async function GET() {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  const { data: settings, error } = await supabaseAdmin
    .from('system_settings')
    .select('*');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(settings, { status: 200 });
}

export async function PUT(req: Request) {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  const { data: { user } } = await supabaseAdmin.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 401 });
  }
  const { key, value } = await req.json();

  const { data, error } = await supabaseAdmin
    .from('system_settings')
    .upsert({
      key,
      value,
      updated_by: user.id // We've already checked that user is not null
    })
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data[0], { status: 200 });
}
