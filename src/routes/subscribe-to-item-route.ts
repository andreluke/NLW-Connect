import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { StatusCodes } from '../enums/status-code'
import { subscribeToEvent } from '../functions/subscribe-to-event'

export const subscribeToItemRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/subscriptions',
    {
      schema: {
        summary: 'Subscribe someone to the event',
        tags: ['Subscription'],
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          referrer: z.string().nullable(),
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
        referrerId: referrer,
      })

      return reply.status(StatusCodes.CREATED).send({ subscriberId })
    }
  )
}
