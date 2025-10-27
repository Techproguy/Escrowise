'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Shield, User, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { exportToCSV, exportToPNG } from '@/lib/chartExport';

export default function AuditCharts() {
  const fetchAuditStats = async () => {
    const res = await fetch('/api/admin/audit-logs/stats');
    if (!res.ok) throw new Error('Failed to fetch audit stats');
    return res.json();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['auditStats'],
    queryFn: fetchAuditStats,
  });

  if (isLoading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center h-64 text-red-500">
      Error loading audit statistics
    </div>
  );

  const formatChartData = (stats: any) => {
    return [
      {
        name: 'Actions',
        Create: stats.actions.create,
        Update: stats.actions.update,
        Delete: stats.actions.delete,
      },
      {
        name: 'Entities',
        Users: stats.entities.users,
        Permissions: stats.entities.permissions,
        Reports: stats.entities.reports,
      },
    ];
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Audit Actions
            </CardTitle>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => exportToCSV([formatChartData(data)[0]], 'audit-actions')}
              >
                <Download className="h-4 w-4 mr-2" /> CSV
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => exportToPNG('auditActionsChart')}
              >
                <Download className="h-4 w-4 mr-2" /> PNG
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer id="auditActionsChart" width="100%" height="100%">
            <BarChart data={[formatChartData(data)[0]]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Create" fill="#8884d8" />
              <Bar dataKey="Update" fill="#82ca9d" />
              <Bar dataKey="Delete" fill="#ff8042" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Audit Entities
            </CardTitle>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => exportToCSV([formatChartData(data)[1]], 'audit-entities')}
              >
                <Download className="h-4 w-4 mr-2" /> CSV
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => exportToPNG('auditEntitiesChart')}
              >
                <Download className="h-4 w-4 mr-2" /> PNG
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer id="auditEntitiesChart" width="100%" height="100%">
            <BarChart data={[formatChartData(data)[1]]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Users" fill="#0088FE" />
              <Bar dataKey="Permissions" fill="#00C49F" />
              <Bar dataKey="Reports" fill="#FFBB28" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
