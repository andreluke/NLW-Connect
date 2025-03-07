import { eq } from 'drizzle-orm'
import type { SubscribeToEventParams } from '#/@types'
import { subscriptions } from '#/drizzle/schema/subscriptions'

export async function subscribeToEvent({
  name,
  email,
  referrerId,
  db,
  redis,
}: SubscribeToEventParams) {
  const subscribers = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.email, email))
  if (subscribers.length > 0) {
    return {
      subscriberId: subscribers[0].id,
    }
  }

  const result = await db
    .insert(subscriptions)
    .values({
      name,
      email,
    })
    .returning()

  if (referrerId) {
    await redis.zincrby('referral:ranking', 1, referrerId)
  }

  const subscriber = result[0]

  return {
    subscriberId: subscriber.id,
  }
}
