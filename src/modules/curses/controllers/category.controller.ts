import type {
  CategoryBodyRequest,
  CategoryRequest,
  ICategoriaController,
} from '@interface/category.interface.ts'
import type { CategoryServices } from '@services/category.services.ts'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { HttpStatus } from '@/common/enum/http.ts'
import type { TCategory } from '@/types/curse.types.ts'

export class CategoryController implements ICategoriaController {
  constructor(private service: CategoryServices) {
    this.service = service
  }

  getAllCategories = async (
    _request: FastifyRequest,
    reply: FastifyReply
  ): Promise<TCategory[]> => {
    const categories = await this.service.getAllCategories()
    return reply.status(HttpStatus.OK).send(categories)
  }

  getCategoryById = async (
    { params: { id } }: FastifyRequest<CategoryRequest>,
    reply: FastifyReply
  ): Promise<TCategory> => {
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
