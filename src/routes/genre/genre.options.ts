import { genreIsertSchema, genreSelectSchema } from '@/schema/genre.schema.ts'
import { httpSchema } from '@/schema/http.schema.ts'
import type { RouteShorthandOptions } from 'fastify'
import { z } from 'zod'

export const getAllGenresRouterOptions: RouteShorthandOptions = {
  schema: {
    response: {
      200: genreSelectSchema.array(),
      500: httpSchema,
    },
  },
}

export const getGenreByIdRouterOptions: RouteShorthandOptions = {
  schema: {
    params: z.object({
      id: z.string(),
    }),
    response: {
      200: genreSelectSchema,
      404: httpSchema,
      500: httpSchema,
    },
  },
}

export const createGenreRouterOptions: RouteShorthandOptions = {
  schema: {
    body: genreIsertSchema,
    response: {
      201: genreSelectSchema,
      400: httpSchema,
      500: httpSchema,
    },
  },
}

export const updateGenreRouterOptions: RouteShorthandOptions = {
  schema: {
    params: z.object({
      id: z.string(),
    }),
    body: genreIsertSchema,
    response: {
      200: genreSelectSchema,
      400: httpSchema,
      500: httpSchema,
    },
  },
}

export const deleteGenreRouterOptions: RouteShorthandOptions = {
  schema: {
    response: {
      204: z.object({
        message: z.string(),
      }),
      400: httpSchema,
      500: httpSchema,
    },
  },
}
