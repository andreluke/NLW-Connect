import type { Redis } from 'ioredis'

interface RedisClient {
  hincrby: (
    key: string,
    field: string | Buffer,
    increment: number | string
  ) => Promise<number>
}

interface AccessInviteLinkParams {
  subscriberId: string
  redis: RedisClient | Redis
}

export type { AccessInviteLinkParams, RedisClient as RedisClientHincrby }
