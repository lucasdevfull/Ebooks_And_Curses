import type { NewGenre, TGenre } from '@/types/ebooks.types.ts'
import type {
  GerneBodyRequest,
  GerneRequest,
  IGenreController,
} from '@interface/genre.interface.ts'
import { GenreServices } from '@services/genre.services.ts'
import type { FastifyReply, FastifyRequest } from 'fastify'

export class GenreController implements IGenreController {
  private service: GenreServices
  constructor() {
    this.service = new GenreServices()
  }

  getAllGenres = async (
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<TGenre[]> => {
    try {
      const genres = await this.service.getAllGenres()
      return reply.status(200).send(genres)
    } catch (error) {
      return reply.status(500).send(error)
    }
  }
  createGenre = async (
    request: FastifyRequest<GerneBodyRequest>,
    reply: FastifyReply
  ): Promise<TGenre> => {
    try {
      const genre: NewGenre = request.body
      const result = await this.service.createGenre(genre)
      return reply.status(201).send(result)
    } catch (error) {
      return reply.status(500).send(error)
    }
  }

  getGenre = async (
    request: FastifyRequest<GerneRequest>,
    reply: FastifyReply
  ): Promise<TGenre> => {
    try {
      const { id } = request.params
      const result = this.service.getGenreById(Number(id))
      if (!result) {
        return reply.status(404).send({
          statusCode: 404,
          error: 'Not Found',
          message: 'Genre not found',
        })
      }
      return reply.status(200).send(result)
    } catch (error) {
      return reply.status(500).send(error)
    }
  }

  updateGenre = async (
    request: FastifyRequest<GerneBodyRequest>,
    reply: FastifyReply
  ): Promise<TGenre> => {
    try {
      const { id } = request.params
      const genre: NewGenre = request.body
      const result = await this.service.updateGenre(Number(id), genre)
      return reply.status(200).send(result)
    } catch (error) {
      return reply.status(500).send(error)
    }
  }

  deleteGenre = async (
    request: FastifyRequest<GerneRequest>,
    reply: FastifyReply
  ): Promise<{ message: string }> => {
    try {
      const { id } = request.params
      const result = this.service.deleteGenre(Number(id))
      if (!result) {
        return reply.status(404).send({ message: 'Genre not found' })
      }
      return reply.status(204).send(result)
    } catch (error) {
      return reply.status(500).send(error)
    }
  }
}
