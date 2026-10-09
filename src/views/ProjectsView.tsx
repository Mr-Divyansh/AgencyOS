import React, { useState } from 'react';
import {
  FolderKanban,
  Plus,
  Search,
  Filter,
  Calendar,
  DollarSign,
  CheckCircle2,
  Clock,
  ChevronRight,
  MoreVertical,
  Trash2,
  Edit2,
  ExternalLink,
} from 'lucide-react';
import { Avatar } from '../components/Avatar';
import { Modal } from '../components/Modal';
import type { Project, Client, User, ProjectStatus } from '../types';

interface ProjectsViewProps {
  projects: Project[];
  clients: Client[];
  team: User[];
  onCreateProject: (data: Partial<Project>) => Promise<void>;
  onUpdateProject: (id: string, data: Partial<Project>) => Promise<void>;
  onDeleteProject: (id: string) => Promise<void>;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  projects,
  clients,
  team,
  onCreateProject,
  onUpdateProject,
  onDeleteProject,
}) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // New project form state
  const [name, setName] = useState('');
  const [clientId, setClientId] = useState(clients[0]?.id || '');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<ProjectStatus>('planning');
  const [budget, setBudget] = useState(25000);
  const [dueDate, setDueDate] = useState('2026-11-30');
  const [assignedUserIds, setAssignedUserIds] = useState<string[]>(['usr_sarah_admin', 'usr_alex_dev']);

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !clientId) return;
    await onCreateProject({
      name,
      clientId,
      description,
      status,
      budget: Number(budget),
      startDate: new Date().toISOString().split('T')[0],
      dueDate,
      assignedUserIds,
    });
    setName('');
    setDescription('');
    setIsCreateOpen(false);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject) return;
    await onUpdateProject(selectedProject.id, {
      name: selectedProject.name,
      description: selectedProject.description,
      status: selectedProject.status,
      budget: Number(selectedProject.budget),
      dueDate: selectedProject.dueDate,
    });
    setIsEditOpen(false);
  };

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.clientName && p.clientName.toLowerCase().includes(search.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusColors: Record<ProjectStatus, { bg: string; text: string; label: string }> = {
    planning: { bg: 'bg-[#F0E9FF]', text: 'text-[#6D28D9]', label: 'Planning' },
    in_progress: { bg: 'bg-[#E8F0FF]', text: 'text-[#1D58D8]', label: 'In Progress' },
    in_review: { bg: 'bg-[#FFF0C2]', text: 'text-[#92400E]', label: 'In Review' },
    on_hold: { bg: 'bg-[#F7F5F0]', text: 'text-[#526174]', label: 'On Hold' },
    completed: { bg: 'bg-[#E0F6E9]', text: 'text-[#166534]', label: 'Completed' },
    cancelled: { bg: 'bg-[#FDE8E8]', text: 'text-[#991B1B]', label: 'Cancelled' },
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#17212B]">Projects Directory</h2>
          <p className="text-xs text-[#526174] mt-0.5">
            Active client engagements, deliverable milestones, and budget allocations.
          </p>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="px-3.5 py-2 bg-[#F6B91A] hover:bg-[#E5A80C] text-[#17212B] font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5 self-start sm:self-auto shadow-2xs"
        >
          <Plus className="w-4 h-4" />
          <span>Create Project</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="flex-1 max-w-sm relative">
          <Search className="w-3.5 h-3.5 text-[#7B8794] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search projects or clients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-white border border-[#E9E6DF] rounded-lg text-xs text-[#17212B] placeholder-[#7B8794] focus:outline-hidden focus:border-[#DAD5CA]"
          />
        </div>

        {/* Status Filter Tabs (Zero-Pill interactive segmented control) */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-[#E9E6DF] overflow-x-auto">
          {['all', 'in_progress', 'in_review', 'planning', 'completed'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                statusFilter === st
                  ? 'bg-[#FFF0C2] text-[#17212B] font-semibold shadow-2xs'
                  : 'text-[#526174] hover:text-[#17212B] hover:bg-[#F7F5F0]'
              }`}
            >
              {st === 'all'
                ? 'All Projects'
                : st.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="agency-card p-12 text-center">
          <FolderKanban className="w-8 h-8 text-[#7B8794] mx-auto mb-2 opacity-50" />
          <h3 className="text-sm font-semibold text-[#17212B]">No projects found</h3>
          <p className="text-xs text-[#526174] mt-1 max-w-sm mx-auto">
            {search ? 'Try adjusting your search criteria.' : 'Create your first project engagement to get started.'}
          </p>
          {search && (
            <button
              onClick={() => setSearch('')}
              className="mt-3 text-xs font-semibold text-[#C98B00] hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project) => {
            const stBadge = statusColors[project.status];
            const isOverdue =
              project.dueDate < new Date().toISOString().split('T')[0] &&
              project.status !== 'completed';

            return (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="agency-card p-5 hover:border-[#DAD5CA] hover:shadow-sm transition-all duration-150 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs text-[#526174] font-medium truncate">
                      {project.clientName}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-semibold ${stBadge.bg} ${stBadge.text}`}
                    >
                      {stBadge.label}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-[#17212B] group-hover:text-[#F6B91A] line-clamp-1">
                    {project.name}
                  </h3>
                  <p className="text-xs text-[#7B8794] line-clamp-2 mt-1 min-h-[32px]">
                    {project.description || 'No project description provided.'}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-[#E9E6DF] space-y-3">
                  {/* Progress bar */}
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-[#526174]">Task Completion</span>
                      <span className="font-semibold text-[#17212B] tabular-nums">
                        {project.progress || 0}%
                      </span>
                    </div>
                    <div className="w-full bg-[#E9E6DF] h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-[#F6B91A] h-full rounded-full transition-all duration-300"
                        style={{ width: `${project.progress || 0}%` }}
                      />
                    </div>
                  </div>

                  {/* Metadata Row (Unboxed text with dots) */}
                  <div className="flex items-center justify-between text-xs text-[#526174]">
                    <div className="flex items-center gap-1.5 tabular-nums">
                      <Calendar className="w-3.5 h-3.5 text-[#7B8794]" />
                      <span className={isOverdue ? 'text-[#EF6262] font-semibold' : ''}>
                        {project.dueDate}
                      </span>
                    </div>

                    <div className="font-semibold text-[#17212B] tabular-nums">
                      ${project.budget.toLocaleString()}
                    </div>
                  </div>

                  {/* Team Avatars */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex -space-x-1.5">
                      {project.assignedUserIds.map((uid) => {
                        const member = team.find((u) => u.id === uid);
                        if (!member) return null;
                        return (
                          <Avatar
                            key={uid}
                            src={member.avatarUrl}
                            name={member.name}
                            size="xs"
                            className="ring-2 ring-white"
                          />
                        );
                      })}
                    </div>
                    <span className="text-[11px] text-[#C98B00] font-semibold flex items-center gap-0.5">
                      <span>Details</span>
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Project Details Modal */}
      {selectedProject && (
        <Modal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          title={selectedProject.name}
          subtitle={`Client: ${selectedProject.clientName} · Due ${selectedProject.dueDate}`}
          maxWidth="xl"
        >
          <div className="space-y-6">
            <div className="p-3 bg-[#FCFBF8] border border-[#E9E6DF] rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#7B8794] uppercase tracking-wider block">
                  Delivery Status
                </span>
                <span
                  className={`text-xs px-2 py-0.5 rounded font-semibold inline-block mt-0.5 ${
                    statusColors[selectedProject.status].bg
                  } ${statusColors[selectedProject.status].text}`}
                >
                  {statusColors[selectedProject.status].label}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-[#7B8794] uppercase tracking-wider block">
                  Allocated Budget
                </span>
                <span className="text-base font-bold text-[#17212B] tabular-nums">
                  ${selectedProject.budget.toLocaleString()}
                </span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-[#17212B] mb-1">Project Brief</h4>
              <p className="text-xs text-[#526174] leading-relaxed">
                {selectedProject.description}
              </p>
            </div>

            {/* Milestones Checklist */}
            {selectedProject.milestones && selectedProject.milestones.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-[#17212B] mb-2">Milestones</h4>
                <div className="space-y-2">
                  {selectedProject.milestones.map((m) => (
                    <div
                      key={m.id}
                      className="p-2.5 bg-white border border-[#E9E6DF] rounded-lg flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle2
                          className={`w-4 h-4 ${
                            m.completed ? 'text-[#16A36A]' : 'text-[#DAD5CA]'
                          }`}
                        />
                        <span
                          className={`font-medium ${
                            m.completed ? 'line-through text-[#7B8794]' : 'text-[#17212B]'
                          }`}
                        >
                          {m.title}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#7B8794] tabular-nums">
                        {m.dueDate}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-[#E9E6DF]">
              <button
                onClick={() => {
                  onDeleteProject(selectedProject.id);
                  setSelectedProject(null);
                }}
                className="text-xs text-[#EF6262] hover:text-[#991B1B] font-medium flex items-center gap-1 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Archive Project</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setIsEditOpen(true);
                  }}
                  className="px-3 py-1.5 bg-white border border-[#DAD5CA] text-xs font-semibold rounded-lg hover:bg-[#F7F5F0] transition-colors"
                >
                  Edit Details
                </button>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-1.5 bg-[#17212B] text-white text-xs font-semibold rounded-lg hover:bg-[#202A33] transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Create Project Modal */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Create New Project"
        subtitle="Provision an engagement for a registered client."
      >
        <form onSubmit={handleCreateSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#17212B] mb-1">
              Project Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Acme Brand Refresh & E-Commerce Web"
              className="w-full px-3 py-2 bg-white border border-[#E9E6DF] rounded-lg text-xs text-[#17212B] focus:outline-hidden focus:border-[#DAD5CA]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#17212B] mb-1">
                Client *
              </label>
              <select
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#E9E6DF] rounded-lg text-xs text-[#17212B] focus:outline-hidden focus:border-[#DAD5CA]"
              >
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.company || c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#17212B] mb-1">
                Initial Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ProjectStatus)}
                className="w-full px-3 py-2 bg-white border border-[#E9E6DF] rounded-lg text-xs text-[#17212B] focus:outline-hidden focus:border-[#DAD5CA]"
              >
                <option value="planning">Planning</option>
                <option value="in_progress">In Progress</option>
                <option value="in_review">In Review</option>
                <option value="on_hold">On Hold</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#17212B] mb-1">
                Budget (USD)
              </label>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full px-3 py-2 bg-white border border-[#E9E6DF] rounded-lg text-xs text-[#17212B] focus:outline-hidden focus:border-[#DAD5CA]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#17212B] mb-1">
                Target Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#E9E6DF] rounded-lg text-xs text-[#17212B] focus:outline-hidden focus:border-[#DAD5CA]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#17212B] mb-1">
              Description / Scope of Work
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Key project goals, deliverables, and scope boundaries..."
              className="w-full px-3 py-2 bg-white border border-[#E9E6DF] rounded-lg text-xs text-[#17212B] focus:outline-hidden focus:border-[#DAD5CA]"
            />
          </div>

          <div className="pt-3 border-t border-[#E9E6DF] flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsCreateOpen(false)}
              className="px-3.5 py-2 text-xs font-medium text-[#526174] hover:bg-[#F7F5F0] rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#F6B91A] hover:bg-[#E5A80C] text-[#17212B] text-xs font-semibold rounded-lg shadow-2xs"
            >
              Create Project
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Project Modal */}
      {selectedProject && isEditOpen && (
        <Modal
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          title="Edit Project"
          subtitle={selectedProject.name}
        >
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#17212B] mb-1">
                Project Name
              </label>
              <input
                type="text"
                required
                value={selectedProject.name}
                onChange={(e) =>
                  setSelectedProject({ ...selectedProject, name: e.target.value })
                }
                className="w-full px-3 py-2 bg-white border border-[#E9E6DF] rounded-lg text-xs text-[#17212B]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#17212B] mb-1">
                  Status
                </label>
                <select
                  value={selectedProject.status}
                  onChange={(e) =>
                    setSelectedProject({
                      ...selectedProject,
                      status: e.target.value as ProjectStatus,
                    })
                  }
                  className="w-full px-3 py-2 bg-white border border-[#E9E6DF] rounded-lg text-xs text-[#17212B]"
                >
                  <option value="planning">Planning</option>
                  <option value="in_progress">In Progress</option>
                  <option value="in_review">In Review</option>
                  <option value="on_hold">On Hold</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#17212B] mb-1">
                  Budget (USD)
                </label>
                <input
                  type="number"
                  value={selectedProject.budget}
                  onChange={(e) =>
                    setSelectedProject({
                      ...selectedProject,
                      budget: Number(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 bg-white border border-[#E9E6DF] rounded-lg text-xs text-[#17212B]"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-[#E9E6DF] flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsEditOpen(false)}
                className="px-3.5 py-2 text-xs font-medium text-[#526174]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#F6B91A] text-[#17212B] text-xs font-semibold rounded-lg"
              >
                Save Changes
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
