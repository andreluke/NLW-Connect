import type { RedisClientZrevrank } from '#/@types'

type RankingMap = { [key: string]: { [member: string]: number } }

const rankMap: RankingMap = {
  'referral:ranking': { user123: 3, user456: 2, user789: 1 },
}

const mockZrevrank: RedisClientZrevrank = {
  zrevrank: jest.fn(
    async (key: string | Buffer, member: string | Buffer | number) => {
      if (!rankMap[key as string][member as string]) {
        return null
      }

      const sortedRanking = Object.entries(rankMap[key as string] || {})
        .sort(([, a], [, b]) => b - a)
        .flatMap(([id, score]) => [id, String(score)])

      const memberIndex = sortedRanking.findIndex((entry, index) => {
        return entry === member
      })

      console.log('memberIndex', memberIndex)

      if (memberIndex !== -1) {
        return Math.floor(memberIndex / 2)
      }

      return null
    }
  ),
}

export { mockZrevrank, rankMap }
