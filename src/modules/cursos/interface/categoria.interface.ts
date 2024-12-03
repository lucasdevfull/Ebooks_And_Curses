import type { NewCategoria, TCategoria } from '@/types/cursos.types.ts'
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
  Body: NewCategoria
}
export interface ICategoriaController {
  getAllCategories(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<TCategoria[]>
  getCategoryById(
    request: FastifyRequest<CategoryRequest>,
    reply: FastifyReply
  ): Promise<TCategoria>
  createCategory(
    request: FastifyRequest<CategoryRequest>,
    reply: FastifyReply
  ): Promise<TCategoria>
  updateCategory(
    request: FastifyRequest<CategoryRequest>,
    reply: FastifyReply
  ): Promise<TCategoria>
  deleteCategory(
    request: FastifyRequest<CategoryRequest>,
    reply: FastifyReply
  ): Promise<{ message: string }>
}
export interface ICategoriaServices {
  getAllCategories(): Promise<TCategoria[]>
  getCategoryById(id: number): Promise<TCategoria>
  createCategory(data: NewCategoria): Promise<TCategoria>
  updateCategory(id: number, data: NewCategoria): Promise<TCategoria>
  deleteCategory(id: number): Promise<{ message: string }>
}

export interface ICategoriaRepository {
  getAll(): Promise<TCategoria[]>
  getById(id: number): Promise<TCategoria>
  getByName(nome: string): Promise<TCategoria>
  create(data: NewCategoria): Promise<TCategoria>
  update(id: number, data: NewCategoria): Promise<TCategoria>
  delete(id: number): Promise<TCategoria>
}
