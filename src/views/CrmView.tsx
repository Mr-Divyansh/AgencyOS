import React, { useState } from 'react';
import {
  Users2,
  Plus,
  ArrowRight,
  TrendingUp,
  DollarSign,
  Mail,
  Phone,
  CheckCircle2,
  Calendar,
  Sparkles,
  Building,
  Briefcase,
  AlertCircle,
} from 'lucide-react';
import { Modal } from '../components/Modal';
import type { Lead, LeadStatus } from '../types';

interface CrmViewProps {
  leads: Lead[];
  onCreateLead: (data: Partial<Lead>) => Promise<void>;
  onUpdateLead: (id: string, data: Partial<Lead>) => Promise<void>;
  onConvertLead: (
    id: string,
    options: { createProject?: boolean; projectName?: string; budget?: number; dueDate?: string }
  ) => Promise<void>;
}

export const CrmView: React.FC<CrmViewProps> = ({
  leads,
  onCreateLead,
  onUpdateLead,
  onConvertLead,
}) => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [convertingLead, setConvertingLead] = useState<Lead | null>(null);

  // Conversion form state
  const [createProject, setCreateProject] = useState(true);
  const [projectName, setProjectName] = useState('');
  const [projectBudget, setProjectBudget] = useState(0);
  const [projectDueDate, setProjectDueDate] = useState('2026-12-15');

  // New lead form state
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [source, setSource] = useState('Inbound');
  const [serviceInterest, setServiceInterest] = useState('Full-Stack SaaS Platform');
  const [estimatedValue, setEstimatedValue] = useState(35000);
  const [notes, setNotes] = useState('');
  const [followUpDate, setFollowUpDate] = useState('2026-10-20');

  const stages: { id: LeadStatus; label: string; color: string }[] = [
    { id: 'new', label: 'New Inbound', color: '#7B8794' },
    { id: 'contacted', label: 'Contacted', color: '#3478F6' },
    { id: 'qualified', label: 'Qualified', color: '#8B5CF6' },
    { id: 'proposal_sent', label: 'Proposal Sent', color: '#F6B91A' },
    { id: 'won', label: 'Won & Ready', color: '#16A36A' },
    { id: 'lost', label: 'Closed Lost', color: '#EF6262' },
  ];

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !company || !email) return;
    await onCreateLead({
      name,
      company,
      email,
      phone,
      source,
      serviceInterest,
      estimatedValue: Number(estimatedValue),
      status: 'new',
      notes,
      followUpDate,
    });
    setName('');
    setCompany('');
    setEmail('');
    setNotes('');
    setIsCreateOpen(false);
  };

  const handleConvertSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!convertingLead) return;
    await onConvertLead(convertingLead.id, {
      createProject,
      projectName: projectName || `${convertingLead.company} Kickoff Engagement`,
      budget: projectBudget || convertingLead.estimatedValue,
      dueDate: projectDueDate,
    });
    setConvertingLead(null);
  };

  const totalPipeline = leads
    .filter((l) => l.status !== 'lost')
    .reduce((acc, l) => acc + l.estimatedValue, 0);

  const wonTotal = leads
    .filter((l) => l.status === 'won')
    .reduce((acc, l) => acc + l.estimatedValue, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#17212B]">CRM & Lead Pipeline</h2>
          <p className="text-xs text-[#526174] mt-0.5">
            Track deal stages, client onboarding, and 1-click conversion to active accounts.
          </p>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="px-3.5 py-2 bg-[#F6B91A] hover:bg-[#E5A80C] text-[#17212B] font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5 self-start sm:self-auto shadow-2xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add Lead</span>
        </button>
      </div>

      {/* Pipeline Summary Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="agency-card p-4">
          <span className="text-[10px] text-[#7B8794] uppercase tracking-wider block font-semibold">
            Active Pipeline Value
          </span>
          <span className="text-xl font-bold text-[#17212B] tabular-nums mt-1 block">
            ${totalPipeline.toLocaleString()}
          </span>
          <span className="text-xs text-[#526174] mt-0.5 block">Across qualified prospect stages</span>
        </div>

        <div className="agency-card p-4">
          <span className="text-[10px] text-[#7B8794] uppercase tracking-wider block font-semibold">
            Closed Won Value
          </span>
          <span className="text-xl font-bold text-[#16A36A] tabular-nums mt-1 block">
            ${wonTotal.toLocaleString()}
          </span>
          <span className="text-xs text-[#526174] mt-0.5 block">Converted or ready for onboarding</span>
        </div>

        <div className="agency-card p-4 bg-[#FFF8E8] border-[#FFE6A0]">
          <span className="text-[10px] text-[#805B00] uppercase tracking-wider block font-bold">
            1-Click Client Onboarding
          </span>
          <p className="text-xs text-[#526174] mt-1">
            Convert any Won lead directly into a Client profile and provision their inaugural project.
          </p>
        </div>
      </div>

      {/* Stage Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 items-start">
        {stages.map((stage) => {
          const stageLeads = leads.filter((l) => l.status === stage.id);
          const stageTotal = stageLeads.reduce((acc, l) => acc + l.estimatedValue, 0);

          return (
            <div
              key={stage.id}
              className="bg-[#FCFBF8] border border-[#E9E6DF] rounded-xl p-3 flex flex-col min-h-[440px]"
            >
              {/* Column Header */}
              <div className="pb-2.5 mb-2 border-b border-[#E9E6DF]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#17212B] truncate">{stage.label}</span>
                  <span className="text-[10px] font-bold text-[#7B8794] bg-white border border-[#DAD5CA] px-1.5 py-0.2 rounded-full tabular-nums">
                    {stageLeads.length}
                  </span>
                </div>
                <div className="text-[11px] text-[#7B8794] font-medium tabular-nums mt-0.5">
                  ${(stageTotal / 1000).toFixed(0)}k total
                </div>
              </div>

              {/* Cards in column */}
              <div className="space-y-2.5 flex-1">
                {stageLeads.length === 0 ? (
                  <div className="h-24 border border-dashed border-[#DAD5CA] rounded-lg flex items-center justify-center text-[10px] text-[#7B8794]">
                    Empty
                  </div>
                ) : (
                  stageLeads.map((lead) => (
                    <div
                      key={lead.id}
                      className="bg-white border border-[#E9E6DF] hover:border-[#DAD5CA] rounded-lg p-3 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between gap-2"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="text-[10px] text-[#7B8794] font-medium truncate">
                            {lead.source}
                          </span>
                          <span className="text-xs font-bold text-[#17212B] tabular-nums">
                            ${lead.estimatedValue.toLocaleString()}
                          </span>
                        </div>

                        <h4
                          onClick={() => setSelectedLead(lead)}
                          className="text-xs font-bold text-[#17212B] cursor-pointer hover:text-[#C98B00] leading-tight"
                        >
                          {lead.company}
                        </h4>
                        <p className="text-[11px] text-[#526174] truncate mt-0.5">
                          {lead.name}
                        </p>
                        <p className="text-[10px] text-[#7B8794] line-clamp-1 mt-1">
                          {lead.serviceInterest}
                        </p>
                      </div>

                      {/* Card Bottom: Conversion button if won, or stage mover */}
                      <div className="pt-2 border-t border-[#F7F5F0] flex items-center justify-between gap-1">
                        {lead.status === 'won' && !lead.convertedClientId ? (
                          <button
                            onClick={() => {
                              setConvertingLead(lead);
                              setProjectName(`${lead.company} Web Platform`);
                              setProjectBudget(lead.estimatedValue);
                            }}
                            className="w-full py-1 bg-[#F6B91A] hover:bg-[#E5A80C] text-[#17212B] font-bold text-[10px] rounded flex items-center justify-center gap-1 shadow-2xs"
                          >
                            <Sparkles className="w-3 h-3" />
                            <span>Convert to Client</span>
                          </button>
                        ) : lead.convertedClientId ? (
                          <span className="text-[10px] text-[#16A36A] font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Converted
                          </span>
                        ) : (
                          <div className="flex items-center justify-between w-full">
                            <button
                              onClick={() => setSelectedLead(lead)}
                              className="text-[10px] text-[#526174] hover:text-[#17212B] underline"
                            >
                              Notes
                            </button>

                            <select
                              value={lead.status}
                              onChange={(e) =>
                                onUpdateLead(lead.id, { status: e.target.value as LeadStatus })
                              }
                              className="text-[10px] bg-[#F7F5F0] border border-[#DAD5CA] rounded px-1 py-0.5 text-[#17212B] focus:outline-hidden"
                            >
                              <option value="new">New</option>
                              <option value="contacted">Contacted</option>
                              <option value="qualified">Qualified</option>
                              <option value="proposal_sent">Proposal</option>
                              <option value="won">Won</option>
                              <option value="lost">Lost</option>
                            </select>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Lead Details Modal */}
      {selectedLead && (
        <Modal
          isOpen={!!selectedLead}
          onClose={() => setSelectedLead(null)}
          title={selectedLead.company}
          subtitle={`Primary Contact: ${selectedLead.name}`}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 text-xs bg-[#FCFBF8] p-3 rounded-xl border border-[#E9E6DF]">
              <div>
                <span className="text-[10px] text-[#7B8794] uppercase tracking-wider block">
                  Email & Phone
                </span>
                <span className="font-semibold text-[#17212B] block mt-0.5">
                  {selectedLead.email}
                </span>
                {selectedLead.phone && (
                  <span className="text-[#526174] block">{selectedLead.phone}</span>
                )}
              </div>
              <div>
                <span className="text-[10px] text-[#7B8794] uppercase tracking-wider block">
                  Deal Value
                </span>
                <span className="text-base font-bold text-[#17212B] tabular-nums mt-0.5 block">
                  ${selectedLead.estimatedValue.toLocaleString()}
                </span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-[#17212B] mb-1">
                Service Interest
              </h4>
              <p className="text-xs text-[#526174]">{selectedLead.serviceInterest}</p>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-[#17212B] mb-1">Discovery Notes</h4>
              <p className="text-xs text-[#526174] leading-relaxed bg-[#F7F5F0] p-3 rounded-lg border border-[#E9E6DF]">
                {selectedLead.notes || 'No discovery notes recorded yet.'}
              </p>
            </div>

            <div className="pt-3 border-t border-[#E9E6DF] flex items-center justify-between">
              {selectedLead.status !== 'won' ? (
                <button
                  onClick={() => {
                    onUpdateLead(selectedLead.id, { status: 'won' });
                    setSelectedLead({ ...selectedLead, status: 'won' });
                  }}
                  className="px-3 py-1.5 bg-[#E0F6E9] hover:bg-[#C3EED3] text-[#166534] text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Mark as Won</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    const l = selectedLead;
                    setSelectedLead(null);
                    setConvertingLead(l);
                  }}
                  className="px-3 py-1.5 bg-[#F6B91A] hover:bg-[#E5A80C] text-[#17212B] text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Convert to Client</span>
                </button>
              )}

              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-1.5 bg-[#17212B] text-white text-xs font-semibold rounded-lg hover:bg-[#202A33]"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Convert Lead to Client Modal */}
      {convertingLead && (
        <Modal
          isOpen={!!convertingLead}
          onClose={() => setConvertingLead(null)}
          title="Convert Won Deal to Client Account"
          subtitle={`Onboard ${convertingLead.company} and launch their inaugural engagement.`}
        >
          <form onSubmit={handleConvertSubmit} className="space-y-4">
            <div className="p-3 bg-[#FFF8E8] border border-[#FFE6A0] rounded-xl text-xs text-[#805B00]">
              <p className="font-semibold">Atomic Client Provisioning</p>
              <p className="mt-0.5 text-[#526174]">
                This will create a new Client record for <strong>{convertingLead.company}</strong>, transfer contact details, and open a project workspace.
              </p>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-semibold text-[#17212B] cursor-pointer">
                <input
                  type="checkbox"
                  checked={createProject}
                  onChange={(e) => setCreateProject(e.target.checked)}
                  className="rounded text-[#F6B91A] focus:ring-[#F6B91A]"
                />
                <span>Provision Initial Project Engagement</span>
              </label>

              {createProject && (
                <div className="p-3 bg-white border border-[#E9E6DF] rounded-xl space-y-3 mt-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#17212B] mb-1">
                      Project Name
                    </label>
                    <input
                      type="text"
                      required
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-[#E9E6DF] rounded-lg text-xs text-[#17212B]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#17212B] mb-1">
                        Contract Budget ($)
                      </label>
                      <input
                        type="number"
                        value={projectBudget}
                        onChange={(e) => setProjectBudget(Number(e.target.value))}
                        className="w-full px-3 py-1.5 bg-white border border-[#E9E6DF] rounded-lg text-xs text-[#17212B]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#17212B] mb-1">
                        Target Launch Date
                      </label>
                      <input
                        type="date"
                        value={projectDueDate}
                        onChange={(e) => setProjectDueDate(e.target.value)}
                        className="w-full px-3 py-1.5 bg-white border border-[#E9E6DF] rounded-lg text-xs text-[#17212B]"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-[#E9E6DF] flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setConvertingLead(null)}
                className="px-3.5 py-2 text-xs font-medium text-[#526174]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#F6B91A] hover:bg-[#E5A80C] text-[#17212B] text-xs font-semibold rounded-lg shadow-2xs flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Confirm Conversion</span>
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Add Lead Modal */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Add Inbound / Outbound Lead"
        subtitle="Capture deal interest and follow-up timeline."
      >
        <form onSubmit={handleCreateSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#17212B] mb-1">
                Company Name *
              </label>
              <input
                type="text"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Zenith Global"
                className="w-full px-3 py-2 bg-white border border-[#E9E6DF] rounded-lg text-xs text-[#17212B]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#17212B] mb-1">
                Primary Contact Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rachel Sterling"
                className="w-full px-3 py-2 bg-white border border-[#E9E6DF] rounded-lg text-xs text-[#17212B]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#17212B] mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="rachel@zenith.com"
                className="w-full px-3 py-2 bg-white border border-[#E9E6DF] rounded-lg text-xs text-[#17212B]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#17212B] mb-1">
                Phone Number
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full px-3 py-2 bg-white border border-[#E9E6DF] rounded-lg text-xs text-[#17212B]"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#17212B] mb-1">
                Lead Source
              </label>
              <select
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#E9E6DF] rounded-lg text-xs text-[#17212B]"
              >
                <option value="Inbound">Inbound</option>
                <option value="Referral">Referral</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Conference">Conference</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#17212B] mb-1">
                Estimated Value ($)
              </label>
              <input
                type="number"
                value={estimatedValue}
                onChange={(e) => setEstimatedValue(Number(e.target.value))}
                className="w-full px-3 py-2 bg-white border border-[#E9E6DF] rounded-lg text-xs text-[#17212B]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#17212B] mb-1">
                Follow-up Date
              </label>
              <input
                type="date"
                value={followUpDate}
                onChange={(e) => setFollowUpDate(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#E9E6DF] rounded-lg text-xs text-[#17212B]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#17212B] mb-1">
              Service Interest
            </label>
            <input
              type="text"
              value={serviceInterest}
              onChange={(e) => setServiceInterest(e.target.value)}
              placeholder="e.g. Design System & Frontend Migration"
              className="w-full px-3 py-2 bg-white border border-[#E9E6DF] rounded-lg text-xs text-[#17212B]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#17212B] mb-1">
              Notes & Deal Context
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Initial requirements, timeline expectations, tech stack..."
              className="w-full px-3 py-2 bg-white border border-[#E9E6DF] rounded-lg text-xs text-[#17212B]"
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
              Save Lead
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
