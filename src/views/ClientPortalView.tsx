import React, { useState } from 'react';
import {
  Building,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  DollarSign,
  Download,
  Send,
  MessageSquare,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Calendar,
  Layers,
} from 'lucide-react';
import { Avatar } from '../components/Avatar';
import { Modal } from '../components/Modal';
import type { Client, Project, Deliverable, Invoice, User } from '../types';

interface ClientPortalViewProps {
  client: Client;
  projects: Project[];
  deliverables: Deliverable[];
  invoices: Invoice[];
  team: User[];
  onReviewDeliverable: (
    id: string,
    status: 'approved' | 'revision_requested',
    feedback?: string
  ) => Promise<void>;
}

export const ClientPortalView: React.FC<ClientPortalViewProps> = ({
  client,
  projects,
  deliverables,
  invoices,
  team,
  onReviewDeliverable,
}) => {
  const [selectedDeliverable, setSelectedDeliverable] = useState<Deliverable | null>(null);
  const [feedback, setFeedback] = useState('');
  const [reviewAction, setReviewAction] = useState<'approved' | 'revision_requested'>('approved');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const activeProject = projects[0];

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDeliverable) return;
    setIsSubmitting(true);
    await onReviewDeliverable(selectedDeliverable.id, reviewAction, feedback);
    setIsSubmitting(false);
    setSelectedDeliverable(null);
    setFeedback('');
  };

  const deliverableStatusColors: Record<
    Deliverable['status'],
    { label: string; bg: string; text: string; icon: any }
  > = {
    pending_review: {
      label: 'Awaiting Your Review',
      bg: 'bg-[#FFF0C2]',
      text: 'text-[#92400E]',
      icon: Clock,
    },
    approved: {
      label: 'Approved',
      bg: 'bg-[#E0F6E9]',
      text: 'text-[#166534]',
      icon: CheckCircle2,
    },
    revision_requested: {
      label: 'Revision Requested',
      bg: 'bg-[#FDE8E8]',
      text: 'text-[#991B1B]',
      icon: AlertCircle,
    },
  };

  const totalBilled = invoices.reduce((acc, i) => acc + i.amount, 0);
  const totalPaid = invoices.filter((i) => i.status === 'paid').reduce((acc, i) => acc + i.amount, 0);
  const totalPending = invoices.filter((i) => i.status === 'pending').reduce((acc, i) => acc + i.amount, 0);

  return (
    <div className="space-y-6">
      {/* Top Banner: Client Welcome */}
      <div className="p-6 bg-white border border-[#E9E6DF] rounded-2xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#FFF8E8] border border-[#FFE6A0] flex items-center justify-center font-bold text-lg text-[#17212B]">
            {client.company[0]}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-[#17212B]">{client.company}</h2>
              <span className="text-[10px] bg-[#E8F0FF] text-[#1D58D8] px-2 py-0.5 rounded font-semibold">
                Client Workspace
              </span>
            </div>
            <p className="text-xs text-[#526174] mt-0.5">
              Welcome back, {client.name}. Review current sprint deliverables, milestones, and invoice statements.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-right hidden sm:block">
            <span className="text-[10px] text-[#7B8794] block">Lead Agency</span>
            <span className="text-xs font-semibold text-[#17212B]">D Web Studio</span>
          </div>
          <div className="w-8 h-8 rounded-lg bg-[#F6B91A] flex items-center justify-center font-bold text-xs text-[#17212B]">
            D
          </div>
        </div>
      </div>

      {/* Main Active Project Overview */}
      {activeProject && (
        <div className="agency-card p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <span className="text-[10px] text-[#7B8794] uppercase tracking-wider font-semibold block">
                Primary Engagement
              </span>
              <h3 className="text-base font-bold text-[#17212B] mt-0.5">
                {activeProject.name}
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#526174]">Target Launch:</span>
              <span className="font-semibold text-[#17212B] tabular-nums">
                {activeProject.dueDate}
              </span>
            </div>
          </div>

          <p className="text-xs text-[#526174] leading-relaxed mb-4">
            {activeProject.description}
          </p>

          {/* Progress bar */}
          <div className="space-y-1 mb-5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#526174]">Overall Milestone Progress</span>
              <span className="font-bold text-[#17212B] tabular-nums">
                {activeProject.progress || 0}% Complete
              </span>
            </div>
            <div className="w-full bg-[#E9E6DF] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#F6B91A] h-full rounded-full transition-all duration-300"
                style={{ width: `${activeProject.progress || 0}%` }}
              />
            </div>
          </div>

          {/* Milestones Roadmap */}
          {activeProject.milestones && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3 border-t border-[#E9E6DF]">
              {activeProject.milestones.map((m, idx) => (
                <div
                  key={m.id}
                  className={`p-3 rounded-lg border text-xs flex flex-col justify-between ${
                    m.completed
                      ? 'bg-[#E0F6E9]/40 border-[#BBF7D0]'
                      : 'bg-[#FCFBF8] border-[#E9E6DF]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-bold text-[#7B8794]">
                      Phase 0{idx + 1}
                    </span>
                    {m.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-[#16A36A]" />
                    ) : (
                      <Clock className="w-4 h-4 text-[#7B8794]" />
                    )}
                  </div>
                  <h4 className="font-semibold text-[#17212B] mt-2 mb-1 line-clamp-2">
                    {m.title}
                  </h4>
                  <span className="text-[10px] text-[#7B8794] tabular-nums">
                    Target: {m.dueDate}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Deliverables Section: Client Review & Approval */}
      <div className="agency-card p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-[#17212B]">
              Project Deliverables & Client Reviews
            </h3>
            <p className="text-xs text-[#7B8794]">
              Inspect prototypes, specifications, and approve completion milestones.
            </p>
          </div>
          <span className="text-xs text-[#526174] font-medium">
            {deliverables.filter((d) => d.status === 'pending_review').length} awaiting action
          </span>
        </div>

        <div className="space-y-3">
          {deliverables.length === 0 ? (
            <p className="text-xs text-[#7B8794] py-6 text-center">
              No deliverables submitted for review yet.
            </p>
          ) : (
            deliverables.map((deliv) => {
              const status = deliverableStatusColors[deliv.status];
              const StatusIcon = status.icon;

              return (
                <div
                  key={deliv.id}
                  className="p-4 bg-[#FCFBF8] border border-[#E9E6DF] rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-semibold flex items-center gap-1 ${status.bg} ${status.text}`}
                      >
                        <StatusIcon className="w-3 h-3" />
                        <span>{status.label}</span>
                      </span>
                      <span className="text-[10px] text-[#7B8794] uppercase tracking-wide">
                        {deliv.type}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-[#17212B]">{deliv.title}</h4>
                    <p className="text-xs text-[#526174] mt-0.5 leading-relaxed">
                      {deliv.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {deliv.assetUrl && (
                      <a
                        href={deliv.assetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-white border border-[#DAD5CA] hover:bg-[#F7F5F0] text-[#17212B] text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-[#7B8794]" />
                        <span>View Deliverable</span>
                      </a>
                    )}

                    <button
                      onClick={() => {
                        setSelectedDeliverable(deliv);
                        setReviewAction(
                          deliv.status === 'approved' ? 'revision_requested' : 'approved'
                        );
                      }}
                      className="px-3 py-1.5 bg-[#F6B91A] hover:bg-[#E5A80C] text-[#17212B] text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Review / Feedback</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Financials & Invoices Table */}
      <div className="agency-card p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-sm font-semibold text-[#17212B]">
              Invoices & Payment Status
            </h3>
            <p className="text-xs text-[#7B8794]">
              Statements issued for Acme Corporation milestones
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div>
              <span className="text-[10px] text-[#7B8794] block">Paid to date</span>
              <span className="font-bold text-[#16A36A] tabular-nums">
                ${totalPaid.toLocaleString()}
              </span>
            </div>
            <div className="w-px h-6 bg-[#E9E6DF]" />
            <div>
              <span className="text-[10px] text-[#7B8794] block">Pending Due</span>
              <span className="font-bold text-[#92400E] tabular-nums">
                ${totalPending.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {downloadNotice && (
          <div className="mb-3 p-2.5 bg-[#E0F6E9] border border-[#BBF7D0] text-[#166534] text-xs rounded-lg flex items-center justify-between">
            <span>{downloadNotice}</span>
            <button
              onClick={() => setDownloadNotice(null)}
              className="text-[#166534] font-bold text-xs"
            >
              ✕
            </button>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E9E6DF] text-[#7B8794] font-medium text-[11px]">
                <th className="pb-2">Invoice #</th>
                <th className="pb-2">Description</th>
                <th className="pb-2">Issue Date</th>
                <th className="pb-2">Due Date</th>
                <th className="pb-2">Amount</th>
                <th className="pb-2">Status</th>
                <th className="pb-2 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E9E6DF]">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-[#FCFBF8] transition-colors">
                  <td className="py-3 font-semibold text-[#17212B] font-mono">
                    {inv.number}
                  </td>
                  <td className="py-3 text-[#526174] max-w-xs truncate">
                    {inv.description}
                  </td>
                  <td className="py-3 text-[#7B8794] tabular-nums">{inv.issueDate}</td>
                  <td className="py-3 text-[#7B8794] tabular-nums">{inv.dueDate}</td>
                  <td className="py-3 font-bold text-[#17212B] tabular-nums">
                    ${inv.amount.toLocaleString()}
                  </td>
                  <td className="py-3">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded capitalize ${
                        inv.status === 'paid'
                          ? 'bg-[#E0F6E9] text-[#166534]'
                          : 'bg-[#FFF0C2] text-[#92400E]'
                      }`}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() =>
                        setDownloadNotice(
                          `Simulated receipt download initiated for ${inv.number} ($${inv.amount.toLocaleString()})`
                        )
                      }
                      className="p-1 text-[#526174] hover:text-[#17212B] hover:bg-[#F7F5F0] rounded transition-colors inline-flex items-center gap-1 font-medium text-[11px]"
                      title="Download PDF statement"
                    >
                      <Download className="w-3.5 h-3.5 text-[#7B8794]" />
                      <span>PDF</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assigned Agency Squad Contacts */}
      <div className="agency-card p-5">
        <h3 className="text-sm font-semibold text-[#17212B] mb-1">
          Assigned D Web Studio Squad
        </h3>
        <p className="text-xs text-[#7B8794] mb-4">
          Direct engineering and design contacts on your engagement.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {team.map((member) => (
            <div
              key={member.id}
              className="p-3 bg-[#FCFBF8] border border-[#E9E6DF] rounded-xl flex items-center gap-3"
            >
              <Avatar src={member.avatarUrl} name={member.name} size="md" />
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-[#17212B] truncate">{member.name}</h4>
                <p className="text-[11px] text-[#7B8794] truncate">{member.title}</p>
                <a
                  href={`mailto:${member.email}`}
                  className="text-[10px] text-[#3478F6] hover:underline truncate block mt-0.5"
                >
                  {member.email}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Deliverable Modal */}
      {selectedDeliverable && (
        <Modal
          isOpen={!!selectedDeliverable}
          onClose={() => setSelectedDeliverable(null)}
          title="Deliverable Review & Approval"
          subtitle={selectedDeliverable.title}
        >
          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <p className="text-xs text-[#526174] leading-relaxed">
              {selectedDeliverable.description}
            </p>

            <div>
              <label className="block text-xs font-semibold text-[#17212B] mb-2">
                Your Review Decision
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setReviewAction('approved')}
                  className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    reviewAction === 'approved'
                      ? 'bg-[#E0F6E9] border-[#16A36A] text-[#166534] shadow-xs'
                      : 'bg-white border-[#E9E6DF] text-[#526174]'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 text-[#16A36A]" />
                  <span>Approve Deliverable</span>
                </button>

                <button
                  type="button"
                  onClick={() => setReviewAction('revision_requested')}
                  className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    reviewAction === 'revision_requested'
                      ? 'bg-[#FDE8E8] border-[#EF6262] text-[#991B1B] shadow-xs'
                      : 'bg-white border-[#E9E6DF] text-[#526174]'
                  }`}
                >
                  <AlertCircle className="w-4 h-4 text-[#EF6262]" />
                  <span>Request Revisions</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#17212B] mb-1">
                Feedback Notes & Revision Instructions
              </label>
              <textarea
                rows={3}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Specific adjustments, approved components, or comments for the agency squad..."
                className="w-full px-3 py-2 bg-white border border-[#E9E6DF] rounded-lg text-xs text-[#17212B]"
              />
            </div>

            <div className="pt-3 border-t border-[#E9E6DF] flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setSelectedDeliverable(null)}
                className="px-3.5 py-2 text-xs font-medium text-[#526174]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-[#F6B91A] hover:bg-[#E5A80C] text-[#17212B] text-xs font-semibold rounded-lg shadow-2xs flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Response</span>
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
