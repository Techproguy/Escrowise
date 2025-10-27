import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { requireAdmin } from '@/lib/middleware/auth';

const DEFAULT_PERMISSIONS = [
  // System
  { name: 'system_settings_view', description: 'View system settings', category: 'System' },
  { name: 'system_settings_edit', description: 'Edit system settings', category: 'System' },
  
  // Users
  { name: 'users_view', description: 'View user accounts', category: 'Users' },
  { name: 'users_edit', description: 'Edit user accounts', category: 'Users' },
  { name: 'users_delete', description: 'Delete user accounts', category: 'Users' },
  
  // Transactions
  { name: 'transactions_view', description: 'View transactions', category: 'Transactions' },
  { name: 'transactions_edit', description: 'Edit transactions', category: 'Transactions' },
  { name: 'transactions_refund', description: 'Process refunds', category: 'Transactions' },
  
  // Disputes
  { name: 'disputes_view', description: 'View disputes', category: 'Disputes' },
  { name: 'disputes_manage', description: 'Manage disputes', category: 'Disputes' },
  { name: 'disputes_resolve', description: 'Resolve disputes', category: 'Disputes' },
  
  // Financial
  { name: 'financial_reports_view', description: 'View financial reports', category: 'Financial' },
  { name: 'financial_payouts_process', description: 'Process payouts', category: 'Financial' },
  { name: 'financial_balances_view', description: 'View escrow balances', category: 'Financial' },
  
  // Admin
  { name: 'admin_users_view', description: 'View admin users', category: 'Admin' },
  { name: 'admin_users_manage', description: 'Manage admin users', category: 'Admin' },
  { name: 'admin_roles_manage', description: 'Manage admin roles', category: 'Admin' },
];

export async function POST() {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  const { data: existing, error: checkError } = await supabaseAdmin
    .from('permission_types')
    .select('*')
    .limit(1);

  if (checkError) {
    return NextResponse.json({ error: checkError.message }, { status: 500 });
  }

  if (existing && existing.length > 0) {
    return NextResponse.json(
      { error: 'Permissions already seeded' }, 
      { status: 400 }
    );
  }

  const { data, error } = await supabaseAdmin
    .from('permission_types')
    .insert(DEFAULT_PERMISSIONS)
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
