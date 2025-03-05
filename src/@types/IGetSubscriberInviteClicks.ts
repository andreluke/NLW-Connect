import type { Redis } from 'ioredis'

interface RedisClient {
  hget: (key: string, field: string | Buffer) => Promise<string | null>
}

interface GetSubscriberInviteClicksParams {
  subscriberId: string
  redis: RedisClient | Redis
}

export type { GetSubscriberInviteClicksParams }
