import type { DBRanking, RedisClientZrevrange } from '#/@types'
import { isValidConditionArrayId } from './utils.mock'

const rankingSetMap: { [key: string]: { [member: string]: number } } = {}

const rankingSubscribersMap: { [id: string]: { id: string; name: string } } = {}

const mockZrevrange: RedisClientZrevrange = {
  zrevrange: jest.fn(
    async (key: string, start: number, stop: number, arg: string) => {
      if (arg !== 'WITHSCORES') return []

      const sortedRanking = Object.entries(rankingSetMap[key] || {})
        .sort(([, a], [, b]) => b - a)
        .flatMap(([id, score]) => [id, String(score)])
        .slice(start * 2, (stop + 1) * 2)

      return sortedRanking
    }
  ),
}

const mockDbRanking: DBRanking = {
  select: jest.fn(() => ({
    from: () => ({
      where: async (condition: unknown) => {
        if (
          isValidConditionArrayId(condition) &&
          condition.column === 'subscriptions.id'
        ) {
          const result = condition.values
            .filter((id: string) =>
              Object.keys(rankingSubscribersMap).includes(id)
            )
            .map((id: string) => {
              const subscriber = rankingSubscribersMap[id]
              return { id: subscriber.id, name: subscriber.name }
            })

          return result
        }
        return []
      },
    }),
  })),
}

export { mockDbRanking, mockZrevrange, rankingSubscribersMap, rankingSetMap }
