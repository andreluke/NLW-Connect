import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import type { FastifyInstance } from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { portSettings } from './base-config'

export function registerPlugins(app: FastifyInstance) {
  app.register(fastifyCors, {
    origin: portSettings.BASE_URL,
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
}
