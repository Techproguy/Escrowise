'use client'

import { useState, useEffect } from 'react';
import { supabase } from '@/src/supabaseClient';
import { History, Loader2, User, Lock, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { UserSearch } from '@/components/ui/user-search';
import { ButtonGroup } from '@/components/ui/button-group';
import { AuditTimeline } from '@/components/ui/audit-timeline';
import AuditCharts from './AuditCharts';

export default function AuditLogs() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [filter, setFilter] = useState('all');
  const [actionTypeFilter, setActionTypeFilter] = useState<string>('');
  const [affectedUserFilter, setAffectedUserFilter] = useState<string>('');
  const [timeRangeFilter, setTimeRangeFilter] = useState<'24h' | '7d' | '30d' | 'all'>('7d');
  const [viewMode, setViewMode] = useState<'table' | 'timeline'>('table');

  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    const loadLogs = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const url = new URL('/api/admin/audit-logs', window.location.origin);
      url.searchParams.append('page', page.toString());
      url.searchParams.append('limit', ITEMS_PER_PAGE.toString());
      
      if (filter !== 'all') url.searchParams.append('entity_type', filter);
      if (actionTypeFilter) url.searchParams.append('action_type', actionTypeFilter);
      if (affectedUserFilter) url.searchParams.append('affected_user_id', affectedUserFilter);
      
      // Add time range filter
      const now = new Date();
      let startDate = new Date();
      
      switch(timeRangeFilter) {
        case '24h': startDate.setDate(now.getDate() - 1); break;
        case '7d': startDate.setDate(now.getDate() - 7); break;
        case '30d': startDate.setDate(now.getDate() - 30); break;
        default: startDate = new Date(0); // All time
      }
      
      url.searchParams.append('start_date', startDate.toISOString());

      const res = await fetch(url.toString(), {
        headers: { 'x-admin-id': user.id },
      });

      if (res.ok) {
        const { data, total } = await res.json();
        setLogs(data);
        setTotalCount(total);
      }
      setLoading(false);
    };

    loadLogs();
  }, [page, filter, actionTypeFilter, affectedUserFilter, timeRangeFilter]);

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'create': return <Edit className="h-4 w-4" />;
      case 'update': return <Edit className="h-4 w-4" />;
      case 'delete': return <Trash2 className="h-4 w-4" />;
      case 'login': return <User className="h-4 w-4" />;
      case 'permission_change': return <Lock className="h-4 w-4" />;
      default: return <History className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Audit Logs</CardTitle>
          <div className="flex gap-2">
            <Button 
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
            >
              All
            </Button>
            <Button 
              variant={filter === 'role_permission' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('role_permission')}
            >
              Permissions
            </Button>
            <Button 
              variant={filter === 'admin_user' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('admin_user')}
            >
              Admin Users
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Action Type</label>
                <Select onValueChange={setActionTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All action types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All</SelectItem>
                    <SelectItem value="create">Create</SelectItem>
                    <SelectItem value="update">Update</SelectItem>
                    <SelectItem value="delete">Delete</SelectItem>
                    <SelectItem value="login">Login</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Affected User</label>
                <UserSearch onSelect={user => setAffectedUserFilter(user.id)} />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Time Range</label>
                <Select onValueChange={v => setTimeRangeFilter(v as 'all' | '24h' | '7d' | '30d')} defaultValue="7d">
                  <SelectTrigger>
                    <SelectValue placeholder="Select time range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24h">Last 24 hours</SelectItem>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                    <SelectItem value="all">All time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end mb-4">
              <ButtonGroup>
                <Button 
                  variant={viewMode === 'table' ? 'default' : 'outline'}
                  onClick={() => setViewMode('table')}
                >
                  Table View
                </Button>
                <Button 
                  variant={viewMode === 'timeline' ? 'default' : 'outline'}
                  onClick={() => setViewMode('timeline')}
                >
                  Timeline View
                </Button>
              </ButtonGroup>
            </div>

            <div className="mb-8">
              <AuditCharts />
            </div>

            {viewMode === 'timeline' ? (
              <AuditTimeline events={logs} />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Action</TableHead>
                    <TableHead>Entity</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Performed By</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.map(log => (
                    <TableRow key={log.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getActionIcon(log.action)}
                          <Badge variant="outline">
                            {log.action}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{log.entity_type}</div>
                        <div className="text-sm text-muted-foreground">
                          {log.entity_id?.substring(0, 8)}...
                        </div>
                      </TableCell>
                      <TableCell>
                        {log.old_value && (
                          <div className="text-xs text-muted-foreground line-through">
                            {JSON.stringify(log.old_value)}
                          </div>
                        )}
                        {log.new_value && (
                          <div className="text-xs">
                            {JSON.stringify(log.new_value)}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {log.performed_by?.full_name || 'System'}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {log.ip_address}
                        </div>
                      </TableCell>
                      <TableCell>
                        {format(new Date(log.performed_at), 'MMM d, yyyy HH:mm')}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}

            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                Showing {(page - 1) * ITEMS_PER_PAGE + 1} to {Math.min(page * ITEMS_PER_PAGE, totalCount)} of {totalCount} logs
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  disabled={page === 1}
                  onClick={() => setPage(p => p - 1)}
                >
                  Previous
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  disabled={page * ITEMS_PER_PAGE >= totalCount}
                  onClick={() => setPage(p => p + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
