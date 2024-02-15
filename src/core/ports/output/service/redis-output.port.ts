export interface RedisOutputPort {
  get: (key: string) => Promise<string | null>
  set: (key: string, payload: string | number | Buffer) => Promise<void>
  del: (key: string) => Promise<void>
}
