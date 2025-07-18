import { bookFormDataSchema } from '@schema/books.schema.ts'
import type { EbookServices } from '@services/books.services.ts'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { HttpStatus } from '@/common/enum/http.ts'

export class EbookController {
  constructor(private service: EbookServices) {
    this.service = service
  }

  getAllBooks = async (_request: FastifyRequest, reply: FastifyReply) => {
    const books = await this.service.getAllBooks()
    return reply.status(HttpStatus.OK).send(books)
  }

  createBook = async (request: FastifyRequest, reply: FastifyReply) => {
    const formData = await request.formData()

    const { success, data, error } = bookFormDataSchema.safeParse(
      Object.fromEntries(formData.entries())
    )

    if (!success) {
      return reply.status(HttpStatus.BAD_REQUEST).send(error.message)
    }

    const { id } = request.user as { id: number }

    const { file, authors, genres, ...ebook } = data

    const result = await this.service.createBook(
      {
        genres,
        authors,
        ebook: {
          ...ebook,
          created_by: id,
        },
      },
      file
    )
    return reply.status(HttpStatus.CREATED).send(result)
  }
}
