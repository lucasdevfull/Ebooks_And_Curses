import type { FastifyInstanceZod } from '@/types/server.types.ts'
import { UserController } from '@controllers/user.controller.ts'
import type { FastifyPluginOptions } from 'fastify'
import { userInsertSchema, userSelectSchema } from '@/schema/user.schema.ts'
import { httpSchema } from '@/schema/http.schema.ts'
import { z } from 'zod'

export function userRoutes(
  fastify: FastifyInstanceZod,
  opts: FastifyPluginOptions
) {
  const userController = new UserController()

  fastify.get(
    '/users',
    {
      schema: {
        tags: ['users'],
        description: 'Get all users',
        response: {
          200: userSelectSchema.omit({ password: true }).array(),
        },
      },
    },
    userController.getUsers
  )

  fastify.get(
    '/users/:id',
    {
      schema: {
        tags: ['users'],
        description: 'Get user by id',
        params: z.object({
          id: z.string(),
        }),
        response: {
          200: userSelectSchema.omit({ password: true }),
          404: httpSchema,
          500: httpSchema,
        },
      },
    },
    userController.getUser
  )

  fastify.post(
    '/users',
    {
      schema: {
        tags: ['users'],
        description: 'Create user',
        body: userInsertSchema,
        response: {
          201: userSelectSchema,
          500: httpSchema,
        },
      },
    },
    userController.createUser
  )
}
