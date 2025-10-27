import { supabaseAdmin } from './supabaseAdmin';

interface ReportParams {
  startDate?: string;
  endDate?: string;
  status?: string;
  [key: string]: any;
}

export const generateReport = async (reportType: string, params: ReportParams = {}) => {
  try {
    switch (reportType) {
      case 'transactions':
        return await generateTransactionsReport(params);
      case 'users':
        return await generateUsersReport(params);
      case 'disputes':
        return await generateDisputesReport(params);
      case 'financial':
        return await generateFinancialReport(params);
      default:
        throw new Error(`Unknown report type: ${reportType}`);
    }
  } catch (error) {
    console.error(`Error generating ${reportType} report:`, error);
    throw error;
  }
};

const generateTransactionsReport = async (params: ReportParams) => {
  let query = supabaseAdmin
    .from('transactions')
    .select('*', { count: 'exact' });

  // Apply filters
  if (params.startDate) {
    query = query.gte('created_at', params.startDate);
  }
  if (params.endDate) {
    query = query.lte('created_at', params.endDate);
  }
  if (params.status) {
    query = query.eq('status', params.status);
  }

  const { data, error, count } = await query;

  if (error) throw error;

  return {
    report_name: 'Transactions Report',
    generated_at: new Date().toISOString(),
    parameters: params,
    total: count || 0,
    data: data || []
  };
};

const generateUsersReport = async (params: ReportParams) => {
  let query = supabaseAdmin
    .from('profiles')
    .select('*', { count: 'exact' });

  if (params.startDate) {
    query = query.gte('created_at', params.startDate);
  }
  if (params.endDate) {
    query = query.lte('created_at', params.endDate);
  }
  if (params.role) {
    query = query.eq('role', params.role);
  }

  const { data, error, count } = await query;

  if (error) throw error;

  return {
    report_name: 'Users Report',
    generated_at: new Date().toISOString(),
    parameters: params,
    total: count || 0,
    data: data || []
  };
};

const generateDisputesReport = async (params: ReportParams) => {
  let query = supabaseAdmin
    .from('disputes')
    .select(`
      *,
      transaction:transactions(*),
      initiator:profiles(*),
      admin:profiles(*)
    `, { count: 'exact' });

  if (params.startDate) {
    query = query.gte('created_at', params.startDate);
  }
  if (params.endDate) {
    query = query.lte('created_at', params.endDate);
  }
  if (params.status) {
    query = query.eq('status', params.status);
  }

  const { data, error, count } = await query;

  if (error) throw error;

  return {
    report_name: 'Disputes Report',
    generated_at: new Date().toISOString(),
    parameters: params,
    total: count || 0,
    data: data || []
  };
};

const generateFinancialReport = async (params: ReportParams) => {
  // Get transactions within date range
  let query = supabaseAdmin
    .from('transactions')
    .select('*');

  if (params.startDate) {
    query = query.gte('created_at', params.startDate);
  }
  if (params.endDate) {
    query = query.lte('created_at', params.endDate);
  }
  if (params.status) {
    query = query.eq('status', params.status);
  }

  const { data: transactions, error } = await query;
  if (error) throw error;

  // Calculate financial metrics
  const totalTransactions = transactions?.length || 0;
  const totalVolume = transactions?.reduce((sum, tx) => sum + parseFloat(tx.amount || 0), 0) || 0;
  const completedTransactions = transactions?.filter(tx => tx.status === 'completed').length || 0;
  const pendingTransactions = transactions?.filter(tx => tx.status === 'pending').length || 0;
  const failedTransactions = transactions?.filter(tx => tx.status === 'failed').length || 0;

  // Group by status
  const statusCounts = transactions?.reduce((acc, tx) => {
    acc[tx.status] = (acc[tx.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Group by date for time series
  const dailyVolume = transactions?.reduce((acc, tx) => {
    const date = new Date(tx.created_at).toISOString().split('T')[0];
    acc[date] = (acc[date] || 0) + parseFloat(tx.amount || 0);
    return acc;
  }, {} as Record<string, number>);

  return {
    report_name: 'Financial Report',
    generated_at: new Date().toISOString(),
    parameters: params,
    summary: {
      total_transactions: totalTransactions,
      total_volume: totalVolume,
      completed_transactions: completedTransactions,
      pending_transactions: pendingTransactions,
      failed_transactions: failedTransactions,
      average_transaction_value: totalTransactions > 0 ? totalVolume / totalTransactions : 0,
      status_counts: statusCounts || {},
    },
    daily_volume: dailyVolume || {},
    data: transactions || []
  };
};
