import { Redis } from 'ioredis'
import { env } from '../settings/env'

export const redis = new Redis(env.REDIS_URL)
