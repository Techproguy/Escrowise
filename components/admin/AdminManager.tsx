'use client'

import { useState, useEffect } from 'react';
import { supabase } from '@/src/supabaseClient';
import { Users, Settings, Key, Loader2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AuditLogs from '@/components/admin/AuditLogs'; // Fixed to default import

export default function AdminManager() {
  const [activeTab, setActiveTab] = useState('roles');
  const [adminUsers, setAdminUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAdminUsers = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const res = await fetch('/api/admin/management/users', {
        headers: { 'x-admin-id': user.id },
      });

      if (res.ok) {
        const data = await res.json();
        setAdminUsers(data);
      }
      setLoading(false);
    };

    loadAdminUsers();
  }, []);

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
      <TabsList>
        <TabsTrigger value="roles">
          <Users className="h-4 w-4 mr-2" />
          Admin Roles
        </TabsTrigger>
        <TabsTrigger value="users">
          <Users className="h-4 w-4 mr-2" />
          Admin Users
        </TabsTrigger>
        <TabsTrigger value="settings">
          <Settings className="h-4 w-4 mr-2" />
          System Settings
        </TabsTrigger>
        <TabsTrigger value="permissions">
          <Key className="h-4 w-4 mr-2" />
          Permissions
        </TabsTrigger>
        <TabsTrigger value="audit">
          <Settings className="h-4 w-4 mr-2" />
          Audit Logs
        </TabsTrigger>
      </TabsList>

      <TabsContent value="roles">
        <Card>
          <CardHeader>
            <CardTitle>Admin Roles</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Roles management UI */}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="users">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Admin Users</CardTitle>
              <Button>Add Admin</Button>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center items-center h-32">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Roles</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {adminUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.full_name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        {user.roles?.join(', ') || 'No roles assigned'}
                      </TableCell>
                      <TableCell>
                        {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString() : 'Never'}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="settings">
        <Card>
          <CardHeader>
            <CardTitle>System Settings</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Settings management UI */}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="permissions">
        <Card>
          <CardHeader>
            <CardTitle>Permissions Matrix</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Permissions management UI */}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="audit">
        <Card>
          <CardHeader>
            <CardTitle>Audit Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <AuditLogs />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
