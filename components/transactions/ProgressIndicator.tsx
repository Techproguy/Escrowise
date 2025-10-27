import React from "react";

const stateLabels = {
  pending: "Request Sent",
  accepted: "Accepted",
  awaiting_payment: "Awaiting Payment",
  paid: "Payment Confirmed",
  shipped: "Shipped",
  received: "Received",
  complete: "Complete",
  dispute: "Dispute"
};

const ProgressIndicator = (
  { currentState, states }: { currentState: string; states: string[] }
) => {
  const currentIdx = states.indexOf(currentState);

  return (
    <div className="flex items-center justify-between mb-6">
      {states.map((state, idx) => (
        <div key={state} className="flex-1 flex flex-col items-center">
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
              idx < currentIdx
                ? "bg-orange-400 border-orange-400 text-white"
                : idx === currentIdx
                ? "bg-white border-orange-400 text-orange-400"
                : "bg-white border-gray-300 text-gray-400"
            }`}
          >
            {idx + 1}
          </div>
          <span
            className={`text-xs mt-2 text-center ${
              idx === currentIdx ? "font-bold text-orange-400" : "text-gray-500"
            }`}
            style={{ width: 80 }}
          >
            {stateLabels[state as keyof typeof stateLabels]}
          </span>
          {idx < states.length - 1 && (
            <div
              className={`h-1 w-full ${
                idx < currentIdx ? "bg-orange-400" : "bg-gray-300"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressIndicator;
