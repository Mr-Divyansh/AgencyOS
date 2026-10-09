import { Router } from 'express';
import { db } from './db.js';

export const apiRouter = Router();

// Middleware to mock active user session if not set
let currentUserId = 'usr_sarah_admin';

apiRouter.use((req, res, next) => {
  // If user passed x-user-id header, switch session
  const headerUserId = req.headers['x-user-id'];
  if (typeof headerUserId === 'string' && headerUserId) {
    currentUserId = headerUserId;
  }
  next();
});

// --- Auth Endpoints ---
apiRouter.get('/auth/session', (req, res) => {
  const user = db.getUserById(currentUserId) || db.getUserById('usr_sarah_admin');
  const agency = db.getAgency();
  res.json({ user, agency });
});

apiRouter.post('/auth/login', (req, res) => {
  const { userId, email } = req.body;
  let user;
  if (userId) {
    user = db.getUserById(userId);
  } else if (email) {
    user = db.getUsers().find((u) => u.email.toLowerCase() === email.toLowerCase());
  }

  if (!user) {
    return res.status(404).json({ error: 'User persona not found.' });
  }

  currentUserId = user.id;
  const agency = db.getAgency();
  res.json({ user, agency });
});

apiRouter.post('/auth/logout', (req, res) => {
  currentUserId = 'usr_sarah_admin';
  res.json({ success: true });
});

// --- Dashboard Endpoints ---
apiRouter.get('/dashboard/summary', (req, res) => {
  const summary = db.getDashboardSummary();
  res.json(summary);
});

apiRouter.get('/dashboard/activity', (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 15;
  const activities = db.getActivities(limit);
  res.json(activities);
});

// --- Projects Endpoints ---
apiRouter.get('/projects', (req, res) => {
  let list = db.getProjects();
  const { status, clientId, search } = req.query;

  if (status && typeof status === 'string') {
    list = list.filter((p) => p.status === status);
  }
  if (clientId && typeof clientId === 'string') {
    list = list.filter((p) => p.clientId === clientId);
  }
  if (search && typeof search === 'string') {
    const q = search.toLowerCase();
    list = list.filter((p) => p.name.toLowerCase().includes(q) || (p.clientName && p.clientName.toLowerCase().includes(q)));
  }

  res.json(list);
});

apiRouter.get('/projects/:id', (req, res) => {
  const project = db.getProjectById(req.params.id);
  if (!project) return res.status(404).json({ error: 'Project not found' });
  const tasks = db.getTasks({ projectId: project.id });
  const deliverables = db.getDeliverables(project.id);
  res.json({ ...project, tasks, deliverables });
});

apiRouter.post('/projects', (req, res) => {
  const { name, clientId, description, status, priority, budget, startDate, dueDate, assignedUserIds } = req.body;
  if (!name || !clientId) {
    return res.status(400).json({ error: 'Project name and client are required' });
  }
  const created = db.createProject({
    agencyId: 'agency_dweb_01',
    name,
    clientId,
    description: description || '',
    status: status || 'planning',
    priority: priority || 'medium',
    budget: Number(budget) || 0,
    startDate: startDate || new Date().toISOString().split('T')[0],
    dueDate: dueDate || new Date().toISOString().split('T')[0],
    assignedUserIds: assignedUserIds || ['usr_sarah_admin'],
  });
  res.status(201).json(created);
});

apiRouter.patch('/projects/:id', (req, res) => {
  const updated = db.updateProject(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Project not found' });
  res.json(updated);
});

apiRouter.delete('/projects/:id', (req, res) => {
  const success = db.deleteProject(req.params.id);
  if (!success) return res.status(404).json({ error: 'Project not found' });
  res.json({ success: true });
});

// --- Tasks Endpoints ---
apiRouter.get('/tasks', (req, res) => {
  const { projectId, assigneeId, status } = req.query;
  let list = db.getTasks({
    projectId: typeof projectId === 'string' ? projectId : undefined,
    assigneeId: typeof assigneeId === 'string' ? assigneeId : undefined,
  });

  if (status && typeof status === 'string') {
    list = list.filter((t) => t.status === status);
  }

  res.json(list);
});

apiRouter.post('/tasks', (req, res) => {
  const { title, description, projectId, assigneeId, status, priority, dueDate, estimatedHours } = req.body;
  if (!title || !projectId) {
    return res.status(400).json({ error: 'Task title and project are required' });
  }
  const created = db.createTask({
    agencyId: 'agency_dweb_01',
    title,
    description: description || '',
    projectId,
    assigneeId: assigneeId || 'usr_sarah_admin',
    status: status || 'todo',
    priority: priority || 'medium',
    dueDate: dueDate || new Date().toISOString().split('T')[0],
    estimatedHours: estimatedHours ? Number(estimatedHours) : undefined,
  });
  res.status(201).json(created);
});

apiRouter.patch('/tasks/:id', (req, res) => {
  const updated = db.updateTask(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Task not found' });
  res.json(updated);
});

apiRouter.delete('/tasks/:id', (req, res) => {
  const success = db.deleteTask(req.params.id);
  if (!success) return res.status(404).json({ error: 'Task not found' });
  res.json({ success: true });
});

// --- CRM Leads Endpoints ---
apiRouter.get('/leads', (req, res) => {
  const list = db.getLeads();
  res.json(list);
});

apiRouter.post('/leads', (req, res) => {
  const { name, company, email, phone, source, serviceInterest, estimatedValue, status, notes, followUpDate } = req.body;
  if (!name || !company || !email) {
    return res.status(400).json({ error: 'Name, company, and email are required' });
  }
  const created = db.createLead({
    agencyId: 'agency_dweb_01',
    name,
    company,
    email,
    phone,
    source: source || 'Inbound',
    serviceInterest: serviceInterest || 'General Services',
    estimatedValue: Number(estimatedValue) || 0,
    status: status || 'new',
    assignedToId: 'usr_sarah_admin',
    notes: notes || '',
    followUpDate,
  });
  res.status(201).json(created);
});

apiRouter.patch('/leads/:id', (req, res) => {
  const updated = db.updateLead(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Lead not found' });
  res.json(updated);
});

apiRouter.delete('/leads/:id', (req, res) => {
  const success = db.deleteLead(req.params.id);
  if (!success) return res.status(404).json({ error: 'Lead not found' });
  res.json({ success: true });
});

apiRouter.post('/leads/:id/convert', (req, res) => {
  try {
    const result = db.convertLeadToClient(req.params.id, req.body || {});
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Conversion failed' });
  }
});

// --- Clients Endpoints ---
apiRouter.get('/clients', (req, res) => {
  const clients = db.getClients();
  // enrich with project counts
  const projects = db.getProjects();
  const enriched = clients.map((c) => {
    const clientProjects = projects.filter((p) => p.clientId === c.id);
    return {
      ...c,
      projectCount: clientProjects.length,
      activeProjectsCount: clientProjects.filter((p) => p.status === 'in_progress' || p.status === 'in_review').length,
    };
  });
  res.json(enriched);
});

apiRouter.get('/clients/:id', (req, res) => {
  const client = db.getClientById(req.params.id);
  if (!client) return res.status(404).json({ error: 'Client not found' });
  const projects = db.getProjects().filter((p) => p.clientId === client.id);
  const invoices = db.getInvoices(client.id);
  res.json({ ...client, projects, invoices });
});

apiRouter.post('/clients', (req, res) => {
  const { name, company, email, phone, website, status, notes, totalValue } = req.body;
  if (!name || !company || !email) {
    return res.status(400).json({ error: 'Name, company, and email are required' });
  }
  const created = db.createClient({
    agencyId: 'agency_dweb_01',
    name,
    company,
    email,
    phone,
    website,
    status: status || 'active',
    notes: notes || '',
    totalValue: totalValue ? Number(totalValue) : 0,
  });
  res.status(201).json(created);
});

apiRouter.patch('/clients/:id', (req, res) => {
  const updated = db.updateClient(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Client not found' });
  res.json(updated);
});

// --- Client Portal Specific Endpoints ---
apiRouter.get('/portal/client', (req, res) => {
  const user = db.getUserById(currentUserId);
  const clientId = user?.clientId || 'cli_acme_01';
  const client = db.getClientById(clientId);
  if (!client) return res.status(404).json({ error: 'Client record not found' });

  const projects = db.getProjects().filter((p) => p.clientId === client.id);
  const projectIds = projects.map((p) => p.id);
  const deliverables = db.getDeliverables().filter((d) => projectIds.includes(d.projectId));
  const invoices = db.getInvoices(client.id);
  const teamMembers = db.getUsers().filter((u) => u.role !== 'client');

  res.json({
    client,
    projects,
    deliverables,
    invoices,
    teamMembers,
  });
});

apiRouter.post('/portal/deliverables/:id/review', (req, res) => {
  const { status, feedback } = req.body;
  const deliverable = db.updateDeliverable(req.params.id, {
    status: status === 'approved' ? 'approved' : 'revision_requested',
  });
  if (!deliverable) return res.status(404).json({ error: 'Deliverable not found' });

  const user = db.getUserById(currentUserId);
  db.logActivity({
    actorId: user?.id || 'usr_marcus_client',
    actorName: user?.name || 'Marcus Vance',
    actorAvatar: user?.avatarUrl || '',
    action: status === 'approved' ? 'approved deliverable' : 'requested revisions on deliverable',
    entityType: 'deliverable',
    entityId: deliverable.id,
    entityName: deliverable.title,
  });

  db.createNotification({
    userId: 'usr_sarah_admin',
    type: 'deliverable_feedback',
    title: status === 'approved' ? 'Deliverable Approved!' : 'Deliverable Revision Requested',
    message: `${user?.name || 'Client'} has ${status === 'approved' ? 'approved' : 'requested revisions on'} "${deliverable.title}". ${feedback ? `Feedback: "${feedback}"` : ''}`,
    targetView: 'projects',
    targetId: deliverable.projectId,
  });

  res.json({ deliverable, success: true });
});

// --- Team Endpoints ---
apiRouter.get('/team', (req, res) => {
  const users = db.getUsers();
  // enrich with assigned project counts
  const projects = db.getProjects();
  const enriched = users.map((u) => {
    const assignedProjects = projects.filter((p) => p.assignedUserIds.includes(u.id));
    return {
      ...u,
      assignedProjectCount: assignedProjects.length,
    };
  });
  res.json(enriched);
});

apiRouter.patch('/team/:id', (req, res) => {
  const updated = db.updateUser(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'User not found' });
  res.json(updated);
});

// --- Notifications Endpoints ---
apiRouter.get('/notifications', (req, res) => {
  const list = db.getNotifications(currentUserId);
  res.json(list);
});

apiRouter.patch('/notifications/:id/read', (req, res) => {
  const success = db.markNotificationAsRead(req.params.id);
  res.json({ success });
});

apiRouter.post('/notifications/read-all', (req, res) => {
  db.markAllNotificationsAsRead(currentUserId);
  res.json({ success: true });
});

// --- Settings Endpoints ---
apiRouter.get('/settings', (req, res) => {
  const agency = db.getAgency();
  const user = db.getUserById(currentUserId);
  res.json({ agency, user });
});

apiRouter.patch('/settings', (req, res) => {
  const { name, website, currency, timezone, contactEmail } = req.body;
  const updated = db.updateAgency({ name, website, currency, timezone, contactEmail });
  res.json(updated);
});

apiRouter.post('/settings/reset', (req, res) => {
  db.resetToDefault();
  res.json({ success: true, message: 'Database reset to initial demo state.' });
});
