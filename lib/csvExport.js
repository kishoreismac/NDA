// CSV export utility — pure client-side. Used by Export buttons.
import { downloadBlob } from "./documentGenerator";

function escape(v) {
  if (v === null || v === undefined) return "";
  const s = typeof v === "string" ? v : String(v);
  if (s.includes(",") || s.includes('"') || s.includes("\n")) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

// columns: [{ key, label, accessor?: row => value }]
// rows: array of objects
export async function exportToCsv({ filename, columns, rows }) {
  const header = columns.map((c) => escape(c.label)).join(",");
  const body = rows
    .map((r) =>
      columns
        .map((c) => {
          const v = c.accessor ? c.accessor(r) : r[c.key];
          return escape(v);
        })
        .join(",")
    )
    .join("\n");
  const csv = "\ufeff" + header + "\n" + body; // BOM for Excel
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const stamped = filename.endsWith(".csv")
    ? filename
    : `${filename}_${new Date().toISOString().slice(0, 10)}.csv`;
  return downloadBlob(blob, stamped);
}
