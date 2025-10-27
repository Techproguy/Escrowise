import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { headers } from "next/headers";

export async function GET() {
  const headersList = await headers();
  const adminId = headersList.get("x-admin-id");
  if (!adminId) {
    return NextResponse.json({ error: "Missing admin id" }, { status: 401 });
  }

  // Basic role check – assumes you have role column on user_profiles
  const { data: admin, error: adminErr } = await supabaseAdmin
    .from("user_profiles")
    .select("role")
    .eq("id", adminId)
    .single();

  if (adminErr || !admin || admin.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
  const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

  // Pending escrows (transactions not yet completed)
  const { count: pendingEscrows = 0 } = await supabaseAdmin
    .from("transactions")
    .select("id", { count: "exact", head: true })
    .eq("status", "pending");

  // Awaiting verification – count pending rows in verification_queue
  const { count: awaitingVerification = 0 } = await supabaseAdmin
    .from("verification_queue")
    .select("id", { count: "exact", head: true })
    .eq("status", "pending");

  // Completed transactions today / week / month
  const completedFilter = (since: string) =>
    supabaseAdmin
      .from("transactions")
      .select("id", { count: "exact", head: true })
      .eq("status", "completed")
      .gte("updated_at", since);

  const { count: completedToday = 0 } = await completedFilter(todayStart);
  const { count: completedWeek = 0 } = await completedFilter(weekStart);
  const { count: completedMonth = 0 } = await completedFilter(monthStart);

  // Revenue analytics – sum of price for completed transactions this month (assumes numeric column "price")
  const { data: revenueRows, error: revenueErr } = await supabaseAdmin
    .from("transactions")
    .select("price")
    .eq("status", "completed")
    .gte("updated_at", monthStart);

  const revenueMonth = revenueErr || !revenueRows?.length
    ? 0
    : revenueRows.reduce((sum: number, row: any) => sum + Number(row.price), 0);

  return NextResponse.json({
    pendingEscrows,
    awaitingVerification,
    completedToday,
    completedWeek,
    completedMonth,
    revenueMonth,
  });
}
