"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/src/supabaseClient";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Props {
  userId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** optional: called after the profile row is updated */
  onProfileUpdated?: () => void;
}

interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string;
  role: string;
  status: string | null;
  verification_status: string | null;
  created_at: string;
}

interface Transaction {
  id: string;
  amount: number;
  status: string;
  created_at: string;
}

interface Withdrawal {
  id: string;
  amount: number;
  status: string;
  created_at: string;
}

export const UserDetailsDrawer = ({ userId, open, onOpenChange, onProfileUpdated }: Props) => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [withdrawal, setWithdrawal] = useState<Withdrawal | null>(null);
  const [docs, setDocs] = useState<string[]>([]);

  useEffect(() => {
    if (!open || !userId) return;

    const load = async () => {
      setLoading(true);
      // fetch profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("id, first_name, last_name, email, role, status, verification_status, created_at")
        .eq("id", userId)
        .single();
      setProfile(profileData as any);

      // transactions where buyer or seller
      const { data: trx } = await supabase
        .from("transactions")
        .select("id, amount, status, created_at")
        .or(`buyer_id.eq.${userId},seller_id.eq.${userId}`)
        .order("created_at", { ascending: false })
        .limit(50);
      setTransactions(trx || []);

      // latest withdrawal
      const { data: wd } = await supabase
        .from("withdrawals")
        .select("id, amount, status, created_at")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      setWithdrawal(wd as any);

      // verification docs - assume using storage bucket "kyc" with folder per user id
      const { data: docList } = await supabase.storage.from("kyc").list(userId);
      if (docList) {
        const urls = await Promise.all(
          docList.map((f) => {
            const { data } = supabase.storage.from("kyc").getPublicUrl(`${userId}/${f.name}`);
            return data.publicUrl;
          })
        );
        setDocs(urls);
      }
      setLoading(false);
    };

    load();
  }, [open, userId]);

  const approveVerification = async () => {
    if (!userId) return;
    const { error } = await supabase
      .from("profiles")
      .update({ verification_status: "approved" })
      .eq("id", userId);
    if (!error) {
      setProfile((p) => (p ? { ...p, verification_status: "approved" } : p));
      onProfileUpdated?.();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl overflow-y-auto max-h-screen">
        <DialogHeader>
          <DialogTitle>User details</DialogTitle>
          <DialogDescription>
            Detailed information, transactions, verification documents and withdrawals.
          </DialogDescription>
        </DialogHeader>
        {loading || !profile ? (
          <div className="py-10 text-center">Loading...</div>
        ) : (
          <Tabs defaultValue="profile" className="w-full mt-4">
            <TabsList>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="verification">Verification</TabsTrigger>
              <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
            </TabsList>
            <TabsContent value="profile">
              <div className="grid gap-2 text-sm mt-4">
                <div>
                  <span className="font-medium">Name:</span> {profile.first_name} {profile.last_name}
                </div>
                <div>
                  <span className="font-medium">Email:</span> {profile.email}
                </div>
                <div>
                  <span className="font-medium">Role:</span> {profile.role}
                </div>
                <div>
                  <span className="font-medium">Status:</span> {profile.status}
                </div>
                <div>
                  <span className="font-medium">Joined:</span> {new Date(profile.created_at).toLocaleDateString()}
                </div>
                <div>
                  <span className="font-medium">Verification:</span>{" "}
                  <Badge>{profile.verification_status ?? "pending"}</Badge>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="transactions">
              {transactions.length === 0 ? (
                <p className="mt-4 text-sm text-gray-500">No transactions.</p>
              ) : (
                <Table className="mt-4">
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((t) => (
                      <TableRow key={t.id}>
                        <TableCell>{t.id}</TableCell>
                        <TableCell>${t.amount}</TableCell>
                        <TableCell>{t.status}</TableCell>
                        <TableCell>{new Date(t.created_at).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </TabsContent>
            <TabsContent value="verification">
              <div className="mt-4 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Status:</span>
                  <Badge>{profile.verification_status ?? "pending"}</Badge>
                  {profile.verification_status !== "approved" && (
                    <Button size="sm" onClick={approveVerification}>
                      Approve
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {docs.length === 0 ? (
                    <p className="text-sm text-gray-500 col-span-2">No documents uploaded.</p>
                  ) : (
                    docs.map((url) => (
                      <img key={url} src={url} alt="doc" className="w-full rounded-md border" />
                    ))
                  )}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="withdrawals">
              {withdrawal ? (
                <div className="mt-4 space-y-2 text-sm">
                  <div>
                    <span className="font-medium">ID:</span> {withdrawal.id}
                  </div>
                  <div>
                    <span className="font-medium">Amount:</span> ${withdrawal.amount}
                  </div>
                  <div>
                    <span className="font-medium">Status:</span> {withdrawal.status}
                  </div>
                  <div>
                    <span className="font-medium">Date:</span>{" "}
                    {new Date(withdrawal.created_at).toLocaleDateString()}
                  </div>
                </div>
              ) : (
                <p className="mt-4 text-sm text-gray-500">No withdrawals found.</p>
              )}
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
};
