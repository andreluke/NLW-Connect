import type { Redis } from 'ioredis'

interface RedisClient {
  zscore: (
    key: string | Buffer,
    member: string | Buffer | number
  ) => Promise<string | null>
}

interface GetSubscriberInvitesCountParams {
  subscriberId: string
  redis: RedisClient | Redis
}

export type {
  GetSubscriberInvitesCountParams,
  RedisClient as RedisClientZscore,
}
