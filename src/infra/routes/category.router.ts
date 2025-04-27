import { verifyToken } from '@/common/hooks/verify-token.ts'
import {
  categoryInsertSchema,
  categorySelectSchema,
} from '@/schema/categories.schema.ts'
import { httpSchema } from '@/schema/http.schema.ts'
import type { FastifyInstanceZod } from '@/types/server.types.ts'
import { CategoryController } from '@controllers/category.controller.ts'
import type { FastifyPluginOptions } from 'fastify'
import { z } from 'zod'

export function categoryRoutes(
  fastify: FastifyInstanceZod,
  opts: FastifyPluginOptions
) {
  const categoryController = new CategoryController()

  fastify.get(
    '/categories',
    {
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
    },
    categoryController.getAllCategories
  )

  fastify.get(
    '/categories/:id',
    {
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
    },
    categoryController.getCategoryById
  )

  fastify.post(
    '/categories',
    {
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
    },
    categoryController.createCategory
  )

  fastify.put(
    '/categories/:id',
    {
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
    },
    categoryController.updateCategory
  )

  fastify.delete(
    '/categories/:id',
    {
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
    },
    categoryController.deleteCategory
  )
}
