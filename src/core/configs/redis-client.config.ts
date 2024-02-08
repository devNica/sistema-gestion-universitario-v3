import constants from '@core/shared/constants'
import Redis from 'ioredis'

export const redisClient = new Redis({
  host: constants.REDIS_HOST,
  password: constants.REDIS_PASSWORD,
  port: Number(constants.REDIS_PORT)
})
