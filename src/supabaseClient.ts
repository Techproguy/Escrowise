import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/types/database.types';

// Singleton Supabase client for browser components

export const supabase = createClientComponentClient<Database>();

