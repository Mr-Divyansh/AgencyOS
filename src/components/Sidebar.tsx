import React from 'react';
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Users2,
  Contact2,
  UserCheck2,
  Settings,
  Bell,
  ExternalLink,
  ShieldAlert,
  Building,
  FileCheck2,
  Receipt,
  Layers,
} from 'lucide-react';
import type { User, Agency } from '../types';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  currentUser: User;
  agency?: Agency;
  unreadCount: number;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: any;
  tag?: string;
  badge?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  currentUser,
  agency,
  unreadCount,
  isOpenMobile,
  onCloseMobile,
}) => {
  const isClient = currentUser.role === 'client';

  const adminNav: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'tasks', label: 'Tasks & Kanban', icon: CheckSquare },
    { id: 'crm', label: 'CRM Leads', icon: Users2 },
    { id: 'clients', label: 'Clients', icon: Contact2 },
    { id: 'client_portal', label: 'Client Portal (Preview)', icon: Building, tag: 'Live' },
    { id: 'team', label: 'Team', icon: UserCheck2 },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: unreadCount },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const clientNav: NavItem[] = [
    { id: 'client_portal', label: 'Portal Overview', icon: Building },
    { id: 'projects', label: 'Acme Projects', icon: FolderKanban },
    { id: 'notifications', label: 'Updates & Alerts', icon: Bell, badge: unreadCount },
  ];

  const navItems = isClient ? clientNav : adminNav;

  const content = (
    <div className="flex flex-col h-full bg-[#FCFBF8] border-r border-[#E9E6DF]">
      {/* Brand Header */}
      <div className="h-[60px] px-5 flex items-center gap-3 border-b border-[#E9E6DF] bg-white">
        <div className="w-8 h-8 rounded-lg bg-[#F6B91A] flex items-center justify-center font-bold text-[#17212B] shadow-xs">
          <Layers className="w-4 h-4 text-[#17212B]" />
        </div>
        <div className="min-w-0">
          <h1 className="text-sm font-bold tracking-tight text-[#17212B] truncate">
            AgencyOS
          </h1>
          <p className="text-[10px] text-[#7B8794] truncate">
            {agency?.name || 'D Web Studio'}
          </p>
        </div>
      </div>

      {/* Mode Indicator Banner */}
      <div className="px-4 pt-4 pb-2">
        <div
          className={`px-3 py-2 rounded-lg text-xs flex items-center justify-between border ${
            isClient
              ? 'bg-[#E8F0FF] border-[#BFDBFE] text-[#1E40AF]'
              : 'bg-[#FFF8E8] border-[#FFE6A0] text-[#805B00]'
          }`}
        >
          <span className="font-semibold text-[11px]">
            {isClient ? 'Acme Corp Client View' : 'Agency Workspace'}
          </span>
          <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">
            {currentUser.role}
          </span>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        <div className="px-2 pb-1.5 text-[10px] font-semibold text-[#7B8794] uppercase tracking-wider">
          {isClient ? 'Client Portal' : 'Workspace'}
        </div>

        {navItems.map((item) => {
          const isActive = currentView === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                onCloseMobile();
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                isActive
                  ? 'bg-[#FFF0C2] text-[#17212B] font-semibold shadow-2xs'
                  : 'text-[#526174] hover:bg-[#F7F5F0] hover:text-[#17212B]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? 'text-[#C98B00]' : 'text-[#7B8794]'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </div>

              <div className="flex items-center gap-1.5">
                {item.tag && (
                  <span className="text-[9px] bg-[#E0F6E9] text-[#16A36A] px-1.5 py-0.2 rounded font-semibold">
                    {item.tag}
                  </span>
                )}
                {typeof item.badge === 'number' && item.badge > 0 && (
                  <span className="px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-[#F6B91A] text-[#17212B] tabular-nums">
                    {item.badge}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </nav>

      {/* Bottom Workspace Badge */}
      <div className="p-4 border-t border-[#E9E6DF] bg-white">
        <div className="text-[11px] text-[#7B8794] flex items-center justify-between">
          <span>AgencyOS v1.0</span>
          <span className="text-[#16A36A] font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#16A36A]" /> Active
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-56 shrink-0 h-screen sticky top-0 z-40">
        {content}
      </aside>

      {/* Mobile Drawer */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="fixed inset-0 bg-[#17212B]/40 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
            aria-hidden="true"
          />
          <div className="relative w-64 max-w-[80vw] h-full shadow-2xl animate-in slide-in-from-left duration-200">
            {content}
          </div>
        </div>
      )}
    </>
  );
};
