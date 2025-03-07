import type { Redis } from 'ioredis'
import type { dbType } from '#/drizzle/client'

interface RedisClient {
  zrevrange: (
    key: string,
    start: number,
    stop: number,
    ...args: string[]
  ) => Promise<string[]>
}

interface DBClient {
  select: () => {
    from: (table: unknown) => {
      where: (condition: unknown) => Promise<{ id: string; name: string }[]>
    }
  }
}

interface GetRankingParams {
  redis: RedisClient | Redis
  db: DBClient | dbType
}

export type { GetRankingParams }
