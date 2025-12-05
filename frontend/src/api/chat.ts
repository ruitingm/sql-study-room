// frontend/src/api/chat.ts

import axios from "axios";
import API_BASE_URL from "./config";

/**
 * Shape of the response returned by backend /nl2sql/ endpoint.
 * It can be either a successful payload with SQL + result,
 * or an error payload with error + detail (+ optional sql).
 */
export interface NL2SQLResponse {
  question?: string;
  sql?: string;
  columns?: string[];
  rows?: Record<string, any>[];

  // error case
  error?: string;
  detail?: string;
}

/**
 * Call backend Open SQL + LLM endpoint.
 * POST { question } -> /nl2sql/
 */
export async function callNL2SQL(
  question: string
): Promise<NL2SQLResponse> {
  const resp = await axios.post<NL2SQLResponse>(
    `${API_BASE_URL}/nl2sql/`,
    { question }
  );
  return resp.data;
}

/**
 * Format NL2SQLResponse into a human-readable string
 * to be shown in the chat bubble.
 */
export function formatNL2SQLResult(res: NL2SQLResponse): string {
  // backend error
  if (res.error) {
    const detail = res.detail ? `\nDetail: ${res.detail}` : "";
    const sqlInfo = res.sql ? `\n\nGenerated SQL:\n${res.sql}` : "";
    return `Backend reported an error: ${res.error}${detail}${sqlInfo}`;
  }

  const sqlPart = res.sql
    ? `Generated SQL:\n${res.sql}\n`
    : "No SQL was returned.\n";

  const cols = res.columns ?? [];
  const rows = res.rows ?? [];

  if (!cols.length) {
    return `${sqlPart}\n(No result columns returned)`;
  }

  if (!rows.length) {
    return `${sqlPart}\nQuery returned 0 rows.`;
  }

  // Build a simple table-like string for the first N rows
  const header = cols.join(" | ");

  const maxRows = 10; // avoid dumping too much in chat
  const bodyLines = rows.slice(0, maxRows).map((row) =>
    cols
      .map((c) =>
        row[c] === null || row[c] === undefined ? "" : String(row[c])
      )
      .join(" | ")
  );

  const truncated =
    rows.length > maxRows
      ? `\n… (${rows.length - maxRows} more rows)`
      : "";

  return `${sqlPart}\nResult (up to ${maxRows} rows):\n${header}\n${bodyLines.join(
    "\n"
  )}${truncated}`;
}
