// Auto-assignment rules — shown in dashboard, rules page, and during NDA intake.
// Each rule has a condition (when) + a routing action (then).
export const AUTO_ASSIGNMENT_RULES = [
  {
    id: "AR-01",
    name: "LOL Legal Party",
    targetField: "Intake Form — Legal Party",
    when: "Counterparty Type contains 'LOL' OR jurisdiction = US",
    then: "Auto-assign to Senior Counsel + Notify Legal Lead",
    enabled: true,
  },
  {
    id: "AR-02",
    name: "Include rule — High-risk vendors",
    targetField: "Intake Form — Counterparty Risk",
    when:
      "Vendor risk = High AND personal data shared electronically AND opposing party is identifiable",
    then:
      "Add CISO + CLO as approvers · Require Privacy Review · Block auto-approval",
    enabled: true,
  },
  {
    id: "AR-03",
    name: "BIRT Rule — Internal Information",
    targetField: "Intake Form — Information Scope",
    when:
      "Information shared includes financials OR opposing party requests opportunity to identify",
    then:
      "Route to Business Approver and Internal Audit · Add 5-day cure window before signature",
    enabled: true,
  },
  {
    id: "AR-04",
    name: "Defense Industry Escalation",
    targetField: "Intake Form — Industry",
    when: "Industry = Defense OR Aerospace",
    then: "Add CISO + CLO + Compliance Officer as approvers",
    enabled: true,
  },
  {
    id: "AR-05",
    name: "Renewal Reminder",
    targetField: "Repository — Days to Expiry",
    when: "Days to expiry <= 60",
    then: "Create Renewal Reminder task assigned to record owner",
    enabled: true,
  },
];

export function getRulesMatchingIntake({ industry, risk, type } = {}) {
  return AUTO_ASSIGNMENT_RULES.filter((r) => {
    if (!r.enabled) return false;
    const w = r.when.toLowerCase();
    if (industry && w.includes(String(industry).toLowerCase())) return true;
    if (risk && w.includes(String(risk).toLowerCase())) return true;
    if (type && w.includes(String(type).toLowerCase())) return true;
    return false;
  });
}
