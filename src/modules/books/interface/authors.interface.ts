import type { NewAuthor, TAuthor } from '@/@types/ebooks.ts'
import type { FastifyReply, FastifyRequest } from 'fastify'

export interface IAuthorController {
  getAllAuthors(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<TAuthor[]>
  createAuthor(request: FastifyRequest, reply: FastifyReply): Promise<TAuthor>
  getAuthor(request: FastifyRequest, reply: FastifyReply): Promise<TAuthor>
  updateAuthor(request: FastifyRequest, reply: FastifyReply): Promise<TAuthor>
  deleteAuthor(
    request: FastifyRequest,
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

export interface IAuthorRepository {
  create(data: NewAuthor): Promise<TAuthor>
  findAuthorById(authorId: number): Promise<TAuthor>
  getAllAuthors(): Promise<TAuthor[]>
  findAuthorByName(name: string): Promise<TAuthor[]>
  updateAuthor(id: number, data: NewAuthor): Promise<TAuthor>
  deleteAuthor(id: number): Promise<TAuthor>
}
