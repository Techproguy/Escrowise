import React from "react";

const eventLabels = {
  pending: "Transaction Created",
  accepted: "Accepted by Buyer",
  awaiting_payment: "Awaiting Payment",
  paid: "Payment Confirmed",
  shipped: "Item Shipped",
  received: "Item Received",
  complete: "Transaction Complete",
  dispute: "Dispute Raised"
};

type Event = {
  id: string;
  event_type: keyof typeof eventLabels | string;
  details?: { note?: string };
  timestamp: string;
};

const ActionHistoryLog = ({ events }: { events: Event[] }) => {
  if (!events || events.length === 0) return <div className="text-sm text-gray-500">No events yet.</div>;
  return (
    <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 mt-4">
      <h4 className="font-semibold mb-2 text-gray-700">Action History</h4>
      <ul className="space-y-2">
        {events.map((evt) => (
          <li key={evt.id} className="flex justify-between items-center">
            <span>
              {evt.event_type in eventLabels
  ? eventLabels[evt.event_type as keyof typeof eventLabels]
  : evt.event_type}
              {evt.details && evt.details.note && `: ${evt.details.note}`}
            </span>
            <span className="text-xs text-gray-400">
              {new Date(evt.timestamp).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActionHistoryLog;
