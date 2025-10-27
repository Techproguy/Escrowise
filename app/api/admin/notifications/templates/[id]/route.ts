import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { requireAdmin } from '@/lib/auth'; // Fixed import path

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
  const templateData = await req.json();

  const { data, error } = await supabaseAdmin
    .from('notification_templates')
    .update({
      ...templateData,
      updated_by: user.id // We've already checked that user is not null
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}
