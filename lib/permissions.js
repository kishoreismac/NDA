"use client";
import { useEffect, useState } from "react";
import { getCurrentRole } from "./roleStore";

// Canonical action keys
export const ACTIONS = {
  APPROVE: "approve",
  REJECT: "reject",
  SEND_FOR_SIGN: "sendForSign",
  SUBMIT: "submit",
  EDIT: "edit",
  DELETE: "delete",
  RENEW: "renew",
  PREVIEW: "preview",
  GENERATE_DRAFT: "generateDraft",
  RUN_RISK: "runRisk",
  ADD_TAG: "addTag",
  ADMIN: "admin",
};

// Per-role action whitelist
const MATRIX = {
  admin: new Set(Object.values(ACTIONS)), // everything
  legal: new Set([
    ACTIONS.APPROVE,
    ACTIONS.REJECT,
    ACTIONS.SEND_FOR_SIGN,
    ACTIONS.EDIT,
    ACTIONS.RENEW,
    ACTIONS.PREVIEW,
    ACTIONS.ADD_TAG,
    ACTIONS.RUN_RISK,
    ACTIONS.GENERATE_DRAFT,
    ACTIONS.SUBMIT,
  ]),
  business: new Set([
    ACTIONS.SUBMIT,
    ACTIONS.GENERATE_DRAFT,
    ACTIONS.RUN_RISK,
    ACTIONS.PREVIEW,
  ]),
  exec: new Set([ACTIONS.PREVIEW]), // dashboard / read-only viewing
};

export function can(roleId, action) {
  const set = MATRIX[roleId] || new Set();
  return set.has(action);
}

// React hook: returns { allowed, role, user, deny(toast) } for a single action
export function usePermission(action) {
  const [{ role, user }, setState] = useState(() => getCurrentRole());
  useEffect(() => {
    const onChange = () => setState(getCurrentRole());
    window.addEventListener("clm:role-changed", onChange);
    return () => window.removeEventListener("clm:role-changed", onChange);
  }, []);
  const allowed = can(role.id, action);
  return {
    allowed,
    role,
    user,
    /**
     * deny(toast) — call this from an action handler when not allowed.
     * Pass your toast object (from useToast()) to surface the standard message.
     * Returns true if denial was shown (i.e. user is NOT allowed), false otherwise.
     */
    deny(toast) {
      if (allowed) return false;
      try {
        toast?.error?.(
          "Access denied",
          "You do not have permission to perform this activity."
        );
      } catch {}
      return true;
    },
  };
}

// Hook that returns full role + user + a generic guard()
export function useCurrentRole() {
  const [{ role, user }, setState] = useState(() => getCurrentRole());
  useEffect(() => {
    const onChange = () => setState(getCurrentRole());
    window.addEventListener("clm:role-changed", onChange);
    return () => window.removeEventListener("clm:role-changed", onChange);
  }, []);
  return {
    role,
    user,
    can: (action) => can(role.id, action),
    /** guard(action, toast) → returns true if blocked (and shows toast). */
    guard(action, toast) {
      if (can(role.id, action)) return false;
      try {
        toast?.error?.(
          "Access denied",
          "You do not have permission to perform this activity."
        );
      } catch {}
      return true;
    },
  };
}
