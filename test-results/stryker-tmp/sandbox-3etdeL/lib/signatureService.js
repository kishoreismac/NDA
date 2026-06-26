// @ts-nocheck
// Simulated e-signature service. Manages signature requests and signed
// document attachments in localStorage so the full Approved → Awaiting
// Signature → Signed flow can be demonstrated end-to-end.
function stryNS_9fa48() {
  var g = typeof globalThis === 'object' && globalThis && globalThis.Math === Math && globalThis || new Function("return this")();
  var ns = g.__stryker__ || (g.__stryker__ = {});
  if (ns.activeMutant === undefined && g.process && g.process.env && g.process.env.__STRYKER_ACTIVE_MUTANT__) {
    ns.activeMutant = g.process.env.__STRYKER_ACTIVE_MUTANT__;
  }
  function retrieveNS() {
    return ns;
  }
  stryNS_9fa48 = retrieveNS;
  return retrieveNS();
}
stryNS_9fa48();
function stryCov_9fa48() {
  var ns = stryNS_9fa48();
  var cov = ns.mutantCoverage || (ns.mutantCoverage = {
    static: {},
    perTest: {}
  });
  function cover() {
    var c = cov.static;
    if (ns.currentTestId) {
      c = cov.perTest[ns.currentTestId] = cov.perTest[ns.currentTestId] || {};
    }
    var a = arguments;
    for (var i = 0; i < a.length; i++) {
      c[a[i]] = (c[a[i]] || 0) + 1;
    }
  }
  stryCov_9fa48 = cover;
  cover.apply(null, arguments);
}
function stryMutAct_9fa48(id) {
  var ns = stryNS_9fa48();
  function isActive(id) {
    if (ns.activeMutant === id) {
      if (ns.hitCount !== void 0 && ++ns.hitCount > ns.hitLimit) {
        throw new Error('Stryker: Hit count limit reached (' + ns.hitCount + ')');
      }
      return true;
    }
    return false;
  }
  stryMutAct_9fa48 = isActive;
  return isActive(id);
}
import { logAuditEvent, recordGeneratedDoc } from "./auditTrail";
import { getRequest, setRequestStatus, upsertRequest } from "./requestStore";
import { getTemplateById } from "./templates";
import { buildPlaceholderValues } from "./placeholders";
import { generatePdf } from "./documentGenerator";
const SIG_KEY = stryMutAct_9fa48("2137") ? "" : (stryCov_9fa48("2137"), "clm.signatures.v1");
function read() {
  if (stryMutAct_9fa48("2138")) {
    {}
  } else {
    stryCov_9fa48("2138");
    if (stryMutAct_9fa48("2141") ? typeof window !== "undefined" : stryMutAct_9fa48("2140") ? false : stryMutAct_9fa48("2139") ? true : (stryCov_9fa48("2139", "2140", "2141"), typeof window === (stryMutAct_9fa48("2142") ? "" : (stryCov_9fa48("2142"), "undefined")))) return stryMutAct_9fa48("2143") ? ["Stryker was here"] : (stryCov_9fa48("2143"), []);
    try {
      if (stryMutAct_9fa48("2144")) {
        {}
      } else {
        stryCov_9fa48("2144");
        const raw = window.localStorage.getItem(SIG_KEY);
        return raw ? JSON.parse(raw) : stryMutAct_9fa48("2145") ? ["Stryker was here"] : (stryCov_9fa48("2145"), []);
      }
    } catch {
      if (stryMutAct_9fa48("2146")) {
        {}
      } else {
        stryCov_9fa48("2146");
        return stryMutAct_9fa48("2147") ? ["Stryker was here"] : (stryCov_9fa48("2147"), []);
      }
    }
  }
}
function write(list) {
  if (stryMutAct_9fa48("2148")) {
    {}
  } else {
    stryCov_9fa48("2148");
    if (stryMutAct_9fa48("2151") ? typeof window !== "undefined" : stryMutAct_9fa48("2150") ? false : stryMutAct_9fa48("2149") ? true : (stryCov_9fa48("2149", "2150", "2151"), typeof window === (stryMutAct_9fa48("2152") ? "" : (stryCov_9fa48("2152"), "undefined")))) return;
    try {
      if (stryMutAct_9fa48("2153")) {
        {}
      } else {
        stryCov_9fa48("2153");
        window.localStorage.setItem(SIG_KEY, JSON.stringify(list));
      }
    } catch {}
  }
}
function newToken() {
  if (stryMutAct_9fa48("2154")) {
    {}
  } else {
    stryCov_9fa48("2154");
    return stryMutAct_9fa48("2155") ? "sig-" + Math.random().toString(36).slice(2, 10) - Math.random().toString(36).slice(2, 6) : (stryCov_9fa48("2155"), (stryMutAct_9fa48("2156") ? "" : (stryCov_9fa48("2156"), "sig-")) + (stryMutAct_9fa48("2157") ? Math.random().toString(36) : (stryCov_9fa48("2157"), Math.random().toString(36).slice(2, 10))) + (stryMutAct_9fa48("2158") ? Math.random().toString(36) : (stryCov_9fa48("2158"), Math.random().toString(36).slice(2, 6))));
  }
}
async function serverUpsert(entry) {
  if (stryMutAct_9fa48("2159")) {
    {}
  } else {
    stryCov_9fa48("2159");
    if (stryMutAct_9fa48("2162") ? typeof window !== "undefined" : stryMutAct_9fa48("2161") ? false : stryMutAct_9fa48("2160") ? true : (stryCov_9fa48("2160", "2161", "2162"), typeof window === (stryMutAct_9fa48("2163") ? "" : (stryCov_9fa48("2163"), "undefined")))) return;
    try {
      if (stryMutAct_9fa48("2164")) {
        {}
      } else {
        stryCov_9fa48("2164");
        await fetch(stryMutAct_9fa48("2165") ? "" : (stryCov_9fa48("2165"), "/api/signatures"), stryMutAct_9fa48("2166") ? {} : (stryCov_9fa48("2166"), {
          method: stryMutAct_9fa48("2167") ? "" : (stryCov_9fa48("2167"), "POST"),
          headers: stryMutAct_9fa48("2168") ? {} : (stryCov_9fa48("2168"), {
            "Content-Type": stryMutAct_9fa48("2169") ? "" : (stryCov_9fa48("2169"), "application/json")
          }),
          body: JSON.stringify(stryMutAct_9fa48("2170") ? {} : (stryCov_9fa48("2170"), {
            action: stryMutAct_9fa48("2171") ? "" : (stryCov_9fa48("2171"), "upsert"),
            token: entry.token,
            entry
          }))
        }));
      }
    } catch {}
  }
}
async function serverPatch(token, patch) {
  if (stryMutAct_9fa48("2172")) {
    {}
  } else {
    stryCov_9fa48("2172");
    if (stryMutAct_9fa48("2175") ? typeof window !== "undefined" : stryMutAct_9fa48("2174") ? false : stryMutAct_9fa48("2173") ? true : (stryCov_9fa48("2173", "2174", "2175"), typeof window === (stryMutAct_9fa48("2176") ? "" : (stryCov_9fa48("2176"), "undefined")))) return;
    try {
      if (stryMutAct_9fa48("2177")) {
        {}
      } else {
        stryCov_9fa48("2177");
        await fetch(stryMutAct_9fa48("2178") ? "" : (stryCov_9fa48("2178"), "/api/signatures"), stryMutAct_9fa48("2179") ? {} : (stryCov_9fa48("2179"), {
          method: stryMutAct_9fa48("2180") ? "" : (stryCov_9fa48("2180"), "POST"),
          headers: stryMutAct_9fa48("2181") ? {} : (stryCov_9fa48("2181"), {
            "Content-Type": stryMutAct_9fa48("2182") ? "" : (stryCov_9fa48("2182"), "application/json")
          }),
          body: JSON.stringify(stryMutAct_9fa48("2183") ? {} : (stryCov_9fa48("2183"), {
            action: stryMutAct_9fa48("2184") ? "" : (stryCov_9fa48("2184"), "patch"),
            token,
            patch
          }))
        }));
      }
    } catch {}
  }
}
export async function fetchServerSignature(token) {
  if (stryMutAct_9fa48("2185")) {
    {}
  } else {
    stryCov_9fa48("2185");
    if (stryMutAct_9fa48("2188") ? typeof window !== "undefined" : stryMutAct_9fa48("2187") ? false : stryMutAct_9fa48("2186") ? true : (stryCov_9fa48("2186", "2187", "2188"), typeof window === (stryMutAct_9fa48("2189") ? "" : (stryCov_9fa48("2189"), "undefined")))) return null;
    try {
      if (stryMutAct_9fa48("2190")) {
        {}
      } else {
        stryCov_9fa48("2190");
        const r = await fetch(stryMutAct_9fa48("2191") ? `` : (stryCov_9fa48("2191"), `/api/signatures?token=${encodeURIComponent(token)}`), stryMutAct_9fa48("2192") ? {} : (stryCov_9fa48("2192"), {
          cache: stryMutAct_9fa48("2193") ? "" : (stryCov_9fa48("2193"), "no-store")
        }));
        if (stryMutAct_9fa48("2196") ? false : stryMutAct_9fa48("2195") ? true : stryMutAct_9fa48("2194") ? r.ok : (stryCov_9fa48("2194", "2195", "2196"), !r.ok)) return null;
        const data = await r.json();
        return stryMutAct_9fa48("2199") ? data?.signature && null : stryMutAct_9fa48("2198") ? false : stryMutAct_9fa48("2197") ? true : (stryCov_9fa48("2197", "2198", "2199"), (stryMutAct_9fa48("2200") ? data.signature : (stryCov_9fa48("2200"), data?.signature)) || null);
      }
    } catch {
      if (stryMutAct_9fa48("2201")) {
        {}
      } else {
        stryCov_9fa48("2201");
        return null;
      }
    }
  }
}

/**
 * Returns the canonical signing URL for a token.
 * Prefers NEXT_PUBLIC_APP_URL (publicly reachable origin used in emails),
 * falling back to window.location.origin for local dev.
 */
export function signingUrl(token) {
  if (stryMutAct_9fa48("2202")) {
    {}
  } else {
    stryCov_9fa48("2202");
    const base = stryMutAct_9fa48("2205") ? typeof process !== "undefined" && process.env && process.env.NEXT_PUBLIC_APP_URL && (typeof window !== "undefined" ? window.location.origin : "") : stryMutAct_9fa48("2204") ? false : stryMutAct_9fa48("2203") ? true : (stryCov_9fa48("2203", "2204", "2205"), (stryMutAct_9fa48("2207") ? typeof process !== "undefined" && process.env || process.env.NEXT_PUBLIC_APP_URL : stryMutAct_9fa48("2206") ? false : (stryCov_9fa48("2206", "2207"), (stryMutAct_9fa48("2209") ? typeof process !== "undefined" || process.env : stryMutAct_9fa48("2208") ? true : (stryCov_9fa48("2208", "2209"), (stryMutAct_9fa48("2211") ? typeof process === "undefined" : stryMutAct_9fa48("2210") ? true : (stryCov_9fa48("2210", "2211"), typeof process !== (stryMutAct_9fa48("2212") ? "" : (stryCov_9fa48("2212"), "undefined")))) && process.env)) && process.env.NEXT_PUBLIC_APP_URL)) || ((stryMutAct_9fa48("2215") ? typeof window === "undefined" : stryMutAct_9fa48("2214") ? false : stryMutAct_9fa48("2213") ? true : (stryCov_9fa48("2213", "2214", "2215"), typeof window !== (stryMutAct_9fa48("2216") ? "" : (stryCov_9fa48("2216"), "undefined")))) ? window.location.origin : stryMutAct_9fa48("2217") ? "Stryker was here!" : (stryCov_9fa48("2217"), "")));
    const clean = (stryMutAct_9fa48("2220") ? base && "" : stryMutAct_9fa48("2219") ? false : stryMutAct_9fa48("2218") ? true : (stryCov_9fa48("2218", "2219", "2220"), base || (stryMutAct_9fa48("2221") ? "Stryker was here!" : (stryCov_9fa48("2221"), "")))).replace(stryMutAct_9fa48("2223") ? /\/$/ : stryMutAct_9fa48("2222") ? /\/+/ : (stryCov_9fa48("2222", "2223"), /\/+$/), stryMutAct_9fa48("2224") ? "Stryker was here!" : (stryCov_9fa48("2224"), ""));
    return stryMutAct_9fa48("2225") ? `` : (stryCov_9fa48("2225"), `${clean}/sign/${token}`);
  }
}

/**
 * Initiate an e-signature request for a record.
 * - Validates the record + counterparty email
 * - Creates a signature request (status: "sent")
 * - Flips the NDA status to "Awaiting Signature"
 * - Calls the /api/send-signature-email endpoint to deliver the link by email
 * - Logs an audit entry and returns { token, url, email, emailDelivered }
 */
export async function sendForSignature(recordId, opts = {}) {
  if (stryMutAct_9fa48("2226")) {
    {}
  } else {
    stryCov_9fa48("2226");
    const rec = getRequest(recordId);
    if (stryMutAct_9fa48("2229") ? false : stryMutAct_9fa48("2228") ? true : stryMutAct_9fa48("2227") ? rec : (stryCov_9fa48("2227", "2228", "2229"), !rec)) {
      if (stryMutAct_9fa48("2230")) {
        {}
      } else {
        stryCov_9fa48("2230");
        return stryMutAct_9fa48("2231") ? {} : (stryCov_9fa48("2231"), {
          ok: stryMutAct_9fa48("2232") ? true : (stryCov_9fa48("2232"), false),
          error: stryMutAct_9fa48("2233") ? `` : (stryCov_9fa48("2233"), `Record ${recordId} not found.`)
        });
      }
    }
    const email = stryMutAct_9fa48("2236") ? (opts.email || rec.form?.counterpartyEmail) && "" : stryMutAct_9fa48("2235") ? false : stryMutAct_9fa48("2234") ? true : (stryCov_9fa48("2234", "2235", "2236"), (stryMutAct_9fa48("2238") ? opts.email && rec.form?.counterpartyEmail : stryMutAct_9fa48("2237") ? false : (stryCov_9fa48("2237", "2238"), opts.email || (stryMutAct_9fa48("2239") ? rec.form.counterpartyEmail : (stryCov_9fa48("2239"), rec.form?.counterpartyEmail)))) || (stryMutAct_9fa48("2240") ? "Stryker was here!" : (stryCov_9fa48("2240"), "")));
    if (stryMutAct_9fa48("2243") ? !email && !/^\S+@\S+\.\S+$/.test(email) : stryMutAct_9fa48("2242") ? false : stryMutAct_9fa48("2241") ? true : (stryCov_9fa48("2241", "2242", "2243"), (stryMutAct_9fa48("2244") ? email : (stryCov_9fa48("2244"), !email)) || (stryMutAct_9fa48("2245") ? /^\S+@\S+\.\S+$/.test(email) : (stryCov_9fa48("2245"), !(stryMutAct_9fa48("2253") ? /^\S+@\S+\.\s+$/ : stryMutAct_9fa48("2252") ? /^\S+@\S+\.\S$/ : stryMutAct_9fa48("2251") ? /^\S+@\s+\.\S+$/ : stryMutAct_9fa48("2250") ? /^\S+@\S\.\S+$/ : stryMutAct_9fa48("2249") ? /^\s+@\S+\.\S+$/ : stryMutAct_9fa48("2248") ? /^\S@\S+\.\S+$/ : stryMutAct_9fa48("2247") ? /^\S+@\S+\.\S+/ : stryMutAct_9fa48("2246") ? /\S+@\S+\.\S+$/ : (stryCov_9fa48("2246", "2247", "2248", "2249", "2250", "2251", "2252", "2253"), /^\S+@\S+\.\S+$/)).test(email))))) {
      if (stryMutAct_9fa48("2254")) {
        {}
      } else {
        stryCov_9fa48("2254");
        return stryMutAct_9fa48("2255") ? {} : (stryCov_9fa48("2255"), {
          ok: stryMutAct_9fa48("2256") ? true : (stryCov_9fa48("2256"), false),
          error: stryMutAct_9fa48("2257") ? "" : (stryCov_9fa48("2257"), "Counterparty email is missing or invalid. Add a valid email under Counterparty Details before sending for signature.")
        });
      }
    }

    // Reuse an existing open request if present
    const list = read();
    const existing = list.find(stryMutAct_9fa48("2258") ? () => undefined : (stryCov_9fa48("2258"), s => stryMutAct_9fa48("2261") ? s.recordId === recordId || s.status === "sent" : stryMutAct_9fa48("2260") ? false : stryMutAct_9fa48("2259") ? true : (stryCov_9fa48("2259", "2260", "2261"), (stryMutAct_9fa48("2263") ? s.recordId !== recordId : stryMutAct_9fa48("2262") ? true : (stryCov_9fa48("2262", "2263"), s.recordId === recordId)) && (stryMutAct_9fa48("2265") ? s.status !== "sent" : stryMutAct_9fa48("2264") ? true : (stryCov_9fa48("2264", "2265"), s.status === (stryMutAct_9fa48("2266") ? "" : (stryCov_9fa48("2266"), "sent")))))));
    let token, sentAt, reused, counterpartyName, recordTitle;
    if (stryMutAct_9fa48("2268") ? false : stryMutAct_9fa48("2267") ? true : (stryCov_9fa48("2267", "2268"), existing)) {
      if (stryMutAct_9fa48("2269")) {
        {}
      } else {
        stryCov_9fa48("2269");
        token = existing.token;
        sentAt = existing.sentAt;
        reused = stryMutAct_9fa48("2270") ? false : (stryCov_9fa48("2270"), true);
        counterpartyName = existing.counterpartyName;
        recordTitle = existing.recordTitle;
        // Re-mirror to server in case a previous send failed to persist (heals
        // tokens created before the server store was writable).
        await serverUpsert(stryMutAct_9fa48("2271") ? {} : (stryCov_9fa48("2271"), {
          ...existing,
          recordSnapshot: stryMutAct_9fa48("2272") ? {} : (stryCov_9fa48("2272"), {
            id: rec.id,
            title: rec.title,
            type: rec.type,
            counterparty: stryMutAct_9fa48("2275") ? (rec.counterparty || rec.form?.counterpartyName) && "" : stryMutAct_9fa48("2274") ? false : stryMutAct_9fa48("2273") ? true : (stryCov_9fa48("2273", "2274", "2275"), (stryMutAct_9fa48("2277") ? rec.counterparty && rec.form?.counterpartyName : stryMutAct_9fa48("2276") ? false : (stryCov_9fa48("2276", "2277"), rec.counterparty || (stryMutAct_9fa48("2278") ? rec.form.counterpartyName : (stryCov_9fa48("2278"), rec.form?.counterpartyName)))) || (stryMutAct_9fa48("2279") ? "Stryker was here!" : (stryCov_9fa48("2279"), ""))),
            form: stryMutAct_9fa48("2282") ? rec.form && {} : stryMutAct_9fa48("2281") ? false : stryMutAct_9fa48("2280") ? true : (stryCov_9fa48("2280", "2281", "2282"), rec.form || {}),
            templateId: stryMutAct_9fa48("2285") ? rec.templateId && "" : stryMutAct_9fa48("2284") ? false : stryMutAct_9fa48("2283") ? true : (stryCov_9fa48("2283", "2284", "2285"), rec.templateId || (stryMutAct_9fa48("2286") ? "Stryker was here!" : (stryCov_9fa48("2286"), "")))
          })
        }));
      }
    } else {
      if (stryMutAct_9fa48("2287")) {
        {}
      } else {
        stryCov_9fa48("2287");
        token = newToken();
        sentAt = Date.now();
        reused = stryMutAct_9fa48("2288") ? true : (stryCov_9fa48("2288"), false);
        counterpartyName = stryMutAct_9fa48("2291") ? (rec.form?.counterpartyName || rec.counterparty) && "" : stryMutAct_9fa48("2290") ? false : stryMutAct_9fa48("2289") ? true : (stryCov_9fa48("2289", "2290", "2291"), (stryMutAct_9fa48("2293") ? rec.form?.counterpartyName && rec.counterparty : stryMutAct_9fa48("2292") ? false : (stryCov_9fa48("2292", "2293"), (stryMutAct_9fa48("2294") ? rec.form.counterpartyName : (stryCov_9fa48("2294"), rec.form?.counterpartyName)) || rec.counterparty)) || (stryMutAct_9fa48("2295") ? "Stryker was here!" : (stryCov_9fa48("2295"), "")));
        recordTitle = rec.title;
        const entry = stryMutAct_9fa48("2296") ? {} : (stryCov_9fa48("2296"), {
          token,
          recordId,
          recordTitle,
          counterpartyName,
          counterpartySignerName: stryMutAct_9fa48("2299") ? (rec.form?.counterpartySignerName || rec.form?.counterpartyContact) && "" : stryMutAct_9fa48("2298") ? false : stryMutAct_9fa48("2297") ? true : (stryCov_9fa48("2297", "2298", "2299"), (stryMutAct_9fa48("2301") ? rec.form?.counterpartySignerName && rec.form?.counterpartyContact : stryMutAct_9fa48("2300") ? false : (stryCov_9fa48("2300", "2301"), (stryMutAct_9fa48("2302") ? rec.form.counterpartySignerName : (stryCov_9fa48("2302"), rec.form?.counterpartySignerName)) || (stryMutAct_9fa48("2303") ? rec.form.counterpartyContact : (stryCov_9fa48("2303"), rec.form?.counterpartyContact)))) || (stryMutAct_9fa48("2304") ? "Stryker was here!" : (stryCov_9fa48("2304"), ""))),
          email,
          sentAt,
          status: stryMutAct_9fa48("2305") ? "" : (stryCov_9fa48("2305"), "sent"),
          // sent | viewed | signed | declined
          viewedAt: null,
          signedAt: null,
          signatureName: null,
          signatureTitle: null,
          signedDocId: null
        });
        write(stryMutAct_9fa48("2306") ? [entry, ...list] : (stryCov_9fa48("2306"), (stryMutAct_9fa48("2307") ? [] : (stryCov_9fa48("2307"), [entry, ...list])).slice(0, 200)));
        // Mirror to server so any recipient (any device/browser) can resolve the token.
        await serverUpsert(stryMutAct_9fa48("2308") ? {} : (stryCov_9fa48("2308"), {
          ...entry,
          // Include a minimal record snapshot so /sign/[token] can render without
          // depending on the sender's localStorage.
          recordSnapshot: stryMutAct_9fa48("2309") ? {} : (stryCov_9fa48("2309"), {
            id: rec.id,
            title: rec.title,
            type: rec.type,
            counterparty: stryMutAct_9fa48("2312") ? (rec.counterparty || rec.form?.counterpartyName) && "" : stryMutAct_9fa48("2311") ? false : stryMutAct_9fa48("2310") ? true : (stryCov_9fa48("2310", "2311", "2312"), (stryMutAct_9fa48("2314") ? rec.counterparty && rec.form?.counterpartyName : stryMutAct_9fa48("2313") ? false : (stryCov_9fa48("2313", "2314"), rec.counterparty || (stryMutAct_9fa48("2315") ? rec.form.counterpartyName : (stryCov_9fa48("2315"), rec.form?.counterpartyName)))) || (stryMutAct_9fa48("2316") ? "Stryker was here!" : (stryCov_9fa48("2316"), ""))),
            form: stryMutAct_9fa48("2319") ? rec.form && {} : stryMutAct_9fa48("2318") ? false : stryMutAct_9fa48("2317") ? true : (stryCov_9fa48("2317", "2318", "2319"), rec.form || {}),
            templateId: stryMutAct_9fa48("2322") ? rec.templateId && "" : stryMutAct_9fa48("2321") ? false : stryMutAct_9fa48("2320") ? true : (stryCov_9fa48("2320", "2321", "2322"), rec.templateId || (stryMutAct_9fa48("2323") ? "Stryker was here!" : (stryCov_9fa48("2323"), "")))
          })
        }));
        setRequestStatus(recordId, stryMutAct_9fa48("2324") ? "" : (stryCov_9fa48("2324"), "Awaiting Signature"), stryMutAct_9fa48("2325") ? `` : (stryCov_9fa48("2325"), `Sent to ${email}`));
        logAuditEvent(stryMutAct_9fa48("2326") ? {} : (stryCov_9fa48("2326"), {
          action: stryMutAct_9fa48("2327") ? "" : (stryCov_9fa48("2327"), "Sent for e-signature"),
          target: stryMutAct_9fa48("2328") ? `` : (stryCov_9fa48("2328"), `${rec.title} → ${email}`),
          recordId
        }));
      }
    }
    const url = signingUrl(token);

    // Fire the real email send (server-side via /api/send-signature-email).
    let emailDelivered = stryMutAct_9fa48("2329") ? true : (stryCov_9fa48("2329"), false);
    let emailError = null;
    let emailConfigured = stryMutAct_9fa48("2330") ? false : (stryCov_9fa48("2330"), true);
    let messageId = null;
    try {
      if (stryMutAct_9fa48("2331")) {
        {}
      } else {
        stryCov_9fa48("2331");
        if (stryMutAct_9fa48("2334") ? typeof window === "undefined" : stryMutAct_9fa48("2333") ? false : stryMutAct_9fa48("2332") ? true : (stryCov_9fa48("2332", "2333", "2334"), typeof window !== (stryMutAct_9fa48("2335") ? "" : (stryCov_9fa48("2335"), "undefined")))) {
          if (stryMutAct_9fa48("2336")) {
            {}
          } else {
            stryCov_9fa48("2336");
            const resp = await fetch(stryMutAct_9fa48("2337") ? "" : (stryCov_9fa48("2337"), "/api/send-signature-email"), stryMutAct_9fa48("2338") ? {} : (stryCov_9fa48("2338"), {
              method: stryMutAct_9fa48("2339") ? "" : (stryCov_9fa48("2339"), "POST"),
              headers: stryMutAct_9fa48("2340") ? {} : (stryCov_9fa48("2340"), {
                "Content-Type": stryMutAct_9fa48("2341") ? "" : (stryCov_9fa48("2341"), "application/json")
              }),
              body: JSON.stringify(stryMutAct_9fa48("2342") ? {} : (stryCov_9fa48("2342"), {
                to: email,
                recordId,
                recordTitle,
                counterpartyName,
                url
              }))
            }));
            const data = await resp.json().catch(stryMutAct_9fa48("2343") ? () => undefined : (stryCov_9fa48("2343"), () => ({})));
            if (stryMutAct_9fa48("2346") ? resp.ok || data.ok : stryMutAct_9fa48("2345") ? false : stryMutAct_9fa48("2344") ? true : (stryCov_9fa48("2344", "2345", "2346"), resp.ok && data.ok)) {
              if (stryMutAct_9fa48("2347")) {
                {}
              } else {
                stryCov_9fa48("2347");
                emailDelivered = stryMutAct_9fa48("2348") ? false : (stryCov_9fa48("2348"), true);
                messageId = stryMutAct_9fa48("2351") ? data.messageId && null : stryMutAct_9fa48("2350") ? false : stryMutAct_9fa48("2349") ? true : (stryCov_9fa48("2349", "2350", "2351"), data.messageId || null);
                logAuditEvent(stryMutAct_9fa48("2352") ? {} : (stryCov_9fa48("2352"), {
                  action: stryMutAct_9fa48("2353") ? "" : (stryCov_9fa48("2353"), "Signing email delivered"),
                  target: stryMutAct_9fa48("2354") ? `` : (stryCov_9fa48("2354"), `${email} (msg ${stryMutAct_9fa48("2357") ? messageId && "n/a" : stryMutAct_9fa48("2356") ? false : stryMutAct_9fa48("2355") ? true : (stryCov_9fa48("2355", "2356", "2357"), messageId || (stryMutAct_9fa48("2358") ? "" : (stryCov_9fa48("2358"), "n/a")))})`),
                  recordId
                }));
              }
            } else {
              if (stryMutAct_9fa48("2359")) {
                {}
              } else {
                stryCov_9fa48("2359");
                emailDelivered = stryMutAct_9fa48("2360") ? true : (stryCov_9fa48("2360"), false);
                emailConfigured = stryMutAct_9fa48("2363") ? data.configured === false : stryMutAct_9fa48("2362") ? false : stryMutAct_9fa48("2361") ? true : (stryCov_9fa48("2361", "2362", "2363"), data.configured !== (stryMutAct_9fa48("2364") ? true : (stryCov_9fa48("2364"), false)));
                emailError = stryMutAct_9fa48("2367") ? data.error && `Email delivery failed (HTTP ${resp.status}).` : stryMutAct_9fa48("2366") ? false : stryMutAct_9fa48("2365") ? true : (stryCov_9fa48("2365", "2366", "2367"), data.error || (stryMutAct_9fa48("2368") ? `` : (stryCov_9fa48("2368"), `Email delivery failed (HTTP ${resp.status}).`)));
                logAuditEvent(stryMutAct_9fa48("2369") ? {} : (stryCov_9fa48("2369"), {
                  action: stryMutAct_9fa48("2370") ? "" : (stryCov_9fa48("2370"), "Signing email delivery failed"),
                  target: stryMutAct_9fa48("2371") ? `` : (stryCov_9fa48("2371"), `${email} — ${emailError}`),
                  recordId
                }));
              }
            }
          }
        }
      }
    } catch (e) {
      if (stryMutAct_9fa48("2372")) {
        {}
      } else {
        stryCov_9fa48("2372");
        emailDelivered = stryMutAct_9fa48("2373") ? true : (stryCov_9fa48("2373"), false);
        emailError = stryMutAct_9fa48("2376") ? e?.message && "Network error contacting email service." : stryMutAct_9fa48("2375") ? false : stryMutAct_9fa48("2374") ? true : (stryCov_9fa48("2374", "2375", "2376"), (stryMutAct_9fa48("2377") ? e.message : (stryCov_9fa48("2377"), e?.message)) || (stryMutAct_9fa48("2378") ? "" : (stryCov_9fa48("2378"), "Network error contacting email service.")));
        logAuditEvent(stryMutAct_9fa48("2379") ? {} : (stryCov_9fa48("2379"), {
          action: stryMutAct_9fa48("2380") ? "" : (stryCov_9fa48("2380"), "Signing email delivery failed"),
          target: stryMutAct_9fa48("2381") ? `` : (stryCov_9fa48("2381"), `${email} — ${emailError}`),
          recordId
        }));
      }
    }
    return stryMutAct_9fa48("2382") ? {} : (stryCov_9fa48("2382"), {
      ok: stryMutAct_9fa48("2383") ? false : (stryCov_9fa48("2383"), true),
      reused,
      token,
      url,
      email,
      sentAt,
      recordId,
      recordTitle,
      counterpartyName,
      emailDelivered,
      emailConfigured,
      emailError,
      messageId
    });
  }
}
export function getSignatureRequest(token) {
  if (stryMutAct_9fa48("2384")) {
    {}
  } else {
    stryCov_9fa48("2384");
    return stryMutAct_9fa48("2387") ? read().find(s => s.token === token) && null : stryMutAct_9fa48("2386") ? false : stryMutAct_9fa48("2385") ? true : (stryCov_9fa48("2385", "2386", "2387"), read().find(stryMutAct_9fa48("2388") ? () => undefined : (stryCov_9fa48("2388"), s => stryMutAct_9fa48("2391") ? s.token !== token : stryMutAct_9fa48("2390") ? false : stryMutAct_9fa48("2389") ? true : (stryCov_9fa48("2389", "2390", "2391"), s.token === token))) || null);
  }
}

/**
 * Resolve a signature request locally first, then fall back to the server
 * store. When we hydrate from the server, we also seed localStorage so the
 * rest of the flow (markViewed, completeSignature) works on this device.
 */
export async function getSignatureRequestAsync(token) {
  if (stryMutAct_9fa48("2392")) {
    {}
  } else {
    stryCov_9fa48("2392");
    const local = getSignatureRequest(token);
    if (stryMutAct_9fa48("2394") ? false : stryMutAct_9fa48("2393") ? true : (stryCov_9fa48("2393", "2394"), local)) return local;
    const remote = await fetchServerSignature(token);
    if (stryMutAct_9fa48("2397") ? false : stryMutAct_9fa48("2396") ? true : stryMutAct_9fa48("2395") ? remote : (stryCov_9fa48("2395", "2396", "2397"), !remote)) return null;
    const list = read();
    if (stryMutAct_9fa48("2400") ? false : stryMutAct_9fa48("2399") ? true : stryMutAct_9fa48("2398") ? list.find(s => s.token === token) : (stryCov_9fa48("2398", "2399", "2400"), !list.find(stryMutAct_9fa48("2401") ? () => undefined : (stryCov_9fa48("2401"), s => stryMutAct_9fa48("2404") ? s.token !== token : stryMutAct_9fa48("2403") ? false : stryMutAct_9fa48("2402") ? true : (stryCov_9fa48("2402", "2403", "2404"), s.token === token))))) {
      if (stryMutAct_9fa48("2405")) {
        {}
      } else {
        stryCov_9fa48("2405");
        write(stryMutAct_9fa48("2406") ? [remote, ...list] : (stryCov_9fa48("2406"), (stryMutAct_9fa48("2407") ? [] : (stryCov_9fa48("2407"), [remote, ...list])).slice(0, 200)));
      }
    }
    return remote;
  }
}
export function getSignaturesForRecord(recordId) {
  if (stryMutAct_9fa48("2408")) {
    {}
  } else {
    stryCov_9fa48("2408");
    return stryMutAct_9fa48("2410") ? read().sort((a, b) => b.sentAt - a.sentAt) : stryMutAct_9fa48("2409") ? read().filter(s => s.recordId === recordId) : (stryCov_9fa48("2409", "2410"), read().filter(stryMutAct_9fa48("2411") ? () => undefined : (stryCov_9fa48("2411"), s => stryMutAct_9fa48("2414") ? s.recordId !== recordId : stryMutAct_9fa48("2413") ? false : stryMutAct_9fa48("2412") ? true : (stryCov_9fa48("2412", "2413", "2414"), s.recordId === recordId))).sort(stryMutAct_9fa48("2415") ? () => undefined : (stryCov_9fa48("2415"), (a, b) => stryMutAct_9fa48("2416") ? b.sentAt + a.sentAt : (stryCov_9fa48("2416"), b.sentAt - a.sentAt))));
  }
}
export function markViewed(token) {
  if (stryMutAct_9fa48("2417")) {
    {}
  } else {
    stryCov_9fa48("2417");
    const list = read();
    const idx = list.findIndex(stryMutAct_9fa48("2418") ? () => undefined : (stryCov_9fa48("2418"), s => stryMutAct_9fa48("2421") ? s.token !== token : stryMutAct_9fa48("2420") ? false : stryMutAct_9fa48("2419") ? true : (stryCov_9fa48("2419", "2420", "2421"), s.token === token)));
    if (stryMutAct_9fa48("2425") ? idx >= 0 : stryMutAct_9fa48("2424") ? idx <= 0 : stryMutAct_9fa48("2423") ? false : stryMutAct_9fa48("2422") ? true : (stryCov_9fa48("2422", "2423", "2424", "2425"), idx < 0)) return null;
    if (stryMutAct_9fa48("2428") ? false : stryMutAct_9fa48("2427") ? true : stryMutAct_9fa48("2426") ? list[idx].viewedAt : (stryCov_9fa48("2426", "2427", "2428"), !list[idx].viewedAt)) {
      if (stryMutAct_9fa48("2429")) {
        {}
      } else {
        stryCov_9fa48("2429");
        list[idx].viewedAt = Date.now();
        write(list);
        serverPatch(token, stryMutAct_9fa48("2430") ? {} : (stryCov_9fa48("2430"), {
          viewedAt: list[idx].viewedAt
        }));
        logAuditEvent(stryMutAct_9fa48("2431") ? {} : (stryCov_9fa48("2431"), {
          action: stryMutAct_9fa48("2432") ? "" : (stryCov_9fa48("2432"), "Signing link opened by counterparty"),
          target: list[idx].email,
          recordId: list[idx].recordId
        }));
      }
    }
    return list[idx];
  }
}

/**
 * Counterparty completes the e-signature.
 * - Stamps signature info on the signature request
 * - Records a "signed" document in the docs store and attaches its id
 * - Updates the NDA record with signedAt + signedBy
 * - Flips status to "Signed" (overall NDA process complete)
 */
export async function completeSignature(token, {
  signatureName,
  signatureTitle,
  signatureImage,
  signatureMethod
}) {
  if (stryMutAct_9fa48("2433")) {
    {}
  } else {
    stryCov_9fa48("2433");
    const list = read();
    const idx = list.findIndex(stryMutAct_9fa48("2434") ? () => undefined : (stryCov_9fa48("2434"), s => stryMutAct_9fa48("2437") ? s.token !== token : stryMutAct_9fa48("2436") ? false : stryMutAct_9fa48("2435") ? true : (stryCov_9fa48("2435", "2436", "2437"), s.token === token)));
    if (stryMutAct_9fa48("2441") ? idx >= 0 : stryMutAct_9fa48("2440") ? idx <= 0 : stryMutAct_9fa48("2439") ? false : stryMutAct_9fa48("2438") ? true : (stryCov_9fa48("2438", "2439", "2440", "2441"), idx < 0)) return stryMutAct_9fa48("2442") ? {} : (stryCov_9fa48("2442"), {
      ok: stryMutAct_9fa48("2443") ? true : (stryCov_9fa48("2443"), false),
      error: stryMutAct_9fa48("2444") ? "" : (stryCov_9fa48("2444"), "Signature request not found.")
    });
    const sig = list[idx];
    if (stryMutAct_9fa48("2447") ? sig.status !== "signed" : stryMutAct_9fa48("2446") ? false : stryMutAct_9fa48("2445") ? true : (stryCov_9fa48("2445", "2446", "2447"), sig.status === (stryMutAct_9fa48("2448") ? "" : (stryCov_9fa48("2448"), "signed")))) {
      if (stryMutAct_9fa48("2449")) {
        {}
      } else {
        stryCov_9fa48("2449");
        return stryMutAct_9fa48("2450") ? {} : (stryCov_9fa48("2450"), {
          ok: stryMutAct_9fa48("2451") ? true : (stryCov_9fa48("2451"), false),
          error: stryMutAct_9fa48("2452") ? "" : (stryCov_9fa48("2452"), "This document has already been signed.")
        });
      }
    }

    // Sender's record (may be missing on the recipient's device — that's OK,
    // we use the snapshot embedded in the signature row in that case).
    const rec = stryMutAct_9fa48("2455") ? getRequest(sig.recordId) && null : stryMutAct_9fa48("2454") ? false : stryMutAct_9fa48("2453") ? true : (stryCov_9fa48("2453", "2454", "2455"), getRequest(sig.recordId) || null);
    const signedDocId = (stryMutAct_9fa48("2456") ? "" : (stryCov_9fa48("2456"), "DOC-SIGNED-")) + (stryMutAct_9fa48("2458") ? Math.random().toString(36).toUpperCase() : stryMutAct_9fa48("2457") ? Math.random().toString(36).slice(2, 8).toLowerCase() : (stryCov_9fa48("2457", "2458"), Math.random().toString(36).slice(2, 8).toUpperCase()));
    const signedAt = Date.now();

    // Only persist sender-side artefacts when we actually have the record.
    if (stryMutAct_9fa48("2460") ? false : stryMutAct_9fa48("2459") ? true : (stryCov_9fa48("2459", "2460"), rec)) {
      if (stryMutAct_9fa48("2461")) {
        {}
      } else {
        stryCov_9fa48("2461");
        recordGeneratedDoc(stryMutAct_9fa48("2462") ? {} : (stryCov_9fa48("2462"), {
          id: signedDocId,
          recordId: sig.recordId,
          recordTitle: sig.recordTitle,
          templateId: stryMutAct_9fa48("2465") ? rec.templateId && "" : stryMutAct_9fa48("2464") ? false : stryMutAct_9fa48("2463") ? true : (stryCov_9fa48("2463", "2464", "2465"), rec.templateId || (stryMutAct_9fa48("2466") ? "Stryker was here!" : (stryCov_9fa48("2466"), ""))),
          templateName: stryMutAct_9fa48("2467") ? "" : (stryCov_9fa48("2467"), "Counter-signed NDA"),
          templateVersion: stryMutAct_9fa48("2468") ? "" : (stryCov_9fa48("2468"), "Signed"),
          generatedAt: signedAt,
          generatedBy: signatureName,
          counterparty: sig.counterpartyName,
          placeholders: 0,
          placeholdersFilled: 0,
          signed: stryMutAct_9fa48("2469") ? false : (stryCov_9fa48("2469"), true),
          signedBy: signatureName,
          signerTitle: signatureTitle,
          signerEmail: sig.email,
          signatureImage: stryMutAct_9fa48("2472") ? signatureImage && null : stryMutAct_9fa48("2471") ? false : stryMutAct_9fa48("2470") ? true : (stryCov_9fa48("2470", "2471", "2472"), signatureImage || null),
          signatureMethod: stryMutAct_9fa48("2475") ? signatureMethod && "typed" : stryMutAct_9fa48("2474") ? false : stryMutAct_9fa48("2473") ? true : (stryCov_9fa48("2473", "2474", "2475"), signatureMethod || (stryMutAct_9fa48("2476") ? "" : (stryCov_9fa48("2476"), "typed")))
        }));
      }
    }

    // Update the signature request (small payload — image only, no PDF)
    list[idx] = stryMutAct_9fa48("2477") ? {} : (stryCov_9fa48("2477"), {
      ...sig,
      status: stryMutAct_9fa48("2478") ? "" : (stryCov_9fa48("2478"), "signed"),
      signedAt,
      signatureName,
      signatureTitle,
      signatureImage: stryMutAct_9fa48("2481") ? signatureImage && null : stryMutAct_9fa48("2480") ? false : stryMutAct_9fa48("2479") ? true : (stryCov_9fa48("2479", "2480", "2481"), signatureImage || null),
      signatureMethod: stryMutAct_9fa48("2484") ? signatureMethod && "typed" : stryMutAct_9fa48("2483") ? false : stryMutAct_9fa48("2482") ? true : (stryCov_9fa48("2482", "2483", "2484"), signatureMethod || (stryMutAct_9fa48("2485") ? "" : (stryCov_9fa48("2485"), "typed"))),
      signedDocId
    });
    write(list);
    await serverPatch(token, stryMutAct_9fa48("2486") ? {} : (stryCov_9fa48("2486"), {
      status: stryMutAct_9fa48("2487") ? "" : (stryCov_9fa48("2487"), "signed"),
      signedAt,
      signatureName,
      signatureTitle,
      signatureImage: stryMutAct_9fa48("2490") ? signatureImage && null : stryMutAct_9fa48("2489") ? false : stryMutAct_9fa48("2488") ? true : (stryCov_9fa48("2488", "2489", "2490"), signatureImage || null),
      signatureMethod: stryMutAct_9fa48("2493") ? signatureMethod && "typed" : stryMutAct_9fa48("2492") ? false : stryMutAct_9fa48("2491") ? true : (stryCov_9fa48("2491", "2492", "2493"), signatureMethod || (stryMutAct_9fa48("2494") ? "" : (stryCov_9fa48("2494"), "typed"))),
      signedDocId
    }));

    // Attach signed metadata to the NDA record itself + flip status to Signed.
    if (stryMutAct_9fa48("2496") ? false : stryMutAct_9fa48("2495") ? true : (stryCov_9fa48("2495", "2496"), rec)) {
      if (stryMutAct_9fa48("2497")) {
        {}
      } else {
        stryCov_9fa48("2497");
        upsertRequest(stryMutAct_9fa48("2498") ? {} : (stryCov_9fa48("2498"), {
          ...rec,
          signedAt,
          signedBy: signatureName,
          signerTitle: signatureTitle,
          signedDocId,
          signerEmail: sig.email,
          signatureImage: stryMutAct_9fa48("2501") ? signatureImage && null : stryMutAct_9fa48("2500") ? false : stryMutAct_9fa48("2499") ? true : (stryCov_9fa48("2499", "2500", "2501"), signatureImage || null)
        }));
        setRequestStatus(sig.recordId, stryMutAct_9fa48("2502") ? "" : (stryCov_9fa48("2502"), "Signed"), stryMutAct_9fa48("2503") ? `` : (stryCov_9fa48("2503"), `Counter-signed by ${signatureName}`));
      }
    }
    logAuditEvent(stryMutAct_9fa48("2504") ? {} : (stryCov_9fa48("2504"), {
      actor: signatureName,
      action: stryMutAct_9fa48("2505") ? `` : (stryCov_9fa48("2505"), `NDA counter-signed (${stryMutAct_9fa48("2508") ? signatureMethod && "typed" : stryMutAct_9fa48("2507") ? false : stryMutAct_9fa48("2506") ? true : (stryCov_9fa48("2506", "2507", "2508"), signatureMethod || (stryMutAct_9fa48("2509") ? "" : (stryCov_9fa48("2509"), "typed")))})`),
      target: stryMutAct_9fa48("2510") ? `` : (stryCov_9fa48("2510"), `${sig.recordTitle} (${sig.email})`),
      recordId: sig.recordId
    }));
    return stryMutAct_9fa48("2511") ? {} : (stryCov_9fa48("2511"), {
      ok: stryMutAct_9fa48("2512") ? false : (stryCov_9fa48("2512"), true),
      signedDocId,
      signedAt
    });
  }
}

/**
 * Build the signed-NDA PDF for a record on demand. Uses the stored
 * template + intake form + the counterparty's captured signature image so
 * the resulting file always has placeholders filled and the signature
 * stamped at the counterparty signature block.
 *
 * Returns { ok, blob, filename } on success.
 */
export async function buildSignedPdfBlob(recordId) {
  if (stryMutAct_9fa48("2513")) {
    {}
  } else {
    stryCov_9fa48("2513");
    const rec = getRequest(recordId);
    if (stryMutAct_9fa48("2516") ? false : stryMutAct_9fa48("2515") ? true : stryMutAct_9fa48("2514") ? rec : (stryCov_9fa48("2514", "2515", "2516"), !rec)) return stryMutAct_9fa48("2517") ? {} : (stryCov_9fa48("2517"), {
      ok: stryMutAct_9fa48("2518") ? true : (stryCov_9fa48("2518"), false),
      error: stryMutAct_9fa48("2519") ? "" : (stryCov_9fa48("2519"), "Record not found.")
    });
    if (stryMutAct_9fa48("2522") ? !rec.signedAt && !rec.signedBy : stryMutAct_9fa48("2521") ? false : stryMutAct_9fa48("2520") ? true : (stryCov_9fa48("2520", "2521", "2522"), (stryMutAct_9fa48("2523") ? rec.signedAt : (stryCov_9fa48("2523"), !rec.signedAt)) || (stryMutAct_9fa48("2524") ? rec.signedBy : (stryCov_9fa48("2524"), !rec.signedBy)))) {
      if (stryMutAct_9fa48("2525")) {
        {}
      } else {
        stryCov_9fa48("2525");
        return stryMutAct_9fa48("2526") ? {} : (stryCov_9fa48("2526"), {
          ok: stryMutAct_9fa48("2527") ? true : (stryCov_9fa48("2527"), false),
          error: stryMutAct_9fa48("2528") ? "" : (stryCov_9fa48("2528"), "This NDA has not been counter-signed yet.")
        });
      }
    }
    const template = getTemplateById(rec.templateId);
    if (stryMutAct_9fa48("2531") ? false : stryMutAct_9fa48("2530") ? true : stryMutAct_9fa48("2529") ? template : (stryCov_9fa48("2529", "2530", "2531"), !template)) return stryMutAct_9fa48("2532") ? {} : (stryCov_9fa48("2532"), {
      ok: stryMutAct_9fa48("2533") ? true : (stryCov_9fa48("2533"), false),
      error: stryMutAct_9fa48("2534") ? "" : (stryCov_9fa48("2534"), "Template not found.")
    });
    const form = stryMutAct_9fa48("2535") ? {} : (stryCov_9fa48("2535"), {
      ...(stryMutAct_9fa48("2538") ? rec.form && {} : stryMutAct_9fa48("2537") ? false : stryMutAct_9fa48("2536") ? true : (stryCov_9fa48("2536", "2537", "2538"), rec.form || {})),
      counterpartyName: stryMutAct_9fa48("2541") ? (rec.form?.counterpartyName || rec.counterparty) && "" : stryMutAct_9fa48("2540") ? false : stryMutAct_9fa48("2539") ? true : (stryCov_9fa48("2539", "2540", "2541"), (stryMutAct_9fa48("2543") ? rec.form?.counterpartyName && rec.counterparty : stryMutAct_9fa48("2542") ? false : (stryCov_9fa48("2542", "2543"), (stryMutAct_9fa48("2544") ? rec.form.counterpartyName : (stryCov_9fa48("2544"), rec.form?.counterpartyName)) || rec.counterparty)) || (stryMutAct_9fa48("2545") ? "Stryker was here!" : (stryCov_9fa48("2545"), ""))),
      recordTitle: stryMutAct_9fa48("2548") ? rec.form?.recordTitle && rec.title : stryMutAct_9fa48("2547") ? false : stryMutAct_9fa48("2546") ? true : (stryCov_9fa48("2546", "2547", "2548"), (stryMutAct_9fa48("2549") ? rec.form.recordTitle : (stryCov_9fa48("2549"), rec.form?.recordTitle)) || rec.title),
      counterpartySignerName: stryMutAct_9fa48("2552") ? (rec.signedBy || rec.form?.counterpartySignerName) && "" : stryMutAct_9fa48("2551") ? false : stryMutAct_9fa48("2550") ? true : (stryCov_9fa48("2550", "2551", "2552"), (stryMutAct_9fa48("2554") ? rec.signedBy && rec.form?.counterpartySignerName : stryMutAct_9fa48("2553") ? false : (stryCov_9fa48("2553", "2554"), rec.signedBy || (stryMutAct_9fa48("2555") ? rec.form.counterpartySignerName : (stryCov_9fa48("2555"), rec.form?.counterpartySignerName)))) || (stryMutAct_9fa48("2556") ? "Stryker was here!" : (stryCov_9fa48("2556"), ""))),
      counterpartySignerTitle: stryMutAct_9fa48("2559") ? (rec.signerTitle || rec.form?.counterpartySignerTitle) && "Authorized Signatory" : stryMutAct_9fa48("2558") ? false : stryMutAct_9fa48("2557") ? true : (stryCov_9fa48("2557", "2558", "2559"), (stryMutAct_9fa48("2561") ? rec.signerTitle && rec.form?.counterpartySignerTitle : stryMutAct_9fa48("2560") ? false : (stryCov_9fa48("2560", "2561"), rec.signerTitle || (stryMutAct_9fa48("2562") ? rec.form.counterpartySignerTitle : (stryCov_9fa48("2562"), rec.form?.counterpartySignerTitle)))) || (stryMutAct_9fa48("2563") ? "" : (stryCov_9fa48("2563"), "Authorized Signatory")))
    });
    const values = buildPlaceholderValues(form);
    const blob = await generatePdf(stryMutAct_9fa48("2564") ? {} : (stryCov_9fa48("2564"), {
      template,
      values,
      meta: stryMutAct_9fa48("2565") ? {} : (stryCov_9fa48("2565"), {
        documentId: stryMutAct_9fa48("2568") ? rec.signedDocId && "SIGNED" : stryMutAct_9fa48("2567") ? false : stryMutAct_9fa48("2566") ? true : (stryCov_9fa48("2566", "2567", "2568"), rec.signedDocId || (stryMutAct_9fa48("2569") ? "" : (stryCov_9fa48("2569"), "SIGNED"))),
        recordId,
        recordTitle: rec.title,
        signatureImage: rec.signatureImage,
        signedBy: rec.signedBy,
        signerTitle: rec.signerTitle,
        signedAt: rec.signedAt
      })
    }));
    const safe = (stryMutAct_9fa48("2572") ? rec.title && recordId : stryMutAct_9fa48("2571") ? false : stryMutAct_9fa48("2570") ? true : (stryCov_9fa48("2570", "2571", "2572"), rec.title || recordId)).replace(stryMutAct_9fa48("2574") ? /[A-Za-z0-9]+/g : stryMutAct_9fa48("2573") ? /[^A-Za-z0-9]/g : (stryCov_9fa48("2573", "2574"), /[^A-Za-z0-9]+/g), stryMutAct_9fa48("2575") ? "" : (stryCov_9fa48("2575"), "_"));
    return stryMutAct_9fa48("2576") ? {} : (stryCov_9fa48("2576"), {
      ok: stryMutAct_9fa48("2577") ? false : (stryCov_9fa48("2577"), true),
      blob,
      filename: stryMutAct_9fa48("2578") ? `` : (stryCov_9fa48("2578"), `${safe}_SIGNED.pdf`)
    });
  }
}
export async function declineSignature(token, reason = stryMutAct_9fa48("2579") ? "Stryker was here!" : (stryCov_9fa48("2579"), "")) {
  if (stryMutAct_9fa48("2580")) {
    {}
  } else {
    stryCov_9fa48("2580");
    const list = read();
    const idx = list.findIndex(stryMutAct_9fa48("2581") ? () => undefined : (stryCov_9fa48("2581"), s => stryMutAct_9fa48("2584") ? s.token !== token : stryMutAct_9fa48("2583") ? false : stryMutAct_9fa48("2582") ? true : (stryCov_9fa48("2582", "2583", "2584"), s.token === token)));
    if (stryMutAct_9fa48("2588") ? idx >= 0 : stryMutAct_9fa48("2587") ? idx <= 0 : stryMutAct_9fa48("2586") ? false : stryMutAct_9fa48("2585") ? true : (stryCov_9fa48("2585", "2586", "2587", "2588"), idx < 0)) return stryMutAct_9fa48("2589") ? {} : (stryCov_9fa48("2589"), {
      ok: stryMutAct_9fa48("2590") ? true : (stryCov_9fa48("2590"), false),
      error: stryMutAct_9fa48("2591") ? "" : (stryCov_9fa48("2591"), "Signature request not found.")
    });
    list[idx] = stryMutAct_9fa48("2592") ? {} : (stryCov_9fa48("2592"), {
      ...list[idx],
      status: stryMutAct_9fa48("2593") ? "" : (stryCov_9fa48("2593"), "declined"),
      declinedAt: Date.now(),
      declineReason: reason
    });
    write(list);
    await serverPatch(token, stryMutAct_9fa48("2594") ? {} : (stryCov_9fa48("2594"), {
      status: stryMutAct_9fa48("2595") ? "" : (stryCov_9fa48("2595"), "declined"),
      declinedAt: list[idx].declinedAt,
      declineReason: reason
    }));
    setRequestStatus(list[idx].recordId, stryMutAct_9fa48("2596") ? "" : (stryCov_9fa48("2596"), "In Review"), stryMutAct_9fa48("2597") ? `` : (stryCov_9fa48("2597"), `Signature declined: ${stryMutAct_9fa48("2600") ? reason && "no reason" : stryMutAct_9fa48("2599") ? false : stryMutAct_9fa48("2598") ? true : (stryCov_9fa48("2598", "2599", "2600"), reason || (stryMutAct_9fa48("2601") ? "" : (stryCov_9fa48("2601"), "no reason")))}`));
    logAuditEvent(stryMutAct_9fa48("2602") ? {} : (stryCov_9fa48("2602"), {
      action: stryMutAct_9fa48("2603") ? "" : (stryCov_9fa48("2603"), "Signature declined by counterparty"),
      target: stryMutAct_9fa48("2604") ? list[idx].email - (reason ? ` — ${reason}` : "") : (stryCov_9fa48("2604"), list[idx].email + (reason ? stryMutAct_9fa48("2605") ? `` : (stryCov_9fa48("2605"), ` — ${reason}`) : stryMutAct_9fa48("2606") ? "Stryker was here!" : (stryCov_9fa48("2606"), ""))),
      recordId: list[idx].recordId
    }));
    return stryMutAct_9fa48("2607") ? {} : (stryCov_9fa48("2607"), {
      ok: stryMutAct_9fa48("2608") ? false : (stryCov_9fa48("2608"), true)
    });
  }
}

/**
 * Reconcile sender-side local state with the server signature store.
 * Called on the sender's device (app layout / repository) to pick up
 * signature completions made on the recipient's device — flips local
 * record status to "Signed" / "In Review" (decline) accordingly.
 *
 * Returns the number of records updated so callers can refresh UI / toast.
 */
export async function syncSignatureStatuses() {
  if (stryMutAct_9fa48("2609")) {
    {}
  } else {
    stryCov_9fa48("2609");
    if (stryMutAct_9fa48("2612") ? typeof window !== "undefined" : stryMutAct_9fa48("2611") ? false : stryMutAct_9fa48("2610") ? true : (stryCov_9fa48("2610", "2611", "2612"), typeof window === (stryMutAct_9fa48("2613") ? "" : (stryCov_9fa48("2613"), "undefined")))) return 0;
    let signatures = stryMutAct_9fa48("2614") ? ["Stryker was here"] : (stryCov_9fa48("2614"), []);
    try {
      if (stryMutAct_9fa48("2615")) {
        {}
      } else {
        stryCov_9fa48("2615");
        const r = await fetch(stryMutAct_9fa48("2616") ? "" : (stryCov_9fa48("2616"), "/api/signatures"), stryMutAct_9fa48("2617") ? {} : (stryCov_9fa48("2617"), {
          cache: stryMutAct_9fa48("2618") ? "" : (stryCov_9fa48("2618"), "no-store")
        }));
        if (stryMutAct_9fa48("2621") ? false : stryMutAct_9fa48("2620") ? true : stryMutAct_9fa48("2619") ? r.ok : (stryCov_9fa48("2619", "2620", "2621"), !r.ok)) return 0;
        const data = await r.json();
        signatures = Array.isArray(stryMutAct_9fa48("2622") ? data.signatures : (stryCov_9fa48("2622"), data?.signatures)) ? data.signatures : stryMutAct_9fa48("2623") ? ["Stryker was here"] : (stryCov_9fa48("2623"), []);
      }
    } catch {
      if (stryMutAct_9fa48("2624")) {
        {}
      } else {
        stryCov_9fa48("2624");
        return 0;
      }
    }
    const local = read();
    const byToken = new Map(local.map(stryMutAct_9fa48("2625") ? () => undefined : (stryCov_9fa48("2625"), s => stryMutAct_9fa48("2626") ? [] : (stryCov_9fa48("2626"), [s.token, s]))));
    let changed = 0;
    for (const remote of signatures) {
      if (stryMutAct_9fa48("2627")) {
        {}
      } else {
        stryCov_9fa48("2627");
        if (stryMutAct_9fa48("2630") ? (!remote || !remote.token) && !remote.recordId : stryMutAct_9fa48("2629") ? false : stryMutAct_9fa48("2628") ? true : (stryCov_9fa48("2628", "2629", "2630"), (stryMutAct_9fa48("2632") ? !remote && !remote.token : stryMutAct_9fa48("2631") ? false : (stryCov_9fa48("2631", "2632"), (stryMutAct_9fa48("2633") ? remote : (stryCov_9fa48("2633"), !remote)) || (stryMutAct_9fa48("2634") ? remote.token : (stryCov_9fa48("2634"), !remote.token)))) || (stryMutAct_9fa48("2635") ? remote.recordId : (stryCov_9fa48("2635"), !remote.recordId)))) continue;
        const existing = byToken.get(remote.token);

        // Only care about senders — the recipient device may not have the NDA
        // record at all; getRequest() returning null is the signal we're not
        // the sender for this signature and should skip status reconciliation.
        const rec = getRequest(remote.recordId);

        // Merge the remote row into local cache so audit / UI sees the latest
        // signedAt/signatureName fields even on the sender side.
        if (stryMutAct_9fa48("2638") ? (!existing || existing.status !== remote.status) && existing.signedAt !== remote.signedAt : stryMutAct_9fa48("2637") ? false : stryMutAct_9fa48("2636") ? true : (stryCov_9fa48("2636", "2637", "2638"), (stryMutAct_9fa48("2640") ? !existing && existing.status !== remote.status : stryMutAct_9fa48("2639") ? false : (stryCov_9fa48("2639", "2640"), (stryMutAct_9fa48("2641") ? existing : (stryCov_9fa48("2641"), !existing)) || (stryMutAct_9fa48("2643") ? existing.status === remote.status : stryMutAct_9fa48("2642") ? false : (stryCov_9fa48("2642", "2643"), existing.status !== remote.status)))) || (stryMutAct_9fa48("2645") ? existing.signedAt === remote.signedAt : stryMutAct_9fa48("2644") ? false : (stryCov_9fa48("2644", "2645"), existing.signedAt !== remote.signedAt)))) {
          if (stryMutAct_9fa48("2646")) {
            {}
          } else {
            stryCov_9fa48("2646");
            const idx = local.findIndex(stryMutAct_9fa48("2647") ? () => undefined : (stryCov_9fa48("2647"), s => stryMutAct_9fa48("2650") ? s.token !== remote.token : stryMutAct_9fa48("2649") ? false : stryMutAct_9fa48("2648") ? true : (stryCov_9fa48("2648", "2649", "2650"), s.token === remote.token)));
            if (stryMutAct_9fa48("2654") ? idx < 0 : stryMutAct_9fa48("2653") ? idx > 0 : stryMutAct_9fa48("2652") ? false : stryMutAct_9fa48("2651") ? true : (stryCov_9fa48("2651", "2652", "2653", "2654"), idx >= 0)) local[idx] = stryMutAct_9fa48("2655") ? {} : (stryCov_9fa48("2655"), {
              ...local[idx],
              ...remote
            });else local.unshift(remote);
            stryMutAct_9fa48("2656") ? changed-- : (stryCov_9fa48("2656"), changed++);
          }
        }
        if (stryMutAct_9fa48("2659") ? false : stryMutAct_9fa48("2658") ? true : stryMutAct_9fa48("2657") ? rec : (stryCov_9fa48("2657", "2658", "2659"), !rec)) continue;
        if (stryMutAct_9fa48("2662") ? remote.status === "signed" || rec.status !== "Signed" : stryMutAct_9fa48("2661") ? false : stryMutAct_9fa48("2660") ? true : (stryCov_9fa48("2660", "2661", "2662"), (stryMutAct_9fa48("2664") ? remote.status !== "signed" : stryMutAct_9fa48("2663") ? true : (stryCov_9fa48("2663", "2664"), remote.status === (stryMutAct_9fa48("2665") ? "" : (stryCov_9fa48("2665"), "signed")))) && (stryMutAct_9fa48("2667") ? rec.status === "Signed" : stryMutAct_9fa48("2666") ? true : (stryCov_9fa48("2666", "2667"), rec.status !== (stryMutAct_9fa48("2668") ? "" : (stryCov_9fa48("2668"), "Signed")))))) {
          if (stryMutAct_9fa48("2669")) {
            {}
          } else {
            stryCov_9fa48("2669");
            upsertRequest(stryMutAct_9fa48("2670") ? {} : (stryCov_9fa48("2670"), {
              ...rec,
              signedAt: stryMutAct_9fa48("2673") ? remote.signedAt && Date.now() : stryMutAct_9fa48("2672") ? false : stryMutAct_9fa48("2671") ? true : (stryCov_9fa48("2671", "2672", "2673"), remote.signedAt || Date.now()),
              signedBy: stryMutAct_9fa48("2676") ? remote.signatureName && rec.signedBy : stryMutAct_9fa48("2675") ? false : stryMutAct_9fa48("2674") ? true : (stryCov_9fa48("2674", "2675", "2676"), remote.signatureName || rec.signedBy),
              signerTitle: stryMutAct_9fa48("2679") ? remote.signatureTitle && rec.signerTitle : stryMutAct_9fa48("2678") ? false : stryMutAct_9fa48("2677") ? true : (stryCov_9fa48("2677", "2678", "2679"), remote.signatureTitle || rec.signerTitle),
              signedDocId: stryMutAct_9fa48("2682") ? remote.signedDocId && rec.signedDocId : stryMutAct_9fa48("2681") ? false : stryMutAct_9fa48("2680") ? true : (stryCov_9fa48("2680", "2681", "2682"), remote.signedDocId || rec.signedDocId),
              signerEmail: stryMutAct_9fa48("2685") ? remote.email && rec.signerEmail : stryMutAct_9fa48("2684") ? false : stryMutAct_9fa48("2683") ? true : (stryCov_9fa48("2683", "2684", "2685"), remote.email || rec.signerEmail),
              signatureImage: stryMutAct_9fa48("2688") ? remote.signatureImage && rec.signatureImage : stryMutAct_9fa48("2687") ? false : stryMutAct_9fa48("2686") ? true : (stryCov_9fa48("2686", "2687", "2688"), remote.signatureImage || rec.signatureImage)
            }));
            setRequestStatus(rec.id, stryMutAct_9fa48("2689") ? "" : (stryCov_9fa48("2689"), "Signed"), stryMutAct_9fa48("2690") ? `` : (stryCov_9fa48("2690"), `Counter-signed by ${stryMutAct_9fa48("2693") ? remote.signatureName && "counterparty" : stryMutAct_9fa48("2692") ? false : stryMutAct_9fa48("2691") ? true : (stryCov_9fa48("2691", "2692", "2693"), remote.signatureName || (stryMutAct_9fa48("2694") ? "" : (stryCov_9fa48("2694"), "counterparty")))}`));
            stryMutAct_9fa48("2695") ? changed-- : (stryCov_9fa48("2695"), changed++);
          }
        } else if (stryMutAct_9fa48("2698") ? remote.status === "declined" || rec.status !== "In Review" : stryMutAct_9fa48("2697") ? false : stryMutAct_9fa48("2696") ? true : (stryCov_9fa48("2696", "2697", "2698"), (stryMutAct_9fa48("2700") ? remote.status !== "declined" : stryMutAct_9fa48("2699") ? true : (stryCov_9fa48("2699", "2700"), remote.status === (stryMutAct_9fa48("2701") ? "" : (stryCov_9fa48("2701"), "declined")))) && (stryMutAct_9fa48("2703") ? rec.status === "In Review" : stryMutAct_9fa48("2702") ? true : (stryCov_9fa48("2702", "2703"), rec.status !== (stryMutAct_9fa48("2704") ? "" : (stryCov_9fa48("2704"), "In Review")))))) {
          if (stryMutAct_9fa48("2705")) {
            {}
          } else {
            stryCov_9fa48("2705");
            setRequestStatus(rec.id, stryMutAct_9fa48("2706") ? "" : (stryCov_9fa48("2706"), "In Review"), stryMutAct_9fa48("2707") ? `` : (stryCov_9fa48("2707"), `Signature declined${remote.declineReason ? stryMutAct_9fa48("2708") ? `` : (stryCov_9fa48("2708"), `: ${remote.declineReason}`) : stryMutAct_9fa48("2709") ? "Stryker was here!" : (stryCov_9fa48("2709"), "")}`));
            stryMutAct_9fa48("2710") ? changed-- : (stryCov_9fa48("2710"), changed++);
          }
        } else if (stryMutAct_9fa48("2713") ? (remote.status === "viewed" || remote.viewedAt) && rec.status === "Awaiting Signature" || !rec.signatureViewedAt : stryMutAct_9fa48("2712") ? false : stryMutAct_9fa48("2711") ? true : (stryCov_9fa48("2711", "2712", "2713"), (stryMutAct_9fa48("2715") ? remote.status === "viewed" || remote.viewedAt || rec.status === "Awaiting Signature" : stryMutAct_9fa48("2714") ? true : (stryCov_9fa48("2714", "2715"), (stryMutAct_9fa48("2717") ? remote.status === "viewed" && remote.viewedAt : stryMutAct_9fa48("2716") ? true : (stryCov_9fa48("2716", "2717"), (stryMutAct_9fa48("2719") ? remote.status !== "viewed" : stryMutAct_9fa48("2718") ? false : (stryCov_9fa48("2718", "2719"), remote.status === (stryMutAct_9fa48("2720") ? "" : (stryCov_9fa48("2720"), "viewed")))) || remote.viewedAt)) && (stryMutAct_9fa48("2722") ? rec.status !== "Awaiting Signature" : stryMutAct_9fa48("2721") ? true : (stryCov_9fa48("2721", "2722"), rec.status === (stryMutAct_9fa48("2723") ? "" : (stryCov_9fa48("2723"), "Awaiting Signature")))))) && (stryMutAct_9fa48("2724") ? rec.signatureViewedAt : (stryCov_9fa48("2724"), !rec.signatureViewedAt)))) {
          if (stryMutAct_9fa48("2725")) {
            {}
          } else {
            stryCov_9fa48("2725");
            upsertRequest(stryMutAct_9fa48("2726") ? {} : (stryCov_9fa48("2726"), {
              ...rec,
              signatureViewedAt: remote.viewedAt
            }));
            stryMutAct_9fa48("2727") ? changed-- : (stryCov_9fa48("2727"), changed++);
          }
        }
      }
    }
    if (stryMutAct_9fa48("2729") ? false : stryMutAct_9fa48("2728") ? true : (stryCov_9fa48("2728", "2729"), changed)) write(stryMutAct_9fa48("2730") ? local : (stryCov_9fa48("2730"), local.slice(0, 200)));
    return changed;
  }
}