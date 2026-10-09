export type UserRole = 'admin' | 'team' | 'client';

export interface User {
  id: string;
  agencyId: string;
  name: string;
  email: string;
  role: UserRole;
  title: string;
  avatarUrl: string;
  active: boolean;
  clientId?: string; // If role === 'client'
  createdAt: string;
}

export interface Agency {
  id: string;
  name: string;
  website: string;
  currency: string;
  timezone: string;
  contactEmail: string;
  createdAt: string;
}

export interface Client {
  id: string;
  agencyId: string;
  name: string;
  company: string;
  email: string;
  phone?: string;
  website?: string;
  status: 'active' | 'lead' | 'churned';
  notes?: string;
  totalValue?: number;
  createdAt: string;
}

export type ProjectStatus = 'planning' | 'in_progress' | 'in_review' | 'on_hold' | 'completed' | 'cancelled';
export type PriorityLevel = 'low' | 'medium' | 'high' | 'urgent';

export interface Milestone {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
}

export interface Deliverable {
  id: string;
  projectId: string;
  title: string;
  description: string;
  type: 'design' | 'code' | 'document' | 'video';
  status: 'pending_review' | 'approved' | 'revision_requested';
  assetUrl?: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  agencyId: string;
  clientId: string;
  name: string;
  description: string;
  status: ProjectStatus;
  priority: PriorityLevel;
  budget: number;
  startDate: string;
  dueDate: string;
  assignedUserIds: string[];
  milestones?: Milestone[];
  createdAt: string;
  updatedAt: string;
  // Computed helpers:
  clientName?: string;
  progress?: number;
  totalTasks?: number;
  completedTasks?: number;
}

export type TaskStatus = 'todo' | 'in_progress' | 'in_review' | 'done';

export interface Task {
  id: string;
  agencyId: string;
  projectId: string;
  title: string;
  description: string;
  assigneeId: string;
  status: TaskStatus;
  priority: PriorityLevel;
  dueDate: string;
  estimatedHours?: number;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
  // Computed:
  projectName?: string;
  assigneeName?: string;
  assigneeAvatar?: string;
}

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'proposal_sent' | 'won' | 'lost';

export interface Lead {
  id: string;
  agencyId: string;
  name: string;
  company: string;
  email: string;
  phone?: string;
  source: string;
  serviceInterest: string;
  estimatedValue: number;
  status: LeadStatus;
  assignedToId: string;
  notes: string;
  followUpDate?: string;
  convertedClientId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Invoice {
  id: string;
  agencyId: string;
  clientId: string;
  projectId?: string;
  number: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  issueDate: string;
  dueDate: string;
  paidAt?: string;
  description: string;
  // Computed:
  clientName?: string;
}

export interface NotificationItem {
  id: string;
  agencyId: string;
  userId: string;
  type: 'task_assigned' | 'task_due' | 'project_status' | 'lead_won' | 'deliverable_feedback' | 'system';
  title: string;
  message: string;
  read: boolean;
  targetView?: string;
  targetId?: string;
  createdAt: string;
}

export interface ActivityItem {
  id: string;
  agencyId: string;
  actorId: string;
  actorName: string;
  actorAvatar: string;
  action: string;
  entityType: 'project' | 'task' | 'lead' | 'client' | 'deliverable';
  entityId: string;
  entityName: string;
  timestamp: string;
}

export interface DashboardSummary {
  activeProjects: number;
  completedProjects: number;
  openTasks: number;
  overdueTasks: number;
  totalLeads: number;
  wonLeadsValue: number;
  revenueTotal: number;
  activeClients: number;
  revenueHistory: { month: string; revenue: number; target: number }[];
  projectStatusDistribution: { status: ProjectStatus; label: string; count: number; color: string }[];
}
