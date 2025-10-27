import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { requireAdmin } from '@/lib/auth';

export async function POST(req: Request) {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  const { template_id, variables } = await req.json();

  const { data: template, error } = await supabaseAdmin
    .from('notification_templates')
    .select('*')
    .eq('id', template_id)
    .single();

  if (error || !template) {
    return NextResponse.json(
      { error: 'Template not found' },
      { status: 404 }
    );
  }

  // Replace variables in subject and body
  let subject = template.subject;
  let body = template.body;

  for (const [key, value] of Object.entries(variables)) {
    subject = subject.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), value);
    body = body.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), value);
  }

  return NextResponse.json(
    { subject, body },
    { status: 200 }
  );
}
