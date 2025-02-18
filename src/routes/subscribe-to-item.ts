import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { StatusCodes } from '../enums/statuscode'

export const subscribeToItem: FastifyPluginAsyncZod = async app => {
  app.post(
    '/subscriptions',
    {
      schema: {
        summary: 'Subscribe someone to the event',
        tags: ['Subscription'],
        body: z.object({
          name: z.string(),
          email: z.string().email(),
        }),
        response: {
          [StatusCodes.CREATED]: z.object({
            name: z.string(),
            email: z.string().email(),
          }),
          [StatusCodes.BAD_REQUEST]: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name, email } = request.body

      return reply.status(StatusCodes.CREATED).send({ name, email })
    }
  )
}
