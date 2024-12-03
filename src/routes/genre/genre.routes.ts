import { GenreController } from '@controllers/genre.controller.ts'
import type { FastifyInstance, FastifyPluginOptions } from 'fastify'
import {
  createGenreRouterOptions,
  deleteGenreRouterOptions,
  getAllGenresRouterOptions,
  getGenreByIdRouterOptions,
  updateGenreRouterOptions,
} from './genre.options.ts'

export function genreRoutes(
  fastify: FastifyInstance,
  opts: FastifyPluginOptions
) {
  const genreController = new GenreController()
  fastify.get(
    '/genres',
    getAllGenresRouterOptions,
    genreController.getAllGenres
  )
  fastify.get(
    '/genres/:id',
    getGenreByIdRouterOptions,
    genreController.getGenre
  )
  fastify.post('/genres', createGenreRouterOptions, genreController.createGenre)
  fastify.put(
    '/genres/:id',
    updateGenreRouterOptions,
    genreController.updateGenre
  )
  fastify.delete(
    '/genres/:id',
    deleteGenreRouterOptions,
    genreController.deleteGenre
  )
}
