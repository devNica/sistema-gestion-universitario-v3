import { type CacheServiceOutputPort } from '@core/domain/ports/cache/cache-service.port'
import { type RedisOutputPort } from '@core/infrastructure/ports/redis/redis.port'
import { redisAdapter } from '@core/infrastructure/redis/redis.adapter'

export default class CacheService <T> implements CacheServiceOutputPort<T> {
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
