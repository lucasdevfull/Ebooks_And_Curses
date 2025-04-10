import { HttpStatus } from '@/common/enum/http.ts'
import { bookFormDataSchema } from '@/schema/books.schema.ts'
import type { FastifyReply, FastifyRequest } from 'fastify'
import {
  createReadStream,
  createWriteStream,
  existsSync,
  mkdirSync,
} from 'node:fs'
import path from 'node:path'
import { pipeline } from 'node:stream/promises'
import { EbookServices } from '../services/books.services.ts'

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

    const fileStream = path.resolve(data.file.name)

    const mediaDir = path.resolve('media')

    if (!existsSync(mediaDir)) {
      mkdirSync(mediaDir, { recursive: true })
    }
    const filePath = path.join(mediaDir, data.file.name)
    await pipeline(createReadStream(fileStream), createWriteStream(filePath))
    return reply.send()
  }
}
