import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { sendEmail } from '@/lib/email';
import { generateReport } from '@/lib/reports';

interface ScheduledReport {
  id: string;
  report_type: string;
  parameters: Record<string, any>;
  recipients: string | string[];
  frequency: 'daily' | 'weekly' | 'monthly';
  is_active: boolean;
  last_run_at: string | null;
  next_run_at: string;
}

export const runScheduledReports = async (reportsToRun?: ScheduledReport[]) => {
  const now = new Date();
  
  // If no reports provided, fetch due reports
  if (!reportsToRun || reportsToRun.length === 0) {
    const { data, error } = await supabaseAdmin
      .from('scheduled_reports')
      .select('*')
      .lte('next_run_at', now.toISOString())
      .eq('is_active', true);

    if (error || !data) return;
    reportsToRun = data;
  }

  for (const report of reportsToRun) {
    try {
      // Generate the report
      const reportData = await generateReport(
        report.report_type, 
        report.parameters
      );

      // Format and send email
      const emailContent = formatReportEmail(reportData);
      await sendEmail({
        to: report.recipients,
        subject: `Escrowise Report: ${report.report_type}`,
        html: emailContent
      });

      // Update next run time
      let nextRun = new Date();
      
      switch(report.frequency) {
        case 'daily': nextRun.setDate(now.getDate() + 1); break;
        case 'weekly': nextRun.setDate(now.getDate() + 7); break;
        case 'monthly': nextRun.setMonth(now.getMonth() + 1); break;
      }

      await supabaseAdmin
        .from('scheduled_reports')
        .update({
          last_run_at: now.toISOString(),
          next_run_at: nextRun.toISOString()
        })
        .eq('id', report.id);
    } catch (error) {
      console.error(`Failed to run report ${report.id}:`, error);
    }
  }
};

const formatReportEmail = (reportData: any) => {
  // Format report data into HTML email
  return `
    <div style="font-family: Arial, sans-serif;">
      <h2>${reportData.report_name}</h2>
      <p>Generated on: ${new Date(reportData.generated_at).toLocaleString()}</p>
      <div style="margin-top: 20px;">
        ${formatReportData(reportData.data)}
      </div>
    </div>
  `;
};

const formatReportData = (data: any) => {
  // Format report data for email display
  if (Array.isArray(data)) {
    return `
      <table style="border-collapse: collapse; width: 100%;">
        <thead>
          <tr>
            ${Object.keys(data[0]).map(key => 
              `<th style="border: 1px solid #ddd; padding: 8px; text-align: left;">${key}</th>`
            ).join('')}
          </tr>
        </thead>
        <tbody>
          ${data.map(row => 
            `<tr>
              ${Object.values(row).map(val => 
                `<td style="border: 1px solid #ddd; padding: 8px;">${val}</td>`
              ).join('')}
            </tr>`
          ).join('')}
        </tbody>
      </table>
    `;
  }
  
  return `<pre>${JSON.stringify(data, null, 2)}</pre>`;
};
