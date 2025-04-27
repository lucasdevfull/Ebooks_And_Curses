import { HttpStatus } from '@/common/enum/http.ts'
import { bookFormDataSchema } from '@schema/books.schema.ts'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { EbookServices } from '@services/books.services.ts'

export class EbookController {
  private service: EbookServices
  constructor() {
    this.service = new EbookServices()
  }

  getAllBooks = async (request: FastifyRequest, reply: FastifyReply) => {
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
