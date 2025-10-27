'use client'

import { useState, useEffect } from 'react';
import { supabase } from '@/src/supabaseClient';
import { FileText, BarChart2, Users, AlertTriangle, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AdvancedReports() {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    new Date(new Date().setMonth(new Date().getMonth() - 1)),
    new Date()
  ]);
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState<any>(null);

  const generateReport = async (type: string) => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    try {
      const res = await fetch('/api/admin/financial/reports/advanced', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-admin-id': user.id 
        },
        body: JSON.stringify({
          reportType: type,
          filters: {
            startDate: dateRange[0]?.toISOString(),
            endDate: dateRange[1]?.toISOString()
          }
        })
      });

      if (res.ok) {
        const data = await res.json();
        setReportData(data);
      }
    } catch (error) {
      console.error('Report generation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Advanced Reports</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3 space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Date Range</h3>
              <DatePicker
                selectsRange
                startDate={dateRange[0]}
                endDate={dateRange[1]}
                onChange={(update) => setDateRange(update as [Date | null, Date | null])}
                className="w-full"
              />
            </div>

            <Tabs defaultValue="dispute" className="w-full">
              <TabsList className="grid grid-cols-1">
                <TabsTrigger value="dispute">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Dispute Analysis
                </TabsTrigger>
                <TabsTrigger value="user">
                  <Users className="h-4 w-4 mr-2" />
                  User Activity
                </TabsTrigger>
                <TabsTrigger value="revenue">
                  <BarChart2 className="h-4 w-4 mr-2" />
                  Revenue Analysis
                </TabsTrigger>
              </TabsList>
              <TabsContent value="dispute" className="mt-4">
                <Button 
                  className="w-full"
                  onClick={() => generateReport('dispute_analysis')}
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <FileText className="h-4 w-4 mr-2" />
                  )}
                  Generate Report
                </Button>
              </TabsContent>
              <TabsContent value="user" className="mt-4">
                <Button 
                  className="w-full"
                  onClick={() => generateReport('user_activity')}
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <FileText className="h-4 w-4 mr-2" />
                  )}
                  Generate Report
                </Button>
              </TabsContent>
              <TabsContent value="revenue" className="mt-4">
                <Button 
                  className="w-full"
                  onClick={() => generateReport('revenue_analysis')}
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <FileText className="h-4 w-4 mr-2" />
                  )}
                  Generate Report
                </Button>
              </TabsContent>
            </Tabs>
          </div>

          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : reportData ? (
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">{reportData.report_name}</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      CSV
                    </Button>
                    <Button variant="outline" size="sm">
                      PDF
                    </Button>
                  </div>
                </div>
                <pre className="text-sm bg-muted p-4 rounded overflow-auto">
                  {JSON.stringify(reportData.data, null, 2)}
                </pre>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-muted-foreground border rounded-lg">
                <FileText className="h-8 w-8 mb-2" />
                <p>Generate a report to view data</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
