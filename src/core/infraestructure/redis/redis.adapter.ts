import type Redis from 'ioredis'
import { type RedisOutputPort } from '../ports/redis/redis.port'
import { redisClient } from '@core/shared/configs/redis-client.config'

export default class RedisAdapter implements RedisOutputPort {
  constructor (
    private readonly redisClient: Redis
  ) { }

  async get (key: string): Promise<any> {
    return await new Promise((resolve, reject) => {
      void this.redisClient.get(key, (err, result) => {
        if (err !== null) reject(err)
        else resolve(result)
      })
    })
  }

  async set (key: string, payload: string | number | Buffer): Promise<void> {
    await new Promise((resolve, reject) => {
      void this.redisClient.set(key, payload, (err) => {
        if (err !== null) reject(err)
        else resolve('')
      })
    })
  }

  async del (key: string): Promise<void> {
    await new Promise((resolve, reject) => {
      void this.redisClient.del(key, (err) => {
        if (err !== null) reject(err)
        else resolve('')
      })
    })
  }
}

const redisAdapter = new RedisAdapter(redisClient)

export {
  redisAdapter
}
