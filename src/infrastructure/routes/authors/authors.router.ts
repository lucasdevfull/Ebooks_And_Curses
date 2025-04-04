import type { FastifyInstanceZod } from '@/types/server.types.ts'
import { AuthorController } from '@controllers/author.controller.ts'
import type { FastifyPluginOptions } from 'fastify'
import {
  createAuthorsRouterOptions,
  deleteAuthorsRouterOptions,
  getAllAuthorsRouterOptions,
  getAuthorsByIdRouterOptions,
  updateAuthorsRouterOptions,
} from './authors.options.ts'

export function authorsRoutes(
  fastify: FastifyInstanceZod,
  opts: FastifyPluginOptions
) {
  const authorsController = new AuthorController()
  fastify.get(
    '/authors',
    getAllAuthorsRouterOptions,
    authorsController.getAllAuthors
  )
  fastify.get(
    '/authors/:id',
    getAuthorsByIdRouterOptions,
    authorsController.getAuthor
  )
  fastify.post(
    '/authors',
    createAuthorsRouterOptions,
    authorsController.getAllAuthors
  )
  fastify.put(
    '/authors/:id',
    updateAuthorsRouterOptions,
    authorsController.updateAuthor
  )
  fastify.delete(
    '/authors/:id',
    deleteAuthorsRouterOptions,
    authorsController.deleteAuthor
  )
}
