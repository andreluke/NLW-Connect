import type { RedisClientZincrby, SubscribeDB } from '#/@types'

const subscribersMap: { [email: string]: { id: string; name: string } } = {}

const rankingMap: { [key: string]: { [member: string]: number } } = {}

const mockDbSubscribe: SubscribeDB = {
  select: jest.fn(() => ({
    from: () => ({
      where: async (condition: unknown) => {
        if (
          typeof condition === 'object' &&
          condition !== null &&
          'email' in condition &&
          // biome-ignore lint/suspicious/noExplicitAny: <explanation>
          typeof (condition as any).email === 'string'
        ) {
          // biome-ignore lint/suspicious/noExplicitAny: <explanation>
          const email = (condition as any).email
          const subscriber = subscribersMap[email]
          return subscriber ? [{ id: subscriber.id }] : []
        }
        return []
      },
    }),
  })),

  insert: jest.fn(() => ({
    values: (data: { name: string; email: string }) => ({
      returning: async () => {
        if (!subscribersMap[data.email]) {
          const id = `id-${Object.keys(subscribersMap).length + 1}`
          subscribersMap[data.email] = { id, name: data.name }
          return [{ id }]
        }
        return [{ id: subscribersMap[data.email].id }]
      },
    }),
  })),
}

const mockZincrby: RedisClientZincrby = {
  zincrby: jest.fn(
    async (key: string, increment: number | string, member: string) => {
      const incrementValue =
        typeof increment === 'string' ? Number.parseInt(increment) : increment

      if (!rankingMap[key]) {
        rankingMap[key] = {}
      }

      if (!rankingMap[key][member]) {
        rankingMap[key][member] = 0
      }

      rankingMap[key][member] += incrementValue

      const sortedMembers = Object.entries(rankingMap[key])
        .sort(([, a], [, b]) => b - a)
        .reduce(
          (acc, [member, value]) => {
            acc[member] = value
            return acc
          },
          {} as { [member: string]: number }
        )

      rankingMap[key] = sortedMembers

      return rankingMap[key][member]
    }
  ),
}

export { mockDbSubscribe, mockZincrby }

export { subscribersMap, rankingMap }
