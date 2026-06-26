// @ts-nocheck
import { describe, expect, it, vi } from "vitest";

const downloadBlob = vi.fn(async () => true);

vi.mock("../../lib/documentGenerator", () => ({
  downloadBlob,
}));

describe("CSV export utility", () => {
  it("escapes commas, quotes, and newlines and appends csv extension", async () => {
    const { exportToCsv } = await import("../../lib/csvExport");
    await exportToCsv({
      filename: "repository",
      columns: [
        { key: "id", label: "ID" },
        { key: "name", label: "Counterparty" },
        { key: "note", label: "Note", accessor: (row) => row.note },
      ],
      rows: [{ id: "NDA-1", name: "Acme, Inc.", note: 'Line "A"\nLine B' }],
    });

    expect(downloadBlob).toHaveBeenCalledTimes(1);
    const [blob, filename] = downloadBlob.mock.calls[0];
    expect(filename).toMatch(/^repository_\d{4}-\d{2}-\d{2}\.csv$/);
    const csv = await blob.text();
    expect(csv).toContain("ID,Counterparty,Note");
    expect(csv).toContain('"Acme, Inc."');
    expect(csv).toContain('"Line ""A""\nLine B"');
  });
});
