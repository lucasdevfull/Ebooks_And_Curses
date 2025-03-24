import { verifyToken } from '@/common/hooks/verify-token.ts'
import {
  genreIsertSchema,
  genreSelectSchema,
  httpSchema,
} from '@schema/index.schema.ts'
import type { RouteShorthandOptions } from 'fastify'
import { z } from 'zod'

export const getAllGenresRouterOptions: RouteShorthandOptions = {
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
}

export const getGenreByIdRouterOptions: RouteShorthandOptions = {
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
}

export const createGenreRouterOptions: RouteShorthandOptions = {
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
}

export const updateGenreRouterOptions: RouteShorthandOptions = {
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
}

export const deleteGenreRouterOptions: RouteShorthandOptions = {
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
}
