import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { requireAdmin } from '@/lib/auth';

type BalanceResult = {
  total_held: number | null;
  total_available: number | null;
}[];

export async function GET() {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  const { data, error } = await supabaseAdmin
    .from('escrow_balances')
    .select('SUM(held_balance) as total_held, SUM(available_balance) as total_available')
    .returns<BalanceResult>();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    total_held: Number(data[0].total_held) || 0,
    total_available: Number(data[0].total_available) || 0
  }, { status: 200 });
}
