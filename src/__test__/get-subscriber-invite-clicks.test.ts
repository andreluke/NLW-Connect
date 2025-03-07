import { getSubscriberInviteClicks } from '#/functions'
import { mockHget, userId } from './mocks'

describe('GetSubscriberInviteClicks', () => {
  it('Deve chamar redis.hget com os parâmetros corretos', async () => {
    await getSubscriberInviteClicks({
      subscriberId: 'user123',
      redis: mockHget,
    })

    expect(mockHget.hget).toHaveBeenCalledWith('referral:access-count', userId)
  })

  it('Deve garantir que redis.hget foi chamado duas vezes', async () => {
    await getSubscriberInviteClicks({
      subscriberId: 'user123',
      redis: mockHget,
    })

    expect(mockHget.hget).toHaveBeenCalledTimes(2)
  })

  it('Deve garantir que resultado venha com a contagem correta', async () => {
    const { count } = await getSubscriberInviteClicks({
      subscriberId: userId,
      redis: mockHget,
    })

    expect(count).toBe(3)
  })
})
