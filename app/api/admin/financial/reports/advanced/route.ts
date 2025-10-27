import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { requireAdmin } from '@/lib/middleware/auth';

export async function POST(req: Request) {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  const { reportType, filters } = await req.json();

  try {
    let query;
    let reportName;

    switch (reportType) {
      case 'dispute_analysis':
        reportName = 'Dispute Analysis Report';
        query = supabaseAdmin
          .from('disputes')
          .select(`
            id,
            status,
            reason,
            created_at,
            resolved_at,
            transaction:escrow_transactions(amount, status),
            initiator:profiles(full_name, email)
          `)
          .gte('created_at', filters?.startDate || '1970-01-01')
          .lte('created_at', filters?.endDate || 'now()')
          .order('created_at', { ascending: false });
        break;

      case 'user_activity':
        reportName = 'User Activity Report';
        query = supabaseAdmin
          .from('profiles')
          .select(`
            id,
            full_name,
            email,
            last_sign_in_at,
            transaction_stats:escrow_transactions(
              count,
              status,
              total:amount
            )
          `)
          .gte('last_sign_in_at', filters?.startDate || '1970-01-01')
          .lte('last_sign_in_at', filters?.endDate || 'now()')
          .order('last_sign_in_at', { ascending: false });
        break;

      case 'revenue_analysis':
        reportName = 'Revenue Analysis Report';
        query = supabaseAdmin
          .from('escrow_transactions')
          .select(`
            date:date_trunc('day', created_at),
            count,
            total_fees:sum(fee_amount),
            total_amount:sum(amount)
          `)
          .gte('created_at', filters?.startDate || '1970-01-01')
          .lte('created_at', filters?.endDate || 'now()')
          .order('date', { ascending: true });
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
      generated_at: new Date().toISOString(),
      filters,
      data
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate report' }, 
      { status: 500 }
    );
  }
}
