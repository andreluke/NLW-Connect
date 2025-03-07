import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { db } from '#/drizzle/client'
import { StatusCodes } from '#/enums/status-code'
import { getRanking } from '#/functions/get-ranking'
import { redis } from '#/redis/client'

export const getRankingRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/ranking',
    {
      schema: {
        summary: 'Get ranking',
        tags: ['Referral'],
        operationId: 'getRanking',
        response: {
          [StatusCodes.OK]: z.object({
            ranking: z.array(
              z.object({
                id: z.string(),
                name: z.string(),
                score: z.number(),
              })
            ),
          }),
        },
      },
    },
    async request => {
      const { rankingWithScore } = await getRanking({ redis, db })

      return { ranking: rankingWithScore }
    }
  )
}
