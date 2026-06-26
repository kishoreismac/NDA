// @ts-nocheck
// Heuristic contract-data extraction.
// Parses plain text pasted/uploaded by the user and returns a structured
// summary that maps onto the same intake-form shape used by the NDA wizard,
// so the result can be turned into a real CLM record in one click.
//
// This is intentionally regex + keyword based — same "mock AI" pattern used
// elsewhere in the app — so it runs entirely in the browser with no API key.

const RX = {
  effectiveDate:
    /(?:effective(?:\s+as\s+of)?|dated|made\s+on)\s+(?:this\s+)?([A-Za-z]+\s+\d{1,2},?\s+\d{4}|\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/i,
  term:
    /(?:term|effective)\s+(?:of\s+)?(?:this\s+agreement\s+)?(?:shall\s+(?:remain|continue|be)\s+(?:in\s+effect\s+)?for\s+)?([a-z\-]+\s*\(?\d+\)?\s*(?:year|month)s?)/i,
  survival:
    /(?:confidentiality\s+obligations?|survive|survival)[^.]{0,80}?for\s+([a-z\-]+\s*\(?\d+\)?\s*(?:year|month)s?)/i,
  governingLaw:
    /(?:governed\s+by(?:\s+and\s+construed\s+in\s+accordance\s+with)?\s+the\s+laws\s+of\s+|laws\s+of\s+the\s+(?:state\s+of\s+)?)([A-Z][A-Za-z .,]+?)(?:[.,]|without)/,
  jurisdiction:
    /(?:jurisdiction\s+(?:of|in)\s+(?:the\s+)?(?:courts\s+(?:of|located\s+in)\s+)?|venue\s+(?:in|of)\s+)([A-Z][A-Za-z .,]+?)[.,]/,
  parties:
    /between\s+([^,]+?),?\s+(?:located\s+at|with\s+(?:its\s+)?principal\s+place\s+of\s+business\s+at)\s+([^()]+?)\s*\(?["“]?(?:Company|Disclosing\s+Party)/i,
  counterparty:
    /and\s+([^,]+?),?\s+(?:located\s+at|with\s+(?:its\s+)?principal\s+place\s+of\s+business\s+at)\s+([^()]+?)\s*\(?["“]?(?:Counterparty|Receiving\s+Party|Vendor)/i,
  purpose:
    /(?:purpose|in\s+connection\s+with|project\s+known\s+as)[^.]{0,160}?(?:["“]?([^."”]+?)["”]?\s*\(the\s*["“]?Purpose["”]?\)|\.)/i,
  emails: /[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}/g,
};

// Detect NDA "type" from headings / phrasing
function inferType(text) {
  const t = text.toLowerCase();
  if (/mutual\s+non[-\s]?disclosure/.test(t)) return "Mutual";
  if (/vendor\s+non[-\s]?disclosure|supplier/.test(t)) return "Vendor";
  if (/employee\s+non[-\s]?disclosure|employment/.test(t))
    return "Employee NDA";
  if (/one[-\s]?way\s+non[-\s]?disclosure|unilateral/.test(t))
    return "One-Way (Incoming)";
  return "Mutual";
}

function clean(s) {
  return (s || "")
    .replace(/\s+/g, " ")
    .replace(/^[ ,.;:"”“]+|[ ,.;:"”“]+$/g, "")
    .trim();
}

export function extractContractData(rawText) {
  const text = (rawText || "").replace(/\r/g, "");
  const findings = [];
  const out = {
    type: inferType(text),
    companyName: "",
    companyAddress: "",
    counterpartyName: "",
    counterpartyAddress: "",
    counterpartyEmail: "",
    effectiveDate: "",
    term: "",
    survival: "",
    governingLaw: "",
    jurisdiction: "",
    purpose: "",
  };

  const partyM = text.match(RX.parties);
  if (partyM) {
    out.companyName = clean(partyM[1]);
    out.companyAddress = clean(partyM[2]);
    findings.push("Company party detected");
  }
  const cpM = text.match(RX.counterparty);
  if (cpM) {
    out.counterpartyName = clean(cpM[1]);
    out.counterpartyAddress = clean(cpM[2]);
    findings.push("Counterparty detected");
  }
  const dateM = text.match(RX.effectiveDate);
  if (dateM) {
    out.effectiveDate = clean(dateM[1]);
    findings.push("Effective date detected");
  }
  const termM = text.match(RX.term);
  if (termM) {
    out.term = clean(termM[1]);
    findings.push("Term detected");
  }
  const survM = text.match(RX.survival);
  if (survM) {
    out.survival = clean(survM[1]);
    findings.push("Survival period detected");
  }
  const lawM = text.match(RX.governingLaw);
  if (lawM) {
    out.governingLaw = clean(lawM[1]);
    findings.push("Governing law detected");
  }
  const jurM = text.match(RX.jurisdiction);
  if (jurM) {
    out.jurisdiction = clean(jurM[1]);
    findings.push("Jurisdiction detected");
  }
  const purM = text.match(RX.purpose);
  if (purM && purM[1]) {
    out.purpose = clean(purM[1]);
    findings.push("Business purpose detected");
  }
  const emails = text.match(RX.emails) || [];
  if (emails.length) {
    out.counterpartyEmail = emails[0];
    findings.push(`Found ${emails.length} email address(es)`);
  }

  const filled = Object.values(out).filter((v) => v && v.length > 0).length;
  const totalFields = Object.keys(out).length;
  const confidence = Math.round((filled / totalFields) * 100);

  return {
    fields: out,
    findings,
    confidence,
    wordCount: text.split(/\s+/).filter(Boolean).length,
  };
}
