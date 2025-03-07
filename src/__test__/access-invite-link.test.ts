import { accessInviteLink } from '../functions'
import { mockHincrby } from './mocks'

const userId = 'user123'

describe('AccessInviteLink', () => {
  it('Deve chamar redis.hincrby com os parâmetros corretos', async () => {
    await accessInviteLink({ subscriberId: userId, redis: mockHincrby })

    expect(mockHincrby.hincrby).toHaveBeenCalledWith(
      'referral:access-count',
      userId,
      1
    )
  })

  it('Deve garantir que redis.hincrby foi chamado duas vezes', async () => {
    await accessInviteLink({ subscriberId: userId, redis: mockHincrby })

    expect(mockHincrby.hincrby).toHaveBeenCalledTimes(2)
  })

  it('Deve garantir que resultado venha com a contagem correta', async () => {
    const result = await accessInviteLink({
      subscriberId: userId,
      redis: mockHincrby,
    })

    expect(result).toBe(3)
  })
})
