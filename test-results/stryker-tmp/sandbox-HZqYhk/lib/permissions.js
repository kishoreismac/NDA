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
export const ACTIONS = stryMutAct_9fa48("632") ? {} : (stryCov_9fa48("632"), {
  APPROVE: stryMutAct_9fa48("633") ? "" : (stryCov_9fa48("633"), "approve"),
  REJECT: stryMutAct_9fa48("634") ? "" : (stryCov_9fa48("634"), "reject"),
  SEND_FOR_SIGN: stryMutAct_9fa48("635") ? "" : (stryCov_9fa48("635"), "sendForSign"),
  SUBMIT: stryMutAct_9fa48("636") ? "" : (stryCov_9fa48("636"), "submit"),
  EDIT: stryMutAct_9fa48("637") ? "" : (stryCov_9fa48("637"), "edit"),
  DELETE: stryMutAct_9fa48("638") ? "" : (stryCov_9fa48("638"), "delete"),
  RENEW: stryMutAct_9fa48("639") ? "" : (stryCov_9fa48("639"), "renew"),
  PREVIEW: stryMutAct_9fa48("640") ? "" : (stryCov_9fa48("640"), "preview"),
  GENERATE_DRAFT: stryMutAct_9fa48("641") ? "" : (stryCov_9fa48("641"), "generateDraft"),
  RUN_RISK: stryMutAct_9fa48("642") ? "" : (stryCov_9fa48("642"), "runRisk"),
  ADD_TAG: stryMutAct_9fa48("643") ? "" : (stryCov_9fa48("643"), "addTag"),
  ADMIN: stryMutAct_9fa48("644") ? "" : (stryCov_9fa48("644"), "admin")
});

// Per-role action whitelist
const MATRIX = stryMutAct_9fa48("645") ? {} : (stryCov_9fa48("645"), {
  admin: new Set(Object.values(ACTIONS)),
  // everything
  legal: new Set(stryMutAct_9fa48("646") ? [] : (stryCov_9fa48("646"), [ACTIONS.APPROVE, ACTIONS.REJECT, ACTIONS.SEND_FOR_SIGN, ACTIONS.EDIT, ACTIONS.RENEW, ACTIONS.PREVIEW, ACTIONS.ADD_TAG, ACTIONS.RUN_RISK, ACTIONS.GENERATE_DRAFT, ACTIONS.SUBMIT])),
  business: new Set(stryMutAct_9fa48("647") ? [] : (stryCov_9fa48("647"), [ACTIONS.SUBMIT, ACTIONS.GENERATE_DRAFT, ACTIONS.RUN_RISK, ACTIONS.PREVIEW])),
  exec: new Set(stryMutAct_9fa48("648") ? [] : (stryCov_9fa48("648"), [ACTIONS.PREVIEW])) // dashboard / read-only viewing
});
export function can(roleId, action) {
  if (stryMutAct_9fa48("649")) {
    {}
  } else {
    stryCov_9fa48("649");
    const set = stryMutAct_9fa48("652") ? MATRIX[roleId] && new Set() : stryMutAct_9fa48("651") ? false : stryMutAct_9fa48("650") ? true : (stryCov_9fa48("650", "651", "652"), MATRIX[roleId] || new Set());
    return set.has(action);
  }
}

// React hook: returns { allowed, role, user, deny(toast) } for a single action
export function usePermission(action) {
  if (stryMutAct_9fa48("653")) {
    {}
  } else {
    stryCov_9fa48("653");
    const [{
      role,
      user
    }, setState] = useState(stryMutAct_9fa48("654") ? () => undefined : (stryCov_9fa48("654"), () => getCurrentRole()));
    useEffect(() => {
      if (stryMutAct_9fa48("655")) {
        {}
      } else {
        stryCov_9fa48("655");
        const onChange = stryMutAct_9fa48("656") ? () => undefined : (stryCov_9fa48("656"), (() => {
          const onChange = () => setState(getCurrentRole());
          return onChange;
        })());
        window.addEventListener(stryMutAct_9fa48("657") ? "" : (stryCov_9fa48("657"), "clm:role-changed"), onChange);
        return stryMutAct_9fa48("658") ? () => undefined : (stryCov_9fa48("658"), () => window.removeEventListener(stryMutAct_9fa48("659") ? "" : (stryCov_9fa48("659"), "clm:role-changed"), onChange));
      }
    }, stryMutAct_9fa48("660") ? ["Stryker was here"] : (stryCov_9fa48("660"), []));
    const allowed = can(role.id, action);
    return stryMutAct_9fa48("661") ? {} : (stryCov_9fa48("661"), {
      allowed,
      role,
      user,
      /**
       * deny(toast) — call this from an action handler when not allowed.
       * Pass your toast object (from useToast()) to surface the standard message.
       * Returns true if denial was shown (i.e. user is NOT allowed), false otherwise.
       */
      deny(toast) {
        if (stryMutAct_9fa48("662")) {
          {}
        } else {
          stryCov_9fa48("662");
          if (stryMutAct_9fa48("664") ? false : stryMutAct_9fa48("663") ? true : (stryCov_9fa48("663", "664"), allowed)) return stryMutAct_9fa48("665") ? true : (stryCov_9fa48("665"), false);
          try {
            if (stryMutAct_9fa48("666")) {
              {}
            } else {
              stryCov_9fa48("666");
              stryMutAct_9fa48("668") ? toast.error?.("Access denied", "You do not have permission to perform this activity.") : stryMutAct_9fa48("667") ? toast?.error("Access denied", "You do not have permission to perform this activity.") : (stryCov_9fa48("667", "668"), toast?.error?.(stryMutAct_9fa48("669") ? "" : (stryCov_9fa48("669"), "Access denied"), stryMutAct_9fa48("670") ? "" : (stryCov_9fa48("670"), "You do not have permission to perform this activity.")));
            }
          } catch {}
          return stryMutAct_9fa48("671") ? false : (stryCov_9fa48("671"), true);
        }
      }
    });
  }
}

// Hook that returns full role + user + a generic guard()
export function useCurrentRole() {
  if (stryMutAct_9fa48("672")) {
    {}
  } else {
    stryCov_9fa48("672");
    const [{
      role,
      user
    }, setState] = useState(stryMutAct_9fa48("673") ? () => undefined : (stryCov_9fa48("673"), () => getCurrentRole()));
    useEffect(() => {
      if (stryMutAct_9fa48("674")) {
        {}
      } else {
        stryCov_9fa48("674");
        const onChange = stryMutAct_9fa48("675") ? () => undefined : (stryCov_9fa48("675"), (() => {
          const onChange = () => setState(getCurrentRole());
          return onChange;
        })());
        window.addEventListener(stryMutAct_9fa48("676") ? "" : (stryCov_9fa48("676"), "clm:role-changed"), onChange);
        return stryMutAct_9fa48("677") ? () => undefined : (stryCov_9fa48("677"), () => window.removeEventListener(stryMutAct_9fa48("678") ? "" : (stryCov_9fa48("678"), "clm:role-changed"), onChange));
      }
    }, stryMutAct_9fa48("679") ? ["Stryker was here"] : (stryCov_9fa48("679"), []));
    return stryMutAct_9fa48("680") ? {} : (stryCov_9fa48("680"), {
      role,
      user,
      can: stryMutAct_9fa48("681") ? () => undefined : (stryCov_9fa48("681"), action => can(role.id, action)),
      /** guard(action, toast) → returns true if blocked (and shows toast). */
      guard(action, toast) {
        if (stryMutAct_9fa48("682")) {
          {}
        } else {
          stryCov_9fa48("682");
          if (stryMutAct_9fa48("684") ? false : stryMutAct_9fa48("683") ? true : (stryCov_9fa48("683", "684"), can(role.id, action))) return stryMutAct_9fa48("685") ? true : (stryCov_9fa48("685"), false);
          try {
            if (stryMutAct_9fa48("686")) {
              {}
            } else {
              stryCov_9fa48("686");
              stryMutAct_9fa48("688") ? toast.error?.("Access denied", "You do not have permission to perform this activity.") : stryMutAct_9fa48("687") ? toast?.error("Access denied", "You do not have permission to perform this activity.") : (stryCov_9fa48("687", "688"), toast?.error?.(stryMutAct_9fa48("689") ? "" : (stryCov_9fa48("689"), "Access denied"), stryMutAct_9fa48("690") ? "" : (stryCov_9fa48("690"), "You do not have permission to perform this activity.")));
            }
          } catch {}
          return stryMutAct_9fa48("691") ? false : (stryCov_9fa48("691"), true);
        }
      }
    });
  }
}