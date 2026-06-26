// @ts-nocheck
import { beforeEach, vi } from "vitest";

beforeEach(() => {
  window.localStorage.clear();
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => ({
      ok: true,
      json: async () => ({ ok: true, requests: [], signatures: [], messageId: "test-message" }),
    }))
  );
});
