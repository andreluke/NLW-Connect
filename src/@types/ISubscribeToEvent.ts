import type { Redis } from 'ioredis'
import type { dbType } from '#/drizzle/client'

interface DBClient {
  select: () => {
    from: (table: unknown) => {
      where: (condition: unknown) => Promise<{ id: string }[]>
    }
  }
  insert: (table: unknown) => {
    values: (data: { name: string; email: string }) => {
      returning: () => Promise<{ id: string }[]>
    }
  }
}

interface RedisClient {
  zincrby: (key: string, increment: number, member: string) => Promise<number>
}

interface SubscribeToEventParams {
  name: string
  email: string
  referrerId: string | null
  db: DBClient | dbType
  redis: RedisClient | Redis
}

export type {
  SubscribeToEventParams,
  DBClient as SubscribeDB,
  RedisClient as RedisClientZincrby,
}
