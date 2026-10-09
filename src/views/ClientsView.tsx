import React, { useState } from 'react';
import {
  Contact2,
  Plus,
  Search,
  Building,
  Mail,
  Phone,
  Globe,
  FolderKanban,
  DollarSign,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { Modal } from '../components/Modal';
import type { Client, Project } from '../types';

interface ClientsViewProps {
  clients: (Client & { projectCount?: number; activeProjectsCount?: number })[];
  projects: Project[];
  onCreateClient: (data: Partial<Client>) => Promise<void>;
  onUpdateClient: (id: string, data: Partial<Client>) => Promise<void>;
  onNavigateToProjects: (clientId: string) => void;
}

export const ClientsView: React.FC<ClientsViewProps> = ({
  clients,
  projects,
  onCreateClient,
  onUpdateClient,
  onNavigateToProjects,
}) => {
  const [search, setSearch] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  // New Client Form
  const [company, setCompany] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [notes, setNotes] = useState('');

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!company || !name || !email) return;
    await onCreateClient({
      company,
      name,
      email,
      phone,
      website,
      status: 'active',
      notes,
    });
    setCompany('');
    setName('');
    setEmail('');
    setPhone('');
    setWebsite('');
    setNotes('');
    setIsCreateOpen(false);
  };

  const filteredClients = clients.filter((c) => {
    const q = search.toLowerCase();
    return (
      c.company.toLowerCase().includes(q) ||
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#17212B]">Client Directory</h2>
          <p className="text-xs text-[#526174] mt-0.5">
            Partner organizations, commercial account records, and portfolio portfolios.
          </p>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="px-3.5 py-2 bg-[#F6B91A] hover:bg-[#E5A80C] text-[#17212B] font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5 self-start sm:self-auto shadow-2xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add Client</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="max-w-sm relative">
        <Search className="w-3.5 h-3.5 text-[#7B8794] absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search by company, name, or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-3 py-1.5 bg-white border border-[#E9E6DF] rounded-lg text-xs text-[#17212B] placeholder-[#7B8794] focus:outline-hidden focus:border-[#DAD5CA]"
        />
      </div>

      {/* Clients Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClients.map((client) => {
          const clientProjects = projects.filter((p) => p.clientId === client.id);
          const totalBudget = clientProjects.reduce((acc, p) => acc + p.budget, 0);

          return (
            <div
              key={client.id}
              onClick={() => setSelectedClient(client)}
              className="agency-card p-5 hover:border-[#DAD5CA] hover:shadow-sm transition-all duration-150 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-[#F7F5F0] border border-[#E9E6DF] flex items-center justify-center font-bold text-xs text-[#17212B]">
                    {client.company[0]}
                  </div>
                  <span className="text-[10px] bg-[#E0F6E9] text-[#166534] font-semibold px-2 py-0.5 rounded capitalize">
                    {client.status}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-[#17212B]">{client.company}</h3>
                <p className="text-xs text-[#526174] mt-0.5">{client.name}</p>

                <div className="mt-3 space-y-1 text-xs text-[#7B8794]">
                  <div className="flex items-center gap-2 truncate">
                    <Mail className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{client.email}</span>
                  </div>
                  {client.website && (
                    <div className="flex items-center gap-2 truncate">
                      <Globe className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{client.website.replace('https://', '')}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom stats */}
              <div className="mt-4 pt-4 border-t border-[#E9E6DF] flex items-center justify-between text-xs">
                <div>
                  <span className="text-[#7B8794] block text-[10px]">Contracted Value</span>
                  <span className="font-bold text-[#17212B] tabular-nums">
                    ${(client.totalValue || totalBudget).toLocaleString()}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[#7B8794] block text-[10px]">Projects</span>
                  <span className="font-bold text-[#17212B] tabular-nums">
                    {clientProjects.length} active
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Client Detail Modal */}
      {selectedClient && (
        <Modal
          isOpen={!!selectedClient}
          onClose={() => setSelectedClient(null)}
          title={selectedClient.company}
          subtitle={`Primary Executive: ${selectedClient.name}`}
          maxWidth="xl"
        >
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-3 text-xs bg-[#FCFBF8] p-3 rounded-xl border border-[#E9E6DF]">
              <div>
                <span className="text-[10px] text-[#7B8794] uppercase tracking-wider block">
                  Contact Coordinates
                </span>
                <span className="text-[#17212B] block font-medium mt-0.5">
                  {selectedClient.email}
                </span>
                {selectedClient.phone && (
                  <span className="text-[#526174] block">{selectedClient.phone}</span>
                )}
              </div>
              <div>
                <span className="text-[10px] text-[#7B8794] uppercase tracking-wider block">
                  Website
                </span>
                {selectedClient.website ? (
                  <a
                    href={selectedClient.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#3478F6] hover:underline flex items-center gap-1 font-medium mt-0.5"
                  >
                    <span>{selectedClient.website}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-[#7B8794]">Not provided</span>
                )}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-[#17212B] mb-1">Account Notes</h4>
              <p className="text-xs text-[#526174] leading-relaxed bg-[#F7F5F0] p-3 rounded-lg border border-[#E9E6DF]">
                {selectedClient.notes || 'No account notes recorded.'}
              </p>
            </div>

            {/* Linked Projects */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-semibold text-[#17212B]">Linked Projects</h4>
                <button
                  onClick={() => {
                    const cId = selectedClient.id;
                    setSelectedClient(null);
                    onNavigateToProjects(cId);
                  }}
                  className="text-[11px] text-[#C98B00] font-semibold hover:underline"
                >
                  Manage in Projects
                </button>
              </div>

              <div className="space-y-2">
                {projects.filter((p) => p.clientId === selectedClient.id).length === 0 ? (
                  <p className="text-xs text-[#7B8794]">No linked projects yet.</p>
                ) : (
                  projects
                    .filter((p) => p.clientId === selectedClient.id)
                    .map((proj) => (
                      <div
                        key={proj.id}
                        className="p-3 bg-white border border-[#E9E6DF] rounded-lg flex items-center justify-between text-xs"
                      >
                        <div>
                          <span className="font-semibold text-[#17212B] block">
                            {proj.name}
                          </span>
                          <span className="text-[10px] text-[#7B8794]">
                            Due {proj.dueDate} · Progress: {proj.progress || 0}%
                          </span>
                        </div>
                        <span className="font-bold text-[#17212B] tabular-nums">
                          ${proj.budget.toLocaleString()}
                        </span>
                      </div>
                    ))
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-[#E9E6DF] flex justify-end">
              <button
                onClick={() => setSelectedClient(null)}
                className="px-4 py-1.5 bg-[#17212B] text-white text-xs font-semibold rounded-lg hover:bg-[#202A33]"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Add Client Modal */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Register New Client"
        subtitle="Create a verified client account in the agency CRM directory."
      >
        <form onSubmit={handleCreateSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#17212B] mb-1">
                Company / Organization *
              </label>
              <input
                type="text"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Acme Corporation"
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
                placeholder="e.g. Marcus Vance"
                className="w-full px-3 py-2 bg-white border border-[#E9E6DF] rounded-lg text-xs text-[#17212B]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#17212B] mb-1">
                Contact Email *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="marcus@acmecorp.com"
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
                placeholder="+1 (555) 234-5678"
                className="w-full px-3 py-2 bg-white border border-[#E9E6DF] rounded-lg text-xs text-[#17212B]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#17212B] mb-1">
              Website URL
            </label>
            <input
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://acmecorp.com"
              className="w-full px-3 py-2 bg-white border border-[#E9E6DF] rounded-lg text-xs text-[#17212B]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#17212B] mb-1">
              Account Notes & Key Objectives
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Enterprise requirements, communication preferences, SLA..."
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
              Save Client
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
