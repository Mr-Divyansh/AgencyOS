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

let activeUserId = 'usr_sarah_admin';

export function setActiveUser(userId: string) {
  activeUserId = userId;
  localStorage.setItem('agencyos_active_user', userId);
}

export function getActiveUserId(): string {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('agencyos_active_user');
    if (saved) activeUserId = saved;
  }
  return activeUserId;
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers || {});
  headers.set('Content-Type', 'application/json');
  headers.set('x-user-id', getActiveUserId());

  const response = await fetch(`/api${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error || `Request failed with status ${response.status}`);
  }

  return response.json();
}

export const api = {
  // Auth
  getSession: () => request<{ user: User; agency: Agency }>('/auth/session'),
  login: (userId: string) => {
    setActiveUser(userId);
    return request<{ user: User; agency: Agency }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ userId }),
    });
  },
  logout: () => request<{ success: boolean }>('/auth/logout', { method: 'POST' }),

  // Dashboard
  getDashboardSummary: () => request<DashboardSummary>('/dashboard/summary'),
  getActivity: (limit = 15) => request<ActivityItem[]>(`/dashboard/activity?limit=${limit}`),

  // Projects
  getProjects: (filters?: { status?: string; clientId?: string; search?: string }) => {
    const params = new URLSearchParams();
    if (filters?.status) params.set('status', filters.status);
    if (filters?.clientId) params.set('clientId', filters.clientId);
    if (filters?.search) params.set('search', filters.search);
    const q = params.toString();
    return request<Project[]>(`/projects${q ? `?${q}` : ''}`);
  },
  getProject: (id: string) => request<Project & { tasks: Task[]; deliverables: Deliverable[] }>(`/projects/${id}`),
  createProject: (data: Partial<Project>) =>
    request<Project>('/projects', { method: 'POST', body: JSON.stringify(data) }),
  updateProject: (id: string, data: Partial<Project>) =>
    request<Project>(`/projects/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  deleteProject: (id: string) =>
    request<{ success: boolean }>(`/projects/${id}`, { method: 'DELETE' }),

  // Tasks
  getTasks: (filters?: { projectId?: string; assigneeId?: string; status?: string }) => {
    const params = new URLSearchParams();
    if (filters?.projectId) params.set('projectId', filters.projectId);
    if (filters?.assigneeId) params.set('assigneeId', filters.assigneeId);
    if (filters?.status) params.set('status', filters.status);
    const q = params.toString();
    return request<Task[]>(`/tasks${q ? `?${q}` : ''}`);
  },
  createTask: (data: Partial<Task>) =>
    request<Task>('/tasks', { method: 'POST', body: JSON.stringify(data) }),
  updateTask: (id: string, data: Partial<Task>) =>
    request<Task>(`/tasks/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  deleteTask: (id: string) =>
    request<{ success: boolean }>(`/tasks/${id}`, { method: 'DELETE' }),

  // Leads
  getLeads: () => request<Lead[]>('/leads'),
  createLead: (data: Partial<Lead>) =>
    request<Lead>('/leads', { method: 'POST', body: JSON.stringify(data) }),
  updateLead: (id: string, data: Partial<Lead>) =>
    request<Lead>(`/leads/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  deleteLead: (id: string) =>
    request<{ success: boolean }>(`/leads/${id}`, { method: 'DELETE' }),
  convertLead: (id: string, options: { createProject?: boolean; projectName?: string; budget?: number; dueDate?: string }) =>
    request<{ client: Client; project?: Project; lead: Lead }>(`/leads/${id}/convert`, {
      method: 'POST',
      body: JSON.stringify(options),
    }),

  // Clients
  getClients: () => request<(Client & { projectCount: number; activeProjectsCount: number })[]>('/clients'),
  getClient: (id: string) => request<Client & { projects: Project[]; invoices: Invoice[] }>(`/clients/${id}`),
  createClient: (data: Partial<Client>) =>
    request<Client>('/clients', { method: 'POST', body: JSON.stringify(data) }),
  updateClient: (id: string, data: Partial<Client>) =>
    request<Client>(`/clients/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),

  // Client Portal
  getPortalData: () =>
    request<{
      client: Client;
      projects: Project[];
      deliverables: Deliverable[];
      invoices: Invoice[];
      teamMembers: User[];
    }>('/portal/client'),
  reviewDeliverable: (id: string, status: 'approved' | 'revision_requested', feedback?: string) =>
    request<{ deliverable: Deliverable; success: boolean }>(`/portal/deliverables/${id}/review`, {
      method: 'POST',
      body: JSON.stringify({ status, feedback }),
    }),

  // Team
  getTeam: () => request<(User & { assignedProjectCount: number })[]>('/team'),
  updateTeamMember: (id: string, data: Partial<User>) =>
    request<User>(`/team/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),

  // Notifications
  getNotifications: () => request<NotificationItem[]>('/notifications'),
  markNotificationRead: (id: string) =>
    request<{ success: boolean }>(`/notifications/${id}/read`, { method: 'PATCH' }),
  markAllNotificationsRead: () =>
    request<{ success: boolean }>('/notifications/read-all', { method: 'POST' }),

  // Settings
  getSettings: () => request<{ agency: Agency; user: User }>('/settings'),
  updateSettings: (data: Partial<Agency>) =>
    request<Agency>('/settings', { method: 'PATCH', body: JSON.stringify(data) }),
  resetDatabase: () => request<{ success: boolean; message: string }>('/settings/reset', { method: 'POST' }),
};
