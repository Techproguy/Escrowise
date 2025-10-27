"use client";

import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/src/supabaseClient";

interface Action {
  title: string;
  href: string;
  count: number;
}

export default function QuickActions() {
  const [actions, setActions] = React.useState<Action[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const load = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      // Pending verifications
      const res = await fetch("/api/admin/verifications/pending", {
        headers: { "x-admin-id": user.id },
      });
      const json = await res.json();
      const identityCount = json.identity?.length ?? 0;
      const paymentCount = json.payment?.length ?? 0;

      setActions([
        {
          title: "ID Verifications",
          href: "/admin/verifications/identity",
          count: identityCount,
        },
        {
          title: "Payment Verifications",
          href: "/admin/verifications/payment",
          count: paymentCount,
        },
        {
          title: "Disputes Queue",
          href: "/admin/disputes",
          count: 0, // you can fetch real count here later
        },
        {
          title: "System Alerts",
          href: "/admin/alerts",
          count: 0,
        },
      ]);
      setLoading(false);
    };
    load();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-500">Loading...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-bold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {actions.map((action) => (
            <li key={action.title} className="flex items-center justify-between">
              <Link href={action.href} className="text-sm font-medium hover:text-orange-600">
                {action.title}
              </Link>
              {action.count > 0 && (
                <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                  {action.count}
                </Badge>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
