import type { NewAuthor, TAuthor } from '@/types/ebooks.types.ts'
import type { IAuthorServices } from '@interface/authors.interface.ts'
import { AuthorRepository } from '@repositories/author.repositories.ts'

export class AuthorServices implements IAuthorServices {
  private repository: AuthorRepository
  constructor() {
    this.repository = new AuthorRepository()
  }

  async getAllAuthors(): Promise<TAuthor[]> {
    const authors: TAuthor[] = await this.repository.getAllAuthors()
    return authors
  }

  async createAuthor(data: NewAuthor): Promise<TAuthor> {
    const author: TAuthor = await this.repository.create(data)
    return author
  }

  async getAuthorById(authorId: number): Promise<TAuthor> {
    const author: TAuthor = await this.repository.findAuthorById(authorId)
    return author
  }

  async updateAuthor(authorId: number, data: NewAuthor): Promise<TAuthor> {
    const author: TAuthor = await this.repository.findAuthorById(authorId)
    if (!author) {
      throw new Error('Autor não encontrado')
    }
    const updatedAuthor: TAuthor = await this.repository.updateAuthor(
      authorId,
      data
    )
    return updatedAuthor
  }
  async deleteAuthor(authorId: number): Promise<{ message: string }> {
    const author: TAuthor = await this.repository.findAuthorById(authorId)
    if (!author) {
      throw new Error('Autor não encontrado')
    }
    try {
      const deletedAuthor: TAuthor =
        await this.repository.deleteAuthor(authorId)
      return { message: 'Autor deletado com sucesso' }
    } catch (error) {
      throw new Error('Erro ao deletar autor')
    }
  }
}
