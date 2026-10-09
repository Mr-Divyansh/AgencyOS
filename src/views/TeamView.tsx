import React, { useState } from 'react';
import {
  UserCheck2,
  ShieldCheck,
  UserCheck,
  Building,
  Mail,
  FolderKanban,
  CheckCircle2,
  Edit2,
} from 'lucide-react';
import { Avatar } from '../components/Avatar';
import { Modal } from '../components/Modal';
import type { User, UserRole } from '../types';

interface TeamViewProps {
  team: (User & { assignedProjectCount?: number })[];
  currentUser: User;
  onUpdateMember: (id: string, data: Partial<User>) => Promise<void>;
}

export const TeamView: React.FC<TeamViewProps> = ({
  team,
  currentUser,
  onUpdateMember,
}) => {
  const [editingMember, setEditingMember] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole>('team');
  const [title, setTitle] = useState('');
  const [active, setActive] = useState(true);

  const isAdmin = currentUser.role === 'admin';

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember) return;
    await onUpdateMember(editingMember.id, { role, title, active });
    setEditingMember(null);
  };

  const roleBadges: Record<UserRole, { label: string; bg: string; text: string }> = {
    admin: { label: 'Administrator', bg: 'bg-[#FFE6A0]', text: 'text-[#805B00]' },
    team: { label: 'Team Member', bg: 'bg-[#F0E9FF]', text: 'text-[#6D28D9]' },
    client: { label: 'Client Contact', bg: 'bg-[#E8F0FF]', text: 'text-[#1D58D8]' },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-[#17212B]">Team Directory & Permissions</h2>
          <p className="text-xs text-[#526174] mt-0.5">
            Authorized agency squads, engineering assignees, and role capabilities.
          </p>
        </div>

        {!isAdmin && (
          <span className="text-xs text-[#7B8794] bg-white border border-[#E9E6DF] px-2.5 py-1 rounded-lg">
            Role adjustments require Administrator privileges.
          </span>
        )}
      </div>

      {/* Team Roster Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {team.map((member) => {
          const badge = roleBadges[member.role];

          return (
            <div
              key={member.id}
              className="agency-card p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <Avatar src={member.avatarUrl} name={member.name} size="lg" />
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded ${badge.bg} ${badge.text}`}
                  >
                    {badge.label}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-[#17212B]">{member.name}</h3>
                <p className="text-xs text-[#526174] mt-0.5">{member.title}</p>
                <div className="flex items-center gap-1.5 text-xs text-[#7B8794] mt-2">
                  <Mail className="w-3.5 h-3.5" />
                  <span className="truncate">{member.email}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E9E6DF] flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-[#526174]">
                  <FolderKanban className="w-3.5 h-3.5 text-[#7B8794]" />
                  <span>{member.assignedProjectCount || 0} assigned projects</span>
                </div>

                {isAdmin && (
                  <button
                    onClick={() => {
                      setEditingMember(member);
                      setRole(member.role);
                      setTitle(member.title);
                      setActive(member.active);
                    }}
                    className="p-1 text-[#526174] hover:text-[#17212B] hover:bg-[#F7F5F0] rounded flex items-center gap-1 text-[11px] font-medium"
                  >
                    <Edit2 className="w-3 h-3" />
                    <span>Edit</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Member Modal */}
      {editingMember && (
        <Modal
          isOpen={!!editingMember}
          onClose={() => setEditingMember(null)}
          title={`Edit Role: ${editingMember.name}`}
          subtitle="Admin permission configuration"
        >
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#17212B] mb-1">
                Professional Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#E9E6DF] rounded-lg text-xs text-[#17212B]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#17212B] mb-1">
                Access Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="w-full px-3 py-2 bg-white border border-[#E9E6DF] rounded-lg text-xs text-[#17212B]"
              >
                <option value="admin">Administrator (Full Access)</option>
                <option value="team">Team Member (Assigned Projects & Tasks)</option>
                <option value="client">Client (Client Portal Only)</option>
              </select>
            </div>

            <div className="pt-3 border-t border-[#E9E6DF] flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditingMember(null)}
                className="px-3.5 py-2 text-xs font-medium text-[#526174]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#F6B91A] text-[#17212B] text-xs font-semibold rounded-lg"
              >
                Save Permissions
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
