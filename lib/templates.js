// Structured NDA template library.
// Each template stores the original legal content as ordered "blocks"
// (title / heading / paragraph / clauseList / signatureBlock).
//
// Placeholders use the form {{PlaceholderName}} and appear inline in the
// text exactly where they should be substituted. The substitution logic
// only swaps placeholder tokens — it never rewrites legal language.

export const PLACEHOLDER_DEFS = [
  { key: "CompanyName", label: "Company Name", source: "company.name", required: true },
  { key: "CompanyAddress", label: "Company Address", source: "company.address", required: true },
  { key: "CounterpartyName", label: "Counterparty Name", source: "counterparty.name", required: true },
  { key: "CounterpartyAddress", label: "Counterparty Address", source: "counterparty.address", required: true },
  { key: "EmployeeName", label: "Employee / Contractor Name", source: "employee.name", required: false },
  { key: "EffectiveDate", label: "Effective Date", source: "record.effectiveDate", required: true },
  { key: "ProjectName", label: "Project / Engagement Name", source: "record.projectName", required: true },
  { key: "BusinessPurpose", label: "Business Purpose", source: "record.purpose", required: true },
  { key: "ConfidentialInformation", label: "Confidential Information Description", source: "record.confidentialInformation", required: false },
  { key: "Jurisdiction", label: "Jurisdiction", source: "record.jurisdiction", required: true },
  { key: "GoverningLaw", label: "Governing Law", source: "record.governingLaw", required: true },
  { key: "NDADuration", label: "NDA Duration", source: "record.term", required: true },
  { key: "SurvivalPeriod", label: "Survival Period", source: "record.survival", required: true },
  { key: "AuthorizedSignerName", label: "Authorized Signer Name (Company)", source: "company.signerName", required: true },
  { key: "AuthorizedSignerTitle", label: "Authorized Signer Title (Company)", source: "company.signerTitle", required: true },
  { key: "CounterpartySignerName", label: "Counterparty Signer Name", source: "counterparty.signerName", required: true },
  { key: "CounterpartySignerTitle", label: "Counterparty Signer Title", source: "counterparty.signerTitle", required: true },
];

// Reusable clause snippets to keep templates readable.
const STD_DEFINITION_CLAUSE =
  '"Confidential Information" means any non-public business, technical, financial, or other information disclosed by one party ("Disclosing Party") to the other ("Receiving Party"), whether orally, in writing, electronically, or by inspection of tangible objects, that is designated as confidential at the time of disclosure or that reasonably should be understood to be confidential given the nature of the information and the circumstances of disclosure, including without limitation: {{ConfidentialInformation}}.';

const STD_OBLIGATIONS_CLAUSE =
  "The Receiving Party shall (a) hold the Confidential Information in strict confidence, (b) use the Confidential Information solely for the Purpose, (c) protect such information using at least the same degree of care it uses to protect its own confidential information of like importance, but in no event less than a reasonable degree of care, and (d) not disclose Confidential Information to any third party without the prior written consent of the Disclosing Party.";

const STD_EXCLUSIONS_CLAUSE =
  "Confidential Information shall not include information that: (a) is or becomes publicly known through no fault of the Receiving Party; (b) was rightfully in the Receiving Party's possession prior to disclosure; (c) is rightfully obtained from a third party without restriction; or (d) is independently developed by the Receiving Party without reference to the Confidential Information.";

const STD_REMEDIES_CLAUSE =
  "The Receiving Party acknowledges that any unauthorized disclosure or use of Confidential Information may cause irreparable harm to the Disclosing Party for which monetary damages may be inadequate, and the Disclosing Party shall be entitled to seek equitable relief, including injunction and specific performance, in addition to all other remedies available at law or in equity.";

// ---------- Template builders ----------

function buildMutual({ id, name, version, jurisdictionLabel }) {
  return {
    id,
    name,
    type: "Mutual",
    jurisdiction: jurisdictionLabel,
    version,
    updated: "2026-04-22",
    status: "Active",
    description:
      "Bilateral confidentiality agreement where both parties may exchange confidential information.",
    clauses: 11,
    placeholders: [
      "CompanyName", "CompanyAddress", "CounterpartyName", "CounterpartyAddress",
      "EffectiveDate", "ProjectName", "BusinessPurpose", "ConfidentialInformation",
      "Jurisdiction", "GoverningLaw", "NDADuration", "SurvivalPeriod",
      "AuthorizedSignerName", "AuthorizedSignerTitle",
      "CounterpartySignerName", "CounterpartySignerTitle",
    ],
    content: [
      { type: "title", text: "MUTUAL NON-DISCLOSURE AGREEMENT" },
      { type: "subtitle", text: "Project: {{ProjectName}}" },
      { type: "paragraph", text: "This Mutual Non-Disclosure Agreement (this “Agreement”) is entered into and effective as of {{EffectiveDate}} (the “Effective Date”) by and between:" },
      { type: "paragraph", text: "{{CompanyName}}, with its principal place of business at {{CompanyAddress}} (“Company”); and" },
      { type: "paragraph", text: "{{CounterpartyName}}, with its principal place of business at {{CounterpartyAddress}} (“Counterparty”)." },
      { type: "paragraph", text: "Each a “Party” and collectively the “Parties.”" },
      { type: "heading", text: "1. PURPOSE" },
      { type: "paragraph", text: "The Parties wish to explore a potential business relationship in connection with: {{BusinessPurpose}} (the “Purpose”). In furtherance of the Purpose, each Party may disclose to the other certain Confidential Information." },
      { type: "heading", text: "2. CONFIDENTIAL INFORMATION" },
      { type: "paragraph", text: STD_DEFINITION_CLAUSE },
      { type: "heading", text: "3. OBLIGATIONS OF THE PARTIES" },
      { type: "paragraph", text: STD_OBLIGATIONS_CLAUSE },
      { type: "heading", text: "4. EXCLUSIONS" },
      { type: "paragraph", text: STD_EXCLUSIONS_CLAUSE },
      { type: "heading", text: "5. TERM AND TERMINATION" },
      { type: "paragraph", text: "This Agreement shall commence on the Effective Date and remain in effect for {{NDADuration}}, unless earlier terminated by either Party upon thirty (30) days’ prior written notice. The confidentiality obligations set forth herein shall survive termination for {{SurvivalPeriod}}." },
      { type: "heading", text: "6. RETURN OR DESTRUCTION" },
      { type: "paragraph", text: "Upon written request of the Disclosing Party, the Receiving Party shall promptly return or destroy all Confidential Information in its possession and certify such return or destruction in writing." },
      { type: "heading", text: "7. NO LICENSE" },
      { type: "paragraph", text: "Nothing in this Agreement shall be construed as granting any license or right under any patent, copyright, trademark, trade secret, or other intellectual property right of either Party." },
      { type: "heading", text: "8. EQUITABLE REMEDIES" },
      { type: "paragraph", text: STD_REMEDIES_CLAUSE },
      { type: "heading", text: "9. GOVERNING LAW AND JURISDICTION" },
      { type: "paragraph", text: "This Agreement shall be governed by and construed in accordance with the laws of {{GoverningLaw}}, without regard to its conflict of law principles. The Parties consent to the exclusive jurisdiction of the courts located in {{Jurisdiction}}." },
      { type: "heading", text: "10. ENTIRE AGREEMENT" },
      { type: "paragraph", text: "This Agreement constitutes the entire understanding between the Parties concerning the subject matter hereof and supersedes all prior or contemporaneous agreements. No modification shall be effective unless in writing and signed by both Parties." },
      { type: "heading", text: "11. COUNTERPARTS" },
      { type: "paragraph", text: "This Agreement may be executed in counterparts, including by electronic signature, each of which shall be deemed an original and together shall constitute one instrument." },
      { type: "spacer" },
      { type: "paragraph", text: "IN WITNESS WHEREOF, the Parties have caused this Agreement to be executed by their duly authorized representatives as of the Effective Date." },
      { type: "signatureBlock", parties: [
        { party: "{{CompanyName}}", name: "{{AuthorizedSignerName}}", title: "{{AuthorizedSignerTitle}}" },
        { party: "{{CounterpartyName}}", name: "{{CounterpartySignerName}}", title: "{{CounterpartySignerTitle}}" },
      ]},
    ],
  };
}

function buildOneWay({ id, name, version, direction = "incoming" }) {
  const incoming = direction === "incoming";
  return {
    id,
    name,
    type: incoming ? "One-Way (Incoming)" : "One-Way (Outgoing)",
    jurisdiction: "Global",
    version,
    updated: "2026-02-18",
    status: "Active",
    description: incoming
      ? "Unilateral NDA — Counterparty discloses confidential information to Company."
      : "Unilateral NDA — Company discloses confidential information to Counterparty.",
    clauses: 9,
    placeholders: [
      "CompanyName", "CompanyAddress", "CounterpartyName", "CounterpartyAddress",
      "EffectiveDate", "ProjectName", "BusinessPurpose", "ConfidentialInformation",
      "Jurisdiction", "GoverningLaw", "NDADuration", "SurvivalPeriod",
      "AuthorizedSignerName", "AuthorizedSignerTitle",
      "CounterpartySignerName", "CounterpartySignerTitle",
    ],
    content: [
      { type: "title", text: "ONE-WAY NON-DISCLOSURE AGREEMENT" },
      { type: "subtitle", text: incoming ? "Disclosing Party: Counterparty" : "Disclosing Party: Company" },
      { type: "paragraph", text: "This One-Way Non-Disclosure Agreement (this “Agreement”) is made effective as of {{EffectiveDate}} between {{CompanyName}}, located at {{CompanyAddress}} (“Company”), and {{CounterpartyName}}, located at {{CounterpartyAddress}} (“Counterparty”)." },
      { type: "heading", text: "1. PURPOSE" },
      { type: "paragraph", text: "In connection with {{BusinessPurpose}} (the “Purpose”) for the project known as {{ProjectName}}, the Disclosing Party may share Confidential Information with the Receiving Party solely for evaluation purposes." },
      { type: "heading", text: "2. CONFIDENTIAL INFORMATION" },
      { type: "paragraph", text: STD_DEFINITION_CLAUSE },
      { type: "heading", text: "3. OBLIGATIONS OF THE RECEIVING PARTY" },
      { type: "paragraph", text: STD_OBLIGATIONS_CLAUSE },
      { type: "heading", text: "4. EXCLUSIONS" },
      { type: "paragraph", text: STD_EXCLUSIONS_CLAUSE },
      { type: "heading", text: "5. TERM" },
      { type: "paragraph", text: "This Agreement shall remain in effect for {{NDADuration}} from the Effective Date. Confidentiality obligations shall survive for {{SurvivalPeriod}}." },
      { type: "heading", text: "6. NO LICENSE OR WARRANTY" },
      { type: "paragraph", text: "All Confidential Information is provided “AS IS.” No license, express or implied, is granted by this Agreement." },
      { type: "heading", text: "7. EQUITABLE RELIEF" },
      { type: "paragraph", text: STD_REMEDIES_CLAUSE },
      { type: "heading", text: "8. GOVERNING LAW" },
      { type: "paragraph", text: "This Agreement shall be governed by the laws of {{GoverningLaw}}, with exclusive jurisdiction in {{Jurisdiction}}." },
      { type: "heading", text: "9. MISCELLANEOUS" },
      { type: "paragraph", text: "This Agreement constitutes the entire understanding between the Parties on this subject. Any amendment must be in writing and signed by both Parties." },
      { type: "spacer" },
      { type: "signatureBlock", parties: [
        { party: "{{CompanyName}}", name: "{{AuthorizedSignerName}}", title: "{{AuthorizedSignerTitle}}" },
        { party: "{{CounterpartyName}}", name: "{{CounterpartySignerName}}", title: "{{CounterpartySignerTitle}}" },
      ]},
    ],
  };
}

function buildVendor() {
  return {
    id: "tpl-vendor",
    name: "Vendor / Supplier NDA",
    type: "Vendor",
    jurisdiction: "Global",
    version: "v3.0",
    updated: "2026-01-15",
    status: "Active",
    description: "Confidentiality terms for engagements with vendors, suppliers, and contractors.",
    clauses: 8,
    placeholders: [
      "CompanyName", "CompanyAddress", "CounterpartyName", "CounterpartyAddress",
      "EffectiveDate", "ProjectName", "BusinessPurpose",
      "GoverningLaw", "Jurisdiction", "NDADuration", "SurvivalPeriod",
      "AuthorizedSignerName", "AuthorizedSignerTitle",
      "CounterpartySignerName", "CounterpartySignerTitle",
    ],
    content: [
      { type: "title", text: "VENDOR NON-DISCLOSURE AGREEMENT" },
      { type: "paragraph", text: "This Vendor Non-Disclosure Agreement (the “Agreement”) is entered into as of {{EffectiveDate}} between {{CompanyName}} (“Company”), located at {{CompanyAddress}}, and {{CounterpartyName}} (“Vendor”), located at {{CounterpartyAddress}}." },
      { type: "heading", text: "1. SCOPE OF ENGAGEMENT" },
      { type: "paragraph", text: "Vendor has been or may be engaged to provide goods or services to Company in connection with {{ProjectName}}. The purpose of disclosure is: {{BusinessPurpose}}." },
      { type: "heading", text: "2. CONFIDENTIAL INFORMATION" },
      { type: "paragraph", text: STD_DEFINITION_CLAUSE },
      { type: "heading", text: "3. VENDOR OBLIGATIONS" },
      { type: "paragraph", text: STD_OBLIGATIONS_CLAUSE },
      { type: "heading", text: "4. SUBCONTRACTORS AND PERSONNEL" },
      { type: "paragraph", text: "Vendor shall ensure that any of its personnel, agents, or subcontractors with access to Confidential Information are bound by written confidentiality obligations no less protective than those set forth herein." },
      { type: "heading", text: "5. EXCLUSIONS" },
      { type: "paragraph", text: STD_EXCLUSIONS_CLAUSE },
      { type: "heading", text: "6. TERM" },
      { type: "paragraph", text: "This Agreement shall remain in effect for {{NDADuration}} and confidentiality obligations shall survive for {{SurvivalPeriod}} after termination." },
      { type: "heading", text: "7. EQUITABLE RELIEF" },
      { type: "paragraph", text: STD_REMEDIES_CLAUSE },
      { type: "heading", text: "8. GOVERNING LAW" },
      { type: "paragraph", text: "This Agreement is governed by the laws of {{GoverningLaw}}, with exclusive jurisdiction in the courts of {{Jurisdiction}}." },
      { type: "spacer" },
      { type: "signatureBlock", parties: [
        { party: "{{CompanyName}}", name: "{{AuthorizedSignerName}}", title: "{{AuthorizedSignerTitle}}" },
        { party: "{{CounterpartyName}}", name: "{{CounterpartySignerName}}", title: "{{CounterpartySignerTitle}}" },
      ]},
    ],
  };
}

function buildCustomer() {
  return {
    id: "tpl-customer",
    name: "Customer NDA",
    type: "Customer",
    jurisdiction: "Global",
    version: "v2.4",
    updated: "2026-03-04",
    status: "Active",
    description: "Confidentiality for customer evaluations, pilots, and pre-sales discussions.",
    clauses: 9,
    placeholders: [
      "CompanyName", "CompanyAddress", "CounterpartyName", "CounterpartyAddress",
      "EffectiveDate", "ProjectName", "BusinessPurpose",
      "GoverningLaw", "Jurisdiction", "NDADuration", "SurvivalPeriod",
      "AuthorizedSignerName", "AuthorizedSignerTitle",
      "CounterpartySignerName", "CounterpartySignerTitle",
    ],
    content: [
      { type: "title", text: "CUSTOMER NON-DISCLOSURE AGREEMENT" },
      { type: "paragraph", text: "This Customer Non-Disclosure Agreement (the “Agreement”) is entered into on {{EffectiveDate}} between {{CompanyName}} (“Company”) and {{CounterpartyName}} (“Customer”), with addresses set forth above and below respectively at {{CompanyAddress}} and {{CounterpartyAddress}}." },
      { type: "heading", text: "1. PURPOSE" },
      { type: "paragraph", text: "The Parties wish to evaluate a potential commercial relationship under the project known as {{ProjectName}}. The purpose is: {{BusinessPurpose}}." },
      { type: "heading", text: "2. CONFIDENTIAL INFORMATION" },
      { type: "paragraph", text: STD_DEFINITION_CLAUSE },
      { type: "heading", text: "3. PERMITTED USE" },
      { type: "paragraph", text: STD_OBLIGATIONS_CLAUSE },
      { type: "heading", text: "4. EXCLUSIONS" },
      { type: "paragraph", text: STD_EXCLUSIONS_CLAUSE },
      { type: "heading", text: "5. CUSTOMER DATA" },
      { type: "paragraph", text: "Each Party shall comply with applicable data protection laws with respect to any personal data received under this Agreement, and shall implement appropriate technical and organizational safeguards." },
      { type: "heading", text: "6. TERM AND SURVIVAL" },
      { type: "paragraph", text: "This Agreement shall continue for {{NDADuration}} from the Effective Date. Confidentiality obligations shall survive for {{SurvivalPeriod}} after termination or expiration." },
      { type: "heading", text: "7. EQUITABLE RELIEF" },
      { type: "paragraph", text: STD_REMEDIES_CLAUSE },
      { type: "heading", text: "8. GOVERNING LAW" },
      { type: "paragraph", text: "This Agreement is governed by the laws of {{GoverningLaw}}, with venue in {{Jurisdiction}}." },
      { type: "heading", text: "9. ENTIRE AGREEMENT" },
      { type: "paragraph", text: "This Agreement constitutes the entire understanding of the Parties concerning the subject matter and supersedes all prior agreements." },
      { type: "spacer" },
      { type: "signatureBlock", parties: [
        { party: "{{CompanyName}}", name: "{{AuthorizedSignerName}}", title: "{{AuthorizedSignerTitle}}" },
        { party: "{{CounterpartyName}}", name: "{{CounterpartySignerName}}", title: "{{CounterpartySignerTitle}}" },
      ]},
    ],
  };
}

function buildPartner() {
  return {
    id: "tpl-partner",
    name: "Partner / Channel NDA",
    type: "Partner",
    jurisdiction: "Global",
    version: "v2.1",
    updated: "2026-02-28",
    status: "Active",
    description: "For strategic partners, resellers, and channel discussions.",
    clauses: 10,
    placeholders: [
      "CompanyName", "CompanyAddress", "CounterpartyName", "CounterpartyAddress",
      "EffectiveDate", "ProjectName", "BusinessPurpose", "ConfidentialInformation",
      "GoverningLaw", "Jurisdiction", "NDADuration", "SurvivalPeriod",
      "AuthorizedSignerName", "AuthorizedSignerTitle",
      "CounterpartySignerName", "CounterpartySignerTitle",
    ],
    content: [
      { type: "title", text: "PARTNER NON-DISCLOSURE AGREEMENT" },
      { type: "paragraph", text: "This Partner Non-Disclosure Agreement (the “Agreement”) is made effective {{EffectiveDate}} between {{CompanyName}} of {{CompanyAddress}} (“Company”) and {{CounterpartyName}} of {{CounterpartyAddress}} (“Partner”)." },
      { type: "heading", text: "1. STRATEGIC PURPOSE" },
      { type: "paragraph", text: "The Parties intend to explore a strategic partnership in respect of {{ProjectName}}, with the specific business purpose of: {{BusinessPurpose}}." },
      { type: "heading", text: "2. CONFIDENTIAL INFORMATION" },
      { type: "paragraph", text: STD_DEFINITION_CLAUSE },
      { type: "heading", text: "3. PERMITTED DISCLOSURES" },
      { type: "paragraph", text: STD_OBLIGATIONS_CLAUSE },
      { type: "heading", text: "4. NON-SOLICITATION" },
      { type: "paragraph", text: "During the term of this Agreement and for twelve (12) months thereafter, neither Party shall directly solicit for employment any employee of the other Party with whom it has had material contact in connection with the Purpose." },
      { type: "heading", text: "5. NON-CIRCUMVENTION" },
      { type: "paragraph", text: "Neither Party shall use Confidential Information to circumvent or compete unfairly with the other Party with respect to opportunities introduced under this Agreement." },
      { type: "heading", text: "6. EXCLUSIONS" },
      { type: "paragraph", text: STD_EXCLUSIONS_CLAUSE },
      { type: "heading", text: "7. TERM" },
      { type: "paragraph", text: "This Agreement shall remain in effect for {{NDADuration}}, with confidentiality obligations surviving for {{SurvivalPeriod}}." },
      { type: "heading", text: "8. EQUITABLE RELIEF" },
      { type: "paragraph", text: STD_REMEDIES_CLAUSE },
      { type: "heading", text: "9. GOVERNING LAW" },
      { type: "paragraph", text: "This Agreement is governed by the laws of {{GoverningLaw}}, with exclusive jurisdiction in {{Jurisdiction}}." },
      { type: "heading", text: "10. ENTIRE AGREEMENT" },
      { type: "paragraph", text: "This Agreement supersedes all prior negotiations and constitutes the complete agreement between the Parties on this subject." },
      { type: "spacer" },
      { type: "signatureBlock", parties: [
        { party: "{{CompanyName}}", name: "{{AuthorizedSignerName}}", title: "{{AuthorizedSignerTitle}}" },
        { party: "{{CounterpartyName}}", name: "{{CounterpartySignerName}}", title: "{{CounterpartySignerTitle}}" },
      ]},
    ],
  };
}

function buildEmployee() {
  return {
    id: "tpl-employee",
    name: "Employee / Contractor NDA",
    type: "Employee",
    jurisdiction: "USA",
    version: "v5.0",
    updated: "2026-04-09",
    status: "Active",
    description: "For new hires, contractors, interns, and internal personnel.",
    clauses: 8,
    placeholders: [
      "CompanyName", "CompanyAddress", "EmployeeName", "EffectiveDate",
      "BusinessPurpose", "GoverningLaw", "Jurisdiction",
      "NDADuration", "SurvivalPeriod",
      "AuthorizedSignerName", "AuthorizedSignerTitle",
    ],
    content: [
      { type: "title", text: "EMPLOYEE / CONTRACTOR CONFIDENTIALITY AGREEMENT" },
      { type: "paragraph", text: "This Confidentiality Agreement (the “Agreement”) is entered into as of {{EffectiveDate}} between {{CompanyName}}, located at {{CompanyAddress}} (the “Company”), and {{EmployeeName}} (the “Employee”)." },
      { type: "heading", text: "1. ENGAGEMENT" },
      { type: "paragraph", text: "Employee is or will be engaged by the Company in a role involving access to Confidential Information. The general scope of engagement relates to: {{BusinessPurpose}}." },
      { type: "heading", text: "2. CONFIDENTIAL INFORMATION" },
      { type: "paragraph", text: 'For purposes of this Agreement, "Confidential Information" includes, without limitation, all proprietary or non-public information of the Company, including business plans, customer lists, source code, technical know-how, financial information, employee data, and any third-party confidential information entrusted to the Company.' },
      { type: "heading", text: "3. EMPLOYEE OBLIGATIONS" },
      { type: "paragraph", text: "Employee shall (a) hold all Confidential Information in strict confidence, (b) use such information solely in connection with the performance of duties for the Company, and (c) not disclose Confidential Information to any third party without prior written authorization." },
      { type: "heading", text: "4. RETURN OF MATERIALS" },
      { type: "paragraph", text: "Upon termination of engagement, or at any time at the Company’s request, Employee shall promptly return all materials, devices, and copies of Confidential Information in Employee’s possession or control." },
      { type: "heading", text: "5. INVENTIONS AND WORK PRODUCT" },
      { type: "paragraph", text: "Employee agrees that all inventions, discoveries, and works created during and within the scope of engagement, using Company resources or relating to the Company’s business, shall be the sole property of the Company." },
      { type: "heading", text: "6. TERM AND SURVIVAL" },
      { type: "paragraph", text: "This Agreement shall remain in effect throughout the term of engagement and for {{NDADuration}} thereafter, with confidentiality obligations surviving for {{SurvivalPeriod}}." },
      { type: "heading", text: "7. EQUITABLE RELIEF" },
      { type: "paragraph", text: STD_REMEDIES_CLAUSE },
      { type: "heading", text: "8. GOVERNING LAW" },
      { type: "paragraph", text: "This Agreement is governed by the laws of {{GoverningLaw}}, with venue in {{Jurisdiction}}." },
      { type: "spacer" },
      { type: "signatureBlock", parties: [
        { party: "{{CompanyName}}", name: "{{AuthorizedSignerName}}", title: "{{AuthorizedSignerTitle}}" },
        { party: "Employee", name: "{{EmployeeName}}", title: "" },
      ]},
    ],
  };
}

function buildInternational() {
  return {
    id: "tpl-international",
    name: "International NDA (GDPR / SCCs)",
    type: "International",
    jurisdiction: "EU + USA",
    version: "v3.3",
    updated: "2026-04-25",
    status: "Active",
    description: "Cross-border NDA with GDPR Standard Contractual Clauses references.",
    clauses: 12,
    placeholders: [
      "CompanyName", "CompanyAddress", "CounterpartyName", "CounterpartyAddress",
      "EffectiveDate", "ProjectName", "BusinessPurpose", "ConfidentialInformation",
      "GoverningLaw", "Jurisdiction", "NDADuration", "SurvivalPeriod",
      "AuthorizedSignerName", "AuthorizedSignerTitle",
      "CounterpartySignerName", "CounterpartySignerTitle",
    ],
    content: [
      { type: "title", text: "INTERNATIONAL NON-DISCLOSURE AGREEMENT" },
      { type: "subtitle", text: "Cross-border data transfer · GDPR-compliant" },
      { type: "paragraph", text: "This International Non-Disclosure Agreement (the “Agreement”) is made on {{EffectiveDate}} by and between {{CompanyName}} of {{CompanyAddress}} (“Company”) and {{CounterpartyName}} of {{CounterpartyAddress}} (“Counterparty”), in connection with {{ProjectName}}." },
      { type: "heading", text: "1. PURPOSE" },
      { type: "paragraph", text: "The Parties intend to share Confidential Information for the purpose of: {{BusinessPurpose}}, and acknowledge that such disclosures may involve cross-border transfers of personal data." },
      { type: "heading", text: "2. CONFIDENTIAL INFORMATION" },
      { type: "paragraph", text: STD_DEFINITION_CLAUSE },
      { type: "heading", text: "3. PERMITTED USE AND OBLIGATIONS" },
      { type: "paragraph", text: STD_OBLIGATIONS_CLAUSE },
      { type: "heading", text: "4. DATA PROTECTION" },
      { type: "paragraph", text: "Each Party shall comply with all applicable data protection laws, including the EU General Data Protection Regulation (Regulation 2016/679) and equivalent national laws. Where personal data is transferred outside the EEA, the Parties shall execute the European Commission’s Standard Contractual Clauses (Module 1 or 2 as applicable) prior to such transfer." },
      { type: "heading", text: "5. SECURITY MEASURES" },
      { type: "paragraph", text: "Each Party shall implement appropriate technical and organizational security measures to protect Confidential Information and personal data against accidental or unlawful destruction, loss, alteration, unauthorized disclosure, or access, in accordance with industry standards and Article 32 GDPR." },
      { type: "heading", text: "6. SUB-PROCESSORS" },
      { type: "paragraph", text: "Neither Party shall engage any sub-processor with respect to personal data shared under this Agreement without the other Party’s prior written authorization, and shall flow down equivalent obligations to such sub-processor." },
      { type: "heading", text: "7. BREACH NOTIFICATION" },
      { type: "paragraph", text: "Each Party shall notify the other without undue delay, and in any event within seventy-two (72) hours, of becoming aware of any actual or suspected unauthorized access, loss, or disclosure of Confidential Information or personal data." },
      { type: "heading", text: "8. EXCLUSIONS" },
      { type: "paragraph", text: STD_EXCLUSIONS_CLAUSE },
      { type: "heading", text: "9. TERM" },
      { type: "paragraph", text: "This Agreement shall remain in effect for {{NDADuration}}, with confidentiality and data protection obligations surviving for {{SurvivalPeriod}}." },
      { type: "heading", text: "10. EQUITABLE RELIEF" },
      { type: "paragraph", text: STD_REMEDIES_CLAUSE },
      { type: "heading", text: "11. GOVERNING LAW AND JURISDICTION" },
      { type: "paragraph", text: "This Agreement shall be governed by the laws of {{GoverningLaw}} without regard to its conflict of laws principles. The Parties submit to the exclusive jurisdiction of the courts of {{Jurisdiction}}." },
      { type: "heading", text: "12. ENTIRE AGREEMENT" },
      { type: "paragraph", text: "This Agreement, together with any executed Standard Contractual Clauses, constitutes the entire agreement between the Parties on this subject." },
      { type: "spacer" },
      { type: "signatureBlock", parties: [
        { party: "{{CompanyName}}", name: "{{AuthorizedSignerName}}", title: "{{AuthorizedSignerTitle}}" },
        { party: "{{CounterpartyName}}", name: "{{CounterpartySignerName}}", title: "{{CounterpartySignerTitle}}" },
      ]},
    ],
  };
}

function buildStandard() {
  return {
    ...buildMutual({
      id: "tpl-standard",
      name: "Standard NDA",
      version: "v1.0",
      jurisdictionLabel: "Global",
    }),
    type: "Standard",
    description: "General-purpose mutual NDA suitable for most low-risk engagements.",
    updated: "2026-01-04",
  };
}

export const TEMPLATE_LIBRARY = [
  buildStandard(),
  buildMutual({ id: "tpl-mutual", name: "Mutual NDA", version: "v4.2", jurisdictionLabel: "USA" }),
  buildOneWay({ id: "tpl-oneway-in", name: "One-Way NDA (Incoming)", version: "v3.0", direction: "incoming" }),
  buildOneWay({ id: "tpl-oneway-out", name: "One-Way NDA (Outgoing)", version: "v3.1", direction: "outgoing" }),
  buildVendor(),
  buildCustomer(),
  buildPartner(),
  buildEmployee(),
  buildInternational(),
];

export function getTemplateById(id) {
  const builtin = TEMPLATE_LIBRARY.find((t) => t.id === id);
  if (builtin) return builtin;
  // Browser only: also look in the custom-templates cache.
  if (typeof window !== "undefined") {
    try {
      // Lazy require to avoid pulling client storage on the server.
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { getCustomTemplateById } = require("./customTemplates");
      return getCustomTemplateById(id) || null;
    } catch {
      return null;
    }
  }
  return null;
}

// Combined library (built-in + custom). Only the browser sees customs.
export function getAllTemplates() {
  if (typeof window !== "undefined") {
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { getCustomTemplates } = require("./customTemplates");
      return [...TEMPLATE_LIBRARY, ...getCustomTemplates()];
    } catch {
      return TEMPLATE_LIBRARY;
    }
  }
  return TEMPLATE_LIBRARY;
}

export function defaultTemplateForType(ndaTypeId) {
  switch (ndaTypeId) {
    case "mutual": return getTemplateById("tpl-mutual");
    case "one-way-incoming": return getTemplateById("tpl-oneway-in");
    case "one-way-outgoing": return getTemplateById("tpl-oneway-out");
    case "ma": return getTemplateById("tpl-international");
    case "vendor": return getTemplateById("tpl-vendor");
    case "employee": return getTemplateById("tpl-employee");
    default: return getTemplateById("tpl-standard");
  }
}
