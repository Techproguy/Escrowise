"use client";
import DashboardStats from "@/components/admin/DashboardStats"
import RecentTransactions from "@/components/admin/RecentTransactions"
import EnhancedRecentTransactions from "@/components/admin/EnhancedRecentTransactions";
import RecentUsers from "@/components/admin/RecentUsers"
import QuickActions from "@/components/admin/QuickActions"
import RecentActivity from "@/components/admin/RecentActivity"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();

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
    // Render nothing while checking auth, so unauthorized users never see the page
    return null;
  }
  
  if (!isAdmin) {
    return <div className="flex justify-center items-center min-h-screen text-lg text-red-600">
      Access Denied: You do not have admin privileges. <a href="/" className="text-blue-500 hover:underline ml-2">Go to Home</a>
    </div>;
  }
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tighter text-black">Admin Dashboard</h1>

      <DashboardStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <EnhancedRecentTransactions />
        <RecentUsers />
        <QuickActions />
      </div>

      <RecentActivity />
    </div>
  )
}
