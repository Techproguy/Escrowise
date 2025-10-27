'use client'

import { useState, useEffect } from 'react';
import { supabase } from '@/src/supabaseClient';
import { Lock, Check, X, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

export default function PermissionManager() {
  const [roles, setRoles] = useState<any[]>([]);
  const [permissions, setPermissions] = useState<any[]>([]);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      try {
        // Load roles with their permissions
        const rolesRes = await fetch('/api/admin/management/roles', {
          headers: { 'x-admin-id': user.id },
        });
        const rolesData = await rolesRes.json();
        setRoles(rolesData);

        // Load all permission types
        const permsRes = await fetch('/api/admin/management/permissions', {
          headers: { 'x-admin-id': user.id },
        });
        const permsData = await permsRes.json();
        setPermissions(permsData);

        if (rolesData.length > 0) {
          setSelectedRole(rolesData[0].id);
        }
      } catch (error) {
        console.error('Failed to load permissions data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const togglePermission = async (permissionId: string) => {
    if (!selectedRole) return;
    setUpdating(true);
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    try {
      // Check if permission is already granted
      const role = roles.find(r => r.id === selectedRole);
      const hasPermission = role.permissions.some((p: any) => p.id === permissionId);

      const res = await fetch(
        `/api/admin/management/roles/${selectedRole}/permissions/${permissionId}`,
        {
          method: hasPermission ? 'DELETE' : 'POST',
          headers: { 'x-admin-id': user.id },
        }
      );

      if (res.ok) {
        // Update local state
        setRoles(roles.map(role => {
          if (role.id === selectedRole) {
            return {
              ...role,
              permissions: hasPermission
                ? role.permissions.filter((p: any) => p.id !== permissionId)
                : [...role.permissions, permissions.find(p => p.id === permissionId)]
            };
          }
          return role;
        }));
      }
    } catch (error) {
      console.error('Failed to update permission:', error);
    } finally {
      setUpdating(false);
    }
  };

  // Group permissions by category
  const permissionGroups = permissions.reduce((groups: { category: string; permissions: any[] }[], permission) => {
    const group = groups.find((g: { category: string }) => g.category === permission.category);
    if (group) {
      group.permissions.push(permission);
    } else {
      groups.push({
        category: permission.category,
        permissions: [permission]
      });
    }
    return groups;
  }, []);

  const selectedRoleData = roles.find(r => r.id === selectedRole);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Permission Management</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/4">
              <h3 className="font-medium mb-2">Roles</h3>
              <div className="space-y-1">
                {roles.map(role => (
                  <Button
                    key={role.id}
                    variant={selectedRole === role.id ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setSelectedRole(role.id)}
                  >
                    {role.name}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex-1">
              {selectedRoleData && (
                <div>
                  <h3 className="font-medium mb-4">
                    Permissions for {selectedRoleData.name}
                  </h3>
                  <ScrollArea className="h-[500px] pr-4">
                    {permissionGroups.map(group => (
                      <div key={group.category} className="mb-6">
                        <h4 className="text-sm font-medium mb-2">
                          {group.category}
                        </h4>
                        <div className="space-y-2">
                          {group.permissions.map((permission: any) => {
                            const hasPermission = selectedRoleData.permissions.some(
                              (p: any) => p.id === permission.id
                            );
                            return (
                              <div 
                                key={permission.id} 
                                className="flex items-center justify-between p-3 border rounded-lg"
                              >
                                <div>
                                  <p className="font-medium">{permission.name}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {permission.description}
                                  </p>
                                </div>
                                <Button
                                  variant={hasPermission ? 'default' : 'outline'}
                                  size="sm"
                                  onClick={() => togglePermission(permission.id)}
                                  disabled={updating}
                                >
                                  {hasPermission ? (
                                    <Check className="h-4 w-4 mr-2" />
                                  ) : (
                                    <X className="h-4 w-4 mr-2" />
                                  )}
                                  {hasPermission ? 'Granted' : 'Denied'}
                                </Button>
                              </div>
                            );
                          })}
                        </div>
                        <Separator className="my-4" />
                      </div>
                    ))}
                  </ScrollArea>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
