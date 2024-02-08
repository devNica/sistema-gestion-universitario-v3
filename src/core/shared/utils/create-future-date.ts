import constants from '../constants'

export function createFutureDate (date: Date, secondToAdd: number): Date {
  const secondsToMilliseconds = secondToAdd * 1000
  return new Date(date.getTime() + secondsToMilliseconds)
}

export function getInitialPasswordExpirationTime (): number {
  return new Date().getTime() + constants.INITIAL_PASSWORD_EXPIRATION_TIME
}

export function setPasswordExpiration (): number {
  return new Date().getTime() + constants.PASSWORD_EXPIRATION_TIME
}

export function checkExpirationDate (validateDate: number): boolean {
  const valueCurrentDate = new Date().getTime()
  const result = validateDate - valueCurrentDate
  if (result > 0) return true
  else return false
}
