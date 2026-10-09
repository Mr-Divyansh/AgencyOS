import React from 'react';
import {
  FolderKanban,
  Users,
  CheckSquare,
  TrendingUp,
  Clock,
  ArrowRight,
  Plus,
  Sparkles,
  AlertCircle,
  Building,
} from 'lucide-react';
import { MetricsCard } from '../components/MetricsCard';
import { RevenueChart, StatusDonut } from '../components/Charts';
import { Avatar } from '../components/Avatar';
import type { DashboardSummary, Project, Lead, ActivityItem, Task } from '../types';

interface DashboardViewProps {
  summary: DashboardSummary | null;
  projects: Project[];
  tasks: Task[];
  leads: Lead[];
  activities: ActivityItem[];
  onNavigate: (view: string) => void;
  onOpenNewProject: () => void;
  onOpenNewLead: () => void;
  onOpenNewTask: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  summary,
  projects,
  tasks,
  leads,
  activities,
  onNavigate,
  onOpenNewProject,
  onOpenNewLead,
  onOpenNewTask,
}) => {
  if (!summary) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-8 w-48 bg-[#E9E6DF] rounded-md" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 bg-[#E9E6DF] rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  const upcomingDeadlines = projects
    .filter((p) => p.status !== 'completed' && p.status !== 'cancelled')
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
    .slice(0, 4);

  const recentWonLeads = leads
    .filter((l) => l.status === 'won' || l.status === 'proposal_sent')
    .slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-[#17212B]">Agency Overview</h2>
          <p className="text-xs text-[#526174] mt-0.5">
            Operational performance, active project deliveries, and CRM pipeline.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenNewProject}
            className="px-3 py-1.5 bg-[#F6B91A] hover:bg-[#E5A80C] text-[#17212B] font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Project</span>
          </button>
          <button
            onClick={onOpenNewLead}
            className="px-3 py-1.5 bg-white hover:bg-[#F7F5F0] border border-[#DAD5CA] text-[#17212B] font-medium text-xs rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Lead</span>
          </button>
        </div>
      </div>

      {/* 4 Primary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricsCard
          label="Active Projects"
          value={summary.activeProjects}
          comparison="+2 this month"
          sublabel={`${summary.completedProjects} delivered`}
          icon={FolderKanban}
          onClick={() => onNavigate('projects')}
        />

        <MetricsCard
          label="Active Clients"
          value={summary.activeClients}
          comparison="100% retention"
          sublabel="5 enterprise accounts"
          icon={Users}
          onClick={() => onNavigate('clients')}
        />

        <MetricsCard
          label="Open Tasks"
          value={summary.openTasks}
          comparison={`${summary.overdueTasks} overdue`}
          positive={summary.overdueTasks === 0}
          sublabel="Across all active squads"
          icon={CheckSquare}
          onClick={() => onNavigate('tasks')}
        />

        <MetricsCard
          label="Pipeline Deal Value"
          value={`$${summary.wonLeadsValue.toLocaleString()}`}
          comparison="+$64.5k booked"
          sublabel={`${summary.totalLeads} total leads`}
          icon={TrendingUp}
          onClick={() => onNavigate('crm')}
        />
      </div>

      {/* Analytics Grid: Revenue Trend & Project Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Trajectory (2 Cols) */}
        <div className="lg:col-span-2 agency-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-[#17212B]">
                Recorded Revenue Trajectory
              </h3>
              <p className="text-xs text-[#7B8794]">
                Monthly billings from completed and retainer milestones
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-[#7B8794] block">Total Collected</span>
              <span className="text-base font-bold text-[#17212B] tabular-nums">
                ${summary.revenueTotal.toLocaleString()}
              </span>
            </div>
          </div>

          <RevenueChart data={summary.revenueHistory} />
        </div>

        {/* Project Status Distribution Donut (1 Col) */}
        <div className="agency-card p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-[#17212B]">Project Status</h3>
            <p className="text-xs text-[#7B8794] mb-4">
              Real-time distribution across delivery stages
            </p>
          </div>

          <StatusDonut data={summary.projectStatusDistribution} />

          <div className="mt-4 pt-3 border-t border-[#E9E6DF] flex items-center justify-between text-xs">
            <span className="text-[#526174]">Total Client Engagements</span>
            <span className="font-semibold text-[#17212B] tabular-nums">
              {projects.length}
            </span>
          </div>
        </div>
      </div>

      {/* Warm Client Portal Callout */}
      <div className="p-4 bg-[#FFF8E8] border border-[#FFE6A0] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#F6B91A] flex items-center justify-center shrink-0">
            <Building className="w-5 h-5 text-[#17212B]" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#17212B]">
              Client Portal Experience Enabled
            </h4>
            <p className="text-xs text-[#526174]">
              Review deliverables, milestone sign-offs, and live invoice receipts from Marcus Vance&apos;s (Acme Corp) perspective.
            </p>
          </div>
        </div>
        <button
          onClick={() => onNavigate('client_portal')}
          className="px-3 py-1.5 bg-[#17212B] hover:bg-[#202A33] text-white text-xs font-semibold rounded-lg shrink-0 transition-colors flex items-center gap-1.5"
        >
          <span>Launch Client Portal</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Operational Grid: Upcoming Deadlines & Live Activity Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Deadlines */}
        <div className="agency-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-[#17212B]">Upcoming Deadlines</h3>
              <p className="text-xs text-[#7B8794]">Deliverable dates for active engagements</p>
            </div>
            <button
              onClick={() => onNavigate('projects')}
              className="text-xs text-[#C98B00] hover:text-[#17212B] font-semibold flex items-center gap-1 transition-colors"
            >
              <span>View all</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3">
            {upcomingDeadlines.length === 0 ? (
              <p className="text-xs text-[#7B8794] py-4 text-center">No upcoming deadlines.</p>
            ) : (
              upcomingDeadlines.map((proj) => {
                const isOverdue = proj.dueDate < new Date().toISOString().split('T')[0];
                return (
                  <div
                    key={proj.id}
                    onClick={() => onNavigate('projects')}
                    className="p-3 bg-[#FCFBF8] hover:bg-[#F7F5F0] border border-[#E9E6DF] rounded-lg transition-colors cursor-pointer flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-[#17212B] truncate">
                          {proj.name}
                        </span>
                        <span className="text-[10px] text-[#526174]">· {proj.clientName}</span>
                      </div>
                      <div className="mt-1 flex items-center gap-2">
                        <div className="w-24 bg-[#E9E6DF] h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-[#F6B91A] h-full rounded-full"
                            style={{ width: `${proj.progress || 0}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-[#7B8794] tabular-nums font-medium">
                          {proj.progress || 0}%
                        </span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div
                        className={`text-xs font-medium tabular-nums ${
                          isOverdue ? 'text-[#EF6262] font-semibold' : 'text-[#526174]'
                        }`}
                      >
                        {proj.dueDate}
                      </div>
                      <span className="text-[10px] text-[#7B8794]">
                        {isOverdue ? 'Overdue' : 'Due date'}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Live Activity Feed */}
        <div className="agency-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-[#17212B]">Recent Activity Stream</h3>
              <p className="text-xs text-[#7B8794]">Audit events recorded across the workspace</p>
            </div>
            <span className="text-[10px] text-[#16A36A] font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16A36A]" /> Real-time
            </span>
          </div>

          <div className="space-y-3">
            {activities.length === 0 ? (
              <p className="text-xs text-[#7B8794] py-4 text-center">No recent activity.</p>
            ) : (
              activities.slice(0, 4).map((act) => (
                <div key={act.id} className="flex items-start gap-3 text-xs">
                  <Avatar src={act.actorAvatar} name={act.actorName} size="sm" />
                  <div className="flex-1 min-w-0 pt-0.5">
                    <p className="text-[#17212B] leading-tight">
                      <span className="font-semibold">{act.actorName}</span>{' '}
                      <span className="text-[#526174]">{act.action}</span>{' '}
                      <span className="font-medium text-[#17212B] underline decoration-[#DAD5CA]">
                        {act.entityName}
                      </span>
                    </p>
                    <span className="text-[10px] text-[#7B8794] tabular-nums mt-0.5 block">
                      {new Date(act.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
