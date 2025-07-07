import { UserController } from '@controllers/user.controller.ts'
import { UserRepository } from '@repositories/user.repositories.ts'
import { httpSchema } from '@schema/http.schema.ts'
import { userInsertSchema, userSelectSchema } from '@schema/user.schema.ts'
import { UserServices } from '@services/user.services.ts'
import type { FastifyPluginOptions } from 'fastify'
import { z } from 'zod'
import type { FastifyInstanceZod } from '@/types/server.types.ts'

export function userRoutes(
  fastify: FastifyInstanceZod,
  opts: FastifyPluginOptions
) {
  const repository = new UserRepository()
  const userServices = new UserServices(repository)
  const userController = new UserController(userServices)

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
