import React, { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronRight, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

// Define transaction type
interface Transaction {
  id: string;
  user_id: string;
  amount: number;
  description: string;
  status: string;
  created_at: string;
  user_email: string;
  user_full_name: string;
}

const EnhancedRecentTransactions: React.FC = () => {
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = React.useState<string | null>(null);
  const supabase = createClientComponentClient();

  const [refreshKey, setRefreshKey] = useState(0);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('transactions')
        .select(`id, amount, description, status, created_at,
                users: user_id (email, first_name, last_name)`)
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) {
        console.error('Error fetching transactions:', error.message);
        setError('Failed to load transactions.');
        return;
      }

      if (data) {
        setTransactions(data.map((t: any) => ({
          ...t,
          user_email: t.users.email,
          user_full_name: `${t.users.first_name} ${t.users.last_name}`,
        })));
        setLastUpdated(new Date().toLocaleString());
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();

    const subscription = supabase
      .channel('transactions:changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'transactions' }, () => {
        fetchTransactions();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [supabase, refreshKey]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-green-500" />;
      case 'failed':
        return <XCircle className="text-red-500" />;
      case 'pending':
        return <Clock className="text-yellow-500" />;
      default:
        return null;
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    setError(null);
    setTransactions([]);
    setRefreshKey(prev => prev + 1);
  };

  if (loading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-bold">Recent Transactions</CardTitle>
          <button onClick={handleRefresh} className="text-sm text-orange-600 hover:text-orange-700 font-medium">
            Refresh
          </button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-2 bg-slate-200 rounded"></div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                      <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-bold">Recent Transactions</CardTitle>
          <button onClick={handleRefresh} className="text-sm text-orange-600 hover:text-orange-700 font-medium">
            Refresh
          </button>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4 text-red-600">{error}</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-bold">Recent Transactions</CardTitle>
        <button onClick={handleRefresh} className="text-sm text-orange-600 hover:text-orange-700 font-medium">
          Refresh
        </button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.length === 0 ? (
            <div className="text-center py-4 text-gray-500">No transactions found.</div>
          ) : (
            transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 bg-white shadow rounded-lg hover:bg-gray-50 transition">
                <div className="flex items-center">
                  {getStatusDisplay(transaction.status)}
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">{transaction.description}</div>
                    <div className="text-xs text-gray-500">
                      {transaction.user_full_name || transaction.user_email} - {formatDate(transaction.created_at)}
                    </div>
                  </div>
                </div>
                <div className="text-sm font-medium text-gray-900">
                  {formatCurrency(transaction.amount)}
                </div>
              </div>
            ))
          )}
        </div>
        <div className="text-xs text-gray-500 mt-4">Last updated: {lastUpdated}</div>
      </CardContent>
    </Card>
  );
};

export default EnhancedRecentTransactions;
