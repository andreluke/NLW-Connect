import type { GetSubscriberRankingPositionParams } from '#/@types'

export async function getSubscriberRankingPosition({
  subscriberId,
  redis,
}: GetSubscriberRankingPositionParams) {
  const rank = await redis.zrevrank('referral:ranking', subscriberId)

  if (rank === null) {
    return { position: null }
  }

  return {
    position: rank + 1,
  }
}
