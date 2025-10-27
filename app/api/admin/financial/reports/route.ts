import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { requireAdmin } from '@/lib/auth';

export async function POST(req: Request) {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  const { type, start_date, end_date } = await req.json();
  const { data: { user } } = await supabaseAdmin.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 401 });
  }

  try {
    let query;
    let reportName;

    switch (type) {
      case 'transactions':
        reportName = 'Transaction Summary Report';
        query = supabaseAdmin
          .from('escrow_transactions')
          .select(`
            id,
            amount,
            status,
            created_at,
            buyer:profiles(full_name, email),
            seller:profiles(full_name, email)
          `)
          .gte('created_at', start_date)
          .lte('created_at', end_date)
          .order('created_at', { ascending: false });
        break;

      case 'balances':
        reportName = 'Escrow Balances Report';
        query = supabaseAdmin
          .from('escrow_balances')
          .select(`
            user:profiles(full_name, email),
            available_balance,
            held_balance,
            last_updated
          `)
          .order('last_updated', { ascending: false });
        break;

      case 'payouts':
        reportName = 'Payout Activity Report';
        query = supabaseAdmin
          .from('escrow_transactions')
          .select(`
            id,
            amount,
            status,
            completed_at,
            user:profiles(full_name, email)
          `)
          .eq('transaction_type', 'withdrawal')
          .gte('completed_at', start_date)
          .lte('completed_at', end_date)
          .order('completed_at', { ascending: false });
        break;

      case 'fees':
        reportName = 'Fee Collection Report';
        query = supabaseAdmin
          .from('escrow_transactions')
          .select(`
            id,
            amount,
            fee_amount,
            status,
            completed_at
          `)
          .not('fee_amount', 'is', null)
          .gte('completed_at', start_date)
          .lte('completed_at', end_date)
          .order('completed_at', { ascending: false });
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid report type' }, 
          { status: 400 }
        );
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      report_name: reportName,
      start_date,
      end_date,
      generated_at: new Date().toISOString(),
      generated_by: user.id, // We've already checked that user is not null
      data
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate report' }, 
      { status: 500 }
    );
  }
}
