import { supabase } from './supabaseClient';

import type { User } from '@supabase/supabase-js';

export const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${location.origin}/login`,
      data: {
        first_name: firstName,
        last_name: lastName,
      }
    }
  });
  if (error) throw error;

  // No need to insert into profiles table; trigger handles it
  const user: User | null = data.user ?? null;
  if (!user || !user.id) {
    throw new Error('Sign up successful! Please check your email to confirm your account before logging in.');
  }
  return user;
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data?.user;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};
