import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { db } from '#/drizzle/client'
import { StatusCodes } from '#/enums/status-code'
import { subscribeToEvent } from '#/functions/subscribe-to-event'
import { redis } from '#/redis/client'

export const subscribeToItemRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/subscriptions',
    {
      schema: {
        summary: 'Subscribe someone to the event',
        tags: ['Subscription'],
        operationId: 'subscribeToEvent',
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          referrer: z.string().nullish(),
        }),
        response: {
          [StatusCodes.CREATED]: z.object({
            subscriberId: z.string(),
          }),
          [StatusCodes.BAD_REQUEST]: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name, email, referrer } = request.body

      const { subscriberId } = await subscribeToEvent({
        name,
        email,
        referrerId: referrer || null,
        db,
        redis,
      })

      return reply.status(StatusCodes.CREATED).send({ subscriberId })
    }
  )
}
