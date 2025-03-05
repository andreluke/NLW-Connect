import type { AccessInviteLinkParams } from '../@types'

export async function accessInviteLink({
  subscriberId,
  redis,
}: AccessInviteLinkParams) {
  await redis.hincrby('referral:access-count', subscriberId, 1)
}
