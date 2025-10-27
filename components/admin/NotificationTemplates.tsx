'use client'

import { useState, useEffect } from 'react';
import { supabase } from '@/src/supabaseClient';
import { Mail, Edit, Loader2, Check, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export default function NotificationTemplates() {
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTemplate, setEditingTemplate] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('dispute');

  useEffect(() => {
    const loadTemplates = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const res = await fetch('/api/admin/notifications/templates', {
        headers: { 'x-admin-id': user.id },
      });

      if (res.ok) {
        const data = await res.json();
        setTemplates(data);
      }
      setLoading(false);
    };

    loadTemplates();
  }, []);

  const saveTemplate = async () => {
    if (!editingTemplate) return;
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    try {
      const res = await fetch(
        `/api/admin/notifications/templates/${editingTemplate.id || ''}`,
        {
          method: editingTemplate.id ? 'PUT' : 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'x-admin-id': user.id 
          },
          body: JSON.stringify({
            ...editingTemplate,
            updated_by: user.id
          })
        }
      );

      if (res.ok) {
        const updatedTemplate = await res.json();
        setTemplates(prev => {
          const existing = prev.find(t => t.id === updatedTemplate.id);
          if (existing) {
            return prev.map(t => t.id === updatedTemplate.id ? updatedTemplate : t);
          }
          return [...prev, updatedTemplate];
        });
        setEditingTemplate(null);
      }
    } catch (error) {
      console.error('Failed to save template:', error);
    }
  };

  const toggleTemplateStatus = async (templateId: string, isActive: boolean) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    try {
      const res = await fetch(
        `/api/admin/notifications/templates/${templateId}/status`,
        {
          method: 'PATCH',
          headers: { 
            'Content-Type': 'application/json',
            'x-admin-id': user.id 
          },
          body: JSON.stringify({
            is_active: !isActive,
            updated_by: user.id
          })
        }
      );

      if (res.ok) {
        const updatedTemplate = await res.json();
        setTemplates(prev => 
          prev.map(t => t.id === templateId ? updatedTemplate : t)
        );
      }
    } catch (error) {
      console.error('Failed to toggle template status:', error);
    }
  };

  const disputeTemplates = templates.filter(t => t.event_type.startsWith('dispute_'));
  const transactionTemplates = templates.filter(t => t.event_type.startsWith('transaction_'));
  const systemTemplates = templates.filter(t => t.event_type.startsWith('system_'));

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Notification Templates</CardTitle>
          <Button 
            onClick={() => setEditingTemplate({
              name: '',
              description: '',
              event_type: 'dispute_created',
              subject: '',
              body: '',
              variables: {}
            })}
          >
            <Edit className="h-4 w-4 mr-2" />
            New Template
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {editingTemplate ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Name</label>
                <Input 
                  value={editingTemplate.name}
                  onChange={(e) => setEditingTemplate({
                    ...editingTemplate,
                    name: e.target.value
                  })}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Event Type</label>
                <Input 
                  value={editingTemplate.event_type}
                  onChange={(e) => setEditingTemplate({
                    ...editingTemplate,
                    event_type: e.target.value
                  })}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Description</label>
              <Input 
                value={editingTemplate.description || ''}
                onChange={(e) => setEditingTemplate({
                  ...editingTemplate,
                  description: e.target.value
                })}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Subject</label>
              <Input 
                value={editingTemplate.subject}
                onChange={(e) => setEditingTemplate({
                  ...editingTemplate,
                  subject: e.target.value
                })}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Body</label>
              <Textarea 
                value={editingTemplate.body}
                onChange={(e) => setEditingTemplate({
                  ...editingTemplate,
                  body: e.target.value
                })}
                className="min-h-[200px]"
              />
              <p className="text-sm text-muted-foreground mt-2">
                Use {'{{variable}}'} syntax for dynamic content
              </p>
            </div>

            <div className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                onClick={() => setEditingTemplate(null)}
              >
                Cancel
              </Button>
              <Button onClick={saveTemplate}>
                Save Template
              </Button>
            </div>
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="dispute">Dispute</TabsTrigger>
              <TabsTrigger value="transaction">Transaction</TabsTrigger>
              <TabsTrigger value="system">System</TabsTrigger>
            </TabsList>

            <TabsContent value="dispute" className="mt-6">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : disputeTemplates.length > 0 ? (
                <div className="space-y-4">
                  {disputeTemplates.map(template => (
                    <div key={template.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{template.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {template.description || 'No description'}
                          </p>
                          <Badge variant="outline" className="mt-2">
                            {template.event_type}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant={template.is_active ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => toggleTemplateStatus(template.id, template.is_active)}
                          >
                            {template.is_active ? (
                              <Check className="h-4 w-4 mr-2" />
                            ) : (
                              <X className="h-4 w-4 mr-2" />
                            )}
                            {template.is_active ? 'Active' : 'Inactive'}
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setEditingTemplate(template)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="mt-4 space-y-2">
                        <p className="font-medium">{template.subject}</p>
                        <p className="text-sm whitespace-pre-line">
                          {template.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-muted-foreground border rounded-lg">
                  <Mail className="h-8 w-8 mb-2" />
                  <p>No dispute notification templates</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="transaction" className="mt-6">
              {/* Similar structure for transaction templates */}
            </TabsContent>

            <TabsContent value="system" className="mt-6">
              {/* Similar structure for system templates */}
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
}
