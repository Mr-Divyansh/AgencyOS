import React, { useState } from 'react';
import {
  Bell,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCheck,
} from 'lucide-react';
import type { NotificationItem } from '../types';

interface NotificationsViewProps {
  notifications: NotificationItem[];
  onMarkRead: (id: string) => Promise<void>;
  onMarkAllRead: () => Promise<void>;
  onNavigate: (view: string, id?: string) => void;
}

export const NotificationsView: React.FC<NotificationsViewProps> = ({
  notifications,
  onMarkRead,
  onMarkAllRead,
  onNavigate,
}) => {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filtered = notifications.filter((n) => (filter === 'unread' ? !n.read : true));

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-[#17212B]">Notifications & Activity Alerts</h2>
          <p className="text-xs text-[#526174] mt-0.5">
            Real-time event alerts triggered by milestones, deals, and team assignments.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Segmented Filter */}
          <div className="flex items-center bg-white border border-[#E9E6DF] rounded-lg p-0.5 text-xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-[#FFF0C2] text-[#17212B] font-semibold'
                  : 'text-[#526174] hover:text-[#17212B]'
              }`}
            >
              All ({notifications.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-3 py-1 rounded font-medium transition-colors ${
                filter === 'unread'
                  ? 'bg-[#FFF0C2] text-[#17212B] font-semibold'
                  : 'text-[#526174] hover:text-[#17212B]'
              }`}
            >
              Unread ({notifications.filter((n) => !n.read).length})
            </button>
          </div>

          <button
            onClick={onMarkAllRead}
            className="px-3 py-1.5 bg-white border border-[#DAD5CA] text-xs font-semibold text-[#17212B] rounded-lg hover:bg-[#F7F5F0] transition-colors flex items-center gap-1.5"
          >
            <CheckCheck className="w-3.5 h-3.5 text-[#16A36A]" />
            <span>Mark All Read</span>
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="agency-card divide-y divide-[#E9E6DF]">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-[#7B8794]">
            <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <h4 className="text-sm font-semibold text-[#17212B]">No notifications</h4>
            <p className="text-xs mt-0.5">
              {filter === 'unread'
                ? "You're all caught up with your updates."
                : 'No notifications recorded yet.'}
            </p>
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className={`p-4 flex items-start justify-between gap-4 transition-colors ${
                item.read ? 'bg-white' : 'bg-[#FFF8E8]/40'
              }`}
            >
              <div className="flex items-start gap-3 min-w-0">
                <div
                  className={`w-2.5 h-2.5 rounded-full shrink-0 mt-1.5 ${
                    item.read ? 'bg-[#DAD5CA]' : 'bg-[#F6B91A]'
                  }`}
                />
                <div>
                  <h4 className="text-xs font-bold text-[#17212B]">{item.title}</h4>
                  <p className="text-xs text-[#526174] mt-0.5 leading-relaxed">
                    {item.message}
                  </p>
                  <span className="text-[10px] text-[#7B8794] tabular-nums mt-1 block">
                    {new Date(item.createdAt).toLocaleDateString()} at{' '}
                    {new Date(item.createdAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {!item.read && (
                  <button
                    onClick={() => onMarkRead(item.id)}
                    className="p-1 text-[#7B8794] hover:text-[#17212B] hover:bg-[#F7F5F0] rounded text-[11px] font-medium"
                    title="Mark as read"
                  >
                    Mark read
                  </button>
                )}

                {item.targetView && (
                  <button
                    onClick={() => onNavigate(item.targetView!)}
                    className="px-2.5 py-1 bg-[#F7F5F0] hover:bg-[#EFECE6] text-[#17212B] text-xs font-semibold rounded-md flex items-center gap-1 transition-colors"
                  >
                    <span>View</span>
                    <ArrowRight className="w-3 h-3 text-[#7B8794]" />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
