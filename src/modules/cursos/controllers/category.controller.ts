import { NotFoundError } from '@/errors/not-found.ts'
import type { NewCategoria, TCategoria } from '@/types/cursos.types.ts'
import type {
  CategoryBodyRequest,
  CategoryRequest,
  ICategoriaController,
} from '@interface/categoria.interface.ts'
import { CategoryServices } from '@services/category.services.ts'
import type { FastifyReply, FastifyRequest } from 'fastify'

export class CategoryController implements ICategoriaController {
  private service: CategoryServices
  constructor() {
    this.service = new CategoryServices()
  }

  getAllCategories = async (
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<TCategoria[]> => {
    try {
      const categories = await this.service.getAllCategories()
      return reply.status(200).send(categories)
    } catch (error) {
      return reply.send(error)
    }
  }

  getCategoryById = async (
    request: FastifyRequest<CategoryRequest>,
    reply: FastifyReply
  ): Promise<TCategoria | Error> => {
    try {
      const { id } = request.params
      const category = await this.service.getCategoryById(Number(id))
      if (!category) {
        return new NotFoundError('Category not found')
      }
      return reply.status(200).send(category)
    } catch (error) {
      return reply.send(error)
    }
  }

  createCategory = async (
    request: FastifyRequest<CategoryBodyRequest>,
    reply: FastifyReply
  ): Promise<TCategoria> => {
    try {
      const category: NewCategoria = request.body
      const newCategory = await this.service.createCategory(category)
      return reply.status(201).send(newCategory)
    } catch (error) {
      return reply.send(error)
    }
  }

  updateCategory = async (
    request: FastifyRequest<CategoryBodyRequest>,
    reply: FastifyReply
  ): Promise<TCategoria> => {
    try {
      const { id } = request.params
      const category = request.body
      const updatedCategory = await this.service.updateCategory(
        Number(id),
        category
      )
      return reply.status(200).send(updatedCategory)
    } catch (error) {
      return reply.send(error)
    }
  }

  deleteCategory = async (
    request: FastifyRequest<CategoryRequest>,
    reply: FastifyReply
  ): Promise<{ message: string }> => {
    try {
      const { id } = request.params
      const result = await this.service.deleteCategory(Number(id))
      return reply.send(result).status(200)
    } catch (error) {
      return reply.send(error)
    }
  }
}
