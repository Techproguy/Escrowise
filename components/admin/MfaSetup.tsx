'use client'

import { useState } from 'react';
import { supabase } from '@/src/supabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ShieldCheck, Key, Lock, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

export default function MfaSetup() {
  const [qrCode, setQrCode] = useState('');
  const [secret, setSecret] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [status, setStatus] = useState<'idle' | 'setting-up' | 'verifying' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [challengeId, setChallengeId] = useState('');
  const [factorId, setFactorId] = useState('');

  const setupMfa = async () => {
    setStatus('setting-up');
    setError('');
    
    try {
      const { data, error: mfaError } = await supabase.auth.mfa.enroll({
        factorType: 'totp'
      });
      
      if (mfaError) throw mfaError;
      
      setQrCode(data.totp.qr_code);
      setSecret(data.totp.secret);
      setFactorId(data.id);
      
      const { data: challengeData, error: challengeError } = await supabase.auth.mfa.challenge({
        factorId: data.id
      });
      
      if (challengeError) throw challengeError;
      
      setChallengeId(challengeData.id);
      
      // Generate backup codes
      const codes = Array.from({length: 10}, () => 
        Math.random().toString(36).substring(2, 8).toUpperCase()
      );
      
      const { error: codesError } = await supabase
        .from('user_mfa_backup_codes')
        .insert(codes.map(code => ({
          user_id: data.id,
          code
        })));
      
      if (codesError) throw codesError;
      
      setBackupCodes(codes);
      setStatus('verifying');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setError(errorMessage);
      setStatus('error');
    }
  };

  const verifyMfa = async () => {
    setStatus('verifying');
    setError('');
    
    try {
      const { error: verifyError } = await supabase.auth.mfa.verify({
        factorId,
        challengeId,
        code: verificationCode
      });
      
      if (verifyError) throw verifyError;
      
      setStatus('success');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to verify code';
      setError(errorMessage);
      setStatus('error');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldCheck className="h-6 w-6" />
          Two-Factor Authentication
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {status === 'idle' && (
          <div className="space-y-4">
            <Alert>
              <AlertTitle>Enhanced Security</AlertTitle>
              <AlertDescription>
                Enable two-factor authentication to add an extra layer of security to your admin account.
              </AlertDescription>
            </Alert>
            <Button onClick={setupMfa}>
              <Lock className="h-4 w-4 mr-2" />
              Set Up 2FA
            </Button>
          </div>
        )}

        {status === 'setting-up' && (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        )}

        {(status === 'verifying' || status === 'error') && qrCode && (
          <div className="space-y-4">
            <div className="flex flex-col items-center">
              <div dangerouslySetInnerHTML={{ __html: qrCode }} />
              <p className="text-sm text-muted-foreground mt-2">
                Scan this QR code with your authenticator app
              </p>
              <div className="flex items-center mt-2">
                <p className="font-mono text-sm bg-muted p-2 rounded">
                  {secret}
                </p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => copyToClipboard(secret)}
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Verification Code</label>
              <div className="flex gap-2">
                <Input 
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="Enter 6-digit code"
                />
                <Button onClick={verifyMfa}>
                  <Key className="h-4 w-4 mr-2" />
                  Verify
                </Button>
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-4">
            <Alert>
              <AlertTitle>Success!</AlertTitle>
              <AlertDescription>
                Two-factor authentication has been successfully enabled for your account.
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <h3 className="font-medium">Backup Codes</h3>
              <p className="text-sm text-muted-foreground">
                Save these codes in a secure place. Each code can be used only once.
              </p>
              <div className="grid grid-cols-2 gap-2">
                {backupCodes.map((code, i) => (
                  <div key={i} className="font-mono text-sm bg-muted p-2 rounded flex justify-between">
                    {code}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => copyToClipboard(code)}
                    >
                      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
