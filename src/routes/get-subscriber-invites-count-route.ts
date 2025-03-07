import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { StatusCodes } from '#/enums/status-code'
import { getSubscriberInvitesCount } from '#/functions/get-subscriber-invites-count'
import { redis } from '#/redis/client'

export const getSubscriberInvitesCountRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/subscribers/:subscriberId/ranking/count',
      {
        schema: {
          summary: 'Get subscriber invites count',
          tags: ['Referral'],
          operationId: 'getSubscriberInviteCount',
          params: z.object({
            subscriberId: z.string(),
          }),
          response: {
            [StatusCodes.OK]: z.object({
              count: z.number(),
            }),
          },
        },
      },
      async request => {
        const { subscriberId } = request.params

        const { count } = await getSubscriberInvitesCount({
          subscriberId,
          redis,
        })

        return { count }
      }
    )
  }
