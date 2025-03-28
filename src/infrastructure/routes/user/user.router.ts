import type { FastifyInstanceZod } from '@/types/server.types.ts'
import { UserController } from '@controllers/user.controller.ts'
import type { FastifyPluginOptions } from 'fastify'
import {
  createUserRouterOptions,
  getUserRouterOptions,
  getUsersRouterOptions,
} from './user.options.ts'

export function userRoutes(
  fastify: FastifyInstanceZod,
  opts: FastifyPluginOptions
) {
  const userController = new UserController()
  fastify.get('/users', getUsersRouterOptions, userController.getUsers)
  fastify.get('/users/:id', getUserRouterOptions, userController.getUser)
  fastify.post('/users', createUserRouterOptions, userController.createUser)
}
