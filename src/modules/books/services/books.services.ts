import type { Ebooks } from '@/types/ebooks.types.ts'
import { EbookRepository } from '../repositories/books.repositories.ts'

export class EbookServices {
  private repository: EbookRepository
  constructor() {
    this.repository = new EbookRepository()
  }

  async getAllBooks(): Promise<Ebooks[]> {
    return await this.repository.getAll()
  }
}
