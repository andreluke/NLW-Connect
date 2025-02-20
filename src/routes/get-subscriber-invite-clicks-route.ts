import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { StatusCodes } from '../enums/status-code'
import { getSubscriberInviteClicks } from '../functions/get-subscriber-invite-clicks'

export const getSubscriberInviteClicksRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/subscribers/:subscriberId/ranking/clicks',
      {
        schema: {
          summary: 'Get the number of clicks on the subscriber invite link',
          tags: ['Referral'],
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

        const { count } = await getSubscriberInviteClicks({ subscriberId })

        return { count }
      }
    )
  }
