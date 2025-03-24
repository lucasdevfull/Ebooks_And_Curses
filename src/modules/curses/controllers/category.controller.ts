import { HttpStatus } from '@/common/enum/http.ts'
import type { TCategory } from '@/types/curse.types.ts'
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
    const categories = await this.service.getAllCategories()
    return reply.status(HttpStatus.OK).send(categories)
  }

  getCategoryById = async (
    { params: { id } }: FastifyRequest<CategoryRequest>,
    reply: FastifyReply
  ): Promise<TCategory | Error> => {
    const category = await this.service.getCategoryById(Number(id))

    return reply.status(HttpStatus.OK).send(category)
  }

  createCategory = async (
    { body }: FastifyRequest<CategoryBodyRequest>,
    reply: FastifyReply
  ): Promise<TCategory> => {
    const newCategory = await this.service.createCategory(body)
    return reply.status(HttpStatus.CREATED).send(newCategory)
  }

  updateCategory = async (
    { body, params: { id } }: FastifyRequest<CategoryBodyRequest>,
    reply: FastifyReply
  ): Promise<TCategory> => {
    const updatedCategory = await this.service.updateCategory(Number(id), body)
    return reply.status(HttpStatus.OK).send(updatedCategory)
  }

  deleteCategory = async (
    { params: { id } }: FastifyRequest<CategoryRequest>,
    reply: FastifyReply
  ): Promise<{ message: string }> => {
    const result = await this.service.deleteCategory(Number(id))
    return reply.status(HttpStatus.NO_CONTENT).send(result)
  }
}
