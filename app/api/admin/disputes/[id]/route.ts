import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { requireAdmin } from '@/lib/auth';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  const { data: dispute, error } = await supabaseAdmin
    .from('disputes')
    .select(`
      *,
      transaction:escrow_transactions(*,
        buyer:profiles(*),
        seller:profiles(*)
      ),
      initiator:profiles(*),
      admin:profiles(*),
      evidence:dispute_evidence(*,
        uploaded_by:profiles(*)
      ),
      comments:dispute_comments(*,
        author:profiles(*)
      )
    `)
    .eq('id', (await params).id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(dispute, { status: 200 });
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  const { status, resolution, admin_id } = await req.json();
  
  const { data, error } = await supabaseAdmin
    .from('disputes')
    .update({
      status,
      resolution,
      admin_id,
      resolved_at: status === 'resolved' ? new Date().toISOString() : null
    })
    .eq('id', (await params).id)
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data[0], { status: 200 });
}
