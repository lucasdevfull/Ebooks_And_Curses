import type { NewAuthor, TAuthor } from '@/types/ebooks.types.ts'
import type {
  FastifyReply,
  FastifyRequest,
  RouteGenericInterface,
} from 'fastify'

export interface AuthorRequest extends RouteGenericInterface {
  Params: {
    id: string
  }
}

export interface AuthorBodyRequest extends AuthorRequest {
  Body: NewAuthor
}
export interface IAuthorController {
  getAllAuthors(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<TAuthor[]>
  createAuthor(
    request: FastifyRequest<AuthorBodyRequest>,
    reply: FastifyReply
  ): Promise<TAuthor>
  getAuthor(
    request: FastifyRequest<AuthorRequest>,
    reply: FastifyReply
  ): Promise<TAuthor>
  updateAuthor(
    request: FastifyRequest<AuthorBodyRequest>,
    reply: FastifyReply
  ): Promise<TAuthor>
  deleteAuthor(
    request: FastifyRequest<AuthorRequest>,
    reply: FastifyReply
  ): Promise<{ message: string }>
}

export interface IAuthorServices {
  getAllAuthors(): Promise<TAuthor[]>
  createAuthor(data: NewAuthor): Promise<TAuthor>
  getAuthorById(authorId: number): Promise<TAuthor>
  updateAuthor(authorId: number, data: NewAuthor): Promise<TAuthor>
  deleteAuthor(authorId: number): Promise<{ message: string }>
}
