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
export const ACTIONS = stryMutAct_9fa48("346") ? {} : (stryCov_9fa48("346"), {
  APPROVE: stryMutAct_9fa48("347") ? "" : (stryCov_9fa48("347"), "approve"),
  REJECT: stryMutAct_9fa48("348") ? "" : (stryCov_9fa48("348"), "reject"),
  SEND_FOR_SIGN: stryMutAct_9fa48("349") ? "" : (stryCov_9fa48("349"), "sendForSign"),
  SUBMIT: stryMutAct_9fa48("350") ? "" : (stryCov_9fa48("350"), "submit"),
  EDIT: stryMutAct_9fa48("351") ? "" : (stryCov_9fa48("351"), "edit"),
  DELETE: stryMutAct_9fa48("352") ? "" : (stryCov_9fa48("352"), "delete"),
  RENEW: stryMutAct_9fa48("353") ? "" : (stryCov_9fa48("353"), "renew"),
  PREVIEW: stryMutAct_9fa48("354") ? "" : (stryCov_9fa48("354"), "preview"),
  GENERATE_DRAFT: stryMutAct_9fa48("355") ? "" : (stryCov_9fa48("355"), "generateDraft"),
  RUN_RISK: stryMutAct_9fa48("356") ? "" : (stryCov_9fa48("356"), "runRisk"),
  ADD_TAG: stryMutAct_9fa48("357") ? "" : (stryCov_9fa48("357"), "addTag"),
  ADMIN: stryMutAct_9fa48("358") ? "" : (stryCov_9fa48("358"), "admin")
});

// Per-role action whitelist
const MATRIX = stryMutAct_9fa48("359") ? {} : (stryCov_9fa48("359"), {
  admin: new Set(Object.values(ACTIONS)),
  // everything
  legal: new Set(stryMutAct_9fa48("360") ? [] : (stryCov_9fa48("360"), [ACTIONS.APPROVE, ACTIONS.REJECT, ACTIONS.SEND_FOR_SIGN, ACTIONS.EDIT, ACTIONS.RENEW, ACTIONS.PREVIEW, ACTIONS.ADD_TAG, ACTIONS.RUN_RISK, ACTIONS.GENERATE_DRAFT, ACTIONS.SUBMIT])),
  business: new Set(stryMutAct_9fa48("361") ? [] : (stryCov_9fa48("361"), [ACTIONS.SUBMIT, ACTIONS.GENERATE_DRAFT, ACTIONS.RUN_RISK, ACTIONS.PREVIEW])),
  exec: new Set(stryMutAct_9fa48("362") ? [] : (stryCov_9fa48("362"), [ACTIONS.PREVIEW])) // dashboard / read-only viewing
});
export function can(roleId, action) {
  if (stryMutAct_9fa48("363")) {
    {}
  } else {
    stryCov_9fa48("363");
    const set = stryMutAct_9fa48("366") ? MATRIX[roleId] && new Set() : stryMutAct_9fa48("365") ? false : stryMutAct_9fa48("364") ? true : (stryCov_9fa48("364", "365", "366"), MATRIX[roleId] || new Set());
    return set.has(action);
  }
}

// React hook: returns { allowed, role, user, deny(toast) } for a single action
export function usePermission(action) {
  if (stryMutAct_9fa48("367")) {
    {}
  } else {
    stryCov_9fa48("367");
    const [{
      role,
      user
    }, setState] = useState(stryMutAct_9fa48("368") ? () => undefined : (stryCov_9fa48("368"), () => getCurrentRole()));
    useEffect(() => {
      if (stryMutAct_9fa48("369")) {
        {}
      } else {
        stryCov_9fa48("369");
        const onChange = stryMutAct_9fa48("370") ? () => undefined : (stryCov_9fa48("370"), (() => {
          const onChange = () => setState(getCurrentRole());
          return onChange;
        })());
        window.addEventListener(stryMutAct_9fa48("371") ? "" : (stryCov_9fa48("371"), "clm:role-changed"), onChange);
        return stryMutAct_9fa48("372") ? () => undefined : (stryCov_9fa48("372"), () => window.removeEventListener(stryMutAct_9fa48("373") ? "" : (stryCov_9fa48("373"), "clm:role-changed"), onChange));
      }
    }, stryMutAct_9fa48("374") ? ["Stryker was here"] : (stryCov_9fa48("374"), []));
    const allowed = can(role.id, action);
    return stryMutAct_9fa48("375") ? {} : (stryCov_9fa48("375"), {
      allowed,
      role,
      user,
      /**
       * deny(toast) — call this from an action handler when not allowed.
       * Pass your toast object (from useToast()) to surface the standard message.
       * Returns true if denial was shown (i.e. user is NOT allowed), false otherwise.
       */
      deny(toast) {
        if (stryMutAct_9fa48("376")) {
          {}
        } else {
          stryCov_9fa48("376");
          if (stryMutAct_9fa48("378") ? false : stryMutAct_9fa48("377") ? true : (stryCov_9fa48("377", "378"), allowed)) return stryMutAct_9fa48("379") ? true : (stryCov_9fa48("379"), false);
          try {
            if (stryMutAct_9fa48("380")) {
              {}
            } else {
              stryCov_9fa48("380");
              stryMutAct_9fa48("382") ? toast.error?.("Access denied", "You do not have permission to perform this activity.") : stryMutAct_9fa48("381") ? toast?.error("Access denied", "You do not have permission to perform this activity.") : (stryCov_9fa48("381", "382"), toast?.error?.(stryMutAct_9fa48("383") ? "" : (stryCov_9fa48("383"), "Access denied"), stryMutAct_9fa48("384") ? "" : (stryCov_9fa48("384"), "You do not have permission to perform this activity.")));
            }
          } catch {}
          return stryMutAct_9fa48("385") ? false : (stryCov_9fa48("385"), true);
        }
      }
    });
  }
}

// Hook that returns full role + user + a generic guard()
export function useCurrentRole() {
  if (stryMutAct_9fa48("386")) {
    {}
  } else {
    stryCov_9fa48("386");
    const [{
      role,
      user
    }, setState] = useState(stryMutAct_9fa48("387") ? () => undefined : (stryCov_9fa48("387"), () => getCurrentRole()));
    useEffect(() => {
      if (stryMutAct_9fa48("388")) {
        {}
      } else {
        stryCov_9fa48("388");
        const onChange = stryMutAct_9fa48("389") ? () => undefined : (stryCov_9fa48("389"), (() => {
          const onChange = () => setState(getCurrentRole());
          return onChange;
        })());
        window.addEventListener(stryMutAct_9fa48("390") ? "" : (stryCov_9fa48("390"), "clm:role-changed"), onChange);
        return stryMutAct_9fa48("391") ? () => undefined : (stryCov_9fa48("391"), () => window.removeEventListener(stryMutAct_9fa48("392") ? "" : (stryCov_9fa48("392"), "clm:role-changed"), onChange));
      }
    }, stryMutAct_9fa48("393") ? ["Stryker was here"] : (stryCov_9fa48("393"), []));
    return stryMutAct_9fa48("394") ? {} : (stryCov_9fa48("394"), {
      role,
      user,
      can: stryMutAct_9fa48("395") ? () => undefined : (stryCov_9fa48("395"), action => can(role.id, action)),
      /** guard(action, toast) → returns true if blocked (and shows toast). */
      guard(action, toast) {
        if (stryMutAct_9fa48("396")) {
          {}
        } else {
          stryCov_9fa48("396");
          if (stryMutAct_9fa48("398") ? false : stryMutAct_9fa48("397") ? true : (stryCov_9fa48("397", "398"), can(role.id, action))) return stryMutAct_9fa48("399") ? true : (stryCov_9fa48("399"), false);
          try {
            if (stryMutAct_9fa48("400")) {
              {}
            } else {
              stryCov_9fa48("400");
              stryMutAct_9fa48("402") ? toast.error?.("Access denied", "You do not have permission to perform this activity.") : stryMutAct_9fa48("401") ? toast?.error("Access denied", "You do not have permission to perform this activity.") : (stryCov_9fa48("401", "402"), toast?.error?.(stryMutAct_9fa48("403") ? "" : (stryCov_9fa48("403"), "Access denied"), stryMutAct_9fa48("404") ? "" : (stryCov_9fa48("404"), "You do not have permission to perform this activity.")));
            }
          } catch {}
          return stryMutAct_9fa48("405") ? false : (stryCov_9fa48("405"), true);
        }
      }
    });
  }
}