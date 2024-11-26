import type { NewGenre, TGenre } from '@/@types/ebooks.ts'
import type { FastifyReply, FastifyRequest } from 'fastify'

export interface IGenreController {
  getAllGenres(request: FastifyRequest, reply: FastifyReply): Promise<TGenre[]>
  createGenre(request: FastifyRequest, reply: FastifyReply): Promise<TGenre>
  getGenre(request: FastifyRequest, reply: FastifyReply): Promise<TGenre>
  updateGenre(request: FastifyRequest, reply: FastifyReply): Promise<TGenre>
  deleteGenre(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<{ message: string }>
}
export interface IGenreServices {
  getAllGenres(): Promise<TGenre[]>
  createGenre(data: TGenre): Promise<TGenre>
  getGenreById(id: number): Promise<TGenre>
  updateGenre(id: number, data: NewGenre): Promise<TGenre>
  deleteGenre(id: number): Promise<{ message: string }>
}
export interface IGenreRepository {
  getAll(): Promise<TGenre[]>
  create(data: NewGenre): Promise<TGenre>
  getById(id: number): Promise<TGenre>
  update(id: number, data: NewGenre): Promise<TGenre>
  delete(id: number): Promise<TGenre>
}
