import type { RedisClientHget } from '../../@types'

const counterMap: { [key: string]: { [field: string]: number } } = {
  'referral:access-count': { user123: 3 },
}

const mockHget: RedisClientHget = {
  hget: jest.fn(async (key: string, field: string | Buffer) => {
    if (!counterMap[key][field as string]) {
      return null
    }

    const result = `${counterMap[key][field as string]}`

    return result
  }),
}

export { mockHget }
