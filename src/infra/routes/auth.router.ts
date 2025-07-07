import { AuthController } from '@controllers/auth.controller.ts'
import type { FastifyPluginOptions } from 'fastify'
import { AuthServices } from '@/modules/auth/service/auth.services.ts'
import { UserRepository } from '@/modules/user/repositories/user.repositories.ts'
import { tokenSchema } from '@/schema/auth.schema.ts'
import { httpSchema } from '@/schema/http.schema.ts'
import { loginSchema } from '@/schema/user.schema.ts'
import type { FastifyInstanceZod } from '@/types/server.types.ts'

export function authRoutes(
  fastify: FastifyInstanceZod,
  opts: FastifyPluginOptions
) {
  const repository = new UserRepository()
  const authService = new AuthServices(repository)
  const authController = new AuthController(authService)

  fastify.post(
    '/auth',
    {
      schema: {
        tags: ['auth'],
        description: 'Login',
        body: loginSchema,
        response: {
          200: tokenSchema,
          400: httpSchema,
          500: httpSchema,
        },
      },
    },
    authController.login
  )
}
