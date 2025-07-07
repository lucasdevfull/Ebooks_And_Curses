import { AuthorController } from '@controllers/author.controller.ts'
import { verifyToken } from '@hooks/verify-token.ts'
import { AuthorRepository } from '@repositories/author.repositories.ts'
import {
  authorsInsertSchema,
  authorsSelectSchema,
} from '@schema/authors.schema.ts'
import { httpSchema } from '@schema/http.schema.ts'
import { AuthorServices } from '@services/author.services.ts'
import type { FastifyPluginOptions } from 'fastify'
import { z } from 'zod'
import type { FastifyInstanceZod } from '@/types/server.types.ts'

export function authorsRoutes(
  fastify: FastifyInstanceZod,
  opts: FastifyPluginOptions
) {
  const repository = new AuthorRepository()
  const authorsServices = new AuthorServices(repository)
  const authorsController = new AuthorController(authorsServices)

  fastify.get(
    '/authors',
    {
      schema: {
        tags: ['authors'],
        description: 'Get all authors',
        response: {
          200: authorsSelectSchema.array(),
          401: httpSchema,
          500: httpSchema,
        },
      },
      onRequest: verifyToken,
    },
    authorsController.getAllAuthors
  )

  fastify.get(
    '/authors/:id',
    {
      schema: {
        tags: ['authors'],
        description: 'Get author by id',
        params: z.object({
          id: z.string(),
        }),
        response: {
          200: authorsSelectSchema,
          401: httpSchema,
          404: httpSchema,
          500: httpSchema,
        },
      },
      onRequest: verifyToken,
    },
    authorsController.getAuthor
  )

  fastify.post(
    '/authors',
    {
      schema: {
        tags: ['authors'],
        description: 'Create author',
        body: authorsInsertSchema,
        response: {
          201: authorsSelectSchema,
          400: httpSchema,
          401: httpSchema,
          500: httpSchema,
        },
      },
      onRequest: verifyToken,
    },
    authorsController.createAuthor
  )

  fastify.put(
    '/authors/:id',
    {
      schema: {
        tags: ['authors'],
        description: 'Update author',
        params: z.object({
          id: z.string(),
        }),
        body: authorsInsertSchema,
        response: {
          200: authorsSelectSchema,
          400: httpSchema,
          401: httpSchema,
          500: httpSchema,
        },
      },
      onRequest: verifyToken,
    },
    authorsController.updateAuthor
  )

  fastify.delete(
    '/authors/:id',
    {
      schema: {
        tags: ['authors'],
        description: 'Delete author',
        response: {
          204: z.object({
            message: z.string(),
          }),
          400: httpSchema,
          401: httpSchema,
          500: httpSchema,
        },
      },
      onRequest: verifyToken,
    },
    authorsController.deleteAuthor
  )
}
