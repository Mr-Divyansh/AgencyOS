import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import type {
  Agency,
  User,
  Client,
  Project,
  Task,
  Lead,
  Deliverable,
  Invoice,
  NotificationItem,
  ActivityItem,
  DashboardSummary,
} from '../src/types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../data');
const DB_FILE = path.join(DATA_DIR, 'database.json');

export interface DatabaseSchema {
  agency: Agency;
  users: User[];
  clients: Client[];
  projects: Project[];
  tasks: Task[];
  leads: Lead[];
  deliverables: Deliverable[];
  invoices: Invoice[];
  notifications: NotificationItem[];
  activities: ActivityItem[];
}

function getInitialData(): DatabaseSchema {
  const agencyId = 'agency_dweb_01';
  const now = new Date().toISOString();

  const agency: Agency = {
    id: agencyId,
    name: 'D Web Studio',
    website: 'https://dwebstudio.com',
    currency: 'USD',
    timezone: 'America/New_York',
    contactEmail: 'contact@dwebstudio.com',
    createdAt: '2025-01-15T09:00:00Z',
  };

  const users: User[] = [
    {
      id: 'usr_sarah_admin',
      agencyId,
      name: 'Sarah Lin',
      email: 'sarah@dwebstudio.com',
      role: 'admin',
      title: 'Agency Founder & Director',
      avatarUrl: '/src/assets/images/avatar_admin_sarah_1791512306532.jpg',
      active: true,
      createdAt: '2025-01-15T09:00:00Z',
    },
    {
      id: 'usr_alex_dev',
      agencyId,
      name: 'Alex Rivera',
      email: 'alex@dwebstudio.com',
      role: 'team',
      title: 'Senior Full-Stack Engineer',
      avatarUrl: '/src/assets/images/avatar_team_alex_1791512319080.jpg',
      active: true,
      createdAt: '2025-02-01T10:00:00Z',
    },
    {
      id: 'usr_elena_design',
      agencyId,
      name: 'Elena Rostova',
      email: 'elena@dwebstudio.com',
      role: 'team',
      title: 'Lead Product Designer',
      avatarUrl: '/src/assets/images/avatar_team_elena_1791512332576.jpg',
      active: true,
      createdAt: '2025-02-15T11:00:00Z',
    },
    {
      id: 'usr_marcus_client',
      agencyId,
      name: 'Marcus Vance',
      email: 'marcus@acmecorp.com',
      role: 'client',
      title: 'VP of Digital, Acme Corp',
      avatarUrl: '/src/assets/images/avatar_client_marcus_1791512345329.jpg',
      active: true,
      clientId: 'cli_acme_01',
      createdAt: '2025-03-01T14:00:00Z',
    },
  ];

  const clients: Client[] = [
    {
      id: 'cli_acme_01',
      agencyId,
      name: 'Marcus Vance',
      company: 'Acme Corporation',
      email: 'marcus@acmecorp.com',
      phone: '+1 (555) 234-5678',
      website: 'https://acmecorp.com',
      status: 'active',
      notes: 'Enterprise account. Q4 global brand refresh and omnichannel web platform revamp.',
      totalValue: 54500,
      createdAt: '2025-03-01T14:00:00Z',
    },
    {
      id: 'cli_lumina_02',
      agencyId,
      name: 'Dr. Clara Thorne',
      company: 'Lumina Health',
      email: 'cthorne@luminahealth.io',
      phone: '+1 (555) 456-7890',
      website: 'https://luminahealth.io',
      status: 'active',
      notes: 'HIPAA-compliant telehealth portal redesign and patient journey overhaul.',
      totalValue: 48000,
      createdAt: '2025-04-10T08:30:00Z',
    },
    {
      id: 'cli_nova_03',
      agencyId,
      name: 'Julian Sterling',
      company: 'Nova Fintech',
      email: 'julian@novapay.co',
      phone: '+1 (555) 789-0123',
      website: 'https://novapay.co',
      status: 'active',
      notes: 'Next-gen mobile banking and card management suite.',
      totalValue: 62000,
      createdAt: '2025-05-18T16:00:00Z',
    },
    {
      id: 'cli_vantage_04',
      agencyId,
      name: 'Tara Higgins',
      company: 'Vantage Mobility',
      email: 'thiggins@vantagemobility.com',
      phone: '+1 (555) 890-1234',
      website: 'https://vantagemobility.com',
      status: 'active',
      notes: 'Commercial EV fleet telematics analytics dashboard.',
      totalValue: 36000,
      createdAt: '2025-06-22T11:15:00Z',
    },
    {
      id: 'cli_horizon_05',
      agencyId,
      name: 'Kenji Sato',
      company: 'Horizon Media',
      email: 'kenji@horizonmedia.net',
      phone: '+1 (555) 901-2345',
      website: 'https://horizonmedia.net',
      status: 'active',
      notes: 'Creator licensing marketplace and automated contract engine.',
      totalValue: 42000,
      createdAt: '2025-07-05T13:45:00Z',
    },
  ];

  const projects: Project[] = [
    {
      id: 'proj_acme_brand',
      agencyId,
      clientId: 'cli_acme_01',
      name: 'Acme Brand Refresh & Web Platform',
      description: 'Comprehensive design system, responsive e-commerce web platform, and marketing hub.',
      status: 'in_progress',
      priority: 'high',
      budget: 38500,
      startDate: '2026-09-01',
      dueDate: '2026-11-20',
      assignedUserIds: ['usr_sarah_admin', 'usr_alex_dev', 'usr_elena_design'],
      milestones: [
        { id: 'm1', title: 'Brand Guidelines & Design Tokens', dueDate: '2026-09-25', completed: true },
        { id: 'm2', title: 'High-Fidelity Component Library', dueDate: '2026-10-18', completed: true },
        { id: 'm3', title: 'Production Frontend Engineering', dueDate: '2026-11-05', completed: false },
        { id: 'm4', title: 'Final QA & Deployment Launch', dueDate: '2026-11-20', completed: false },
      ],
      createdAt: '2026-09-01T10:00:00Z',
      updatedAt: '2026-10-06T15:00:00Z',
    },
    {
      id: 'proj_lumina_portal',
      agencyId,
      clientId: 'cli_lumina_02',
      name: 'Lumina Patient Portal UX & API',
      description: 'Patient records access, appointment scheduling, and telemedicine video consultation UX.',
      status: 'in_review',
      priority: 'high',
      budget: 34000,
      startDate: '2026-08-15',
      dueDate: '2026-10-28',
      assignedUserIds: ['usr_alex_dev', 'usr_elena_design'],
      milestones: [
        { id: 'm5', title: 'User Research & Journey Mapping', dueDate: '2026-09-05', completed: true },
        { id: 'm6', title: 'HIPAA Security Architecture', dueDate: '2026-09-20', completed: true },
        { id: 'm7', title: 'Client Acceptance Review', dueDate: '2026-10-25', completed: false },
      ],
      createdAt: '2026-08-15T09:30:00Z',
      updatedAt: '2026-10-07T12:00:00Z',
    },
    {
      id: 'proj_nova_mobile',
      agencyId,
      clientId: 'cli_nova_03',
      name: 'Nova Mobile Banking App V2',
      description: 'React Native & TypeScript digital banking client with biometric verification and card controls.',
      status: 'in_progress',
      priority: 'urgent',
      budget: 45000,
      startDate: '2026-09-10',
      dueDate: '2026-12-15',
      assignedUserIds: ['usr_alex_dev', 'usr_sarah_admin'],
      milestones: [
        { id: 'm8', title: 'Core Banking API Integration', dueDate: '2026-10-15', completed: false },
        { id: 'm9', title: 'Card Freeze & Limit Microflows', dueDate: '2026-11-01', completed: false },
      ],
      createdAt: '2026-09-10T11:00:00Z',
      updatedAt: '2026-10-08T09:00:00Z',
    },
    {
      id: 'proj_vantage_fleet',
      agencyId,
      clientId: 'cli_vantage_04',
      name: 'Vantage EV Telematics Dashboard',
      description: 'Real-time vehicle battery state, route optimization, and maintenance dispatching interface.',
      status: 'planning',
      priority: 'medium',
      budget: 28000,
      startDate: '2026-10-15',
      dueDate: '2026-12-28',
      assignedUserIds: ['usr_elena_design'],
      milestones: [
        { id: 'm10', title: 'Telemetry Data Schema Alignment', dueDate: '2026-10-30', completed: false },
      ],
      createdAt: '2026-10-02T14:00:00Z',
      updatedAt: '2026-10-04T16:30:00Z',
    },
    {
      id: 'proj_horizon_marketplace',
      agencyId,
      clientId: 'cli_horizon_05',
      name: 'Horizon Creator Marketplace',
      description: 'Direct licensing portal for audio/video assets with instant escrow settlement.',
      status: 'completed',
      priority: 'medium',
      budget: 42000,
      startDate: '2026-06-01',
      dueDate: '2026-09-15',
      assignedUserIds: ['usr_alex_dev', 'usr_sarah_admin'],
      milestones: [
        { id: 'm11', title: 'Escrow Integration & Testing', dueDate: '2026-08-20', completed: true },
        { id: 'm12', title: 'Production Go-Live', dueDate: '2026-09-15', completed: true },
      ],
      createdAt: '2026-06-01T08:00:00Z',
      updatedAt: '2026-09-15T18:00:00Z',
    },
  ];

  const tasks: Task[] = [
    {
      id: 'tsk_01',
      agencyId,
      projectId: 'proj_acme_brand',
      title: 'Finalize Tailwind color tokens and typographic hierarchy',
      description: 'Ensure token alignment with approved Figma master file, including warm ivory surfaces.',
      assigneeId: 'usr_elena_design',
      status: 'done',
      priority: 'high',
      dueDate: '2026-09-24',
      completedAt: '2026-09-23T17:00:00Z',
      createdAt: '2026-09-15T10:00:00Z',
      updatedAt: '2026-09-23T17:00:00Z',
    },
    {
      id: 'tsk_02',
      agencyId,
      projectId: 'proj_acme_brand',
      title: 'Build responsive product showcase grid with filter drawer',
      description: 'Zero horizontal scroll on mobile viewport, smooth state transitions.',
      assigneeId: 'usr_alex_dev',
      status: 'in_review',
      priority: 'high',
      dueDate: '2026-10-12',
      createdAt: '2026-09-26T11:00:00Z',
      updatedAt: '2026-10-07T14:30:00Z',
    },
    {
      id: 'tsk_03',
      agencyId,
      projectId: 'proj_acme_brand',
      title: 'Implement client portal authentication & project approval view',
      description: 'Allow Marcus Vance to review pending deliverables and approve milestones.',
      assigneeId: 'usr_alex_dev',
      status: 'in_progress',
      priority: 'urgent',
      dueDate: '2026-10-14',
      createdAt: '2026-10-01T09:00:00Z',
      updatedAt: '2026-10-08T10:00:00Z',
    },
    {
      id: 'tsk_04',
      agencyId,
      projectId: 'proj_acme_brand',
      title: 'Setup automated OpenGraph image generation and SEO meta tags',
      description: 'Dynamic cards for product catalog and blog resources.',
      assigneeId: 'usr_sarah_admin',
      status: 'todo',
      priority: 'medium',
      dueDate: '2026-10-22',
      createdAt: '2026-10-03T15:00:00Z',
      updatedAt: '2026-10-03T15:00:00Z',
    },
    {
      id: 'tsk_05',
      agencyId,
      projectId: 'proj_lumina_portal',
      title: 'Conduct HIPAA compliance code audit and data tokenization check',
      description: 'Audit patient PHI encryption at rest and in transit.',
      assigneeId: 'usr_alex_dev',
      status: 'done',
      priority: 'urgent',
      dueDate: '2026-09-28',
      completedAt: '2026-09-27T19:00:00Z',
      createdAt: '2026-09-18T10:00:00Z',
      updatedAt: '2026-09-27T19:00:00Z',
    },
    {
      id: 'tsk_06',
      agencyId,
      projectId: 'proj_lumina_portal',
      title: 'Resolve cross-browser video stream fallback in consultation modal',
      description: 'Test WebRTC signaling across Safari iOS and Firefox ESR.',
      assigneeId: 'usr_alex_dev',
      status: 'in_review',
      priority: 'high',
      dueDate: '2026-10-10',
      createdAt: '2026-10-02T13:00:00Z',
      updatedAt: '2026-10-07T16:00:00Z',
    },
    {
      id: 'tsk_07',
      agencyId,
      projectId: 'proj_lumina_portal',
      title: 'Deliver client review report and appointment scheduling flow walkthrough',
      description: 'Walkthrough with Dr. Clara Thorne and Lumina Clinical Ops team.',
      assigneeId: 'usr_sarah_admin',
      status: 'todo',
      priority: 'medium',
      dueDate: '2026-10-18',
      createdAt: '2026-10-05T10:00:00Z',
      updatedAt: '2026-10-05T10:00:00Z',
    },
    {
      id: 'tsk_08',
      agencyId,
      projectId: 'proj_nova_mobile',
      title: 'Implement FaceID / TouchID biometric login hook',
      description: 'Native biometric fallback to 6-digit backup PIN.',
      assigneeId: 'usr_alex_dev',
      status: 'in_progress',
      priority: 'urgent',
      dueDate: '2026-10-16',
      createdAt: '2026-09-28T14:00:00Z',
      updatedAt: '2026-10-08T09:30:00Z',
    },
    {
      id: 'tsk_09',
      agencyId,
      projectId: 'proj_nova_mobile',
      title: 'Design virtual card flip micro-interaction & freeze state',
      description: 'Fluid card flip with masked CVV and tactile haptic feedback.',
      assigneeId: 'usr_elena_design',
      status: 'in_progress',
      priority: 'high',
      dueDate: '2026-10-20',
      createdAt: '2026-10-01T11:00:00Z',
      updatedAt: '2026-10-07T11:00:00Z',
    },
    {
      id: 'tsk_10',
      agencyId,
      projectId: 'proj_nova_mobile',
      title: 'Draft API retry mechanism for balance transaction webhook drops',
      description: 'Idempotency keys and exponential backoff retry queue.',
      assigneeId: 'usr_alex_dev',
      status: 'todo',
      priority: 'medium',
      dueDate: '2026-10-25',
      createdAt: '2026-10-04T12:00:00Z',
      updatedAt: '2026-10-04T12:00:00Z',
    },
    {
      id: 'tsk_11',
      agencyId,
      projectId: 'proj_vantage_fleet',
      title: 'Map telemetry payload ingestion schema with Vantage hardware team',
      description: 'Confirm CAN bus data stream format and polling intervals.',
      assigneeId: 'usr_sarah_admin',
      status: 'todo',
      priority: 'medium',
      dueDate: '2026-10-24',
      createdAt: '2026-10-06T09:00:00Z',
      updatedAt: '2026-10-06T09:00:00Z',
    },
    {
      id: 'tsk_12',
      agencyId,
      projectId: 'proj_horizon_marketplace',
      title: 'Deploy final production build and hand over repository',
      description: 'Client sign-off achieved, final milestone verified.',
      assigneeId: 'usr_alex_dev',
      status: 'done',
      priority: 'low',
      dueDate: '2026-09-15',
      completedAt: '2026-09-15T17:30:00Z',
      createdAt: '2026-09-10T08:00:00Z',
      updatedAt: '2026-09-15T17:30:00Z',
    },
  ];

  const leads: Lead[] = [
    {
      id: 'lead_01',
      agencyId,
      name: 'Rachel Sterling',
      company: 'Zenith Logistics Global',
      email: 'rachel.s@zenithlogistics.com',
      phone: '+1 (555) 345-9876',
      source: 'Referral',
      serviceInterest: 'Full-Stack SaaS Platform',
      estimatedValue: 45000,
      status: 'proposal_sent',
      assignedToId: 'usr_sarah_admin',
      notes: 'Global freight visibility dashboard. Proposal sent Oct 4th. Follow-up meeting scheduled for next Tuesday.',
      followUpDate: '2026-10-14',
      createdAt: '2026-09-20T10:00:00Z',
      updatedAt: '2026-10-04T14:00:00Z',
    },
    {
      id: 'lead_02',
      agencyId,
      name: 'David Zhao',
      company: 'BioForm Research',
      email: 'david@bioform.ai',
      phone: '+1 (555) 678-4321',
      source: 'Inbound',
      serviceInterest: 'Interactive Science Data Visualization',
      estimatedValue: 32000,
      status: 'qualified',
      assignedToId: 'usr_sarah_admin',
      notes: 'Protein folding molecular workbench in Three.js and WebGL. High budget, looking to kick off in November.',
      followUpDate: '2026-10-16',
      createdAt: '2026-09-28T16:00:00Z',
      updatedAt: '2026-10-05T11:30:00Z',
    },
    {
      id: 'lead_03',
      agencyId,
      name: 'Sophie Laurent',
      company: 'Maison Éclat Perfumes',
      email: 'sophie@maisoneclat.fr',
      phone: '+33 1 42 68 55 00',
      source: 'Inbound',
      serviceInterest: 'Luxury E-Commerce & Brand Redesign',
      estimatedValue: 28000,
      status: 'contacted',
      assignedToId: 'usr_elena_design',
      notes: 'Direct-to-consumer luxury fragrance brand. Initial discovery call completed. Needs bespoke interactive bottle customizer.',
      followUpDate: '2026-10-18',
      createdAt: '2026-10-02T09:00:00Z',
      updatedAt: '2026-10-06T15:00:00Z',
    },
    {
      id: 'lead_04',
      agencyId,
      name: 'Liam Gallagher',
      company: 'Pulse Fitness Interactive',
      email: 'liam@pulsefit.co',
      phone: '+1 (555) 890-5678',
      source: 'LinkedIn',
      serviceInterest: 'Mobile Touch Application',
      estimatedValue: 22000,
      status: 'new',
      assignedToId: 'usr_alex_dev',
      notes: 'Inbound message from Founder. Looking to rebuild their connected smart dumbbell coaching iOS/Android app.',
      followUpDate: '2026-10-12',
      createdAt: '2026-10-07T11:00:00Z',
      updatedAt: '2026-10-07T11:00:00Z',
    },
    {
      id: 'lead_05',
      agencyId,
      name: 'Arthur Pendelton',
      company: 'Heritage Rare Books',
      email: 'arthur@heritagelibris.co.uk',
      phone: '+44 20 7946 0912',
      source: 'Referral',
      serviceInterest: 'Editorial Archive & Catalog System',
      estimatedValue: 19500,
      status: 'won',
      assignedToId: 'usr_sarah_admin',
      notes: 'Contract signed! Ready for conversion to client and project kickoff.',
      followUpDate: '2026-10-10',
      createdAt: '2026-09-12T14:00:00Z',
      updatedAt: '2026-10-07T17:00:00Z',
    },
    {
      id: 'lead_06',
      agencyId,
      name: 'Tyler Vance',
      company: 'OmniTrade FX',
      email: 'tvance@omnitrade.com',
      source: 'Conference',
      serviceInterest: 'Forex Trading Terminal UI',
      estimatedValue: 65000,
      status: 'lost',
      assignedToId: 'usr_sarah_admin',
      notes: 'Postponed internal tooling budget to 2027 due to executive restructuring.',
      createdAt: '2026-08-10T10:00:00Z',
      updatedAt: '2026-09-15T12:00:00Z',
    },
  ];

  const deliverables: Deliverable[] = [
    {
      id: 'deliv_01',
      projectId: 'proj_acme_brand',
      title: 'Design System & Typography Guidelines V1.2',
      description: 'Comprehensive token documentation, button states, warm surface palette, and accessible contrast tables.',
      type: 'design',
      status: 'approved',
      assetUrl: 'https://cdn.dwebstudio.com/assets/acme-design-tokens.pdf',
      updatedAt: '2026-09-25T14:00:00Z',
    },
    {
      id: 'deliv_02',
      projectId: 'proj_acme_brand',
      title: 'Interactive E-Commerce Product Grid & Drawer Prototype',
      description: 'Full responsive prototype demonstrating zero-horizontal-overflow mobile layouts, faceted search, and quick cart slide-over.',
      type: 'code',
      status: 'pending_review',
      assetUrl: 'https://staging.acmecorp-preview.dwebstudio.com',
      updatedAt: '2026-10-07T16:00:00Z',
    },
    {
      id: 'deliv_03',
      projectId: 'proj_acme_brand',
      title: 'Enterprise Checkout & Multi-Currency Flow Spec',
      description: 'Technical workflow diagram covering tax computation fallback and Stripe webhook idempotency.',
      type: 'document',
      status: 'revision_requested',
      assetUrl: 'https://docs.dwebstudio.com/acme/checkout-architecture-v1.pdf',
      updatedAt: '2026-10-06T11:00:00Z',
    },
    {
      id: 'deliv_04',
      projectId: 'proj_lumina_portal',
      title: 'HIPAA Security Verification Audit Log',
      description: 'Signed compliance audit verifying patient data encryption in transit and rest.',
      type: 'document',
      status: 'approved',
      assetUrl: 'https://cdn.dwebstudio.com/lumina/hipaa-audit-2026.pdf',
      updatedAt: '2026-09-28T18:00:00Z',
    },
  ];

  const invoices: Invoice[] = [
    {
      id: 'inv_01',
      agencyId,
      clientId: 'cli_acme_01',
      projectId: 'proj_acme_brand',
      number: 'INV-2026-001',
      amount: 19250,
      status: 'paid',
      issueDate: '2026-09-01',
      dueDate: '2026-09-15',
      paidAt: '2026-09-12T14:30:00Z',
      description: 'Acme Brand Refresh — Milestone 1: Discovery & Design System Tokens (50% upfront)',
    },
    {
      id: 'inv_02',
      agencyId,
      clientId: 'cli_acme_01',
      projectId: 'proj_acme_brand',
      number: 'INV-2026-004',
      amount: 11500,
      status: 'pending',
      issueDate: '2026-10-01',
      dueDate: '2026-10-20',
      description: 'Acme Brand Refresh — Milestone 2: Component Library & Interactive Prototype',
    },
    {
      id: 'inv_03',
      agencyId,
      clientId: 'cli_lumina_02',
      projectId: 'proj_lumina_portal',
      number: 'INV-2026-002',
      amount: 17000,
      status: 'paid',
      issueDate: '2026-08-15',
      dueDate: '2026-09-01',
      paidAt: '2026-08-30T10:00:00Z',
      description: 'Lumina Patient Portal — Milestone 1: User Research & Security Architecture',
    },
    {
      id: 'inv_04',
      agencyId,
      clientId: 'cli_nova_03',
      projectId: 'proj_nova_mobile',
      number: 'INV-2026-003',
      amount: 22500,
      status: 'paid',
      issueDate: '2026-09-10',
      dueDate: '2026-09-25',
      paidAt: '2026-09-21T16:00:00Z',
      description: 'Nova Banking App V2 — Initial Retainer & Architecture Sprint',
    },
  ];

  const notifications: NotificationItem[] = [
    {
      id: 'notif_01',
      agencyId,
      userId: 'usr_sarah_admin',
      type: 'lead_won',
      title: 'New Deal Won!',
      message: 'Arthur Pendelton (Heritage Rare Books) signed contract for $19,500. Ready for 1-click client conversion.',
      read: false,
      targetView: 'crm',
      targetId: 'lead_05',
      createdAt: '2026-10-07T17:02:00Z',
    },
    {
      id: 'notif_02',
      agencyId,
      userId: 'usr_alex_dev',
      type: 'deliverable_feedback',
      title: 'Client Feedback Received',
      message: 'Marcus Vance submitted feedback on Acme Checkout & Multi-Currency Flow Spec.',
      read: false,
      targetView: 'client_portal',
      targetId: 'deliv_03',
      createdAt: '2026-10-06T11:15:00Z',
    },
    {
      id: 'notif_03',
      agencyId,
      userId: 'usr_sarah_admin',
      type: 'project_status',
      title: 'Milestone Completed',
      message: 'High-Fidelity Component Library for Acme Corporation was verified and completed.',
      read: true,
      targetView: 'projects',
      targetId: 'proj_acme_brand',
      createdAt: '2026-10-06T15:30:00Z',
    },
    {
      id: 'notif_04',
      agencyId,
      userId: 'usr_marcus_client',
      type: 'project_status',
      title: 'New Deliverable Ready for Review',
      message: 'Interactive E-Commerce Product Grid & Drawer Prototype is awaiting your review.',
      read: false,
      targetView: 'client_portal',
      targetId: 'deliv_02',
      createdAt: '2026-10-07T16:05:00Z',
    },
  ];

  const activities: ActivityItem[] = [
    {
      id: 'act_01',
      agencyId,
      actorId: 'usr_marcus_client',
      actorName: 'Marcus Vance',
      actorAvatar: '/src/assets/images/avatar_client_marcus_1791512345329.jpg',
      action: 'requested revisions on',
      entityType: 'deliverable',
      entityId: 'deliv_03',
      entityName: 'Enterprise Checkout Spec',
      timestamp: '2026-10-06T11:10:00Z',
    },
    {
      id: 'act_02',
      agencyId,
      actorId: 'usr_elena_design',
      actorName: 'Elena Rostova',
      actorAvatar: '/src/assets/images/avatar_team_elena_1791512332576.jpg',
      action: 'uploaded deliverable',
      entityType: 'deliverable',
      entityId: 'deliv_02',
      entityName: 'Interactive Product Grid Prototype',
      timestamp: '2026-10-07T16:00:00Z',
    },
    {
      id: 'act_03',
      agencyId,
      actorId: 'usr_alex_dev',
      actorName: 'Alex Rivera',
      actorAvatar: '/src/assets/images/avatar_team_alex_1791512319080.jpg',
      action: 'moved task to In Review',
      entityType: 'task',
      entityId: 'tsk_02',
      entityName: 'Build responsive product showcase grid',
      timestamp: '2026-10-07T14:30:00Z',
    },
    {
      id: 'act_04',
      agencyId,
      actorId: 'usr_sarah_admin',
      actorName: 'Sarah Lin',
      actorAvatar: '/src/assets/images/avatar_admin_sarah_1791512306532.jpg',
      action: 'closed deal with',
      entityType: 'lead',
      entityId: 'lead_05',
      entityName: 'Heritage Rare Books ($19,500)',
      timestamp: '2026-10-07T17:00:00Z',
    },
  ];

  return {
    agency,
    users,
    clients,
    projects,
    tasks,
    leads,
    deliverables,
    invoices,
    notifications,
    activities,
  };
}

class Database {
  private data: DatabaseSchema;

  constructor() {
    this.ensureDataDir();
    this.data = this.load();
  }

  private ensureDataDir() {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  }

  private load(): DatabaseSchema {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        return JSON.parse(raw);
      }
    } catch (err) {
      console.error('Failed reading database file, resetting to initial data:', err);
    }

    const initial = getInitialData();
    this.save(initial);
    return initial;
  }

  public save(dataToSave?: DatabaseSchema) {
    this.ensureDataDir();
    const payload = dataToSave || this.data;
    const tempFile = `${DB_FILE}.tmp.${Date.now()}`;
    fs.writeFileSync(tempFile, JSON.stringify(payload, null, 2), 'utf-8');
    fs.renameSync(tempFile, DB_FILE);
    if (dataToSave) {
      this.data = dataToSave;
    }
  }

  public resetToDefault() {
    this.data = getInitialData();
    this.save();
    return this.data;
  }

  // --- Read helpers ---
  public getAgency(): Agency {
    return this.data.agency;
  }

  public updateAgency(patch: Partial<Agency>): Agency {
    this.data.agency = { ...this.data.agency, ...patch };
    this.save();
    return this.data.agency;
  }

  public getUsers(): User[] {
    return this.data.users;
  }

  public getUserById(id: string): User | undefined {
    return this.data.users.find((u) => u.id === id);
  }

  public updateUser(id: string, patch: Partial<User>): User | undefined {
    const idx = this.data.users.findIndex((u) => u.id === id);
    if (idx === -1) return undefined;
    this.data.users[idx] = { ...this.data.users[idx], ...patch };
    this.save();
    return this.data.users[idx];
  }

  public getClients(): Client[] {
    return this.data.clients;
  }

  public getClientById(id: string): Client | undefined {
    return this.data.clients.find((c) => c.id === id);
  }

  public createClient(client: Omit<Client, 'id' | 'createdAt'>): Client {
    const newClient: Client = {
      ...client,
      id: `cli_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      createdAt: new Date().toISOString(),
    };
    this.data.clients.push(newClient);
    this.logActivity({
      actorId: 'usr_sarah_admin',
      actorName: 'Sarah Lin',
      actorAvatar: '/src/assets/images/avatar_admin_sarah_1791512306532.jpg',
      action: 'created client',
      entityType: 'client',
      entityId: newClient.id,
      entityName: newClient.company || newClient.name,
    });
    this.save();
    return newClient;
  }

  public updateClient(id: string, patch: Partial<Client>): Client | undefined {
    const idx = this.data.clients.findIndex((c) => c.id === id);
    if (idx === -1) return undefined;
    this.data.clients[idx] = { ...this.data.clients[idx], ...patch };
    this.save();
    return this.data.clients[idx];
  }

  public getProjects(): Project[] {
    // Enrich with computed fields
    return this.data.projects.map((p) => {
      const client = this.data.clients.find((c) => c.id === p.clientId);
      const projTasks = this.data.tasks.filter((t) => t.projectId === p.id);
      const completed = projTasks.filter((t) => t.status === 'done').length;
      const progress = projTasks.length > 0 ? Math.round((completed / projTasks.length) * 100) : 0;
      return {
        ...p,
        clientName: client ? client.company : 'Unknown Client',
        totalTasks: projTasks.length,
        completedTasks: completed,
        progress,
      };
    });
  }

  public getProjectById(id: string): Project | undefined {
    const projects = this.getProjects();
    return projects.find((p) => p.id === id);
  }

  public createProject(proj: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Project {
    const now = new Date().toISOString();
    const newProject: Project = {
      ...proj,
      id: `proj_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      createdAt: now,
      updatedAt: now,
    };
    this.data.projects.push(newProject);
    this.logActivity({
      actorId: 'usr_sarah_admin',
      actorName: 'Sarah Lin',
      actorAvatar: '/src/assets/images/avatar_admin_sarah_1791512306532.jpg',
      action: 'created project',
      entityType: 'project',
      entityId: newProject.id,
      entityName: newProject.name,
    });
    this.save();
    return this.getProjectById(newProject.id)!;
  }

  public updateProject(id: string, patch: Partial<Project>): Project | undefined {
    const idx = this.data.projects.findIndex((p) => p.id === id);
    if (idx === -1) return undefined;
    this.data.projects[idx] = {
      ...this.data.projects[idx],
      ...patch,
      updatedAt: new Date().toISOString(),
    };
    this.save();
    return this.getProjectById(id);
  }

  public deleteProject(id: string): boolean {
    const idx = this.data.projects.findIndex((p) => p.id === id);
    if (idx === -1) return false;
    this.data.projects.splice(idx, 1);
    this.save();
    return true;
  }

  public getTasks(filter?: { projectId?: string; assigneeId?: string }): Task[] {
    let list = this.data.tasks;
    if (filter?.projectId) list = list.filter((t) => t.projectId === filter.projectId);
    if (filter?.assigneeId) list = list.filter((t) => t.assigneeId === filter.assigneeId);

    return list.map((t) => {
      const proj = this.data.projects.find((p) => p.id === t.projectId);
      const user = this.data.users.find((u) => u.id === t.assigneeId);
      return {
        ...t,
        projectName: proj ? proj.name : 'Unknown Project',
        assigneeName: user ? user.name : 'Unassigned',
        assigneeAvatar: user ? user.avatarUrl : '',
      };
    });
  }

  public createTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Task {
    const now = new Date().toISOString();
    const newTask: Task = {
      ...task,
      id: `tsk_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      createdAt: now,
      updatedAt: now,
    };
    this.data.tasks.push(newTask);

    const user = this.data.users.find((u) => u.id === task.assigneeId);
    if (user && user.id !== 'usr_sarah_admin') {
      this.createNotification({
        userId: user.id,
        type: 'task_assigned',
        title: 'New Task Assigned',
        message: `You were assigned: "${task.title}"`,
        targetView: 'tasks',
        targetId: newTask.id,
      });
    }

    this.logActivity({
      actorId: 'usr_sarah_admin',
      actorName: 'Sarah Lin',
      actorAvatar: '/src/assets/images/avatar_admin_sarah_1791512306532.jpg',
      action: 'created task',
      entityType: 'task',
      entityId: newTask.id,
      entityName: newTask.title,
    });

    this.save();
    return this.getTasks().find((t) => t.id === newTask.id)!;
  }

  public updateTask(id: string, patch: Partial<Task>): Task | undefined {
    const idx = this.data.tasks.findIndex((t) => t.id === id);
    if (idx === -1) return undefined;
    const prev = this.data.tasks[idx];
    const isCompleted = patch.status === 'done' && prev.status !== 'done';

    this.data.tasks[idx] = {
      ...prev,
      ...patch,
      completedAt: isCompleted ? new Date().toISOString() : prev.completedAt,
      updatedAt: new Date().toISOString(),
    };

    if (patch.status && patch.status !== prev.status) {
      this.logActivity({
        actorId: 'usr_alex_dev',
        actorName: 'Alex Rivera',
        actorAvatar: '/src/assets/images/avatar_team_alex_1791512319080.jpg',
        action: `updated task status to ${patch.status.replace('_', ' ')}`,
        entityType: 'task',
        entityId: id,
        entityName: prev.title,
      });
    }

    this.save();
    return this.getTasks().find((t) => t.id === id);
  }

  public deleteTask(id: string): boolean {
    const idx = this.data.tasks.findIndex((t) => t.id === id);
    if (idx === -1) return false;
    this.data.tasks.splice(idx, 1);
    this.save();
    return true;
  }

  public getLeads(): Lead[] {
    return this.data.leads;
  }

  public createLead(lead: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>): Lead {
    const now = new Date().toISOString();
    const newLead: Lead = {
      ...lead,
      id: `lead_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      createdAt: now,
      updatedAt: now,
    };
    this.data.leads.push(newLead);
    this.logActivity({
      actorId: 'usr_sarah_admin',
      actorName: 'Sarah Lin',
      actorAvatar: '/src/assets/images/avatar_admin_sarah_1791512306532.jpg',
      action: 'added CRM lead',
      entityType: 'lead',
      entityId: newLead.id,
      entityName: `${newLead.name} (${newLead.company})`,
    });
    this.save();
    return newLead;
  }

  public updateLead(id: string, patch: Partial<Lead>): Lead | undefined {
    const idx = this.data.leads.findIndex((l) => l.id === id);
    if (idx === -1) return undefined;
    const prev = this.data.leads[idx];
    this.data.leads[idx] = {
      ...prev,
      ...patch,
      updatedAt: new Date().toISOString(),
    };
    this.save();
    return this.data.leads[idx];
  }

  public deleteLead(id: string): boolean {
    const idx = this.data.leads.findIndex((l) => l.id === id);
    if (idx === -1) return false;
    this.data.leads.splice(idx, 1);
    this.save();
    return true;
  }

  public convertLeadToClient(leadId: string, options: { createProject?: boolean; projectName?: string; budget?: number; dueDate?: string }): { client: Client; project?: Project; lead: Lead } {
    const lead = this.data.leads.find((l) => l.id === leadId);
    if (!lead) throw new Error('Lead not found');

    // 1. Create or link client
    let client = this.data.clients.find((c) => c.company.toLowerCase() === lead.company.toLowerCase() || c.email.toLowerCase() === lead.email.toLowerCase());
    if (!client) {
      client = this.createClient({
        agencyId: lead.agencyId,
        name: lead.name,
        company: lead.company,
        email: lead.email,
        phone: lead.phone,
        status: 'active',
        notes: `Converted from lead (${lead.source}). ${lead.notes}`,
        totalValue: lead.estimatedValue,
      });
    }

    // 2. Mark lead as won and link converted client
    lead.status = 'won';
    lead.convertedClientId = client.id;
    lead.updatedAt = new Date().toISOString();

    // 3. Optionally create inauguration project
    let project: Project | undefined;
    if (options.createProject) {
      project = this.createProject({
        agencyId: lead.agencyId,
        clientId: client.id,
        name: options.projectName || `${lead.company} Kickoff Project`,
        description: `Project initiated via CRM lead conversion for ${lead.serviceInterest}.`,
        status: 'planning',
        priority: 'high',
        budget: options.budget || lead.estimatedValue,
        startDate: new Date().toISOString().split('T')[0],
        dueDate: options.dueDate || new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        assignedUserIds: ['usr_sarah_admin', 'usr_alex_dev'],
      });
    }

    this.createNotification({
      userId: 'usr_sarah_admin',
      type: 'lead_won',
      title: 'Lead Converted to Client!',
      message: `${lead.company} is now an active client.`,
      targetView: 'clients',
      targetId: client.id,
    });

    this.save();
    return { client, project, lead };
  }

  public getDeliverables(projectId?: string): Deliverable[] {
    if (projectId) return this.data.deliverables.filter((d) => d.projectId === projectId);
    return this.data.deliverables;
  }

  public updateDeliverable(id: string, patch: Partial<Deliverable>): Deliverable | undefined {
    const idx = this.data.deliverables.findIndex((d) => d.id === id);
    if (idx === -1) return undefined;
    this.data.deliverables[idx] = {
      ...this.data.deliverables[idx],
      ...patch,
      updatedAt: new Date().toISOString(),
    };
    this.save();
    return this.data.deliverables[idx];
  }

  public getInvoices(clientId?: string): Invoice[] {
    let list = this.data.invoices;
    if (clientId) list = list.filter((i) => i.clientId === clientId);
    return list.map((i) => {
      const client = this.data.clients.find((c) => c.id === i.clientId);
      return {
        ...i,
        clientName: client ? client.company : 'Unknown Client',
      };
    });
  }

  public updateInvoice(id: string, patch: Partial<Invoice>): Invoice | undefined {
    const idx = this.data.invoices.findIndex((i) => i.id === id);
    if (idx === -1) return undefined;
    this.data.invoices[idx] = { ...this.data.invoices[idx], ...patch };
    this.save();
    return this.data.invoices[idx];
  }

  public getNotifications(userId?: string): NotificationItem[] {
    if (userId) return this.data.notifications.filter((n) => n.userId === userId);
    return this.data.notifications;
  }

  public markNotificationAsRead(id: string): boolean {
    const notif = this.data.notifications.find((n) => n.id === id);
    if (!notif) return false;
    notif.read = true;
    this.save();
    return true;
  }

  public markAllNotificationsAsRead(userId: string) {
    this.data.notifications.forEach((n) => {
      if (n.userId === userId) n.read = true;
    });
    this.save();
  }

  public createNotification(notif: Omit<NotificationItem, 'id' | 'agencyId' | 'read' | 'createdAt'>): NotificationItem {
    const newNotif: NotificationItem = {
      ...notif,
      id: `notif_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      agencyId: 'agency_dweb_01',
      read: false,
      createdAt: new Date().toISOString(),
    };
    this.data.notifications.unshift(newNotif);
    this.save();
    return newNotif;
  }

  public getActivities(limit = 15): ActivityItem[] {
    return this.data.activities.slice(0, limit);
  }

  public logActivity(act: Omit<ActivityItem, 'id' | 'agencyId' | 'timestamp'>): ActivityItem {
    const newAct: ActivityItem = {
      ...act,
      id: `act_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      agencyId: 'agency_dweb_01',
      timestamp: new Date().toISOString(),
    };
    this.data.activities.unshift(newAct);
    if (this.data.activities.length > 50) {
      this.data.activities.pop();
    }
    this.save();
    return newAct;
  }

  public getDashboardSummary(): DashboardSummary {
    const projects = this.data.projects;
    const activeProjects = projects.filter((p) => p.status === 'in_progress' || p.status === 'in_review').length;
    const completedProjects = projects.filter((p) => p.status === 'completed').length;

    const tasks = this.data.tasks;
    const openTasks = tasks.filter((t) => t.status !== 'done').length;
    const today = new Date().toISOString().split('T')[0];
    const overdueTasks = tasks.filter((t) => t.status !== 'done' && t.dueDate < today).length;

    const leads = this.data.leads;
    const wonLeadsValue = leads.filter((l) => l.status === 'won').reduce((acc, l) => acc + l.estimatedValue, 0);

    const paidInvoices = this.data.invoices.filter((i) => i.status === 'paid');
    const revenueTotal = paidInvoices.reduce((acc, i) => acc + i.amount, 0);

    const activeClients = this.data.clients.filter((c) => c.status === 'active').length;

    const revenueHistory = [
      { month: 'May 2026', revenue: 32000, target: 30000 },
      { month: 'Jun 2026', revenue: 41500, target: 35000 },
      { month: 'Jul 2026', revenue: 38000, target: 35000 },
      { month: 'Aug 2026', revenue: 52000, target: 45000 },
      { month: 'Sep 2026', revenue: 64250, target: 50000 },
      { month: 'Oct 2026', revenue: 58750, target: 55000 },
    ];

    const statuses: { status: Project['status']; label: string; color: string }[] = [
      { status: 'in_progress', label: 'In Progress', color: '#3478F6' },
      { status: 'in_review', label: 'In Review', color: '#F6B91A' },
      { status: 'planning', label: 'Planning', color: '#8B5CF6' },
      { status: 'completed', label: 'Completed', color: '#16A36A' },
      { status: 'on_hold', label: 'On Hold', color: '#7B8794' },
    ];

    const projectStatusDistribution = statuses.map((s) => ({
      status: s.status,
      label: s.label,
      count: projects.filter((p) => p.status === s.status).length,
      color: s.color,
    }));

    return {
      activeProjects,
      completedProjects,
      openTasks,
      overdueTasks,
      totalLeads: leads.length,
      wonLeadsValue,
      revenueTotal,
      activeClients,
      revenueHistory,
      projectStatusDistribution,
    };
  }
}

export const db = new Database();
