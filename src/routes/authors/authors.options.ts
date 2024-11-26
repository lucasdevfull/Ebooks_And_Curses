import {
  authorsInsertSchema,
  authorsSelectSchema,
} from '@/schema/authors.schema.ts'
import { categorySelectSchema } from '@/schema/categories.schema.ts'
import { httpSchema } from '@/schema/http.schema.ts'
import type { RouteShorthandOptions } from 'fastify'
import { z } from 'zod'

export const getAllAuthorsRouterOptions: RouteShorthandOptions = {
  schema: {
    response: {
      200: categorySelectSchema.array(),
      500: httpSchema,
    },
  },
}

export const getAuthorsByIdRouterOptions: RouteShorthandOptions = {
  schema: {
    params: z.object({
      id: z.string(),
    }),
    response: {
      200: categorySelectSchema,
      404: httpSchema,
      500: httpSchema,
    },
  },
}

export const createAuthorsRouterOptions: RouteShorthandOptions = {
  schema: {
    body: authorsInsertSchema,
    response: {
      201: authorsSelectSchema,
      400: httpSchema,
      500: httpSchema,
    },
  },
}

export const updateAuthorsRouterOptions: RouteShorthandOptions = {
  schema: {
    params: z.object({
      id: z.string(),
    }),
    body: authorsInsertSchema,
    response: {
      200: authorsSelectSchema,
      400: httpSchema,
      500: httpSchema,
    },
  },
}

export const deleteAuthorsRouterOptions: RouteShorthandOptions = {
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
