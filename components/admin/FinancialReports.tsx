'use client'

import { useState, useEffect } from 'react';
import { supabase } from '@/src/supabaseClient';
import { FileText, Download, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DatePicker } from '@/components/ui/date-picker';

export default function FinancialReports() {
  const [dateRange, setDateRange] = useState<{ start: Date | null; end: Date | null }>({
    start: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    end: new Date()
  });
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState<any>(null);

  const generateReport = async (type: string) => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    try {
      const res = await fetch('/api/admin/financial/reports', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-admin-id': user.id 
        },
        body: JSON.stringify({
          type,
          start_date: dateRange.start ? dateRange.start.toISOString() : null,
          end_date: dateRange.end ? dateRange.end.toISOString() : null
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
        <CardTitle>Financial Reports</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3 space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Date Range</h3>
              <div className="flex gap-2">
                <DatePicker
                  value={dateRange.start}
                  onChange={date => setDateRange(dr => ({ ...dr, start: date }))}
                  maxDate={dateRange.end || undefined}
                  disabled={loading}
                />
                <span className="mx-1">to</span>
                <DatePicker
                  value={dateRange.end}
                  onChange={date => setDateRange(dr => ({ ...dr, end: date }))}
                  minDate={dateRange.start || undefined}
                  disabled={loading}
                />
              </div>
            </div>

            <Tabs defaultValue="standard" className="w-full">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="standard">Standard</TabsTrigger>
                <TabsTrigger value="custom">Custom</TabsTrigger>
              </TabsList>
              <TabsContent value="standard" className="space-y-2 mt-4">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => generateReport('transactions')}
                  disabled={loading}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Transaction Summary
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => generateReport('balances')}
                  disabled={loading}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Balance Report
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => generateReport('payouts')}
                  disabled={loading}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Payout Activity
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => generateReport('fees')}
                  disabled={loading}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Fee Collection
                </Button>
              </TabsContent>
              <TabsContent value="custom" className="mt-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Create or load custom report templates
                </p>
                <Button variant="outline" className="w-full">
                  Manage Templates
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
                      <Download className="h-4 w-4 mr-2" />
                      CSV
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      PDF
                    </Button>
                  </div>
                </div>
                {/* Report data visualization would go here */}
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
