import { GenreController } from '@controllers/genre.controller.ts'
import { verifyToken } from '@hooks/verify-token.ts'
import { GenreRepository } from '@repositories/genre.repositories.ts'
import { genreIsertSchema, genreSelectSchema } from '@schema/genre.schema.ts'
import { httpSchema } from '@schema/http.schema.ts'
import { GenreServices } from '@services/genre.services.ts'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const genreRoutes: FastifyPluginAsyncZod = async fastify => {
  const repository = new GenreRepository()
  const genreServices = new GenreServices(repository)
  const genreController = new GenreController(genreServices)

  fastify.get(
    '/genres',
    {
      schema: {
        tags: ['genres'],
        description: 'Get all genres',
        response: {
          200: genreSelectSchema.array(),
          401: httpSchema,
          500: httpSchema,
        },
      },
      onRequest: verifyToken,
    },
    genreController.getAllGenres
  )

  fastify.get(
    '/genres/:id',
    {
      schema: {
        tags: ['genres'],
        description: 'Get genre by id',
        params: z.object({
          id: z.string(),
        }),
        response: {
          200: genreSelectSchema,
          401: httpSchema,
          404: httpSchema,
          500: httpSchema,
        },
      },
      onRequest: verifyToken,
    },
    genreController.getGenre
  )

  fastify.post(
    '/genres',
    {
      schema: {
        tags: ['genres'],
        description: 'Create genre',
        body: genreIsertSchema,
        response: {
          201: genreSelectSchema,
          400: httpSchema,
          401: httpSchema,
          500: httpSchema,
        },
      },
      onRequest: verifyToken,
    },
    genreController.createGenre
  )

  fastify.put(
    '/genres/:id',
    {
      schema: {
        tags: ['genres'],
        description: 'Update genre',
        params: z.object({
          id: z.string(),
        }),
        body: genreIsertSchema,
        response: {
          200: genreSelectSchema,
          400: httpSchema,
          401: httpSchema,
          500: httpSchema,
        },
      },
      onRequest: verifyToken,
    },
    genreController.updateGenre
  )

  fastify.delete(
    '/genres/:id',
    {
      schema: {
        tags: ['genres'],
        description: 'Delete genre',
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
    genreController.deleteGenre
  )
}
