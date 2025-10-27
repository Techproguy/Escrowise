import { supabaseAdmin } from './supabaseAdmin';

type EventMetadata = {
  [key: string]: any;
};

export const createTransactionEvent = async (
  transactionId: string,
  eventType: string,
  metadata?: EventMetadata,
  adminId?: string
) => {
  const { data, error } = await supabaseAdmin
    .from('transaction_events')
    .insert({
      transaction_id: transactionId,
      event_type: eventType,
      metadata,
      admin_id: adminId
    })
    .select();

  if (error) throw error;
  return data?.[0];
};

export const createStatusEvent = async (
  transactionId: string,
  newStatus: string,
  adminId?: string
) => {
  return createTransactionEvent(
    transactionId,
    'status_update',
    { status: newStatus },
    adminId
  );
};

export const createAdminNoteEvent = async (
  transactionId: string,
  note: string,
  adminId: string
) => {
  return createTransactionEvent(
    transactionId,
    'admin_note',
    { note },
    adminId
  );
};

export const createPaymentVerifiedEvent = async (
  transactionId: string,
  adminId: string,
  verified: boolean = true
) => {
  return createTransactionEvent(
    transactionId,
    'payment_verified',
    { verified },
    adminId
  );
};

export const createFundsReleasedEvent = async (
  transactionId: string,
  adminId: string,
  amount: number
) => {
  return createTransactionEvent(
    transactionId,
    'funds_released',
    { amount },
    adminId
  );
};

export const createDisputeEvent = async (
  transactionId: string,
  adminId: string,
  resolved: boolean = false,
  resolution?: string
) => {
  const eventType = resolved ? 'dispute_resolved' : 'dispute_opened';
  return createTransactionEvent(
    transactionId,
    eventType,
    { resolution },
    adminId
  );
};
