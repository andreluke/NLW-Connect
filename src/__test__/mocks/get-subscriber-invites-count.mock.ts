import type { RedisClientZscore } from '#/@types'

const scoreSetMap: { [key: string]: { [member: string]: number } } = {
  'referral:ranking': { user123: 3 },
}

const mockZscore: RedisClientZscore = {
  zscore: jest.fn(
    async (key: string | Buffer, member: string | Buffer | number) => {
      if (!scoreSetMap[key as string][member as string]) {
        return null
      }

      const result = `${scoreSetMap[key as string][member as string]}`

      return result
    }
  ),
}

export { mockZscore, scoreSetMap }
