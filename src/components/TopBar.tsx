import React, { useState } from 'react';
import {
  Bell,
  Search,
  ChevronDown,
  ShieldCheck,
  UserCheck,
  Building,
  RotateCcw,
  Menu,
} from 'lucide-react';
import { Avatar } from './Avatar';
import type { User } from '../types';

interface TopBarProps {
  currentUser: User;
  onSelectUser: (userId: string) => void;
  unreadNotificationsCount: number;
  onOpenNotifications: () => void;
  onOpenSearch: () => void;
  onResetData: () => void;
  onToggleMobileMenu: () => void;
  activeView: string;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentUser,
  onSelectUser,
  unreadNotificationsCount,
  onOpenNotifications,
  onOpenSearch,
  onResetData,
  onToggleMobileMenu,
  activeView,
}) => {
  const [showPersonaMenu, setShowPersonaMenu] = useState(false);

  const personas = [
    {
      id: 'usr_sarah_admin',
      name: 'Sarah Lin',
      role: 'Admin',
      title: 'Agency Founder & Director',
      badge: 'Admin Workspace',
      icon: ShieldCheck,
      avatar: '/src/assets/images/avatar_admin_sarah_1791512306532.jpg',
    },
    {
      id: 'usr_alex_dev',
      name: 'Alex Rivera',
      role: 'Team',
      title: 'Senior Full-Stack Engineer',
      badge: 'Team Member',
      icon: UserCheck,
      avatar: '/src/assets/images/avatar_team_alex_1791512319080.jpg',
    },
    {
      id: 'usr_marcus_client',
      name: 'Marcus Vance',
      role: 'Client',
      title: 'VP of Digital, Acme Corp',
      badge: 'Client Portal',
      icon: Building,
      avatar: '/src/assets/images/avatar_client_marcus_1791512345329.jpg',
    },
  ];

  const viewTitles: Record<string, string> = {
    dashboard: 'Executive Dashboard',
    projects: 'Project Management',
    tasks: 'Tasks & Kanban',
    crm: 'CRM & Lead Pipeline',
    clients: 'Client Directory',
    client_portal: 'Client Portal (Acme Corp)',
    team: 'Team Directory',
    notifications: 'Notifications',
    settings: 'Agency Settings',
  };

  return (
    <header className="h-[60px] bg-white border-b border-[#E9E6DF] px-4 md:px-7 flex items-center justify-between gap-4 sticky top-0 z-30">
      {/* Zone 1: Mobile Toggle & Contextual View Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileMenu}
          className="md:hidden p-2 text-[#526174] hover:text-[#17212B] hover:bg-[#F7F5F0] rounded-lg transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-[#17212B]">
            {viewTitles[activeView] || 'Overview'}
          </span>
          {currentUser.role === 'client' && (
            <span className="hidden sm:inline text-xs text-[#3478F6] bg-[#E8F0FF] px-2 py-0.5 rounded font-medium">
              Client Portal
            </span>
          )}
        </div>
      </div>

      {/* Zone 2: Global Search Trigger */}
      <div className="flex-1 max-w-md mx-2 hidden sm:block">
        <button
          onClick={onOpenSearch}
          className="w-full h-9 px-3 bg-[#F7F5F0] hover:bg-[#EFECE6] border border-[#E9E6DF] rounded-lg text-left text-xs text-[#7B8794] flex items-center justify-between transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-[#7B8794]" />
            <span>Search projects, tasks, clients, leads...</span>
          </div>
          <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white border border-[#DAD5CA] rounded text-[#7B8794]">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Zone 3: Actions & Demo Switcher */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Mobile Search Button */}
        <button
          onClick={onOpenSearch}
          className="sm:hidden p-2 text-[#526174] hover:text-[#17212B] hover:bg-[#F7F5F0] rounded-lg transition-colors"
          aria-label="Search"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Reset Demo Data */}
        <button
          onClick={onResetData}
          title="Reset sample database to pristine state"
          className="p-2 text-[#7B8794] hover:text-[#17212B] hover:bg-[#F7F5F0] rounded-lg transition-colors hidden lg:flex items-center gap-1.5 text-xs"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="text-[11px]">Reset Demo</span>
        </button>

        {/* Notifications */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 text-[#526174] hover:text-[#17212B] hover:bg-[#F7F5F0] rounded-lg transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#F6B91A] rounded-full ring-2 ring-white" />
          )}
        </button>

        <div className="h-5 w-px bg-[#E9E6DF] hidden sm:block" />

        {/* Persona Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowPersonaMenu(!showPersonaMenu)}
            className="flex items-center gap-2 p-1.5 hover:bg-[#F7F5F0] rounded-lg transition-colors border border-transparent hover:border-[#E9E6DF]"
            aria-expanded={showPersonaMenu}
          >
            <Avatar src={currentUser.avatarUrl} name={currentUser.name} size="sm" />
            <div className="text-left hidden md:block">
              <div className="text-xs font-semibold text-[#17212B] leading-tight flex items-center gap-1">
                {currentUser.name}
              </div>
              <div className="text-[10px] text-[#7B8794] capitalize">
                {currentUser.role === 'client' ? 'Client (Acme)' : currentUser.role}
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#7B8794]" />
          </button>

          {showPersonaMenu && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowPersonaMenu(false)}
              />
              <div className="absolute right-0 mt-1 w-64 bg-white rounded-xl border border-[#E9E6DF] shadow-lg py-2 z-50">
                <div className="px-3 py-1.5 border-b border-[#E9E6DF]">
                  <p className="text-[10px] font-semibold text-[#7B8794] uppercase tracking-wider">
                    Switch Demo Persona
                  </p>
                  <p className="text-[11px] text-[#526174]">
                    Test both Admin & Client Portal perspectives
                  </p>
                </div>

                <div className="py-1">
                  {personas.map((p) => {
                    const isSelected = currentUser.id === p.id;
                    const Icon = p.icon;
                    return (
                      <button
                        key={p.id}
                        onClick={() => {
                          onSelectUser(p.id);
                          setShowPersonaMenu(false);
                        }}
                        className={`w-full px-3 py-2 text-left flex items-center gap-3 transition-colors ${
                          isSelected
                            ? 'bg-[#FFF8E8] text-[#17212B]'
                            : 'hover:bg-[#F7F5F0] text-[#526174]'
                        }`}
                      >
                        <Avatar src={p.avatar} name={p.name} size="sm" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-[#17212B] truncate">
                              {p.name}
                            </span>
                            <span
                              className={`text-[9px] px-1.5 py-0.2 rounded font-medium ${
                                p.role === 'admin'
                                  ? 'bg-[#FFE6A0] text-[#805B00]'
                                  : p.role === 'client'
                                  ? 'bg-[#E8F0FF] text-[#1D58D8]'
                                  : 'bg-[#F0E9FF] text-[#6D28D9]'
                              }`}
                            >
                              {p.role}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#7B8794] truncate">{p.title}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
