export interface CacheOutputPort<T> {
  getStoreByName: (store: string) => Promise<T[]>
  updateStoreByName: (store: string, payload: T[]) => Promise<boolean>
}
