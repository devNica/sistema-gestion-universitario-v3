export interface CacheServiceOutputPort<T> {
  getStoreByName: (store: string) => Promise<T[]>
  updateStoreByName: (store: string, payload: T[]) => Promise<boolean>
}
