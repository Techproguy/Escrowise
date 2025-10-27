import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { Database } from '@/types/database.types';

export async function requireAdmin() {
  const supabase = createServerComponentClient<Database>({ cookies });
  
  const { data, error } = await supabase.auth.getSession();
  
  if (error || !data?.session) {
    return new NextResponse(
      JSON.stringify({ error: 'Not authenticated' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }
  
  return { user: data.session.user };
}

export async function requireAuth() {
  const supabase = createServerComponentClient<Database>({ cookies });
  
  const { data, error } = await supabase.auth.getSession();
  
  if (error || !data?.session) {
    return new NextResponse(
      JSON.stringify({ error: 'Not authenticated' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }
  
  const { session } = data;

  return { user: session.user };
}
