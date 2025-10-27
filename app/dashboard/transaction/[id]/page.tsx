"use client";
import TransactionPage from "@/components/dashboard/TransactionPage"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/src/supabaseClient";

export default function TransactionDetailPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await supabase.auth.getUser();
      setUser(user.data.user);
      setLoading(false);
      if (!user.data.user) {
        router.push("/login");
      }
    };
    fetchUser();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Access denied. Redirecting to login...</div>;
  }

  return <TransactionPage />;
}
