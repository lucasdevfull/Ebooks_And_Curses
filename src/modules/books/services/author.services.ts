import type { NewAuthor } from '@/@types/ebooks.ts'
import type { Author } from '../entities/author.entities.ts'
import type { IAuthorServices } from '../interface/authors.interface.ts'
import { AuthorRepository } from '../repositories/author.repositories.ts'

export class AuthorServices implements IAuthorServices {
  private repository: AuthorRepository
  constructor() {
    this.repository = new AuthorRepository()
  }

  async getAllAuthors(): Promise<Author[]> {
    const authors = await this.repository.getAllAuthors()
    return authors
  }

  async createAuthor(data: NewAuthor): Promise<Author> {
    const author = await this.repository.create(data)
    return author
  }

  async getAuthorById(authorId: number): Promise<Author> {
    const author = await this.repository.findAuthorById(authorId)
    return author
  }

  async updateAuthor(authorId: number, data: NewAuthor): Promise<Author> {
    const author = await this.repository.findAuthorById(authorId)
    if (!author) {
      throw new Error('Autor não encontrado')
    }
    const updatedAuthor = await this.repository.updateAuthor(authorId, data)
    return updatedAuthor
  }
  async deleteAuthor(authorId: number): Promise<{ message: string }> {
    const author = await this.repository.findAuthorById(authorId)
    if (!author) {
      throw new Error('Autor não encontrado')
    }
    try {
      const deletedAuthor = await this.repository.deleteAuthor(authorId)
      return { message: 'Autor deletado com sucesso' }
    } catch (error) {
      throw new Error('Erro ao deletar autor')
    }
  }
}
