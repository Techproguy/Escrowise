import { NextResponse } from 'next/server';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from '@/types/database.types';

/**
 * Middleware to check if user is authenticated
 * @returns {Promise<NextResponse | { user: { id: string, email: string } }>}
 */
export const requireAdmin = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  
  const { data, error } = await supabase.auth.getSession();
  
  if (error || !data?.session) {
    return new NextResponse(
      JSON.stringify({ error: 'Not authenticated' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }
  
  return { user: data.session.user };
};
