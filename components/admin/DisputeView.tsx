'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/src/supabaseClient';
import { 
  ChevronLeft, AlertCircle, CheckCircle2, Clock, 
  MessageSquare, Paperclip, Download, Send, Loader2 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export default function DisputeView({ disputeId }: { disputeId: string }) {
  const [dispute, setDispute] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [isAdminComment, setIsAdminComment] = useState(false);
  const [resolving, setResolving] = useState(false);
  const [resolution, setResolution] = useState('');
  const router = useRouter();

  useEffect(() => {
    const loadDispute = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const res = await fetch(`/api/admin/disputes/${disputeId}`, {
        headers: { 'x-admin-id': user.id },
      });

      if (res.ok) {
        const data = await res.json();
        setDispute(data);
        setResolution(data.resolution || '');
      }
      setLoading(false);
    };

    loadDispute();
  }, [disputeId]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    try {
      const res = await fetch(`/api/admin/disputes/${disputeId}/comments`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-admin-id': user.id 
        },
        body: JSON.stringify({
          content: newComment,
          is_admin_only: isAdminComment
        })
      });

      if (res.ok) {
        const updatedDispute = await res.json();
        setDispute(updatedDispute);
        setNewComment('');
      }
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

  const handleResolveDispute = async (status: 'resolved' | 'reopened') => {
    setResolving(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    try {
      const res = await fetch(`/api/admin/disputes/${disputeId}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'x-admin-id': user.id 
        },
        body: JSON.stringify({
          status,
          resolution,
          admin_id: user.id
        })
      });

      if (res.ok) {
        const updatedDispute = await res.json();
        setDispute(updatedDispute);
      }
    } catch (error) {
      console.error('Failed to resolve dispute:', error);
    } finally {
      setResolving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!dispute) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Dispute not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Button 
        variant="outline" 
        onClick={() => router.back()}
        className="flex items-center gap-2"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to disputes
      </Button>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Dispute #{dispute.id.substring(0, 8)}</CardTitle>
              <div className="flex items-center gap-2 mt-2">
                {dispute.status === 'open' && (
                  <Badge variant="destructive">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Open
                  </Badge>
                )}
                {dispute.status === 'under_review' && (
                  <Badge variant="outline">
                    <Clock className="h-4 w-4 mr-2" />
                    Under Review
                  </Badge>
                )}
                {dispute.status === 'resolved' && (
                  <Badge variant="default">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Resolved
                  </Badge>
                )}
                <span className="text-sm text-muted-foreground">
                  Created: {new Date(dispute.created_at).toLocaleString()}
                </span>
              </div>
            </div>
            {dispute.status !== 'resolved' && (
              <Button 
                variant="default" 
                onClick={() => handleResolveDispute('resolved')}
                disabled={resolving || !resolution.trim()}
              >
                {resolving ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                )}
                Resolve Dispute
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">Transaction</h3>
              <p>ID: {dispute.transaction?.id}</p>
              <p>Amount: ${dispute.transaction?.amount}</p>
              <p>Status: {dispute.transaction?.status}</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Initiator</h3>
              <p>{dispute.initiator?.full_name}</p>
              <p className="text-sm text-muted-foreground">
                {dispute.initiator?.email}
              </p>
            </div>

            <div className="md:col-span-2">
              <h3 className="font-medium mb-2">Reason</h3>
              <p className="whitespace-pre-line">{dispute.reason}</p>
            </div>
          </div>

          {dispute.status === 'resolved' && (
            <div>
              <h3 className="font-medium mb-2">Resolution</h3>
              <p className="whitespace-pre-line">{dispute.resolution}</p>
              <p className="text-sm text-muted-foreground mt-2">
                Resolved by: {dispute.admin?.full_name} on {new Date(dispute.resolved_at).toLocaleString()}
              </p>
            </div>
          )}

          {dispute.status !== 'resolved' && (
            <div>
              <h3 className="font-medium mb-2">Resolution Notes</h3>
              <Input 
                value={resolution}
                onChange={(e) => setResolution(e.target.value)}
                placeholder="Enter resolution details..."
                className="mb-2"
              />
              <p className="text-sm text-muted-foreground">
                These notes will be visible to both parties when the dispute is resolved.
              </p>
            </div>
          )}

          <Separator />

          <div>
            <h3 className="font-medium mb-4">Evidence</h3>
            {dispute.evidence?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {dispute.evidence.map((evidence: any) => (
                  <Card key={evidence.id} className="p-4">
                    <div className="flex items-center gap-3">
                      <Paperclip className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{evidence.description || 'Attachment'}</p>
                        <p className="text-sm text-muted-foreground">
                          Uploaded by {evidence.uploaded_by?.full_name}
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant="link" 
                      size="sm" 
                      className="mt-2 px-0"
                      onClick={() => window.open(evidence.url, '_blank')}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No evidence submitted yet.</p>
            )}
          </div>

          <Separator />

          <div>
            <h3 className="font-medium mb-4">Discussion</h3>
            <div className="space-y-6">
              {dispute.comments?.length > 0 ? (
                dispute.comments.map((comment: any) => (
                  <div key={comment.id} className="flex gap-3">
                    <Avatar>
                      <AvatarImage src={comment.author?.avatar_url} />
                      <AvatarFallback>
                        {comment.author?.full_name?.charAt(0) || 'A'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{comment.author?.full_name}</p>
                        {comment.is_admin_only && (
                          <Badge variant="outline">Admin Only</Badge>
                        )}
                        <span className="text-sm text-muted-foreground">
                          {new Date(comment.created_at).toLocaleString()}
                        </span>
                      </div>
                      <p className="mt-1 whitespace-pre-line">{comment.content}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No comments yet.</p>
              )}
            </div>

            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2">
                <Input 
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1"
                />
                <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="admin-only" 
                  checked={isAdminComment}
                  onCheckedChange={(checked) => setIsAdminComment(!!checked)}
                />
                <Label htmlFor="admin-only">Visible only to admins</Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
