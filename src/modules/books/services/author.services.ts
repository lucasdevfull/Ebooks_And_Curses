import type { IAuthorServices } from '@interface/authors.interface.ts'
import type { AuthorRepository } from '@repositories/author.repositories.ts'
import { NotFoundError } from '@/common/errors/not-found.ts'
import type { NewAuthor, TAuthor } from '@/types/ebooks.types.ts'

export class AuthorServices implements IAuthorServices {
  constructor(private repository: AuthorRepository) {
    this.repository = repository
  }

  async getAllAuthors(): Promise<TAuthor[]> {
    const authors: TAuthor[] = await this.repository.getAll()
    return authors
  }

  async createAuthor(data: NewAuthor): Promise<TAuthor> {
    const author: TAuthor = await this.repository.create(data)
    return author
  }

  async getAuthorById(authorId: number): Promise<TAuthor> {
    const author: TAuthor = await this.repository.getById(authorId)
    if (!author) {
      throw new NotFoundError('Author not found')
    }
    return author
  }

  async updateAuthor(authorId: number, data: NewAuthor): Promise<TAuthor> {
    const author: TAuthor = await this.repository.getById(authorId)
    if (!author) {
      throw new NotFoundError('Author not found')
    }
    const updatedAuthor: TAuthor = await this.repository.update(authorId, data)
    return updatedAuthor
  }
  async deleteAuthor(authorId: number): Promise<{ message: string }> {
    const author: TAuthor = await this.repository.getById(authorId)
    if (!author) {
      throw new NotFoundError('Author not found')
    }
    try {
      await this.repository.delete(authorId)
      return { message: 'Author deleted successfully' }
    } catch (_error) {
      throw new Error('Error deleting author')
    }
  }
}
