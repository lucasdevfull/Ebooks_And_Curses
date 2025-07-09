import { AuthController } from '@controllers/auth.controller.ts'
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { AuthServices } from '@/modules/auth/service/auth.services.ts'
import { UserRepository } from '@/modules/user/repositories/user.repositories.ts'
import { tokenSchema } from '@/schema/auth.schema.ts'
import { httpSchema } from '@/schema/http.schema.ts'
import { loginSchema } from '@/schema/user.schema.ts'

export const authRoutes: FastifyPluginCallbackZod = fastify => {
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
