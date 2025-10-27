"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight, Check, X } from "lucide-react"
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { supabase } from "@/src/supabaseClient"

interface UserProfile {
  id: string;
  full_name: string | null;
  role: string;
  verification_status: string;
}

interface Payload {
  new: UserProfile;
}

interface DisplayUser {
  id: string;
  name: string;
  email: string;
  role: string;
  verified: boolean;
}

export default function RecentUsers() {
  const [users, setUsers] = useState<UserProfile[]>([]);

  useEffect(() => {
    const load = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      const res = await fetch("/api/admin/users?limit=5", {
        headers: { "x-admin-id": user.id },
      });
      const json = await res.json() as UserProfile[];
      setUsers(json);
    };

    load();

    const channel = supabase
      .channel("admin-users")
      .on(
        "postgres_changes" as any, // Type assertion to fix event type error
        { event: "*", schema: "public", table: "user_profiles" },
        (payload: { new: UserProfile }) => {
          setUsers((prev) => {
            const idx = prev.findIndex((u) => u.id === payload.new.id);
            let updated = [...prev];
            if (idx !== -1) {
              updated[idx] = { ...updated[idx], ...payload.new };
            } else {
              updated = [payload.new, ...updated];
            }
            return updated.slice(0, 5);
          });
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  if (!users.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold">Recent Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-500">No users yet.</div>
        </CardContent>
      </Card>
    );
  }

  // Map to display format
  const displayUsers = users.map((u): DisplayUser => ({
    id: u.id,
    name: u.full_name ?? "-",
    email: "",
    role: u.role,
    verified: u.verification_status === "verified",
  }));

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-bold">Recent Users</CardTitle>
        <Link href="/admin/users" className="text-sm text-orange-600 hover:text-orange-700 font-medium">
          View all
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="hidden sm:grid grid-cols-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
            <div className="col-span-2">User</div>
            <div>Role</div>
            <div>Status</div>
          </div>

          {displayUsers.map((user) => (
            <Link
              href={`/admin/users/${user.id}`}
              key={user.id}
              className="grid grid-cols-2 sm:grid-cols-4 gap-2 py-3 px-2 -mx-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="col-span-2 hidden sm:flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-600 mr-3">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <div className="font-medium">{user.name}</div>
                  <div className="text-xs text-gray-500">{user.email}</div>
                </div>
              </div>
              <div className="sm:hidden">
                <div className="font-medium">{user.name}</div>
                <div className="text-xs text-gray-500">{user.email}</div>
              </div>
              <div className="capitalize text-gray-600">{user.role}</div>
              <div className="flex items-center justify-between">
                <Badge
                  className={
                    user.verified
                      ? "bg-green-100 text-green-800 hover:bg-green-200"
                      : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                  }
                  variant="outline"
                >
                  {user.verified ? <Check className="h-3 w-3 mr-1" /> : <X className="h-3 w-3 mr-1" />}
                  {user.verified ? "Verified" : "Unverified"}
                </Badge>
                <ChevronRight className="h-4 w-4 text-gray-400 sm:ml-2" />
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
