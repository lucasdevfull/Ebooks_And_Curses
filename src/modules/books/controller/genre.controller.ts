import type {
  GerneBodyRequest,
  GerneRequest,
  IGenreController,
} from '@interface/genre.interface.ts'
import type { GenreServices } from '@services/genre.services.ts'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { HttpStatus } from '@/common/enum/http.ts'
import type { TGenre } from '@/types/ebooks.types.ts'

export class GenreController implements IGenreController {
  constructor(private service: GenreServices) {
    this.service = service
  }

  getAllGenres = async (
    _request: FastifyRequest,
    reply: FastifyReply
  ): Promise<TGenre[]> => {
    const genres = await this.service.getAllGenres()
    return reply.status(HttpStatus.OK).send(genres)
  }
  createGenre = async (
    { body }: FastifyRequest<GerneBodyRequest>,
    reply: FastifyReply
  ): Promise<TGenre> => {
    const result = await this.service.createGenre(body)
    return reply.status(HttpStatus.CREATED).send(result)
  }

  getGenre = async (
    { params: { id } }: FastifyRequest<GerneRequest>,
    reply: FastifyReply
  ): Promise<TGenre> => {
    const result = this.service.getGenreById(Number(id))
    return reply.status(HttpStatus.OK).send(result)
  }

  updateGenre = async (
    { body, params: { id } }: FastifyRequest<GerneBodyRequest>,
    reply: FastifyReply
  ): Promise<TGenre> => {
    const result = await this.service.updateGenre(Number(id), body)
    return reply.status(HttpStatus.OK).send(result)
  }

  deleteGenre = async (
    { params: { id } }: FastifyRequest<GerneRequest>,
    reply: FastifyReply
  ): Promise<{ message: string }> => {
    const result = this.service.deleteGenre(Number(id))
    return reply.status(HttpStatus.NO_CONTENT).send(result)
  }
}
