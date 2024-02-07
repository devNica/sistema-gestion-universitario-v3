export function generateUsername (firstname: string, lastname: string): string {
  const normalizedName = firstname.trim()

  const x = normalizedName.split(' ')[0].charAt(0).toLowerCase()

  const normalizedLastname = lastname.replace(/\s+/g, ' ')

  const last = normalizedLastname.split(' ')
  const append = last[1] ?? ''

  return x + last[0].toLowerCase() + append.charAt(0).toLowerCase() + '-'
}
