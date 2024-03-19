import Redis from 'ioredis'
import constants from '../constants'

export const redisClient = new Redis({
  host: constants.REDIS_HOST,
  password: constants.REDIS_PASSWORD,
  port: Number(constants.REDIS_PORT)
})
