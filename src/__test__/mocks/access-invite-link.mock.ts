import type { RedisClientHincrby } from '../../@types'

const counterMap: { [key: string]: { [field: string]: number } } = {}

const mockHincrby: RedisClientHincrby = {
  hincrby: jest.fn(
    async (key: string, field: string | Buffer, increment: number | string) => {
      const incrementValue =
        typeof increment === 'string' ? Number.parseInt(increment) : increment

      if (!counterMap[key]) {
        counterMap[key] = {}
      }

      if (!counterMap[key][field as string]) {
        counterMap[key][field as string] = 0
      }

      counterMap[key][field as string] += incrementValue

      const count = counterMap[key][field as string]
      return count
    }
  ),
}

export { mockHincrby }
