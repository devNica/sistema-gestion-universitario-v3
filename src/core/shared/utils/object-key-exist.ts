/* eslint-disable @typescript-eslint/strict-boolean-expressions */

const objectKeyExists = <
    T extends Record<string, any>,
    R extends keyof T
>(object: T, key: R): object is T & Required<Pick<T, R>> => {
  if (typeof object !== 'object' || !object) return false
  return key in object
}

function isUUIDV4 (str: string): boolean {
  const patron: RegExp = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  return patron.test(str)
}

export {
  objectKeyExists,
  isUUIDV4
}
