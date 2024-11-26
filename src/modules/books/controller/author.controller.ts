import type { NewAuthor, TAuthor } from '@/@types/ebooks.ts'
import type { FastifyReply, FastifyRequest } from 'fastify'
import type { IAuthorController } from '../interface/authors.interface.ts'
import { AuthorServices } from '../services/author.services.ts'

export class AuthorController implements IAuthorController {
  private service: AuthorServices
  constructor() {
    this.service = new AuthorServices()
  }

  getAllAuthors = async (
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<TAuthor[]> => {
    const authors = await this.service.getAllAuthors()
    return reply.status(200).send(authors)
  }

  createAuthor = async (
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<TAuthor> => {
    try {
      const author = request.body as NewAuthor
      const result = await this.service.createAuthor(author)
      return reply.status(201).send(result)
    } catch (error) {
      return reply.status(500).send(error)
    }
  }

  getAuthor = async (
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<TAuthor> => {
    try {
      const { id } = request.params as { id: string }
      const result = await this.service.getAuthorById(Number(id))
      if (!result) {
        return reply.status(404).send({
          statusCode: 404,
          error: 'Not Found',
          message: 'Author not found',
        })
      }
      return reply.status(200).send(result)
    } catch (error) {
      return reply.status(500).send(error)
    }
  }

  updateAuthor = async (
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<TAuthor> => {
    try {
      const { id } = request.params as { id: string }
      const author = request.body as TAuthor
      const result = await this.service.updateAuthor(Number(id), author)
      return reply.status(200).send(result)
    } catch (error) {
      return reply.status(500).send(error)
    }
  }

  deleteAuthor = async (
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<{ message: string }> => {
    try {
      const { id } = request.params as { id: string }
      const result = await this.service.deleteAuthor(Number(id))
      return reply.status(204).send(result)
    } catch (error) {
      return reply.status(500).send(error)
    }
  }
}
