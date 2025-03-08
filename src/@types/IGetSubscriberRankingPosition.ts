import type { Redis } from 'ioredis'

interface RedisClient {
  zrevrank: (
    key: string | Buffer,
    member: string | Buffer | number
  ) => Promise<number | null>
}

interface GetSubscriberRankingPositionParams {
  subscriberId: string
  redis: RedisClient | Redis
}

export type {
  GetSubscriberRankingPositionParams,
  RedisClient as RedisClientZrevrank,
}
