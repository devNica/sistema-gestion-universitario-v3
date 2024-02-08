import { redisAdapter } from '@core/adapters/secondary/cache/redis.adapter'
import { type CacheOutputPort } from '@core/ports/output/service/cache-output.port'
import { type RedisOutputPort } from '@core/ports/output/service/redis-output.port'

class CacheService implements CacheOutputPort {
  constructor (
    private readonly cache: RedisOutputPort
  ) {}

  async getStoreByName <T>(store: string): Promise<T[]> {
    const result = await this.cache.get(store)
    /* eslint-disable @typescript-eslint/strict-boolean-expressions */
    return result ? JSON.parse(result) : []
  }

  async updateStoreByName <T>(store: string, payload: T[]): Promise<boolean> {
    await this.cache.set(store, JSON.stringify(payload))
    return true
  }
}

export const cacheService = new CacheService(redisAdapter)
