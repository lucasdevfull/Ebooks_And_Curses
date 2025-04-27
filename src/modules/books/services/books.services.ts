import type { Ebook, Ebooks, NewEbook } from '@/types/ebooks.types.ts'
import { EbookRepository } from '../repositories/books.repositories.ts'
import path from 'node:path'
import {
  createReadStream,
  createWriteStream,
  existsSync,
  mkdirSync,
} from 'node:fs'
import { pipeline } from 'node:stream/promises'

export class EbookServices {
  private repository: EbookRepository
  constructor() {
    this.repository = new EbookRepository()
  }

  async getAllBooks(): Promise<Ebooks[]> {
    return await this.repository.getAll()
  }

  async createBook({ authors, genres, ebook }: Ebook, { name }: File) {
    const fileStream = path.resolve(name)

    const mediaDir = path.resolve('media')

    if (!existsSync(mediaDir)) {
      mkdirSync(mediaDir, { recursive: true })
    }
    const filePath = path.join(mediaDir, name)
    await pipeline(createReadStream(fileStream), createWriteStream(filePath))

    ebook.cover_photo = filePath

    return await this.repository.create({ ebook, authors, genres })
  }
}
