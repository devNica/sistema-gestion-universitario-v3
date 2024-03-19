/* eslint-disable @typescript-eslint/strict-boolean-expressions */

export const objectKeyExists = <
    T extends Record<string, any>,
    R extends keyof T
>(object: T, key: R): object is T & Required<Pick<T, R>> => {
  if (typeof object !== 'object' || !object) return false
  return key in object
}
