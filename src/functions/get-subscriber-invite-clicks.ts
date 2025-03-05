import type { GetSubscriberInviteClicksParams } from '../@types'

export async function getSubscriberInviteClicks({
  subscriberId,
  redis,
}: GetSubscriberInviteClicksParams) {
  const count = await redis.hget('referral:access-count', subscriberId)

  return {
    count: count ? Number.parseInt(count) : 0,
  }
}
