'use client'

import { useState, useEffect } from 'react';
import { supabase } from '@/src/supabaseClient';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar, Clock, Mail, FileText, RefreshCw, Plus, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import NewScheduleForm from './NewScheduleForm';

export default function ScheduledReports() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadReports = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const res = await fetch('/api/admin/reports/scheduled', {
      headers: { 'x-admin-id': user.id },
    });

    if (res.ok) {
      const data = await res.json();
      setReports(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadReports();
  }, []);

  const deleteReport = async (id: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const res = await fetch(`/api/admin/reports/scheduled/${id}`, {
      method: 'DELETE',
      headers: { 'x-admin-id': user.id },
    });

    if (res.ok) {
      loadReports();
    }
  };

  const runReportNow = async (id: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const res = await fetch(`/api/admin/reports/scheduled/${id}/run`, {
      method: 'POST',
      headers: { 'x-admin-id': user.id },
    });

    if (res.ok) {
      loadReports();
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-6 w-6" />
            Scheduled Reports
          </CardTitle>
          <NewScheduleForm onSuccess={loadReports} />
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <RefreshCw className="h-8 w-8 animate-spin" />
          </div>
        ) : reports.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report Type</TableHead>
                <TableHead>Frequency</TableHead>
                <TableHead>Recipients</TableHead>
                <TableHead>Next Run</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map(report => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">
                    {report.report_type.replace(/_/g, ' ')}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {report.frequency}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <span>{report.recipients.length} recipients</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{format(new Date(report.next_run_at), 'MMM d, yyyy')}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={report.is_active ? 'default' : 'outline'}>
                      {report.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => runReportNow(report.id)}
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => deleteReport(report.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-muted-foreground border rounded-lg">
            <FileText className="h-8 w-8 mb-2" />
            <p>No scheduled reports</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
