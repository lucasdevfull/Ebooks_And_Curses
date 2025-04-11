import { EbookController } from '@/modules/books/controller/books.controller.ts'
import { bookSchema } from '@/schema/books.schema.ts'
import { httpSchema } from '@/schema/http.schema.ts'
import type { FastifyInstanceZod } from '@/types/server.types.ts'
import type { FastifyPluginOptions } from 'fastify'

export function booksRoutes(
  fastify: FastifyInstanceZod,
  opts: FastifyPluginOptions
) {
  const bookController = new EbookController()

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
