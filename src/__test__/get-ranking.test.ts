import { inArray } from 'drizzle-orm'
import type { subscriptions } from '#/drizzle/schema/subscriptions'
import { getRanking } from '#/functions'
import {
  mockDbRanking,
  mockZrevrange,
  rankingSetMap,
  rankingSubscribersMap,
} from './mocks'

type columnType = typeof subscriptions.id

jest.mock('drizzle-orm', () => ({
  ...jest.requireActual('drizzle-orm'),

  inArray: jest.fn((_column: columnType, values: string[]) => {
    return {
      column: 'subscriptions.id',
      values,
    }
  }),
}))

describe('GetRanking', () => {
  it('Deve retornar uma lista vazia se não houver ranking', async () => {
    rankingSetMap['referral:ranking'] = {}

    const result = await getRanking({ redis: mockZrevrange, db: mockDbRanking })

    expect(result).toEqual({ rankingWithScore: [] })
    expect(mockZrevrange.zrevrange).toHaveBeenCalledWith(
      'referral:ranking',
      0,
      2,
      'WITHSCORES'
    )
  })

  it('Deve retornar os top referenciadores com seus scores', async () => {
    rankingSetMap['referral:ranking'] = {
      'user-1': 10,
      'user-2': 5,
      'user-3': 3,
    }

    rankingSubscribersMap['user-1'] = { id: 'user-1', name: 'Alice' }
    rankingSubscribersMap['user-2'] = { id: 'user-2', name: 'Bob' }
    rankingSubscribersMap['user-3'] = { id: 'user-3', name: 'Charlie' }

    const result = await getRanking({ redis: mockZrevrange, db: mockDbRanking })

    expect(result).toEqual({
      rankingWithScore: [
        { id: 'user-1', name: 'Alice', score: 10 },
        { id: 'user-2', name: 'Bob', score: 5 },
        { id: 'user-3', name: 'Charlie', score: 3 },
      ],
    })
  })

  it('Deve ordenar corretamente os vencedores do primeiro ao último', async () => {
    for (const key of Object.keys(rankingSetMap)) {
      delete rankingSetMap[key]
    }

    for (const key of Object.keys(rankingSubscribersMap)) {
      delete rankingSubscribersMap[key]
    }

    rankingSetMap['referral:ranking'] = {
      'user-1': 2,
      'user-2': 5,
      'user-3': 3,
    }

    rankingSubscribersMap['user-1'] = { id: 'user-1', name: 'Alice' }
    rankingSubscribersMap['user-2'] = { id: 'user-2', name: 'Bob' }
    rankingSubscribersMap['user-3'] = { id: 'user-3', name: 'Charlie' }

    const result = await getRanking({
      redis: mockZrevrange,
      db: mockDbRanking,
    })

    expect(result).toEqual({
      rankingWithScore: [
        { id: 'user-2', name: 'Bob', score: 5 },
        { id: 'user-3', name: 'Charlie', score: 3 },
        { id: 'user-1', name: 'Alice', score: 2 },
      ],
    })
  })
})
