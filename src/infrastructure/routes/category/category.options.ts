import { verifyToken } from '@/common/hooks/verifyToken.ts'
import {
  categoryInsertSchema,
  categorySelectSchema,
  httpSchema,
} from '@schema/index.schema.ts'
import type { RouteShorthandOptions } from 'fastify'
import { z } from 'zod'

export const getAllCategoriesRouterOptions: RouteShorthandOptions = {
  schema: {
    tags: ['categories'],
    description: 'Get all categories',
    response: {
      200: categorySelectSchema.array(),
      401: httpSchema,
      500: httpSchema,
    },
  },
  onRequest: verifyToken,
}

export const getCategoryByIdRouterOptions: RouteShorthandOptions = {
  schema: {
    tags: ['categories'],
    description: 'Get category by id',
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

export const createCategoryRouterOptions: RouteShorthandOptions = {
  schema: {
    tags: ['categories'],
    description: 'Create category',
    body: categoryInsertSchema,
    response: {
      201: categorySelectSchema,
      400: httpSchema,
      401: httpSchema,
      500: httpSchema,
    },
  },
  onRequest: verifyToken,
}

export const updateCategoryRouterOptions: RouteShorthandOptions = {
  schema: {
    tags: ['categories'],
    description: 'Update category',
    params: z.object({
      id: z.string(),
    }),
    body: categoryInsertSchema,
    response: {
      200: categorySelectSchema,
      400: httpSchema,
      401: httpSchema,
      500: httpSchema,
    },
  },
  onRequest: verifyToken,
}

export const deleteCategoryRouterOptions: RouteShorthandOptions = {
  schema: {
    tags: ['categories'],
    description: 'Delete category',
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
