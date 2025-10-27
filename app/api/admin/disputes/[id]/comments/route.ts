import { NextResponse, NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { requireAdmin } from '@/lib/auth';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  const { content, is_admin_only } = await req.json();
  const {
    data: { user }
  } = await supabaseAdmin.auth.getUser();

  // Ensure we have a valid authenticated user
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // Add comment
  const { data: comment, error } = await supabaseAdmin
    .from('dispute_comments')
    .insert({
      dispute_id: (await params).id,
      author_id: user.id,
      content,
      is_admin_only
    })
    .select('*, author:profiles(*)')
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Get updated dispute with all relations
  const { data: dispute } = await supabaseAdmin
    .from('disputes')
    .select(`
      *,
      transaction:escrow_transactions(*),
      initiator:profiles(*),
      admin:profiles(*),
      evidence:dispute_evidence(*),
      comments:dispute_comments(*, author:profiles(*))
    `)
    .eq('id', (await params).id)
    .single();

  return NextResponse.json(dispute, { status: 201 });
}
