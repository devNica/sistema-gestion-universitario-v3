export function sanitizeInputStrings (str: string): string {
  let sanitizedStr = str.trim()
  sanitizedStr = sanitizedStr.replace(/\s+/g, ' ')
  return sanitizedStr
}
