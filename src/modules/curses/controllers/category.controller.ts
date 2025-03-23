import type { NewCategory, TCategory } from '@/types/curse.types.ts'
import type {
  CategoryBodyRequest,
  CategoryRequest,
  ICategoriaController,
} from '@interface/category.interface.ts'
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
  ): Promise<TCategory[]> => {
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
  ): Promise<TCategory | Error> => {
    const { id } = request.params
    const category = await this.service.getCategoryById(Number(id))

    return reply.status(200).send(category)
  }

  createCategory = async (
    request: FastifyRequest<CategoryBodyRequest>,
    reply: FastifyReply
  ): Promise<TCategory> => {
    const category: NewCategory = request.body
    const newCategory = await this.service.createCategory(category)
    return reply.status(201).send(newCategory)
  }

  updateCategory = async (
    request: FastifyRequest<CategoryBodyRequest>,
    reply: FastifyReply
  ): Promise<TCategory> => {
    const { id } = request.params
    const category = request.body
    const updatedCategory = await this.service.updateCategory(
      Number(id),
      category
    )
    return reply.status(200).send(updatedCategory)
  }

  deleteCategory = async (
    request: FastifyRequest<CategoryRequest>,
    reply: FastifyReply
  ): Promise<{ message: string }> => {
    const { id } = request.params
    const result = await this.service.deleteCategory(Number(id))
    return reply.send(result).status(200)
  }
}
