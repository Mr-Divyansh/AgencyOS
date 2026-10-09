import React, { useState } from 'react';
import {
  Settings,
  Building,
  RotateCcw,
  CheckCircle2,
  ShieldAlert,
} from 'lucide-react';
import type { Agency, User } from '../types';

interface SettingsViewProps {
  agency: Agency | null;
  currentUser: User;
  onUpdateAgency: (data: Partial<Agency>) => Promise<void>;
  onResetDatabase: () => Promise<void>;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  agency,
  currentUser,
  onUpdateAgency,
  onResetDatabase,
}) => {
  const [name, setName] = useState(agency?.name || 'D Web Studio');
  const [website, setWebsite] = useState(agency?.website || 'https://dwebstudio.com');
  const [contactEmail, setContactEmail] = useState(
    agency?.contactEmail || 'contact@dwebstudio.com'
  );
  const [currency, setCurrency] = useState(agency?.currency || 'USD');
  const [timezone, setTimezone] = useState(agency?.timezone || 'America/New_York');
  const [isSaved, setIsSaved] = useState(false);
  const [resetConfirm, setResetConfirm] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onUpdateAgency({
      name,
      website,
      contactEmail,
      currency,
      timezone,
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleReset = async () => {
    await onResetDatabase();
    setResetConfirm(false);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-[#17212B]">Agency & Workspace Settings</h2>
        <p className="text-xs text-[#526174] mt-0.5">
          General business configuration, billing parameters, and demo database state.
        </p>
      </div>

      {/* Agency Profile Form */}
      <div className="agency-card p-6">
        <h3 className="text-sm font-semibold text-[#17212B] mb-1">
          Agency Profile Information
        </h3>
        <p className="text-xs text-[#7B8794] mb-4">
          Visible on client invoices, deliverable receipts, and email headers.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#17212B] mb-1">
                Agency Brand Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#E9E6DF] rounded-lg text-xs text-[#17212B]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#17212B] mb-1">
                Primary Contact Email
              </label>
              <input
                type="email"
                required
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#E9E6DF] rounded-lg text-xs text-[#17212B]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#17212B] mb-1">
                Website URL
              </label>
              <input
                type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#E9E6DF] rounded-lg text-xs text-[#17212B]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#17212B] mb-1">
                Base Billing Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#E9E6DF] rounded-lg text-xs text-[#17212B]"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="CAD">CAD ($)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#17212B] mb-1">
                Operating Timezone
              </label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#E9E6DF] rounded-lg text-xs text-[#17212B]"
              >
                <option value="America/New_York">Eastern Time (US)</option>
                <option value="America/Los_Angeles">Pacific Time (US)</option>
                <option value="Europe/London">London (GMT/BST)</option>
                <option value="Europe/Berlin">Berlin (CET)</option>
              </select>
            </div>
          </div>

          <div className="pt-3 border-t border-[#E9E6DF] flex items-center justify-between">
            {isSaved ? (
              <span className="text-xs text-[#16A36A] font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Changes saved successfully!
              </span>
            ) : (
              <span className="text-xs text-[#7B8794]">
                Updates will persist in the database.
              </span>
            )}

            <button
              type="submit"
              className="px-4 py-2 bg-[#F6B91A] hover:bg-[#E5A80C] text-[#17212B] text-xs font-semibold rounded-lg shadow-2xs"
            >
              Save Agency Profile
            </button>
          </div>
        </form>
      </div>

      {/* Demo Seed Reset Card */}
      <div className="agency-card p-6 border-[#EF6262]/30 bg-[#FFFDFD]">
        <h3 className="text-sm font-semibold text-[#17212B] mb-1 flex items-center gap-1.5">
          <RotateCcw className="w-4 h-4 text-[#EF6262]" />
          <span>Demo Data Management</span>
        </h3>
        <p className="text-xs text-[#526174] mb-4">
          Reset all projects, CRM leads, tasks, and client records back to the original demo baseline.
        </p>

        {resetConfirm ? (
          <div className="p-3 bg-[#FDE8E8] rounded-xl flex items-center justify-between gap-3">
            <span className="text-xs text-[#991B1B] font-medium">
              Are you sure? This re-seeds the database to the initial Acme Corp dataset.
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setResetConfirm(false)}
                className="px-2.5 py-1 text-xs text-[#526174] hover:bg-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="px-3 py-1 bg-[#EF6262] text-white text-xs font-semibold rounded hover:bg-[#DC2626]"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setResetConfirm(true)}
            className="px-3.5 py-2 bg-white border border-[#DAD5CA] hover:border-[#EF6262] hover:text-[#EF6262] text-xs font-semibold rounded-lg transition-colors"
          >
            Reset Database to Default Seed
          </button>
        )}
      </div>
    </div>
  );
};
