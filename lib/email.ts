import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendEmail = async (options: EmailOptions) => {
  try {
    const mailOptions = {
      from: options.from || `"Escrowise" <${process.env.EMAIL_USERNAME}>`,
      to: Array.isArray(options.to) ? options.to.join(', ') : options.to,
      subject: options.subject,
      text: options.text || '',
      html: options.html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify-email?token=${token}`;
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Verify Your Email Address</h2>
      <p>Thank you for signing up for Escrowise! Please click the button below to verify your email address.</p>
      <div style="margin: 25px 0;">
        <a href="${verificationUrl}" 
           style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
          Verify Email
        </a>
      </div>
      <p>If you did not create an account, you can safely ignore this email.</p>
      <p style="margin-top: 30px; color: #666; font-size: 12px;">
        This is an automated message, please do not reply to this email.
      </p>
    </div>
  `;

  return sendEmail({
    to: email,
    subject: 'Verify Your Email Address',
    html,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${token}`;
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Reset Your Password</h2>
      <p>You recently requested to reset your password. Click the button below to reset it.</p>
      <div style="margin: 25px 0;">
        <a href="${resetUrl}" 
           style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
          Reset Password
        </a>
      </div>
      <p>If you did not request a password reset, please ignore this email or contact support if you have questions.</p>
      <p style="margin-top: 30px; color: #666; font-size: 12px;">
        This link will expire in 1 hour for security reasons.
      </p>
    </div>
  `;

  return sendEmail({
    to: email,
    subject: 'Reset Your Password',
    html,
  });
};
