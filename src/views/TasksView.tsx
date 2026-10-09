import React, { useState } from 'react';
import {
  CheckSquare,
  Plus,
  Calendar,
  AlertCircle,
  MoreVertical,
  Trash2,
  CheckCircle2,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { Avatar } from '../components/Avatar';
import { Modal } from '../components/Modal';
import type { Task, Project, User, TaskStatus, PriorityLevel } from '../types';

interface TasksViewProps {
  tasks: Task[];
  projects: Project[];
  team: User[];
  onCreateTask: (data: Partial<Task>) => Promise<void>;
  onUpdateTask: (id: string, data: Partial<Task>) => Promise<void>;
  onDeleteTask: (id: string) => Promise<void>;
}

export const TasksView: React.FC<TasksViewProps> = ({
  tasks,
  projects,
  team,
  onCreateTask,
  onUpdateTask,
  onDeleteTask,
}) => {
  const [projectFilter, setProjectFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // New task form fields
  const [title, setTitle] = useState('');
  const [projectId, setProjectId] = useState(projects[0]?.id || '');
  const [assigneeId, setAssigneeId] = useState(team[0]?.id || 'usr_sarah_admin');
  const [priority, setPriority] = useState<PriorityLevel>('medium');
  const [status, setStatus] = useState<TaskStatus>('todo');
  const [dueDate, setDueDate] = useState('2026-10-25');
  const [description, setDescription] = useState('');

  const columns: { id: TaskStatus; label: string; count: number }[] = [
    { id: 'todo', label: 'To Do', count: tasks.filter((t) => t.status === 'todo').length },
    { id: 'in_progress', label: 'In Progress', count: tasks.filter((t) => t.status === 'in_progress').length },
    { id: 'in_review', label: 'In Review', count: tasks.filter((t) => t.status === 'in_review').length },
    { id: 'done', label: 'Done', count: tasks.filter((t) => t.status === 'done').length },
  ];

  const priorityColors: Record<PriorityLevel, { text: string; bg: string }> = {
    urgent: { text: 'text-[#DC2626]', bg: 'bg-[#FEE2E2]' },
    high: { text: 'text-[#EA580C]', bg: 'bg-[#FFEDD5]' },
    medium: { text: 'text-[#D97706]', bg: 'bg-[#FEF3C7]' },
    low: { text: 'text-[#64748B]', bg: 'bg-[#F1F5F9]' },
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !projectId) return;
    await onCreateTask({
      title,
      projectId,
      assigneeId,
      priority,
      status,
      dueDate,
      description,
    });
    setTitle('');
    setDescription('');
    setIsCreateOpen(false);
  };

  const filteredTasks = tasks.filter((t) => {
    const matchProject = projectFilter === 'all' || t.projectId === projectFilter;
    const matchPriority = priorityFilter === 'all' || t.priority === priorityFilter;
    return matchProject && matchPriority;
  });

  const moveTask = async (task: Task, nextStatus: TaskStatus) => {
    await onUpdateTask(task.id, { status: nextStatus });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-[#17212B]">Task Management</h2>
          <p className="text-xs text-[#526174] mt-0.5">
            Kanban workflow boards, deliverable sprints, and assignee workloads.
          </p>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="px-3.5 py-2 bg-[#F6B91A] hover:bg-[#E5A80C] text-[#17212B] font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5 self-start sm:self-auto shadow-2xs"
        >
          <Plus className="w-4 h-4" />
          <span>New Task</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center gap-3 bg-white p-2.5 rounded-xl border border-[#E9E6DF]">
        <div className="flex items-center gap-2 text-xs text-[#526174]">
          <Filter className="w-3.5 h-3.5 text-[#7B8794]" />
          <span className="font-medium">Filter by:</span>
        </div>

        <select
          value={projectFilter}
          onChange={(e) => setProjectFilter(e.target.value)}
          className="px-2.5 py-1 bg-[#F7F5F0] border border-[#DAD5CA] rounded-lg text-xs text-[#17212B] focus:outline-hidden"
        >
          <option value="all">All Projects</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="px-2.5 py-1 bg-[#F7F5F0] border border-[#DAD5CA] rounded-lg text-xs text-[#17212B] focus:outline-hidden"
        >
          <option value="all">All Priorities</option>
          <option value="urgent">Urgent</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        {(projectFilter !== 'all' || priorityFilter !== 'all') && (
          <button
            onClick={() => {
              setProjectFilter('all');
              setPriorityFilter('all');
            }}
            className="text-xs text-[#C98B00] font-semibold hover:underline ml-auto"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Kanban Board (4 Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
        {columns.map((col) => {
          const colTasks = filteredTasks.filter((t) => t.status === col.id);
          return (
            <div
              key={col.id}
              className="bg-[#F7F5F0]/70 border border-[#E9E6DF] rounded-xl p-3 flex flex-col min-h-[500px]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#E9E6DF]">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#17212B]">{col.label}</span>
                  <span className="text-[10px] bg-white border border-[#DAD5CA] text-[#526174] px-1.5 py-0.2 rounded-full font-bold tabular-nums">
                    {colTasks.length}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setStatus(col.id);
                    setIsCreateOpen(true);
                  }}
                  className="p-1 text-[#7B8794] hover:text-[#17212B] hover:bg-white rounded transition-colors"
                  title="Add task to this column"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Tasks List in Column */}
              <div className="space-y-2.5 flex-1">
                {colTasks.length === 0 ? (
                  <div className="h-32 border border-dashed border-[#DAD5CA] rounded-lg flex items-center justify-center text-[11px] text-[#7B8794]">
                    No tasks in {col.label}
                  </div>
                ) : (
                  colTasks.map((task) => {
                    const isOverdue =
                      task.dueDate < new Date().toISOString().split('T')[0] &&
                      task.status !== 'done';
                    const prio = priorityColors[task.priority];

                    return (
                      <div
                        key={task.id}
                        className="bg-white border border-[#E9E6DF] hover:border-[#DAD5CA] rounded-lg p-3 shadow-2xs hover:shadow-xs transition-all duration-150 flex flex-col justify-between gap-2.5"
                      >
                        <div>
                          {/* Project context & priority */}
                          <div className="flex items-center justify-between gap-2 mb-1.5">
                            <span className="text-[10px] text-[#7B8794] font-medium truncate max-w-[120px]">
                              {task.projectName}
                            </span>
                            <span
                              className={`text-[9px] uppercase font-bold px-1.5 py-0.2 rounded ${prio.bg} ${prio.text}`}
                            >
                              {task.priority}
                            </span>
                          </div>

                          <h4
                            onClick={() => setSelectedTask(task)}
                            className="text-xs font-semibold text-[#17212B] cursor-pointer hover:text-[#C98B00] line-clamp-2 leading-snug"
                          >
                            {task.title}
                          </h4>
                        </div>

                        {/* Card Footer: Assignee, Due date, Move affordance */}
                        <div className="pt-2 border-t border-[#F7F5F0] flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5">
                            <Avatar
                              src={task.assigneeAvatar}
                              name={task.assigneeName || 'User'}
                              size="xs"
                            />
                            <span
                              className={`text-[10px] tabular-nums font-medium ${
                                isOverdue ? 'text-[#EF6262]' : 'text-[#7B8794]'
                              }`}
                            >
                              {task.dueDate.split('-').slice(1).join('/')}
                            </span>
                          </div>

                          {/* Quick Stage Progression */}
                          <div className="flex items-center gap-1">
                            {col.id !== 'todo' && (
                              <button
                                onClick={() => {
                                  const prevMap: Record<TaskStatus, TaskStatus> = {
                                    in_progress: 'todo',
                                    in_review: 'in_progress',
                                    done: 'in_review',
                                    todo: 'todo',
                                  };
                                  moveTask(task, prevMap[col.id]);
                                }}
                                className="px-1.5 py-0.5 text-[10px] text-[#7B8794] hover:text-[#17212B] hover:bg-[#F7F5F0] rounded"
                                title="Move back"
                              >
                                ←
                              </button>
                            )}
                            {col.id !== 'done' && (
                              <button
                                onClick={() => {
                                  const nextMap: Record<TaskStatus, TaskStatus> = {
                                    todo: 'in_progress',
                                    in_progress: 'in_review',
                                    in_review: 'done',
                                    done: 'done',
                                  };
                                  moveTask(task, nextMap[col.id]);
                                }}
                                className="px-1.5 py-0.5 text-[10px] bg-[#FFF0C2] hover:bg-[#FFE6A0] text-[#17212B] font-semibold rounded"
                                title="Advance status"
                              >
                                →
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Task Details Modal */}
      {selectedTask && (
        <Modal
          isOpen={!!selectedTask}
          onClose={() => setSelectedTask(null)}
          title={selectedTask.title}
          subtitle={`Project: ${selectedTask.projectName}`}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 text-xs bg-[#FCFBF8] p-3 rounded-xl border border-[#E9E6DF]">
              <div>
                <span className="text-[10px] text-[#7B8794] uppercase tracking-wider block">
                  Assignee
                </span>
                <span className="font-semibold text-[#17212B] mt-0.5 block">
                  {selectedTask.assigneeName}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#7B8794] uppercase tracking-wider block">
                  Due Date
                </span>
                <span className="font-semibold text-[#17212B] tabular-nums mt-0.5 block">
                  {selectedTask.dueDate}
                </span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-[#17212B] mb-1">Description</h4>
              <p className="text-xs text-[#526174] leading-relaxed">
                {selectedTask.description || 'No description added for this task.'}
              </p>
            </div>

            <div className="pt-3 border-t border-[#E9E6DF] flex items-center justify-between">
              <button
                onClick={() => {
                  onDeleteTask(selectedTask.id);
                  setSelectedTask(null);
                }}
                className="text-xs text-[#EF6262] font-medium flex items-center gap-1 hover:text-[#991B1B]"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Task</span>
              </button>

              <button
                onClick={() => setSelectedTask(null)}
                className="px-4 py-1.5 bg-[#17212B] text-white text-xs font-semibold rounded-lg hover:bg-[#202A33]"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Create Task Modal */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Add New Task"
        subtitle="Assign a deliverable task to an authorized agency squad member."
      >
        <form onSubmit={handleCreateSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#17212B] mb-1">
              Task Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Audit checkout security headers & SSL certificates"
              className="w-full px-3 py-2 bg-white border border-[#E9E6DF] rounded-lg text-xs text-[#17212B] focus:outline-hidden focus:border-[#DAD5CA]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#17212B] mb-1">
                Project *
              </label>
              <select
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#E9E6DF] rounded-lg text-xs text-[#17212B] focus:outline-hidden"
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#17212B] mb-1">
                Assignee
              </label>
              <select
                value={assigneeId}
                onChange={(e) => setAssigneeId(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#E9E6DF] rounded-lg text-xs text-[#17212B] focus:outline-hidden"
              >
                {team.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name} ({u.role})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#17212B] mb-1">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as PriorityLevel)}
                className="w-full px-3 py-2 bg-white border border-[#E9E6DF] rounded-lg text-xs text-[#17212B] focus:outline-hidden"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#17212B] mb-1">
                Column
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
                className="w-full px-3 py-2 bg-white border border-[#E9E6DF] rounded-lg text-xs text-[#17212B] focus:outline-hidden"
              >
                <option value="todo">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="in_review">In Review</option>
                <option value="done">Done</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#17212B] mb-1">
                Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#E9E6DF] rounded-lg text-xs text-[#17212B] focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#17212B] mb-1">
              Description & Acceptance Criteria
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detailed technical specifications or design instructions..."
              className="w-full px-3 py-2 bg-white border border-[#E9E6DF] rounded-lg text-xs text-[#17212B] focus:outline-hidden"
            />
          </div>

          <div className="pt-3 border-t border-[#E9E6DF] flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsCreateOpen(false)}
              className="px-3.5 py-2 text-xs font-medium text-[#526174]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#F6B91A] hover:bg-[#E5A80C] text-[#17212B] text-xs font-semibold rounded-lg shadow-2xs"
            >
              Add Task
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
