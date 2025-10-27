'use client'

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Bell, Mail, Shield } from 'lucide-react';
import { toast } from 'sonner';

export default function NotificationPreferences() {
  const [preferences, setPreferences] = useState({
    login_notifications: true,
    report_notifications: true,
    audit_alerts: true,
  });
  const [loading, setLoading] = useState(true);

  const loadPreferences = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/notification-settings');
  
    if (res.ok) {
      const data = await res.json();
      setPreferences(data);
    }
    setLoading(false);
  };

  const savePreferences = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/notification-settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(preferences)
    });

    if (res.ok) {
      toast.success('Notification preferences saved');
    } else {
      toast.error('Failed to save preferences');
    }
    setLoading(false);
  };

  useEffect(() => {
    loadPreferences();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-6 w-6" />
          Notification Preferences
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Login Notifications
                </Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when your admin account is accessed
                </p>
              </div>
              <Switch 
                checked={preferences.login_notifications}
                onCheckedChange={(val) => setPreferences({...preferences, login_notifications: val})}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Report Notifications
                </Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications when scheduled reports are generated
                </p>
              </div>
              <Switch 
                checked={preferences.report_notifications}
                onCheckedChange={(val) => setPreferences({...preferences, report_notifications: val})}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Audit Alerts
                </Label>
                <p className="text-sm text-muted-foreground">
                  Get alerts for critical audit events
                </p>
              </div>
              <Switch 
                checked={preferences.audit_alerts}
                onCheckedChange={(val) => setPreferences({...preferences, audit_alerts: val})}
              />
            </div>

            <div className="flex justify-end pt-4">
              <Button onClick={savePreferences} disabled={loading}>
                Save Preferences
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
