// @ts-nocheck
// Centralized mock data for NDAFlow AI

export const ndaTypes = [
  {
    id: "mutual",
    name: "Mutual NDA",
    description: "Both parties exchange confidential information.",
    icon: "🔁",
    avgDays: 3,
  },
  {
    id: "one-way-incoming",
    name: "One-Way (Incoming)",
    description: "Counterparty discloses confidential info to us.",
    icon: "⬅️",
    avgDays: 2,
  },
  {
    id: "one-way-outgoing",
    name: "One-Way (Outgoing)",
    description: "We disclose confidential information to the counterparty.",
    icon: "➡️",
    avgDays: 2,
  },
  {
    id: "ma",
    name: "M&A / Due Diligence NDA",
    description: "For mergers, acquisitions, JV exploration.",
    icon: "🤝",
    avgDays: 5,
  },
  {
    id: "vendor",
    name: "Vendor / Supplier NDA",
    description: "Confidentiality with vendors, suppliers, contractors.",
    icon: "🏭",
    avgDays: 2,
  },
  {
    id: "employee",
    name: "Employee / Contractor NDA",
    description: "For new hires, contractors, interns.",
    icon: "👤",
    avgDays: 1,
  },
];

export const counterparties = [
  { id: "p1", name: "Acme Robotics Inc.", country: "USA", industry: "Hardware", risk: "Medium", contracts: 12 },
  { id: "p2", name: "Northwind Pharma", country: "Germany", industry: "Pharma", risk: "High", contracts: 7 },
  { id: "p3", name: "Globex Trading Co.", country: "Singapore", industry: "Trading", risk: "Medium", contracts: 4 },
  { id: "p4", name: "Initech Software", country: "USA", industry: "Software", risk: "Low", contracts: 21 },
  { id: "p5", name: "Umbrella Biotech", country: "Switzerland", industry: "Biotech", risk: "High", contracts: 3 },
  { id: "p6", name: "Hooli Cloud", country: "USA", industry: "Cloud", risk: "Low", contracts: 18 },
  { id: "p7", name: "Stark Defense Systems", country: "UK", industry: "Defense", risk: "High", contracts: 2 },
  { id: "p8", name: "Wayne Enterprises", country: "USA", industry: "Conglomerate", risk: "Medium", contracts: 9 },
];

export const templates = [
  {
    id: "t-std-mutual",
    name: "Standard Mutual NDA v4.2",
    type: "Mutual",
    jurisdiction: "Global",
    riskTier: "Low",
    clauses: 14,
    updated: "2026-03-12",
  },
  {
    id: "t-strict-mutual",
    name: "Strict Mutual NDA (IP-heavy)",
    type: "Mutual",
    jurisdiction: "US / EU",
    riskTier: "High",
    clauses: 22,
    updated: "2026-04-01",
  },
  {
    id: "t-incoming",
    name: "One-Way Incoming v3.0",
    type: "One-Way Incoming",
    jurisdiction: "Global",
    riskTier: "Low",
    clauses: 11,
    updated: "2026-02-20",
  },
  {
    id: "t-outgoing",
    name: "One-Way Outgoing v3.1",
    type: "One-Way Outgoing",
    jurisdiction: "Global",
    riskTier: "Medium",
    clauses: 13,
    updated: "2026-04-18",
  },
  {
    id: "t-ma",
    name: "M&A Due Diligence NDA",
    type: "M&A",
    jurisdiction: "US",
    riskTier: "High",
    clauses: 28,
    updated: "2026-04-22",
  },
  {
    id: "t-vendor",
    name: "Vendor NDA — Lite",
    type: "Vendor",
    jurisdiction: "Global",
    riskTier: "Low",
    clauses: 9,
    updated: "2026-01-10",
  },
];

export const rules = [
  {
    id: "r1",
    name: "High-risk → Senior Counsel",
    when: "Risk = High OR M&A involved",
    action: "Assign to Senior Counsel + CISO review",
    enabled: true,
  },
  {
    id: "r2",
    name: "Cross-border PII → Privacy Office",
    when: "PII = Yes AND Cross-border = Yes",
    action: "Add Privacy Officer as approver",
    enabled: true,
  },
  {
    id: "r3",
    name: "Vendor NDA — fast track",
    when: "Type = Vendor AND Risk = Low",
    action: "Auto-approve with template T-VENDOR",
    enabled: true,
  },
  {
    id: "r4",
    name: "Competitor flag escalation",
    when: "Counterparty.industry overlaps + Competitor=Yes",
    action: "Escalate to Chief Legal Officer",
    enabled: true,
  },
  {
    id: "r5",
    name: "Employee NDA — HR routing",
    when: "Type = Employee/Contractor",
    action: "Route to HR Legal queue",
    enabled: false,
  },
];

export const recentRequests = [
  { id: "NDA-2041", title: "Acme Robotics — Joint R&D", type: "Mutual", risk: "Medium", status: "In Review", owner: "S. Patel", updated: "2h ago" },
  { id: "NDA-2040", title: "Northwind Pharma — Clinical Data", type: "One-Way In", risk: "High", status: "Awaiting Signature", owner: "J. Nguyen", updated: "4h ago" },
  { id: "NDA-2039", title: "Hooli Cloud — Hosting Eval", type: "Vendor", risk: "Low", status: "Approved", owner: "M. Davis", updated: "1d ago" },
  { id: "NDA-2038", title: "Wayne Ent. — JV Exploration", type: "M&A", risk: "High", status: "Legal Review", owner: "A. Kim", updated: "1d ago" },
  { id: "NDA-2037", title: "Initech — Beta Software", type: "One-Way Out", risk: "Low", status: "Signed", owner: "R. Gomez", updated: "2d ago" },
  { id: "NDA-2036", title: "Stark Defense — Specs Sharing", type: "Mutual", risk: "High", status: "Priority", owner: "E. Park", updated: "2d ago" },
  { id: "NDA-2035", title: "Globex — Distributor Talks", type: "Mutual", risk: "Medium", status: "Draft", owner: "S. Patel", updated: "3d ago" },
  { id: "NDA-2034", title: "Umbrella — Bio Sample MTA", type: "Mutual", risk: "High", status: "In Review", owner: "J. Nguyen", updated: "3d ago" },
];

export const pendingApprovals = [
  { id: "NDA-2040", title: "Northwind Pharma — Clinical Data", approver: "Privacy Office", sla: "Due in 1d" },
  { id: "NDA-2038", title: "Wayne Ent. — JV Exploration", approver: "CLO", sla: "Due in 2d" },
  { id: "NDA-2036", title: "Stark Defense — Specs Sharing", approver: "CISO", sla: "Overdue 1d" },
];

export const awaitingSignature = [
  { id: "NDA-2032", title: "Pied Piper — Algorithm Review", party: "Pied Piper Inc.", sentAt: "Yesterday" },
  { id: "NDA-2030", title: "Vehement Capital — Funding Talks", party: "Vehement Capital", sentAt: "2 days ago" },
  { id: "NDA-2028", title: "Massive Dynamic — IoT Pilot", party: "Massive Dynamic", sentAt: "3 days ago" },
];

export const priorityRequests = [
  { id: "NDA-2036", title: "Stark Defense — Specs Sharing", reason: "High-risk + Defense industry", risk: "High" },
  { id: "NDA-2038", title: "Wayne Ent. — JV Exploration", reason: "M&A + Cross-border", risk: "High" },
  { id: "NDA-2040", title: "Northwind Pharma — Clinical Data", reason: "PII + Cross-border", risk: "High" },
];

export const openCollaborations = [
  { id: "C-118", title: "Acme Robotics — Clause 7 redline", with: "External Counsel — Latham", unread: 3 },
  { id: "C-117", title: "Wayne Ent. — IP carve-out", with: "Internal — A. Kim", unread: 1 },
  { id: "C-116", title: "Northwind — Data Schedule A", with: "Privacy Office", unread: 5 },
];

export const ndaVolumeByMonth = [
  { month: "Nov", created: 22, signed: 18 },
  { month: "Dec", created: 28, signed: 24 },
  { month: "Jan", created: 31, signed: 27 },
  { month: "Feb", created: 35, signed: 30 },
  { month: "Mar", created: 41, signed: 36 },
  { month: "Apr", created: 47, signed: 39 },
  { month: "May", created: 52, signed: 44 },
];

export const riskDistribution = [
  { name: "Low", value: 58, color: "#22d3ee" },
  { name: "Medium", value: 27, color: "#a78bfa" },
  { name: "High", value: 15, color: "#f472b6" },
];

export const cycleTimeByType = [
  { type: "Vendor", days: 1.2 },
  { type: "Employee", days: 0.8 },
  { type: "Mutual", days: 3.4 },
  { type: "One-Way In", days: 2.1 },
  { type: "One-Way Out", days: 2.5 },
  { type: "M&A", days: 6.7 },
];

export const adminUsers = [
  { name: "Sarah Johnson", role: "Legal Ops Lead", email: "sarah.johnson@contoso.com" },
  { name: "Michael Davis", role: "Senior Counsel", email: "michael.davis@contoso.com" },
  { name: "Emily Rodriguez", role: "Paralegal", email: "emily.rodriguez@contoso.com" },
  { name: "Robert Anderson", role: "Chief Legal Officer", email: "robert.anderson@contoso.com" },
  { name: "Jessica Williams", role: "Privacy Officer", email: "jessica.williams@contoso.com" },
];
