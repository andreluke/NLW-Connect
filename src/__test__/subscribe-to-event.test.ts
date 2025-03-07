import { subscribeToEvent } from '#/functions'
import {
  mockDbSubscribe,
  mockZincrby,
  rankingMap,
  subscribersMap,
} from './mocks'

describe('SubscribeToEvent', () => {
  it('Deve retornar o subscriberId se o usuário já estiver inscrito', async () => {
    subscribersMap['john@example.com'] = { id: 'existing-id', name: 'John Doe' }

    const result = await subscribeToEvent({
      name: 'John Doe',
      email: 'john@example.com',
      referrerId: null,
      db: mockDbSubscribe,
      redis: mockZincrby,
    })

    expect(result).toEqual({ subscriberId: 'existing-id' })
    expect(mockDbSubscribe.select).toHaveBeenCalled()
    expect(mockDbSubscribe.insert).toHaveBeenCalled()
  })

  it('Deve criar um novo usuário e retornar o subscriberId se não estiver inscrito', async () => {
    const result = await subscribeToEvent({
      name: 'Jane Doe',
      email: 'jane@example.com',
      referrerId: null,
      db: mockDbSubscribe,
      redis: mockZincrby,
    })

    expect(result).toEqual({ subscriberId: 'id-2' })
    expect(mockDbSubscribe.insert).toHaveBeenCalled()
    expect(mockZincrby.zincrby).not.toHaveBeenCalled()
  })

  it('Deve criar um novo usuário e incrementar o ranking do referrer no Redis', async () => {
    const result = await subscribeToEvent({
      name: 'Alice Doe',
      email: 'alice@example.com',
      referrerId: 'referrer-123',
      db: mockDbSubscribe,
      redis: mockZincrby,
    })

    expect(result).toEqual({ subscriberId: 'id-3' })
    expect(mockDbSubscribe.insert).toHaveBeenCalled()
    expect(mockZincrby.zincrby).toHaveBeenCalledWith(
      'referral:ranking',
      1,
      'referrer-123'
    )
    expect(rankingMap['referral:ranking']['referrer-123']).toBe(1)
  })

  it('Deve aumentar a pontuação do referrer corretamente em múltiplas chamadas', async () => {
    await subscribeToEvent({
      name: 'Bob Doe',
      email: 'bob@example.com',
      referrerId: 'referrer-123',
      db: mockDbSubscribe,
      redis: mockZincrby,
    })

    await subscribeToEvent({
      name: 'Charlie Doe',
      email: 'charlie@example.com',
      referrerId: 'referrer-123',
      db: mockDbSubscribe,
      redis: mockZincrby,
    })

    expect(rankingMap['referral:ranking']['referrer-123']).toBe(3)
  })
})
