import type { FastifyInstanceZod } from '@/types/server.types.ts'
import { CategoryController } from '@controllers/category.controller.ts'
import type { FastifyInstance, FastifyPluginOptions } from 'fastify'
import {
  createCategoryRouterOptions,
  deleteCategoryRouterOptions,
  getAllCategoriesRouterOptions,
  getCategoryByIdRouterOptions,
  updateCategoryRouterOptions,
} from './category.options.ts'

export function categoryRoutes(
  fastify: FastifyInstanceZod,
  opts: FastifyPluginOptions
) {
  const categoryController = new CategoryController()
  fastify.get(
    '/categories',
    getAllCategoriesRouterOptions,
    categoryController.getAllCategories
  )
  fastify.get(
    '/categories/:id',
    getCategoryByIdRouterOptions,
    categoryController.getCategoryById
  )
  fastify.post(
    '/categories',
    createCategoryRouterOptions,
    categoryController.createCategory
  )
  fastify.put(
    '/categories/:id',
    updateCategoryRouterOptions,
    categoryController.updateCategory
  )
  fastify.delete(
    '/categories/:id',
    deleteCategoryRouterOptions,
    categoryController.deleteCategory
  )
}
