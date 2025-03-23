import type { NewCategory, TCategory } from '@/types/curse.types.ts'
import type {
  FastifyReply,
  FastifyRequest,
  RouteGenericInterface,
} from 'fastify'

export interface CategoryRequest extends RouteGenericInterface {
  Params: {
    id: string
  }
}
export interface CategoryBodyRequest extends CategoryRequest {
  Body: NewCategory
}
export interface ICategoriaController {
  getAllCategories(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<TCategory[]>
  getCategoryById(
    request: FastifyRequest<CategoryRequest>,
    reply: FastifyReply
  ): Promise<TCategory | Error>
  createCategory(
    request: FastifyRequest<CategoryRequest>,
    reply: FastifyReply
  ): Promise<TCategory>
  updateCategory(
    request: FastifyRequest<CategoryRequest>,
    reply: FastifyReply
  ): Promise<TCategory>
  deleteCategory(
    request: FastifyRequest<CategoryRequest>,
    reply: FastifyReply
  ): Promise<{ message: string }>
}
export interface ICategoriaServices {
  getAllCategories(): Promise<TCategory[]>
  getCategoryById(id: number): Promise<TCategory>
  createCategory(data: NewCategory): Promise<TCategory>
  updateCategory(id: number, data: NewCategory): Promise<TCategory>
  deleteCategory(id: number): Promise<{ message: string }>
}
