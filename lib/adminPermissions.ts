import { supabaseAdmin } from "@/lib/supabaseAdmin";

export interface AdminPermission {
  id: string;
  name: string;
  description: string;
  resource: string;
  action: string;
}

export interface AdminRole {
  id: string;
  name: string;
  description: string;
  permissions: AdminPermission[];
}

// Define available permissions
export const ADMIN_PERMISSIONS = {
  // Transaction permissions
  VIEW_TRANSACTIONS: "view_transactions",
  EDIT_TRANSACTIONS: "edit_transactions",
  CANCEL_TRANSACTIONS: "cancel_transactions",
  DELETE_TRANSACTIONS: "delete_transactions",
  
  // User permissions
  VIEW_USERS: "view_users",
  EDIT_USERS: "edit_users",
  DEACTIVATE_USERS: "deactivate_users",
  VERIFY_USERS: "verify_users",
  
  // Data management permissions
  VIEW_DATA: "view_data",
  EDIT_DATA: "edit_data",
  DELETE_DATA: "delete_data",
  
  // System permissions
  VIEW_AUDIT_LOGS: "view_audit_logs",
  MANAGE_SETTINGS: "manage_settings",
  VIEW_ANALYTICS: "view_analytics",
  MANAGE_DISPUTES: "manage_disputes",
} as const;

// Define admin roles with their permissions
export const ADMIN_ROLES: Record<string, AdminRole> = {
  SUPER_ADMIN: {
    id: "super_admin",
    name: "Super Admin",
    description: "Full access to all admin functions",
    permissions: Object.values(ADMIN_PERMISSIONS).map(permission => ({
      id: permission,
      name: permission.replace(/_/g, " ").toUpperCase(),
      description: `Permission to ${permission.replace(/_/g, " ")}`,
      resource: permission.split("_")[1] || "system",
      action: permission.split("_")[0] || "manage"
    }))
  },
  
  ADMIN: {
    id: "admin",
    name: "Admin",
    description: "Standard admin access with most permissions",
    permissions: [
      ADMIN_PERMISSIONS.VIEW_TRANSACTIONS,
      ADMIN_PERMISSIONS.EDIT_TRANSACTIONS,
      ADMIN_PERMISSIONS.CANCEL_TRANSACTIONS,
      ADMIN_PERMISSIONS.VIEW_USERS,
      ADMIN_PERMISSIONS.EDIT_USERS,
      ADMIN_PERMISSIONS.DEACTIVATE_USERS,
      ADMIN_PERMISSIONS.VERIFY_USERS,
      ADMIN_PERMISSIONS.VIEW_DATA,
      ADMIN_PERMISSIONS.EDIT_DATA,
      ADMIN_PERMISSIONS.VIEW_AUDIT_LOGS,
      ADMIN_PERMISSIONS.VIEW_ANALYTICS,
      ADMIN_PERMISSIONS.MANAGE_DISPUTES,
    ].map(permission => ({
      id: permission,
      name: permission.replace(/_/g, " ").toUpperCase(),
      description: `Permission to ${permission.replace(/_/g, " ")}`,
      resource: permission.split("_")[1] || "system",
      action: permission.split("_")[0] || "manage"
    }))
  },
  
  MODERATOR: {
    id: "moderator",
    name: "Moderator",
    description: "Limited admin access for content moderation",
    permissions: [
      ADMIN_PERMISSIONS.VIEW_TRANSACTIONS,
      ADMIN_PERMISSIONS.VIEW_USERS,
      ADMIN_PERMISSIONS.EDIT_USERS,
      ADMIN_PERMISSIONS.VERIFY_USERS,
      ADMIN_PERMISSIONS.VIEW_ANALYTICS,
      ADMIN_PERMISSIONS.MANAGE_DISPUTES,
    ].map(permission => ({
      id: permission,
      name: permission.replace(/_/g, " ").toUpperCase(),
      description: `Permission to ${permission.replace(/_/g, " ")}`,
      resource: permission.split("_")[1] || "system",
      action: permission.split("_")[0] || "manage"
    }))
  }
};

/**
 * Check if an admin user has a specific permission
 */
export async function hasAdminPermission(
  adminId: string, 
  permission: string
): Promise<boolean> {
  try {
    // Get admin's role
    const { data: profile, error } = await supabaseAdmin
      .from("profiles")
      .select("role")
      .eq("id", adminId)
      .single();

    if (error || !profile) {
      return false;
    }

    // Super admins have all permissions
    if (profile.role === "admin") {
      return true;
    }

    // Check if the role has the specific permission
    const role = ADMIN_ROLES[profile.role.toUpperCase()];
    if (!role) {
      return false;
    }

    return role.permissions.some(p => p.id === permission);
  } catch (error) {
    console.error("Error checking admin permission:", error);
    return false;
  }
}

/**
 * Get all permissions for an admin user
 */
export async function getAdminPermissions(adminId: string): Promise<string[]> {
  try {
    const { data: profile, error } = await supabaseAdmin
      .from("profiles")
      .select("role")
      .eq("id", adminId)
      .single();

    if (error || !profile) {
      return [];
    }

    // Super admins have all permissions
    if (profile.role === "admin") {
      return Object.values(ADMIN_PERMISSIONS);
    }

    // Get permissions for the role
    const role = ADMIN_ROLES[profile.role.toUpperCase()];
    if (!role) {
      return [];
    }

    return role.permissions.map(p => p.id);
  } catch (error) {
    console.error("Error getting admin permissions:", error);
    return [];
  }
}

/**
 * Require a specific permission for an admin action
 */
export async function requireAdminPermission(
  adminId: string,
  permission: string
): Promise<boolean> {
  const hasPermission = await hasAdminPermission(adminId, permission);
  
  if (!hasPermission) {
    console.warn(`Admin ${adminId} attempted to access ${permission} without permission`);
  }
  
  return hasPermission;
}

/**
 * Log admin action for audit purposes
 */
export async function logAdminAction(
  adminId: string,
  action: string,
  entityType: string,
  entityId: string | null,
  oldValue: any = null,
  newValue: any = null,
  ipAddress: string | null = null,
  userAgent: string | null = null
): Promise<void> {
  try {
    await supabaseAdmin
      .from("audit_logs")
      .insert({
        action,
        entity_type: entityType,
        entity_id: entityId,
        old_value: oldValue,
        new_value: newValue,
        performed_by: adminId,
        ip_address: ipAddress,
        user_agent: userAgent
      });
  } catch (error) {
    console.error("Error logging admin action:", error);
  }
}
