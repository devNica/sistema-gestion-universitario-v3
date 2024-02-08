import { redisAdapter } from '@core/adapters/secondary/cache/redis.adapter'
import { type CacheOutputPort } from '@core/ports/output/service/cache-output.port'
import { type RedisOutputPort } from '@core/ports/output/service/redis-output.port'

export default class CacheService <T> implements CacheOutputPort<T> {
  private readonly cache: RedisOutputPort
  constructor (

  ) {
    this.cache = redisAdapter
  }

  async getStoreByName (store: string): Promise<T[]> {
    const result = await this.cache.get(store)
    /* eslint-disable @typescript-eslint/strict-boolean-expressions */
    return result ? JSON.parse(result) : []
  }

  async updateStoreByName (store: string, payload: T[]): Promise<boolean> {
    await this.cache.set(store, JSON.stringify(payload))
    return true
  }
}
