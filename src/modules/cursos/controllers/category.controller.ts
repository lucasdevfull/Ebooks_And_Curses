import type { NewCategoria, TCategoria } from '@/@types/cursos.ts'
import type { FastifyReply, FastifyRequest } from 'fastify'
import type { ICategoriaController } from '../interface/categoria.interface.ts'
import { CategoryServices } from '../services/category.services.ts'

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
      return reply.status(500).send(error)
    }
  }

  getCategoryById = async (
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<TCategoria> => {
    try {
      const { id } = request.params as { id: string }
      const category = await this.service.getCategoryById(Number(id))
      if (!category) {
        return reply.status(404).send({
          statusCode: 404,
          error: 'Not Found',
          message: 'Category not found',
        })
      }
      return reply.status(200).send(category)
    } catch (error) {
      return reply.status(500).send(error)
    }
  }

  createCategory = async (
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<TCategoria> => {
    try {
      const category = request.body as NewCategoria
      const newCategory = await this.service.createCategory(category)
      return reply.status(201).send(newCategory)
    } catch (error) {
      return reply.status(500).send(error)
    }
  }

  updateCategory = async (
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<TCategoria> => {
    try {
      const { id } = request.params as { id: string }
      const category = request.body as NewCategoria
      const updatedCategory = await this.service.updateCategory(
        Number(id),
        category
      )
      return reply.status(200).send(updatedCategory)
    } catch (error) {
      return reply.status(500).send(error)
    }
  }

  deleteCategory = async (
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<{ message: string }> => {
    try {
      const { id } = request.params as { id: string }
      const result = await this.service.deleteCategory(Number(id))
      return reply.send(result).status(200)
    } catch (error) {
      return reply.status(500).send(error)
    }
  }
}
