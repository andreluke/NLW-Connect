import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { StatusCodes } from '#/enums/status-code'
import { accessInviteLink } from '#/functions/access-invite-link'
import { redis } from '#/redis/client'
import { env } from '#/settings/env'

export const accessInviteLinkRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/invites/:subscriberId',
    {
      schema: {
        summary: 'Access invite link and redirect user',
        tags: ['Referral'],
        operationId: 'accessInviteLink',
        params: z.object({
          subscriberId: z.string(),
        }),
        response: {
          [StatusCodes.MOVED_TEMPORARILY]: z.null(),
          [StatusCodes.BAD_REQUEST]: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { subscriberId } = request.params

      await accessInviteLink({ subscriberId, redis })

      const redirectUrl = new URL(env.WEB_URL)

      redirectUrl.searchParams.set('referrer', subscriberId)

      return reply.redirect(
        redirectUrl.toString(),
        StatusCodes.MOVED_TEMPORARILY
      )
    }
  )
}
