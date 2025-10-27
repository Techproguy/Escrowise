'use client'

import { useState, useEffect } from 'react';
import { supabase } from '@/src/supabaseClient';
import { DollarSign, CheckCircle2, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function PayoutManager() {
  const [pendingPayouts, setPendingPayouts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const loadPendingPayouts = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const res = await fetch('/api/admin/financial/payouts/pending', {
        headers: { 'x-admin-id': user.id },
      });

      if (res.ok) {
        const data = await res.json();
        setPendingPayouts(data);
      }
      setLoading(false);
    };

    loadPendingPayouts();
  }, []);

  const processPayouts = async () => {
    setProcessing(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    try {
      const res = await fetch('/api/admin/financial/payouts/process', {
        method: 'POST',
        headers: { 'x-admin-id': user.id },
      });

      if (res.ok) {
        const result = await res.json();
        setPendingPayouts([]);
        // TODO: Show success notification
      }
    } catch (error) {
      console.error('Payout processing failed:', error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Pending Payouts</CardTitle>
          <Button 
            onClick={processPayouts} 
            disabled={pendingPayouts.length === 0 || processing}
          >
            {processing ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <CheckCircle2 className="h-4 w-4 mr-2" />
            )}
            Process All Payouts
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : pendingPayouts.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Account</TableHead>
                <TableHead>Requested</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingPayouts.map((payout) => (
                <TableRow key={payout.id}>
                  <TableCell>{payout.user?.full_name}</TableCell>
                  <TableCell>${payout.amount.toFixed(2)}</TableCell>
                  <TableCell>{payout.bank_account?.last4 || 'N/A'}</TableCell>
                  <TableCell>
                    {new Date(payout.created_at).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
            <DollarSign className="h-8 w-8" />
            <p>No pending payouts</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
