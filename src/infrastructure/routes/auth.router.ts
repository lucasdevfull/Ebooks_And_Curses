import type { FastifyInstanceZod } from '@/types/server.types.ts'
import { AuthController } from '@controllers/auth.controller.ts'
import type { FastifyPluginOptions } from 'fastify'
import { loginSchema } from '@/schema/user.schema.ts'
import { tokenSchema } from '@/schema/auth.schema.ts'
import { httpSchema } from '@/schema/http.schema.ts'

export function authRoutes(
  fastify: FastifyInstanceZod,
  opts: FastifyPluginOptions
) {
  const authController = new AuthController()

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
