import { sendNotification } from './notifications';

export const notifyDisputeCreated = async (
  disputeId: string,
  transactionId: string,
  userId: string,
  reason: string
) => {
  await sendNotification('dispute_created', userId, {
    dispute: { id: disputeId, reason },
    transaction: { id: transactionId },
    user: { id: userId }
  });
};

export const notifyDisputeUpdated = async (
  disputeId: string,
  adminId: string,
  newStatus: string,
  resolution?: string
) => {
  await sendNotification('dispute_updated', adminId, {
    dispute: { id: disputeId, status: newStatus, resolution },
    admin: { id: adminId }
  });
};

export const notifyDisputeComment = async (
  disputeId: string,
  authorId: string,
  comment: string,
  recipientIds: string[]
) => {
  for (const recipientId of recipientIds) {
    await sendNotification('dispute_comment', recipientId, {
      dispute: { id: disputeId },
      comment: { 
        author: authorId, 
        content: comment,
        created_at: new Date().toISOString() 
      }
    });
  }
};
