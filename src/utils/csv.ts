// Minimal RFC-4180 CSV parser (handles quoted fields, escaped quotes, commas/newlines inside quotes).
// Good enough for Google Sheets' "Publish to web -> CSV" export; no dependency needed for this alone.
export function parseCsv(text: string): string[][] {
  const rows: string[][] = []
  let row: string[] = []
  let field = ''
  let inQuotes = false

  for (let i = 0; i < text.length; i++) {
    const char = text[i]

    if (inQuotes) {
      if (char === '"') {
        if (text[i + 1] === '"') { field += '"'; i++ }
        else { inQuotes = false }
      } else {
        field += char
      }
      continue
    }

    if (char === '"') { inQuotes = true }
    else if (char === ',') { row.push(field); field = '' }
    else if (char === '\r') { /* skip, \n handles the break */ }
    else if (char === '\n') { row.push(field); rows.push(row); row = []; field = '' }
    else { field += char }
  }

  if (field.length > 0 || row.length > 0) { row.push(field); rows.push(row) }
  return rows.filter(r => r.some(cell => cell.trim() !== ''))
}

export function csvToObjects(text: string): Record<string, string>[] {
  const rows = parseCsv(text)
  if (rows.length === 0) return []
  const headers = rows[0].map(h => h.trim())
  return rows.slice(1).map(r => {
    const obj: Record<string, string> = {}
    headers.forEach((h, i) => { obj[h] = (r[i] ?? '').trim() })
    return obj
  })
}
