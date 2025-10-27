import { supabaseAdmin } from './supabaseAdmin';
import { getClientInfo } from './clientInfo';

export const logAction = async (
  action: string,
  entityType: string,
  entityId: string | null,
  oldValue: any,
  newValue: any
) => {
  const { data: { user } } = await supabaseAdmin.auth.getUser();
  const clientInfo = await getClientInfo();

  await supabaseAdmin
    .from('audit_logs')
    .insert({
      action,
      entity_type: entityType,
      entity_id: entityId,
      old_value: oldValue,
      new_value: newValue,
      performed_by: user?.id || null,
      ip_address: clientInfo.ip,
      user_agent: clientInfo.userAgent
    });
};

export const logPermissionChange = async (
  action: 'create' | 'delete',
  roleId: string,
  permissionId: string
) => {
  await logAction(
    action,
    'role_permission',
    null,
    action === 'delete' ? { roleId, permissionId } : null,
    action === 'create' ? { roleId, permissionId } : null
  );
};

export const logAdminChange = async (
  action: 'create' | 'update' | 'delete',
  adminId: string,
  oldData: any,
  newData: any
) => {
  await logAction(
    action,
    'admin_user',
    adminId,
    oldData,
    newData
  );
};
