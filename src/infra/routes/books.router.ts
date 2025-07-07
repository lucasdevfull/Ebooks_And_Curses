import { EbookController } from '@controllers/books.controller.ts'
import { verifyToken } from '@hooks/verify-token.ts'
import { EbookRepository } from '@repositories/books.repositories.ts'
import { bookSchema } from '@schema/books.schema.ts'
import { httpSchema } from '@schema/http.schema.ts'
import { EbookServices } from '@services/books.services.ts'
import type { FastifyPluginOptions } from 'fastify'
import type { FastifyInstanceZod } from '@/types/server.types.ts'

export function booksRoutes(
  fastify: FastifyInstanceZod,
  opts: FastifyPluginOptions
) {
  const repository = new EbookRepository()
  const bookServices = new EbookServices(repository)
  const bookController = new EbookController(bookServices)

  fastify.get(
    '/books',
    {
      schema: {
        tags: ['books'],
        description: 'Get all books',
        response: {
          200: bookSchema.array(),
          400: httpSchema,
          500: httpSchema,
        },
      },
      onRequest: verifyToken,
    },
    bookController.getAllBooks
  )
  fastify.post(
    '/books',
    {
      schema: {
        tags: ['books'],
        description: 'Create book',
        consumes: ['multipart/form-data'],
      },
    },
    bookController.createBook
  )
}
