import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { requireAdmin } from '@/lib/middleware/auth';
import { runScheduledReports } from '@/lib/reportScheduler';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  try {
    // Get the specific report
    const { data: report, error: fetchError } = await supabaseAdmin
      .from('scheduled_reports')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError) throw fetchError;
    if (!report) throw new Error('Report not found');

    // Run just this report
    await runScheduledReports([report]);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
