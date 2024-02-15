export function sanitizeInputStrings (str: string): string {
  let sanitizedStr = str.trim()
  sanitizedStr = sanitizedStr.replace(/\s+/g, ' ')
  return sanitizedStr
}

export function generateUsername (firstname: string, lastname: string): string {
  // const normalizedName = firstname.trim()

  const x = firstname.split(' ')[0].charAt(0).toLowerCase()

  // const normalizedLastname = lastname.replace(/\s+/g, ' ')

  const last = lastname.split(' ')
  const append = last[1] ?? ''

  return x + last[0].toLowerCase() + append.charAt(0).toLowerCase() + '-'
}
