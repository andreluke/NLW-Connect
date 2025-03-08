import { inArray } from 'drizzle-orm'
import type { GetRankingParams } from '#/@types'
import { subscriptions } from '#/drizzle/schema/subscriptions'

export async function getRanking({ redis, db }: GetRankingParams) {
  const ranking = await redis.zrevrange('referral:ranking', 0, 2, 'WITHSCORES')

  const subscriberMap: Record<string, number> = {}

  for (let i = 0; i < ranking.length; i += 2) {
    subscriberMap[ranking[i]] = Number.parseInt(ranking[i + 1])
  }

  const subscribers = await db
    .select()
    .from(subscriptions)
    .where(inArray(subscriptions.id, Object.keys(subscriberMap)))

  const rankingWithScore = subscribers
    .map(subscriber => {
      return {
        id: subscriber.id,
        name: subscriber.name,
        score: subscriberMap[subscriber.id],
      }
    })
    .sort((sub1, sub2) => sub2.score - sub1.score)

  return { rankingWithScore }
}
