// @ts-nocheck
"use client";

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
import { useEffect, useState } from "react";
import { getCurrentRole } from "./roleStore";

// Canonical action keys
export const ACTIONS = stryMutAct_9fa48("142") ? {} : (stryCov_9fa48("142"), {
  APPROVE: stryMutAct_9fa48("143") ? "" : (stryCov_9fa48("143"), "approve"),
  REJECT: stryMutAct_9fa48("144") ? "" : (stryCov_9fa48("144"), "reject"),
  SEND_FOR_SIGN: stryMutAct_9fa48("145") ? "" : (stryCov_9fa48("145"), "sendForSign"),
  SUBMIT: stryMutAct_9fa48("146") ? "" : (stryCov_9fa48("146"), "submit"),
  EDIT: stryMutAct_9fa48("147") ? "" : (stryCov_9fa48("147"), "edit"),
  DELETE: stryMutAct_9fa48("148") ? "" : (stryCov_9fa48("148"), "delete"),
  RENEW: stryMutAct_9fa48("149") ? "" : (stryCov_9fa48("149"), "renew"),
  PREVIEW: stryMutAct_9fa48("150") ? "" : (stryCov_9fa48("150"), "preview"),
  GENERATE_DRAFT: stryMutAct_9fa48("151") ? "" : (stryCov_9fa48("151"), "generateDraft"),
  RUN_RISK: stryMutAct_9fa48("152") ? "" : (stryCov_9fa48("152"), "runRisk"),
  ADD_TAG: stryMutAct_9fa48("153") ? "" : (stryCov_9fa48("153"), "addTag"),
  ADMIN: stryMutAct_9fa48("154") ? "" : (stryCov_9fa48("154"), "admin")
});

// Per-role action whitelist
const MATRIX = stryMutAct_9fa48("155") ? {} : (stryCov_9fa48("155"), {
  admin: new Set(Object.values(ACTIONS)),
  // everything
  legal: new Set(stryMutAct_9fa48("156") ? [] : (stryCov_9fa48("156"), [ACTIONS.APPROVE, ACTIONS.REJECT, ACTIONS.SEND_FOR_SIGN, ACTIONS.EDIT, ACTIONS.RENEW, ACTIONS.PREVIEW, ACTIONS.ADD_TAG, ACTIONS.RUN_RISK, ACTIONS.GENERATE_DRAFT, ACTIONS.SUBMIT])),
  business: new Set(stryMutAct_9fa48("157") ? [] : (stryCov_9fa48("157"), [ACTIONS.SUBMIT, ACTIONS.GENERATE_DRAFT, ACTIONS.RUN_RISK, ACTIONS.PREVIEW])),
  exec: new Set(stryMutAct_9fa48("158") ? [] : (stryCov_9fa48("158"), [ACTIONS.PREVIEW])) // dashboard / read-only viewing
});
export function can(roleId, action) {
  if (stryMutAct_9fa48("159")) {
    {}
  } else {
    stryCov_9fa48("159");
    const set = stryMutAct_9fa48("162") ? MATRIX[roleId] && new Set() : stryMutAct_9fa48("161") ? false : stryMutAct_9fa48("160") ? true : (stryCov_9fa48("160", "161", "162"), MATRIX[roleId] || new Set());
    return set.has(action);
  }
}

// React hook: returns { allowed, role, user, deny(toast) } for a single action
export function usePermission(action) {
  if (stryMutAct_9fa48("163")) {
    {}
  } else {
    stryCov_9fa48("163");
    const [{
      role,
      user
    }, setState] = useState(stryMutAct_9fa48("164") ? () => undefined : (stryCov_9fa48("164"), () => getCurrentRole()));
    useEffect(() => {
      if (stryMutAct_9fa48("165")) {
        {}
      } else {
        stryCov_9fa48("165");
        const onChange = stryMutAct_9fa48("166") ? () => undefined : (stryCov_9fa48("166"), (() => {
          const onChange = () => setState(getCurrentRole());
          return onChange;
        })());
        window.addEventListener(stryMutAct_9fa48("167") ? "" : (stryCov_9fa48("167"), "clm:role-changed"), onChange);
        return stryMutAct_9fa48("168") ? () => undefined : (stryCov_9fa48("168"), () => window.removeEventListener(stryMutAct_9fa48("169") ? "" : (stryCov_9fa48("169"), "clm:role-changed"), onChange));
      }
    }, stryMutAct_9fa48("170") ? ["Stryker was here"] : (stryCov_9fa48("170"), []));
    const allowed = can(role.id, action);
    return stryMutAct_9fa48("171") ? {} : (stryCov_9fa48("171"), {
      allowed,
      role,
      user,
      /**
       * deny(toast) — call this from an action handler when not allowed.
       * Pass your toast object (from useToast()) to surface the standard message.
       * Returns true if denial was shown (i.e. user is NOT allowed), false otherwise.
       */
      deny(toast) {
        if (stryMutAct_9fa48("172")) {
          {}
        } else {
          stryCov_9fa48("172");
          if (stryMutAct_9fa48("174") ? false : stryMutAct_9fa48("173") ? true : (stryCov_9fa48("173", "174"), allowed)) return stryMutAct_9fa48("175") ? true : (stryCov_9fa48("175"), false);
          try {
            if (stryMutAct_9fa48("176")) {
              {}
            } else {
              stryCov_9fa48("176");
              stryMutAct_9fa48("178") ? toast.error?.("Access denied", "You do not have permission to perform this activity.") : stryMutAct_9fa48("177") ? toast?.error("Access denied", "You do not have permission to perform this activity.") : (stryCov_9fa48("177", "178"), toast?.error?.(stryMutAct_9fa48("179") ? "" : (stryCov_9fa48("179"), "Access denied"), stryMutAct_9fa48("180") ? "" : (stryCov_9fa48("180"), "You do not have permission to perform this activity.")));
            }
          } catch {}
          return stryMutAct_9fa48("181") ? false : (stryCov_9fa48("181"), true);
        }
      }
    });
  }
}

// Hook that returns full role + user + a generic guard()
export function useCurrentRole() {
  if (stryMutAct_9fa48("182")) {
    {}
  } else {
    stryCov_9fa48("182");
    const [{
      role,
      user
    }, setState] = useState(stryMutAct_9fa48("183") ? () => undefined : (stryCov_9fa48("183"), () => getCurrentRole()));
    useEffect(() => {
      if (stryMutAct_9fa48("184")) {
        {}
      } else {
        stryCov_9fa48("184");
        const onChange = stryMutAct_9fa48("185") ? () => undefined : (stryCov_9fa48("185"), (() => {
          const onChange = () => setState(getCurrentRole());
          return onChange;
        })());
        window.addEventListener(stryMutAct_9fa48("186") ? "" : (stryCov_9fa48("186"), "clm:role-changed"), onChange);
        return stryMutAct_9fa48("187") ? () => undefined : (stryCov_9fa48("187"), () => window.removeEventListener(stryMutAct_9fa48("188") ? "" : (stryCov_9fa48("188"), "clm:role-changed"), onChange));
      }
    }, stryMutAct_9fa48("189") ? ["Stryker was here"] : (stryCov_9fa48("189"), []));
    return stryMutAct_9fa48("190") ? {} : (stryCov_9fa48("190"), {
      role,
      user,
      can: stryMutAct_9fa48("191") ? () => undefined : (stryCov_9fa48("191"), action => can(role.id, action)),
      /** guard(action, toast) → returns true if blocked (and shows toast). */
      guard(action, toast) {
        if (stryMutAct_9fa48("192")) {
          {}
        } else {
          stryCov_9fa48("192");
          if (stryMutAct_9fa48("194") ? false : stryMutAct_9fa48("193") ? true : (stryCov_9fa48("193", "194"), can(role.id, action))) return stryMutAct_9fa48("195") ? true : (stryCov_9fa48("195"), false);
          try {
            if (stryMutAct_9fa48("196")) {
              {}
            } else {
              stryCov_9fa48("196");
              stryMutAct_9fa48("198") ? toast.error?.("Access denied", "You do not have permission to perform this activity.") : stryMutAct_9fa48("197") ? toast?.error("Access denied", "You do not have permission to perform this activity.") : (stryCov_9fa48("197", "198"), toast?.error?.(stryMutAct_9fa48("199") ? "" : (stryCov_9fa48("199"), "Access denied"), stryMutAct_9fa48("200") ? "" : (stryCov_9fa48("200"), "You do not have permission to perform this activity.")));
            }
          } catch {}
          return stryMutAct_9fa48("201") ? false : (stryCov_9fa48("201"), true);
        }
      }
    });
  }
}