import { getSubscriberRankingPosition } from '#/functions'
import { mockZrevrank, userId } from './mocks'

describe('GetSubscriberRankingPosition', () => {
  it('Deve chamar redis.zrevrank com os parâmetros corretos', async () => {
    await getSubscriberRankingPosition({
      subscriberId: 'user123',
      redis: mockZrevrank,
    })

    expect(mockZrevrank.zrevrank).toHaveBeenCalledWith(
      'referral:ranking',
      userId
    )
  })

  it('Deve garantir que redis.zrevrank foi chamado duas vezes', async () => {
    await getSubscriberRankingPosition({
      subscriberId: 'user123',
      redis: mockZrevrank,
    })

    expect(mockZrevrank.zrevrank).toHaveBeenCalledTimes(2)
  })

  it('Deve garantir que resultado venha com a contagem correta', async () => {
    const { position } = await getSubscriberRankingPosition({
      subscriberId: userId,
      redis: mockZrevrank,
    })

    expect(position).toBe(1)
  })
})
