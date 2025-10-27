import { supabaseAdmin } from './supabaseAdmin';

type NotificationVariables = {
  [key: string]: any;
};

export const sendNotification = async (
  eventType: string,
  recipientId: string,
  variables: NotificationVariables
) => {
  // Get the template for this event type
  const { data: template, error: templateError } = await supabaseAdmin
    .from('notification_templates')
    .select('*')
    .eq('event_type', eventType)
    .eq('is_active', true)
    .single();

  if (templateError || !template) {
    console.error('No active template found for event type:', eventType);
    return;
  }

  // Replace variables in subject and body
  let subject = template.subject;
  let body = template.body;

  for (const [key, value] of Object.entries(variables)) {
    subject = subject.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), value);
    body = body.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), value);
  }

  // Get user notification preferences
  const { data: userPrefs } = await supabaseAdmin
    .from('user_notification_preferences')
    .select('*')
    .eq('user_id', recipientId)
    .single();

  // Send notification based on user preferences
  if (userPrefs?.email_notifications) {
    await sendEmailNotification(recipientId, subject, body);
  }

  if (userPrefs?.push_notifications) {
    await sendPushNotification(recipientId, subject, body);
  }

  // Log the notification
  await supabaseAdmin
    .from('notification_logs')
    .insert({
      user_id: recipientId,
      template_id: template.id,
      subject,
      body,
      variables
    });
};

const sendEmailNotification = async (
  userId: string,
  subject: string,
  body: string
) => {
  // Implementation for sending email
  // This would integrate with your email service provider
};

const sendPushNotification = async (
  userId: string,
  title: string,
  message: string
) => {
  // Implementation for sending push notifications
  // This would integrate with your push notification service
};
