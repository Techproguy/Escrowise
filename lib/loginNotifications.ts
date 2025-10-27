import { supabaseAdmin } from './supabaseAdmin';
import { sendEmail } from './email';
import { logAction } from './auditLogger';

export const notifyAdminLogin = async (userId: string, ipAddress: string, userAgent: string) => {
  // Get user details
  const { data: user, error: userError } = await supabaseAdmin
    .from('profiles')
    .select('email, full_name')
    .eq('id', userId)
    .single();

  if (userError || !user) return;

  // Get notification settings
  const { data: settings, error: settingsError } = await supabaseAdmin
    .from('admin_notification_settings')
    .select('*')
    .eq('user_id', userId)
    .single();

  // Skip if notifications are disabled
  if (settings?.login_notifications === false) return;

  // Prepare email content
  const emailContent = `
    <div style="font-family: Arial, sans-serif;">
      <h2>New Admin Login Detected</h2>
      <p>There was a new login to your Escrowise admin account:</p>
      
      <div style="margin: 20px 0; padding: 15px; background: #f8f9fa; border-radius: 5px;">
        <p><strong>Account:</strong> ${user.full_name} (${user.email})</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>IP Address:</strong> ${ipAddress}</p>
        <p><strong>Device:</strong> ${userAgent}</p>
      </div>
      
      <p>If you didn't initiate this login, please secure your account immediately.</p>
    </div>
  `;

  // Send email notification
  await sendEmail({
    to: user.email,
    subject: 'New Admin Login - Escrowise',
    html: emailContent
  });

  // Log the notification
  await logAction(
    'admin_login_notification', // action
    'user',                    // entityType
    userId,                    // entityId
    null,                      // oldValue
    { ip_address: ipAddress, user_agent: userAgent } // newValue
  );
};
