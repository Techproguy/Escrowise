"use client";
import TransactionsHeader from "@/components/admin/TransactionsHeader"
import TransactionsTable from "@/components/admin/TransactionsTable"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const supabase = createClientComponentClient();

export default function TransactionsPage() {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // First, check if we have a session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError || !session?.user) {
          router.replace('/admin-login');
          return;
        }

        // Then check if the user is an admin
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();

        if (profileError || !profileData) {
          router.replace('/');
          return;
        }

        if (profileData.role === 'admin') {
          setIsAdmin(true);
        } else {
          router.replace('/');
          return;
        }
      } catch (error) {
        console.error('Authentication error:', error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        router.push('/login');
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [router, supabase.auth]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen text-lg">Loading...</div>;
  }
  

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tighter text-black">Transaction Management</h1>

      <TransactionsHeader />
      <TransactionsTable />
    </div>
  )
}

