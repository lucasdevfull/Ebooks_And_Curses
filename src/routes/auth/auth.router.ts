import { AuthController } from '@controllers/auth.controller.ts'
import type { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { loginAuthRouterOptions } from './auth.options.ts'

export function authRoutes(
  fastify: FastifyInstance,
  opts: FastifyPluginOptions
) {
  const authController = new AuthController()
  fastify.post('/auth', loginAuthRouterOptions, authController.login)
}
