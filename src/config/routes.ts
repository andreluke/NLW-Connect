import type { FastifyInstance } from 'fastify'
import { routes } from '#/routes/index'

export function registerRoutes(app: FastifyInstance) {
  for (const route of routes) {
    app.register(route)
  }
}
