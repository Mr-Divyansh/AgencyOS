import React, { useEffect, useState, useCallback } from 'react';
import { api, setActiveUser, getActiveUserId } from './api';
import { TopBar } from './components/TopBar';
import { Sidebar } from './components/Sidebar';
import { Modal } from './components/Modal';
import { DashboardView } from './views/DashboardView';
import { ProjectsView } from './views/ProjectsView';
import { TasksView } from './views/TasksView';
import { CrmView } from './views/CrmView';
import { ClientsView } from './views/ClientsView';
import { ClientPortalView } from './views/ClientPortalView';
import { TeamView } from './views/TeamView';
import { NotificationsView } from './views/NotificationsView';
import { SettingsView } from './views/SettingsView';
import {
  Search,
  FolderKanban,
  CheckSquare,
  Users,
  Contact2,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import type {
  User,
  Agency,
  Project,
  Task,
  Lead,
  Client,
  Deliverable,
  Invoice,
  NotificationItem,
  ActivityItem,
  DashboardSummary,
} from './types';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [agency, setAgency] = useState<Agency | null>(null);
  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Core Data States
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [clients, setClients] = useState<
    (Client & { projectCount?: number; activeProjectsCount?: number })[]
  >([]);
  const [team, setTeam] = useState<(User & { assignedProjectCount?: number })[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [deliverables, setDeliverables] = useState<Deliverable[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  // Search Modal
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Quick Action Modal openers
  const [quickProjectOpen, setQuickProjectOpen] = useState(false);
  const [quickLeadOpen, setQuickLeadOpen] = useState(false);
  const [quickTaskOpen, setQuickTaskOpen] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const loadData = useCallback(async () => {
    try {
      const [
        sessionRes,
        summaryRes,
        projectsRes,
        tasksRes,
        leadsRes,
        clientsRes,
        teamRes,
        notifsRes,
        actsRes,
      ] = await Promise.all([
        api.getSession(),
        api.getDashboardSummary(),
        api.getProjects(),
        api.getTasks(),
        api.getLeads(),
        api.getClients(),
        api.getTeam(),
        api.getNotifications(),
        api.getActivity(),
      ]);

      setCurrentUser(sessionRes.user);
      setAgency(sessionRes.agency);
      setSummary(summaryRes);
      setProjects(projectsRes);
      setTasks(tasksRes);
      setLeads(leadsRes);
      setClients(clientsRes);
      setTeam(teamRes);
      setNotifications(notifsRes);
      setActivities(actsRes);

      // Load portal data if client role or for preview
      const portalData = await api.getPortalData().catch(() => null);
      if (portalData) {
        setDeliverables(portalData.deliverables);
        setInvoices(portalData.invoices);
      }
    } catch (err) {
      console.error('Failed loading data:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Keyboard shortcut for Cmd+K Search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Switch Persona Handler
  const handleSelectUser = async (userId: string) => {
    setIsLoading(true);
    try {
      const res = await api.login(userId);
      setCurrentUser(res.user);
      if (res.user.role === 'client') {
        setCurrentView('client_portal');
      } else {
        if (currentView === 'client_portal') {
          setCurrentView('dashboard');
        }
      }
      await loadData();
      showToast(`Switched persona to ${res.user.name} (${res.user.role})`);
    } catch (err) {
      console.error('Failed switching user:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset Demo Database
  const handleResetData = async () => {
    setIsLoading(true);
    try {
      await api.resetDatabase();
      await loadData();
      showToast('Database reset to initial demo state!');
    } catch (err) {
      console.error('Failed resetting:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Projects CRUD
  const handleCreateProject = async (data: Partial<Project>) => {
    const created = await api.createProject(data);
    await loadData();
    showToast(`Project "${created.name}" created!`);
  };

  const handleUpdateProject = async (id: string, data: Partial<Project>) => {
    await api.updateProject(id, data);
    await loadData();
    showToast('Project updated successfully.');
  };

  const handleDeleteProject = async (id: string) => {
    await api.deleteProject(id);
    await loadData();
    showToast('Project archived.');
  };

  // Tasks CRUD
  const handleCreateTask = async (data: Partial<Task>) => {
    const created = await api.createTask(data);
    await loadData();
    showToast(`Task "${created.title}" added!`);
  };

  const handleUpdateTask = async (id: string, data: Partial<Task>) => {
    await api.updateTask(id, data);
    await loadData();
  };

  const handleDeleteTask = async (id: string) => {
    await api.deleteTask(id);
    await loadData();
    showToast('Task removed.');
  };

  // CRM Leads
  const handleCreateLead = async (data: Partial<Lead>) => {
    const created = await api.createLead(data);
    await loadData();
    showToast(`Lead for ${created.company} added!`);
  };

  const handleUpdateLead = async (id: string, data: Partial<Lead>) => {
    await api.updateLead(id, data);
    await loadData();
  };

  const handleConvertLead = async (
    id: string,
    options: { createProject?: boolean; projectName?: string; budget?: number; dueDate?: string }
  ) => {
    const res = await api.convertLead(id, options);
    await loadData();
    showToast(`Converted ${res.client.company} to active client!`);
    setCurrentView('clients');
  };

  // Clients
  const handleCreateClient = async (data: Partial<Client>) => {
    const created = await api.createClient(data);
    await loadData();
    showToast(`Client ${created.company} registered!`);
  };

  const handleUpdateClient = async (id: string, data: Partial<Client>) => {
    await api.updateClient(id, data);
    await loadData();
    showToast('Client details updated.');
  };

  // Client Portal Deliverable Review
  const handleReviewDeliverable = async (
    id: string,
    status: 'approved' | 'revision_requested',
    feedback?: string
  ) => {
    await api.reviewDeliverable(id, status, feedback);
    await loadData();
    showToast(
      status === 'approved'
        ? 'Deliverable approved! The agency team has been notified.'
        : 'Revision request sent to agency squad.'
    );
  };

  // Team
  const handleUpdateTeamMember = async (id: string, data: Partial<User>) => {
    await api.updateTeamMember(id, data);
    await loadData();
    showToast('Team member permissions updated.');
  };

  // Notifications
  const handleMarkNotificationRead = async (id: string) => {
    await api.markNotificationRead(id);
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllNotificationsRead = async () => {
    await api.markAllNotificationsRead();
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('All notifications marked as read.');
  };

  // Global Search filter
  const searchResults = {
    projects: projects.filter(
      (p) =>
        searchQuery &&
        (p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.clientName && p.clientName.toLowerCase().includes(searchQuery.toLowerCase())))
    ),
    tasks: tasks.filter(
      (t) => searchQuery && t.title.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    leads: leads.filter(
      (l) =>
        searchQuery &&
        (l.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
          l.name.toLowerCase().includes(searchQuery.toLowerCase()))
    ),
    clients: clients.filter(
      (c) =>
        searchQuery &&
        (c.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.name.toLowerCase().includes(searchQuery.toLowerCase()))
    ),
  };

  if (isLoading || !currentUser) {
    return (
      <div className="min-h-screen bg-[#F7F5F0] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-3 border-[#F6B91A] border-t-transparent rounded-full animate-spin mx-auto" />
          <h2 className="text-sm font-semibold text-[#17212B]">
            Initializing AgencyOS Workspace...
          </h2>
        </div>
      </div>
    );
  }

  const unreadNotifs = notifications.filter((n) => !n.read).length;
  const activeClientObj = clients[0] || {
    id: 'cli_acme_01',
    agencyId: 'agency_dweb_01',
    name: 'Marcus Vance',
    company: 'Acme Corporation',
    email: 'marcus@acmecorp.com',
    status: 'active' as const,
    createdAt: new Date().toISOString(),
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] flex flex-col md:flex-row antialiased">
      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#17212B] text-white px-4 py-2.5 rounded-xl shadow-xl text-xs flex items-center gap-2 animate-in slide-in-from-bottom duration-150">
          <CheckCircle2 className="w-4 h-4 text-[#F6B91A]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <Sidebar
        currentView={currentView}
        onNavigate={(v) => setCurrentView(v)}
        currentUser={currentUser}
        agency={agency || undefined}
        unreadCount={unreadNotifs}
        isOpenMobile={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* Main Viewport Container */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar
          currentUser={currentUser}
          onSelectUser={handleSelectUser}
          unreadNotificationsCount={unreadNotifs}
          onOpenNotifications={() => setCurrentView('notifications')}
          onOpenSearch={() => setSearchOpen(true)}
          onResetData={handleResetData}
          onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
          activeView={currentView}
        />

        <main className="flex-1 p-4 md:p-7 max-w-7xl w-full mx-auto">
          {currentView === 'dashboard' && (
            <DashboardView
              summary={summary}
              projects={projects}
              tasks={tasks}
              leads={leads}
              activities={activities}
              onNavigate={(v) => setCurrentView(v)}
              onOpenNewProject={() => setCurrentView('projects')}
              onOpenNewLead={() => setCurrentView('crm')}
              onOpenNewTask={() => setCurrentView('tasks')}
            />
          )}

          {currentView === 'projects' && (
            <ProjectsView
              projects={projects}
              clients={clients}
              team={team}
              onCreateProject={handleCreateProject}
              onUpdateProject={handleUpdateProject}
              onDeleteProject={handleDeleteProject}
            />
          )}

          {currentView === 'tasks' && (
            <TasksView
              tasks={tasks}
              projects={projects}
              team={team}
              onCreateTask={handleCreateTask}
              onUpdateTask={handleUpdateTask}
              onDeleteTask={handleDeleteTask}
            />
          )}

          {currentView === 'crm' && (
            <CrmView
              leads={leads}
              onCreateLead={handleCreateLead}
              onUpdateLead={handleUpdateLead}
              onConvertLead={handleConvertLead}
            />
          )}

          {currentView === 'clients' && (
            <ClientsView
              clients={clients}
              projects={projects}
              onCreateClient={handleCreateClient}
              onUpdateClient={handleUpdateClient}
              onNavigateToProjects={(cId) => setCurrentView('projects')}
            />
          )}

          {currentView === 'client_portal' && (
            <ClientPortalView
              client={activeClientObj}
              projects={projects.filter((p) => p.clientId === activeClientObj.id)}
              deliverables={deliverables}
              invoices={invoices}
              team={team}
              onReviewDeliverable={handleReviewDeliverable}
            />
          )}

          {currentView === 'team' && (
            <TeamView
              team={team}
              currentUser={currentUser}
              onUpdateMember={handleUpdateTeamMember}
            />
          )}

          {currentView === 'notifications' && (
            <NotificationsView
              notifications={notifications}
              onMarkRead={handleMarkNotificationRead}
              onMarkAllRead={handleMarkAllNotificationsRead}
              onNavigate={(v) => setCurrentView(v)}
            />
          )}

          {currentView === 'settings' && (
            <SettingsView
              agency={agency}
              currentUser={currentUser}
              onUpdateAgency={async (data) => {
                const updated = await api.updateSettings(data);
                setAgency(updated);
                showToast('Agency profile updated.');
              }}
              onResetDatabase={handleResetData}
            />
          )}
        </main>
      </div>

      {/* Global Search Dialog */}
      {searchOpen && (
        <Modal
          isOpen={searchOpen}
          onClose={() => {
            setSearchOpen(false);
            setSearchQuery('');
          }}
          title="Search Workspace"
          subtitle="Instant jump to projects, tasks, CRM deals, or clients"
        >
          <div className="space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 text-[#7B8794] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                autoFocus
                placeholder="Type to search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-[#F7F5F0] border border-[#E9E6DF] rounded-lg text-xs text-[#17212B] focus:outline-hidden focus:border-[#DAD5CA]"
              />
            </div>

            {searchQuery ? (
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {/* Projects */}
                {searchResults.projects.length > 0 && (
                  <div>
                    <h5 className="text-[10px] font-bold text-[#7B8794] uppercase tracking-wider mb-1">
                      Projects
                    </h5>
                    {searchResults.projects.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          setCurrentView('projects');
                          setSearchOpen(false);
                        }}
                        className="p-2 hover:bg-[#F7F5F0] rounded-lg cursor-pointer flex items-center justify-between text-xs"
                      >
                        <span className="font-semibold text-[#17212B]">{p.name}</span>
                        <span className="text-[#526174] text-[11px]">{p.clientName}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tasks */}
                {searchResults.tasks.length > 0 && (
                  <div>
                    <h5 className="text-[10px] font-bold text-[#7B8794] uppercase tracking-wider mb-1">
                      Tasks
                    </h5>
                    {searchResults.tasks.map((t) => (
                      <div
                        key={t.id}
                        onClick={() => {
                          setCurrentView('tasks');
                          setSearchOpen(false);
                        }}
                        className="p-2 hover:bg-[#F7F5F0] rounded-lg cursor-pointer flex items-center justify-between text-xs"
                      >
                        <span className="font-semibold text-[#17212B]">{t.title}</span>
                        <span className="text-[10px] uppercase font-bold text-[#7B8794]">
                          {t.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Leads */}
                {searchResults.leads.length > 0 && (
                  <div>
                    <h5 className="text-[10px] font-bold text-[#7B8794] uppercase tracking-wider mb-1">
                      CRM Leads
                    </h5>
                    {searchResults.leads.map((l) => (
                      <div
                        key={l.id}
                        onClick={() => {
                          setCurrentView('crm');
                          setSearchOpen(false);
                        }}
                        className="p-2 hover:bg-[#F7F5F0] rounded-lg cursor-pointer flex items-center justify-between text-xs"
                      >
                        <span className="font-semibold text-[#17212B]">{l.company}</span>
                        <span className="font-bold text-[#16A36A] tabular-nums">
                          ${l.estimatedValue.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Clients */}
                {searchResults.clients.length > 0 && (
                  <div>
                    <h5 className="text-[10px] font-bold text-[#7B8794] uppercase tracking-wider mb-1">
                      Clients
                    </h5>
                    {searchResults.clients.map((c) => (
                      <div
                        key={c.id}
                        onClick={() => {
                          setCurrentView('clients');
                          setSearchOpen(false);
                        }}
                        className="p-2 hover:bg-[#F7F5F0] rounded-lg cursor-pointer flex items-center justify-between text-xs"
                      >
                        <span className="font-semibold text-[#17212B]">{c.company}</span>
                        <span className="text-[#526174] text-[11px]">{c.name}</span>
                      </div>
                    ))}
                  </div>
                )}

                {searchResults.projects.length === 0 &&
                  searchResults.tasks.length === 0 &&
                  searchResults.leads.length === 0 &&
                  searchResults.clients.length === 0 && (
                    <p className="text-xs text-[#7B8794] text-center py-4">
                      No matching records found.
                    </p>
                  )}
              </div>
            ) : (
              <p className="text-[11px] text-[#7B8794] text-center py-4">
                Type above to search across active projects, tasks, leads, and clients.
              </p>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}
