"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { supabase } from "@/src/supabaseClient"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  ChevronLeft, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Loader2,
  XCircle
} from "lucide-react"

export default function TransactionDetails({ transactionId }: { transactionId: string }) {
  const [transaction, setTransaction] = useState<any>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = useSupabaseClient();

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get transaction details
      const res = await fetch(`/api/admin/transactions/${transactionId}`, {
        headers: { "x-admin-id": user.id },
      });
      const txData = await res.json();
      setTransaction(txData);

      // Get transaction events
      const { data, error } = await supabase
        .from('transaction_events')
        .select(`
          *,
          admin:profiles(admin_id, full_name, avatar_url)
        `)
        .eq('transaction_id', transactionId)
        .order('created_at', { ascending: false });

      if (!error) {
        setEvents(data || []);
      }

      // Subscribe to new events
      const channel = supabase
        .channel(`transaction_events_${transactionId}`)
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'transaction_events',
            filter: `transaction_id=eq.${transactionId}`
          },
          (payload) => {
            setEvents(prev => [payload.new, ...prev]);
          }
        )
        .subscribe();

      setLoading(false);
      return () => {
        supabase.removeChannel(channel);
      };
    };

    load();
  }, [transactionId, supabase]);

  const handleStatusUpdate = async (newStatus: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    try {
      const res = await fetch(`/api/admin/transactions/${transactionId}/status`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "x-admin-id": user.id 
        },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (!res.ok) throw new Error("Failed to update status");
      
      // Refresh data
      const updated = await res.json();
      setTransaction((prev: any) => ({
        ...prev,
        status: newStatus
      }));
      
      // Add to events
      setEvents(prev => [
        {
          event_type: "status_update",
          metadata: { status: newStatus, admin_id: user.id },
          created_at: new Date().toISOString()
        },
        ...prev
      ]);
    } catch (error) {
      console.error("Status update failed:", error);
    }
  };

  const StatusIcon = ({ status }: { status: string }) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 mr-1" />;
      case "pending":
        return <Clock className="h-4 w-4 mr-1" />;
      case "disputed":
        return <AlertCircle className="h-4 w-4 mr-1" />;
      default:
        return <Loader2 className="h-4 w-4 mr-1 animate-spin" />;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">Transaction not found</p>
      </div>
    );
  }

  function formatEvent(event: any) {
    switch (event.event_type) {
      case 'status_update':
        return `Status changed to ${event.metadata.status}`;
      case 'admin_note':
        return `Admin note added`;
      case 'payment_verified':
        return `Payment verified`;
      case 'dispute_opened':
        return `Dispute opened`;
      case 'dispute_resolved':
        return `Dispute resolved`;
      case 'funds_released':
        return `Funds released to seller`;
      case 'funds_held':
        return `Funds held in escrow`;
      case 'verification_requested':
        return `Verification requested`;
      case 'admin_comment':
        return `Admin comment added`;
      default:
        return formatEventType(event.event_type);
    }
  }

  function formatEventType(eventType: string) {
    return eventType
      .split("_")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  function getStatusBadgeStyle(status: string) {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "disputed":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  }

  return (
    <div className="space-y-6">
      <Button 
        variant="outline" 
        onClick={() => router.back()}
        className="flex items-center gap-2"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to transactions
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Transaction #{transaction.id}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">Buyer</h3>
              <p>{transaction.buyer?.full_name || "Unknown"}</p>
              <p className="text-sm text-gray-500">{transaction.buyer?.email}</p>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Seller</h3>
              <p>{transaction.seller?.full_name || "Unknown"}</p>
              <p className="text-sm text-gray-500">{transaction.seller?.email}</p>
            </div>

            <div>
              <h3 className="font-medium mb-2">Amount</h3>
              <p>${transaction.amount}</p>
            </div>

            <div>
              <h3 className="font-medium mb-2">Status</h3>
              <Badge 
                variant="outline" 
                className={`flex items-center ${getStatusBadgeStyle(transaction.status)}`}
              >
                <StatusIcon status={transaction.status} />
                {transaction.status}
              </Badge>
            </div>

            <div>
              <h3 className="font-medium mb-2">Created</h3>
              <p>{new Date(transaction.created_at).toLocaleString()}</p>
            </div>

            <div>
              <h3 className="font-medium mb-2">Description</h3>
              <p>{transaction.description}</p>
            </div>
          </div>

          <div className="pt-4 border-t">
            <h3 className="font-medium mb-4">Status Actions</h3>
            <div className="flex flex-wrap gap-2">
              {["pending", "in_progress", "completed", "disputed"].map(status => (
                <Button
                  key={status}
                  variant={transaction.status === status ? "default" : "outline"}
                  onClick={() => handleStatusUpdate(status)}
                  disabled={transaction.status === status}
                >
                  {status === "pending" && <Clock className="h-4 w-4 mr-2" />}
                  {status === "in_progress" && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  {status === "completed" && <CheckCircle className="h-4 w-4 mr-2" />}
                  {status === "disputed" && <AlertCircle className="h-4 w-4 mr-2" />}
                  Mark as {status.replace("_", " ")}
                </Button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t">
            <h3 className="font-medium mb-4">Timeline</h3>
            <div className="space-y-4">
              {events.length > 0 ? (
                events.map(event => (
                  <div key={event.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 rounded-full bg-gray-300 mt-2" />
                      <div className="w-px h-full bg-gray-300" />
                    </div>
                    <div className="pb-4">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">
                          {formatEvent(event)}
                        </p>
                        {event.admin && (
                          <Badge variant="outline" className="text-xs">
                            {event.admin.full_name || 'Admin'}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">
                        {new Date(event.created_at).toLocaleString()}
                      </p>
                      {event.metadata && (
                        <pre className="text-xs mt-2 p-2 bg-gray-50 rounded">
                          {JSON.stringify(event.metadata, null, 2)}
                        </pre>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No events recorded</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
