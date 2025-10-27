'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/src/supabaseClient';
import { 
  ChevronLeft, ChevronRight, MoreHorizontal, Eye, 
  AlertCircle, CheckCircle2, Clock, Loader2 
} from 'lucide-react';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

export default function DisputesTable() {
  const [disputes, setDisputes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('open');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const router = useRouter();

  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    const loadDisputes = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const url = new URL('/api/admin/disputes', window.location.origin);
      url.searchParams.append('status', statusFilter);
      url.searchParams.append('page', currentPage.toString());
      url.searchParams.append('limit', ITEMS_PER_PAGE.toString());

      const res = await fetch(url.toString(), {
        headers: { 'x-admin-id': user.id },
      });

      if (res.ok) {
        const { data, total } = await res.json();
        setDisputes(data);
        setTotalCount(total);
      }
      setLoading(false);
    };

    loadDisputes();
  }, [statusFilter, currentPage]);

  const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
      case 'open':
        return <Badge variant="destructive">Open</Badge>;
      case 'under_review':
        return <Badge variant="outline">Under Review</Badge>;
      case 'resolved':
        return <Badge variant="default">Resolved</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card>
      <div className="p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button 
            variant={statusFilter === 'open' ? 'default' : 'outline'}
            onClick={() => setStatusFilter('open')}
          >
            <AlertCircle className="h-4 w-4 mr-2" />
            Open
          </Button>
          <Button 
            variant={statusFilter === 'under_review' ? 'default' : 'outline'}
            onClick={() => setStatusFilter('under_review')}
          >
            <Clock className="h-4 w-4 mr-2" />
            Under Review
          </Button>
          <Button 
            variant={statusFilter === 'resolved' ? 'default' : 'outline'}
            onClick={() => setStatusFilter('resolved')}
          >
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Resolved
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Transaction</TableHead>
              <TableHead>Initiator</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {disputes.map((dispute) => (
              <TableRow key={dispute.id}>
                <TableCell className="font-medium">{dispute.id.substring(0, 8)}...</TableCell>
                <TableCell>{dispute.transaction?.id}</TableCell>
                <TableCell>{dispute.initiator?.full_name}</TableCell>
                <TableCell>
                  <StatusBadge status={dispute.status} />
                </TableCell>
                <TableCell>
                  {new Date(dispute.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => router.push(`/admin/disputes/${dispute.id}`)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between p-4">
        <div className="text-sm text-muted-foreground">
          Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, totalCount)} of {totalCount} disputes
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1 || loading}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" disabled>
            {currentPage}
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage * ITEMS_PER_PAGE >= totalCount || loading}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
