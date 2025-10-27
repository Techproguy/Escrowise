import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { requireAdmin } from '@/lib/auth';

const DEFAULT_ROLES = [
  {
    name: 'Super Admin',
    description: 'Full access to all features and settings',
    permissions: [
      'system_settings_view', 'system_settings_edit',
      'users_view', 'users_edit', 'users_delete',
      'transactions_view', 'transactions_edit', 'transactions_refund',
      'disputes_view', 'disputes_manage', 'disputes_resolve',
      'financial_reports_view', 'financial_payouts_process', 'financial_balances_view',
      'admin_users_view', 'admin_users_manage', 'admin_roles_manage'
    ]
  },
  {
    name: 'Support Admin',
    description: 'Can view and manage users and transactions',
    permissions: [
      'users_view', 'users_edit',
      'transactions_view', 'transactions_edit',
      'disputes_view', 'disputes_manage'
    ]
  },
  {
    name: 'Financial Admin',
    description: 'Can view financial data and process payouts',
    permissions: [
      'financial_reports_view', 'financial_payouts_process', 'financial_balances_view',
      'transactions_view'
    ]
  }
];

export async function POST(req: Request) {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  const { data: { user } } = await supabaseAdmin.auth.getUser();

  // First seed permissions if not already done
  const permsRes = await fetch(
    new URL('/api/admin/management/permissions/seed', req.url),
    { method: 'POST' }
  );
  
  if (!permsRes.ok) {
    return NextResponse.json(
      { error: 'Failed to seed permissions' },
      { status: 500 }
    );
  }

  // Check if roles already exist
  const { data: existingRoles, error: checkError } = await supabaseAdmin
    .from('admin_roles')
    .select('*')
    .limit(1);

  if (checkError) {
    return NextResponse.json({ error: checkError.message }, { status: 500 });
  }

  if (existingRoles && existingRoles.length > 0) {
    return NextResponse.json(
      { error: 'Roles already seeded' }, 
      { status: 400 }
    );
  }

  // Create roles
  const rolesWithPermissions = [];
  
  for (const role of DEFAULT_ROLES) {
    // Create the role
    const { data: newRole, error: roleError } = await supabaseAdmin
      .from('admin_roles')
      .insert({
        name: role.name,
        description: role.description,
        permissions: {}
      })
      .select()
      .single();

    if (roleError) {
      return NextResponse.json({ error: roleError.message }, { status: 500 });
    }

    // Get permission IDs
    const { data: permissions } = await supabaseAdmin
      .from('permission_types')
      .select('id')
      .in('name', role.permissions);

    // Assign permissions
    for (const permission of permissions || []) {
      await supabaseAdmin
        .from('role_permissions')
        .insert({
          role_id: newRole.id,
          permission_id: permission.id
        });
    }

    rolesWithPermissions.push({
      ...newRole,
      permissions: permissions || []
    });
  }

  return NextResponse.json(rolesWithPermissions, { status: 201 });
}
