import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { requireAdmin } from '@/lib/auth'; // Fixed import path

export async function GET() {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  const { data: { user } } = await supabaseAdmin.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 401 });
  }
  
  const { data, error } = await supabaseAdmin
    .from('admin_notification_settings')
    .select('*')
    .eq('user_id', user.id) // We've already checked that user is not null
    .single();

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(data || {
    login_notifications: true,
    report_notifications: true,
    audit_alerts: true
  }, { status: 200 });
}

export async function POST(req: Request) {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  const { data: { user } } = await supabaseAdmin.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 401 });
  }
  const settings = await req.json();

  const { data, error } = await supabaseAdmin
    .from('admin_notification_settings')
    .upsert({
      user_id: user.id, // We've already checked that user is not null
      ...settings,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(data, { status: 200 });
}
