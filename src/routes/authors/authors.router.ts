import type { NewAuthor } from '@/@types/ebooks.ts'
import { AuthorController } from '@/modules/books/controller/author.controller.ts'
import type { FastifyInstance, FastifyPluginOptions } from 'fastify'
import {
  createAuthorsRouterOptions,
  deleteAuthorsRouterOptions,
  getAllAuthorsRouterOptions,
  getAuthorsByIdRouterOptions,
  updateAuthorsRouterOptions,
} from './authors.options.ts'

export function authorsRoutes(
  fastify: FastifyInstance,
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
  fastify.post<{ Body: NewAuthor }>(
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
