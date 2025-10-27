import React from 'react';

export interface AuditTimelineEvent {
  id: string;
  timestamp: string;
  action: string;
  user?: string;
  details?: string;
}

export interface AuditTimelineProps {
  events?: AuditTimelineEvent[];
  className?: string;
}

export const AuditTimeline: React.FC<AuditTimelineProps> = ({ events = [], className }) => {
  return (
    <div className={`p-4 bg-white rounded-lg border border-gray-200 shadow-sm ${className || ''}`.trim()}>
      <h3 className="text-lg font-semibold mb-4 text-orange-500">Audit Timeline</h3>
      {events.length === 0 ? (
        <div className="text-gray-400 text-sm">No audit events to display.</div>
      ) : (
        <ul className="space-y-4">
          {events.map((event) => (
            <li key={event.id} className="flex items-start gap-3">
              <div className="flex-shrink-0 w-2 h-2 mt-2 bg-orange-400 rounded-full" />
              <div>
                <div className="text-sm text-gray-700 font-medium">
                  {event.action}
                  {event.user && (
                    <span className="ml-2 text-xs text-gray-500">by {event.user}</span>
                  )}
                </div>
                <div className="text-xs text-gray-500">{new Date(event.timestamp).toLocaleString()}</div>
                {event.details && (
                  <div className="text-xs text-gray-400 mt-1">{event.details}</div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AuditTimeline;
