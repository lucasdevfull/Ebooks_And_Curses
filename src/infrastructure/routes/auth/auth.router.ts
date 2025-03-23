import type { FastifyInstanceZod } from '@/types/server.types.ts'
import { AuthController } from '@controllers/auth.controller.ts'
import { loginAuthRouterOptions } from './auth.options.ts'
import type { FastifyPluginOptions } from 'fastify'

export function authRoutes(
  fastify: FastifyInstanceZod,
  opts: FastifyPluginOptions
) {
  const authController = new AuthController()
  fastify.post('/auth', loginAuthRouterOptions, authController.login)
}
