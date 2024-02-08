export interface CacheOutputPort {
  getStoreByName: <T>(store: string) => Promise<T[]>
  updateStoreByName: <T>(store: string, payload: T[]) => Promise<boolean>
}
