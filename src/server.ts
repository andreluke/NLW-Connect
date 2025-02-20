import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import {
  type ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { accessInviteLinkRoute } from './routes/access-invite-link-route'
import { getRankingRoute } from './routes/get-ranking-route'
import { getSubscriberInviteClicksRoute } from './routes/get-subscriber-invite-clicks-route'
import { getSubscriberInvitesCountRoute } from './routes/get-subscriber-invites-count-route'
import { getSubscriberRankingPositionRoute } from './routes/get-subscriber-ranking-position-route'
import { subscribeToItemRoute } from './routes/subscribe-to-item-route'
import { env } from './settings/env'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: 'http://localhost:3333',
})

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'NLW Connect',
      version: '0.0.1',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(subscribeToItemRoute)
app.register(accessInviteLinkRoute)
app.register(getSubscriberInviteClicksRoute)
app.register(getSubscriberInvitesCountRoute)
app.register(getSubscriberRankingPositionRoute)
app.register(getRankingRoute)

app.listen({ port: env.PORT }).then(() => {
  console.log(`HTTP server running on port ${env.PORT}`)
})
