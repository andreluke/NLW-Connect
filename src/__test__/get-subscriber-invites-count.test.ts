import { getSubscriberInvitesCount } from '#/functions'
import { mockZscore, userId } from './mocks'

describe('GetSubscriberInvitesCount', () => {
  it('Deve chamar redis.zscore com os parâmetros corretos', async () => {
    await getSubscriberInvitesCount({
      subscriberId: 'user123',
      redis: mockZscore,
    })

    expect(mockZscore.zscore).toHaveBeenCalledWith('referral:ranking', userId)
  })

  it('Deve garantir que redis.zscore foi chamado duas vezes', async () => {
    await getSubscriberInvitesCount({
      subscriberId: 'user123',
      redis: mockZscore,
    })

    expect(mockZscore.zscore).toHaveBeenCalledTimes(2)
  })

  it('Deve garantir que resultado venha com a contagem correta', async () => {
    const { count } = await getSubscriberInvitesCount({
      subscriberId: userId,
      redis: mockZscore,
    })

    expect(count).toBe(3)
  })
})
