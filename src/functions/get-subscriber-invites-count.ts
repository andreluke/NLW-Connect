import type { GetSubscriberInvitesCountParams } from '../@types'

export async function getSubscriberInvitesCount({
  subscriberId,
  redis,
}: GetSubscriberInvitesCountParams) {
  const count = await redis.zscore('referral:ranking', subscriberId)

  return {
    count: count ? Number.parseInt(count) : 0,
  }
}
