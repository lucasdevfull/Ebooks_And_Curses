import { HttpStatus } from '@/common/enum/http.ts'
import type { NewAuthor, TAuthor } from '@/types/ebooks.types.ts'
import type {
  AuthorBodyRequest,
  AuthorRequest,
  IAuthorController,
} from '@interface/authors.interface.ts'
import { AuthorServices } from '@services/author.services.ts'
import type { FastifyReply, FastifyRequest } from 'fastify'

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
    return reply.status(HttpStatus.OK).send(authors)
  }

  createAuthor = async (
    { body }: FastifyRequest<AuthorBodyRequest>,
    reply: FastifyReply
  ): Promise<TAuthor> => {
    const result = await this.service.createAuthor(body)
    return reply.status(HttpStatus.CREATED).send(result)
  }

  getAuthor = async (
    { params: { id } }: FastifyRequest<AuthorRequest>,
    reply: FastifyReply
  ): Promise<TAuthor> => {
    const result = await this.service.getAuthorById(Number(id))
    return reply.status(HttpStatus.OK).send(result)
  }

  updateAuthor = async (
    { body, params: { id } }: FastifyRequest<AuthorBodyRequest>,
    reply: FastifyReply
  ): Promise<TAuthor> => {
    const result = await this.service.updateAuthor(Number(id), body)
    return reply.status(HttpStatus.OK).send(result)
  }

  deleteAuthor = async (
    { params: { id } }: FastifyRequest<AuthorRequest>,
    reply: FastifyReply
  ): Promise<{ message: string }> => {
    const result = await this.service.deleteAuthor(Number(id))
    return reply.status(HttpStatus.NO_CONTENT).send(result)
  }
}
