import { CategoryController } from '@controllers/category.controller.ts'
import { verifyToken } from '@hooks/verify-token.ts'
import { CategoryRepository } from '@repositories/category.repositories.ts'
import {
  categoryInsertSchema,
  categorySelectSchema,
} from '@schema/categories.schema.ts'
import { httpSchema } from '@schema/http.schema.ts'
import { CategoryServices } from '@services/category.services.ts'
import type { FastifyPluginOptions } from 'fastify'
import { z } from 'zod'
import type { FastifyInstanceZod } from '@/types/server.types.ts'

export function categoryRoutes(
  fastify: FastifyInstanceZod,
  opts: FastifyPluginOptions
) {
  const repository = new CategoryRepository()
  const categoryServices = new CategoryServices(repository)
  const categoryController = new CategoryController(categoryServices)

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
