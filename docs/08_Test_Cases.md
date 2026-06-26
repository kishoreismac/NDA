# CLM Test Cases

## Test Case Status Values

Use these values during execution:

- Not Run
- Passed
- Failed
- Blocked
- Deferred

## Dashboard

| Test Case ID | Module | Scenario | Preconditions | Steps | Expected Result | Role | Priority | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TC-DASH-001 | Dashboard | Dashboard loads for all internal roles | Seed data loaded | Log in or switch to each internal role; open Dashboard | Dashboard is visible for Business User, Legal Reviewer, Admin, and Executive Viewer | All internal roles | High | Not Run |
| TC-DASH-002 | Dashboard | Sidebar does not show New Contract Request | Seed data loaded | Open app shell; inspect sidebar | New Contract Request is not visible in sidebar | All internal roles | High | Not Run |
| TC-DASH-003 | Dashboard | Request a New Contract opens full-page workflow | Business User selected | Click Request a New Contract from dashboard | Full-page NDA request workflow opens | Business User | High | Not Run |
| TC-DASH-004 | Dashboard | Executive Viewer cannot request new contract | Executive Viewer selected | Attempt to click or access request flow | Create action is hidden or blocked with permission message | Executive Viewer | High | Not Run |
| TC-DASH-005 | Dashboard | Status counts match records | Seed NDA records include all statuses | Compare status tab counts against repository/status-filtered records | Counts match exact number of records by status | All internal roles | High | Not Run |
| TC-DASH-006 | Dashboard | Summary tab filters In Review records | At least one In Review NDA exists | Click In Review tab | Only In Review NDAs are shown | All internal roles | High | Not Run |
| TC-DASH-007 | Dashboard | Summary tab filters Approved records | At least one Approved NDA exists | Click Approved tab | Only Approved NDAs are shown | All internal roles | High | Not Run |
| TC-DASH-008 | Dashboard | Summary tab filters Awaiting Signature records | At least one Awaiting Signature NDA exists | Click Awaiting Signature tab | Only Awaiting Signature NDAs are shown | All internal roles | High | Not Run |
| TC-DASH-009 | Dashboard | Summary tab filters Signed records | At least one Signed NDA exists | Click Signed tab | Only Signed NDAs are shown | All internal roles | High | Not Run |
| TC-DASH-010 | Dashboard | Summary tab filters Archived records | At least one Archived NDA exists | Click Archived tab | Only Archived NDAs are shown | All internal roles | High | Not Run |
| TC-DASH-011 | Dashboard | Tasks section is not visible | Seed data loaded | Inspect dashboard | Tasks section is not visible | All internal roles | High | Not Run |
| TC-DASH-012 | Dashboard | Expiring NDA indicator displays | NDA expires within 30 days | Open dashboard | Expiring NDA is identified without showing Renewals as summary tab | All internal roles | Medium | Not Run |

## NDA Intake Workflow

| Test Case ID | Module | Scenario | Preconditions | Steps | Expected Result | Role | Priority | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TC-NDA-001 | NDA Intake | Full-page workflow displays all steps | Business User selected | Open Request a New Contract | Steps show Counterparty Details, Record Details, Template & Placeholders, Additional NDA Questions, PII / Data Questions, Risk Summary, Generate Draft | Business User | High | Not Run |
| TC-NDA-002 | NDA Intake | Required fields show star | Request workflow open | Inspect Counterparty Details fields | All required fields display star | Business User | High | Not Run |
| TC-NDA-003 | NDA Intake | Missing required fields block continue | Request workflow open | Leave required fields empty; click Continue | Validation errors show and section turns red | Business User | High | Not Run |
| TC-NDA-004 | NDA Intake | Completed section turns green | Required fields complete | Complete all required fields; continue | Section is marked complete and green | Business User | High | Not Run |
| TC-NDA-005 | NDA Intake | Incomplete section does not turn green | Some required fields missing | Fill partial required fields; continue | Section remains incomplete and red after validation | Business User | High | Not Run |
| TC-NDA-006 | NDA Intake | Step tabs are clickable | Request workflow open | Click each step tab | User can navigate between steps; active step is highlighted | Business User | Medium | Not Run |
| TC-NDA-007 | NDA Intake | Start Date plus Term Time calculates End Date | Request workflow open | Enter Start Date and Term Time | End Date calculates correctly | Business User | High | Not Run |
| TC-NDA-008 | NDA Intake | Start Date plus End Date calculates Term Time | Request workflow open | Enter Start Date and End Date | Term Time calculates correctly | Business User | High | Not Run |
| TC-NDA-009 | NDA Intake | Custom duration displays exact text | Start Date and End Date produce non-exact year | Enter dates such as 2026-04-15 to 2027-07-27 | Duration displays exact value such as 1 year 3 months 12 days; Custom Time label is not shown | Business User | High | Not Run |
| TC-NDA-010 | NDA Intake | Save as Draft persists form | Required or partial data entered | Click Save as Draft; refresh; reopen draft | Draft data is prefilled and toast says Draft saved successfully | Business User | High | Not Run |
| TC-NDA-011 | NDA Intake | Draft does not become In Review | Draft saved | Check repository/dashboard status | Draft is not counted as In Review until submitted | Business User | High | Not Run |
| TC-NDA-012 | NDA Intake | Submit creates In Review NDA | All required fields complete | Submit NDA request | NDA is saved, status is In Review, repository and dashboard update | Business User | High | Not Run |

## Template Library and Placeholder Mapping

| Test Case ID | Module | Scenario | Preconditions | Steps | Expected Result | Role | Priority | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TC-TPL-001 | Templates | Templates page visible to Legal Reviewer and Admin | Legal Reviewer or Admin selected | Open Templates | Template library is visible | Legal Reviewer, Admin | High | Not Run |
| TC-TPL-002 | Templates | Templates hidden from Business User | Business User selected | Inspect navigation or route access | Templates unavailable or blocked | Business User | Medium | Not Run |
| TC-TPL-003 | Templates | Admin creates new template | Admin selected | Open Templates; create template; save | Template is saved and appears in library | Admin | High | Not Run |
| TC-TPL-004 | Templates | Non-admin cannot create template | Legal Reviewer selected | Attempt template creation | Action hidden or permission message shown | Legal Reviewer | High | Not Run |
| TC-TPL-005 | Templates | Template preview highlights placeholders | Template exists | Open preview | Original template displays placeholders highlighted and side panel lists detected placeholders | Admin, Legal Reviewer | High | Not Run |
| TC-TPL-006 | Templates | Template selection during intake works | Request workflow open | Select Standard NDA | Template is stored on request and placeholder status appears | Business User | High | Not Run |
| TC-TPL-007 | Placeholder Mapping | All supported placeholders map correctly | NDA with full data and template containing all placeholders | Generate mapping | Each placeholder has expected source value | Business User, Admin | High | Not Run |
| TC-TPL-008 | Placeholder Mapping | Missing required placeholder blocks generation | Template selected; required field missing | Attempt final document generation | Error toast shown and generation blocked | Business User, Legal Reviewer, Admin | High | Not Run |

## Risk Review

| Test Case ID | Module | Scenario | Preconditions | Steps | Expected Result | Role | Priority | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TC-RISK-001 | Risk Review | Low-risk score calculates | Risk questions all low/no | Run risk review | Risk level is Low and score is in low range | Business User | High | Not Run |
| TC-RISK-002 | Risk Review | High-risk PII score calculates | PII selected | Run risk review | Risk level reflects high risk; PII explanation uses required copy | Business User | High | Not Run |
| TC-RISK-003 | Risk Review | Competitor risk explanation appears | Competitor risk selected | Run risk review | Required competitor explanation appears | Business User | High | Not Run |
| TC-RISK-004 | Risk Review | Risk review creates audit entry | NDA exists | Complete risk review | Audit event Risk review completed is created | Business User, Legal Reviewer, Admin | Medium | Not Run |
| TC-RISK-005 | Risk Review | Routing recommendations show | Matching rules exist | Run high-risk review | Matching approval workflow or routing rules display | Business User, Legal Reviewer, Admin | Medium | Not Run |

## Legal Review

| Test Case ID | Module | Scenario | Preconditions | Steps | Expected Result | Role | Priority | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TC-LEGAL-001 | Legal Review | Legal Reviewer section shows actions | In Review NDA exists; Legal Reviewer selected | Open NDA review | Preview document, Edit NDA, Approve, Reject, Send to Sign appear under Legal Reviewer section | Legal Reviewer | High | Not Run |
| TC-LEGAL-002 | Legal Review | Legal Reviewer edits existing NDA | In Review NDA exists | Click Edit NDA | Existing NDA opens with all details prefilled | Legal Reviewer | High | Not Run |
| TC-LEGAL-003 | Legal Review | Approve updates status | In Review NDA exists | Click Approve | Status changes to Approved; audit entry and success toast appear | Legal Reviewer | High | Not Run |
| TC-LEGAL-004 | Legal Review | Reject archives record | In Review NDA exists | Click Reject | Status becomes Archived or rejection is represented through audit/review notes; success toast appears | Legal Reviewer | High | Not Run |
| TC-LEGAL-005 | Legal Review | Business User cannot approve | Business User selected; In Review NDA exists | Attempt Approve | Permission message appears | Business User | High | Not Run |
| TC-LEGAL-006 | Legal Review | Send to Sign disabled until Approved | In Review NDA exists | Inspect Send to Sign | Action is disabled or blocked due to status | Legal Reviewer | High | Not Run |
| TC-LEGAL-007 | Legal Review | Send to Sign changes status | Approved NDA exists | Click Send to Sign | Status changes to Awaiting Signature; token/link created; audit entry appears | Legal Reviewer | High | Not Run |

## E-Signature and Signing Page

| Test Case ID | Module | Scenario | Preconditions | Steps | Expected Result | Role | Priority | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TC-SIGN-001 | E-Signature | Send to Sign works for any valid email | Approved NDA with valid counterparty email | Click Send to Sign | Signing URL is created for the email and status becomes Awaiting Signature | Legal Reviewer, Admin | High | Not Run |
| TC-SIGN-002 | E-Signature | Signing link is accessible | Signing token exists | Open signing URL | Signing page loads correct NDA without internal auth | Counterparty Signer | High | Not Run |
| TC-SIGN-003 | E-Signature | Counterparty can preview before signing | Signing page open | Click preview/view document | Full NDA content displays | Counterparty Signer | High | Not Run |
| TC-SIGN-004 | E-Signature | Counterparty can download before signing | Signing page open | Click download before signing | Download starts or file is available | Counterparty Signer | Medium | Not Run |
| TC-SIGN-005 | E-Signature | Counterparty can sign without preview/download | Signing page open | Complete signature; click Sign and Return | Signing completes and confirmation page opens | Counterparty Signer | High | Not Run |
| TC-SIGN-006 | E-Signature | Signature embeds into final document | Signed NDA created | View signed document | Signature appears in final document content | Counterparty Signer | High | Not Run |
| TC-SIGN-007 | E-Signature | Signed document stored before Signed status | Signing submitted | Inspect repository/local state | Signed PDF and DOCX exist before or with status update to Signed | Counterparty Signer | High | Not Run |
| TC-SIGN-008 | E-Signature | Confirmation shows Download Signed NDA | Signing complete | Inspect confirmation page | Download Signed NDA option is visible | Counterparty Signer | High | Not Run |
| TC-SIGN-009 | E-Signature | Confirmation removes Return to CLM Dashboard | Signing complete | Inspect confirmation page | Return to CLM Dashboard is not visible | Counterparty Signer | High | Not Run |

## Repository and Documents

| Test Case ID | Module | Scenario | Preconditions | Steps | Expected Result | Role | Priority | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TC-REP-001 | Repository | Repository visible to every internal role | Seed data loaded | Open Repository with each internal role | Repository displays records for every role | All internal roles | High | Not Run |
| TC-REP-002 | Repository | Repository shows all documents | Multiple NDA records exist | Compare records shown by role | Same repository records are visible to all internal roles | All internal roles | High | Not Run |
| TC-REP-003 | Repository | Expiry Date displays correctly | NDA with expiry date exists | Open repository | Expiry date matches NDA record End Date | All internal roles | High | Not Run |
| TC-REP-004 | Repository | View opens full final document | Generated NDA exists | Click View | Full final document view opens, not old preview screen | All internal roles | High | Not Run |
| TC-REP-005 | Repository | Signed document downloads from repository | Signed NDA exists | Open signed NDA; download PDF and DOCX | Stored signed files download | All internal roles | High | Not Run |
| TC-REP-006 | Repository | Admin-only delete works | Admin selected | Open row actions; click Delete document | Document is deleted/archived and audit entry created | Admin | High | Not Run |
| TC-REP-007 | Repository | Non-admin delete blocked | Non-admin selected | Attempt Delete document | Permission message appears | Business User, Legal Reviewer, Executive Viewer | High | Not Run |
| TC-REP-008 | Repository | Edit NDA opens prefilled form | Editable NDA exists | Click Edit NDA | Existing NDA details are prefilled | Legal Reviewer, Admin | High | Not Run |
| TC-REP-009 | Repository | Renew NDA opens prefilled form | NDA exists | Click Renew NDA | Existing NDA details are prefilled for renewal | Legal Reviewer, Admin | Medium | Not Run |

## AI Search

| Test Case ID | Module | Scenario | Preconditions | Steps | Expected Result | Role | Priority | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TC-AI-001 | AI Search | Exact expiry answer from selected NDA | Selected NDA has expiry date | Ask "What is the expiry date?" | Exact expiry date is returned | Business User, Legal Reviewer, Admin | High | Not Run |
| TC-AI-002 | AI Search | Exact status answer | NDA exists | Ask status question | Exact NDA status is returned | Business User, Legal Reviewer, Admin | High | Not Run |
| TC-AI-003 | AI Search | Exact counterparty answer | Selected NDA exists | Ask "Who is the counterparty?" | Correct counterparty details are returned | Business User, Legal Reviewer, Admin | High | Not Run |
| TC-AI-004 | AI Search | Risk answer | NDA has risk data | Ask risk question | Risk level and relevant flags are returned | Business User, Legal Reviewer, Admin | High | Not Run |
| TC-AI-005 | AI Search | Missing selected data message | Selected NDA lacks requested field | Ask for unavailable field | Message says "I could not find that information in the selected NDA record" | Business User, Legal Reviewer, Admin | Medium | Not Run |
| TC-AI-006 | AI Search | Repository-wide search when no NDA selected | Multiple NDAs exist | Ask about named counterparty | Correct matching NDA answer is returned | Business User, Legal Reviewer, Admin | High | Not Run |

## Admin Settings, Users, Parties, Rules

| Test Case ID | Module | Scenario | Preconditions | Steps | Expected Result | Role | Priority | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TC-ADM-001 | Settings | Admin can access Settings | Admin selected | Open Settings | Settings page loads | Admin | High | Not Run |
| TC-ADM-002 | Settings | Non-admin cannot access Admin settings | Non-admin selected | Attempt Settings access | Access hidden or blocked | Business User, Legal Reviewer, Executive Viewer | High | Not Run |
| TC-ADM-003 | Users | Admin can add user | Admin selected | Add user with valid fields | User appears in users list | Admin | High | Not Run |
| TC-ADM-004 | Parties | Parties visible only to Admin | Switch roles | Inspect navigation and route access | Parties visible only to Admin | All roles | High | Not Run |
| TC-ADM-005 | Parties | Admin can add and export party | Admin selected | Add party; export table | Party saved and CSV generated | Admin | Medium | Not Run |
| TC-ADM-006 | Rules | Rules visible only to Admin | Switch roles | Inspect navigation and route access | Rules visible only to Admin | All roles | High | Not Run |
| TC-ADM-007 | Rules | Admin can add routing rule | Admin selected | Create rule | Rule saved and appears during matching NDA workflow | Admin | Medium | Not Run |

## Theme, Export, Audit, Responsive

| Test Case ID | Module | Scenario | Preconditions | Steps | Expected Result | Role | Priority | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TC-UX-001 | Theme | Dark and white theme switch works | App loaded | Toggle theme | Theme updates and persists after refresh | All internal roles | Medium | Not Run |
| TC-UX-002 | Theme | Dropdowns readable in both themes | Theme toggle available | Open dropdowns in both themes | Text and background are readable | All internal roles | Medium | Not Run |
| TC-EXP-001 | Export | Repository export generates CSV | Repository visible | Click Export | CSV downloads with visible rows and columns | All internal roles | High | Not Run |
| TC-EXP-002 | Export | Parties export generates CSV | Admin selected; Parties visible | Click Export on Parties | CSV downloads with visible rows and columns | Admin | Medium | Not Run |
| TC-EXP-003 | Export | Rules export generates CSV | Admin selected; Rules visible | Click Export on Rules | CSV downloads with visible rows and columns | Admin | Medium | Not Run |
| TC-AUD-001 | Audit Trail | Lifecycle events create audit entries | Perform draft, submit, approve, send, sign | Open audit trail | Expected audit entries are present with actor and timestamp | Admin, Legal Reviewer | High | Not Run |
| TC-RESP-001 | Responsive | Mobile layout usable | Browser at 390 x 844 | Navigate dashboard, request, repository, signing page | Layout usable without overlap or inaccessible controls | All roles | Medium | Not Run |
| TC-RESP-002 | Responsive | Desktop layout usable | Browser at 1440 x 900 | Navigate primary modules | Layout is stable and readable | All roles | Medium | Not Run |

