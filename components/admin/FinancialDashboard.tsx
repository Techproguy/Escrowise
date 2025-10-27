'use client'

import { useState, useEffect } from 'react';
import { supabase } from '@/src/supabaseClient';
import { DollarSign, CreditCard, ArrowUpDown, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function FinancialDashboard() {
  const [totalHeld, setTotalHeld] = useState(0);
  const [totalAvailable, setTotalAvailable] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBalances = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get total platform balances
      const { data, error } = await supabase
        .from('escrow_balances')
        .select('held_balance, available_balance');

      if (error) {
        setTotalHeld(0);
        setTotalAvailable(0);
      } else if (data && data.length > 0) {
        const totalHeld = data.reduce((sum, row) => sum + (row.held_balance || 0), 0);
        const totalAvailable = data.reduce((sum, row) => sum + (row.available_balance || 0), 0);
        setTotalHeld(totalHeld);
        setTotalAvailable(totalAvailable);
      } else {
        setTotalHeld(0);
        setTotalAvailable(0);
      }
      setLoading(false);
    };

    loadBalances();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Held in Escrow</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {loading ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : (
            <div className="text-2xl font-bold">${totalHeld.toFixed(2)}</div>
          )}
          <p className="text-xs text-muted-foreground mt-1">
            Funds currently secured in escrow
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {loading ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : (
            <div className="text-2xl font-bold">${totalAvailable.toFixed(2)}</div>
          )}
          <p className="text-xs text-muted-foreground mt-1">
            Funds available for withdrawal
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
          <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" className="w-full">
            Process Payouts
          </Button>
          <Button variant="outline" className="w-full">
            Generate Report
          </Button>
          <Button variant="outline" className="w-full">
            View Transactions
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
