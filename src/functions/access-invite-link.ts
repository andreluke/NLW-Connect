import type { AccessInviteLinkParams } from '#/@types'

export async function accessInviteLink({
  subscriberId,
  redis,
}: AccessInviteLinkParams) {
  const result = await redis.hincrby('referral:access-count', subscriberId, 1)

  return result
}
