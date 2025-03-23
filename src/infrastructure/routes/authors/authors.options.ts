import { verifyToken } from '@/common/hooks/verifyToken.ts'
import {
  authorsInsertSchema,
  authorsSelectSchema,
  categorySelectSchema,
  httpSchema,
} from '@schema/index.schema.ts'
import type { RouteShorthandOptions } from 'fastify'
import { z } from 'zod'

export const getAllAuthorsRouterOptions: RouteShorthandOptions = {
  schema: {
    tags: ['authors'],
    description: 'Get all authors',
    response: {
      200: categorySelectSchema.array(),
      401: httpSchema,
      500: httpSchema,
    },
  },
  onRequest: verifyToken,
}

export const getAuthorsByIdRouterOptions: RouteShorthandOptions = {
  schema: {
    tags: ['authors'],
    description: 'Get author by id',
    params: z.object({
      id: z.string(),
    }),
    response: {
      200: categorySelectSchema,
      401: httpSchema,
      404: httpSchema,
      500: httpSchema,
    },
  },
  onRequest: verifyToken,
}

export const createAuthorsRouterOptions: RouteShorthandOptions = {
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
}

export const updateAuthorsRouterOptions: RouteShorthandOptions = {
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
}

export const deleteAuthorsRouterOptions: RouteShorthandOptions = {
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
}
