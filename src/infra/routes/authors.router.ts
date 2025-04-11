import type { FastifyInstanceZod } from '@/types/server.types.ts'
import { AuthorController } from '@controllers/author.controller.ts'
import type { FastifyPluginOptions } from 'fastify'
import {
  authorsInsertSchema,
  authorsSelectSchema,
} from '@/schema/authors.schema.ts'
import { httpSchema } from '@/schema/http.schema.ts'
import { verifyToken } from '@/common/hooks/verify-token.ts'
import { z } from 'zod'

export function authorsRoutes(
  fastify: FastifyInstanceZod,
  opts: FastifyPluginOptions
) {
  const authorsController = new AuthorController()

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
