import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { requireAdmin } from '@/lib/auth'; // Fixed import path

export async function GET() {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  const { data, error } = await supabaseAdmin
    .from('scheduled_reports')
    .select('*')
    .order('next_run_at', { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}

export async function POST(req: Request) {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  const { data: { user } } = await supabaseAdmin.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 401 });
  }
  const reportData = await req.json();

  // Calculate next run time
  const now = new Date();
  let nextRun = new Date();
  
  switch(reportData.frequency) {
    case 'daily': nextRun.setDate(now.getDate() + 1); break;
    case 'weekly': nextRun.setDate(now.getDate() + 7); break;
    case 'monthly': nextRun.setMonth(now.getMonth() + 1); break;
  }

  const { data, error } = await supabaseAdmin
    .from('scheduled_reports')
    .insert({
      ...reportData,
      next_run_at: nextRun.toISOString(),
      created_by: user.id // We've already checked that user is not null
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
