import { ConflitError } from '@/common/errors/conflit.ts'
import { NotFoundError } from '@/common/errors/not-found.ts'
import type { NewGenre, TGenre } from '@/types/ebooks.types.ts'
import type { IGenreServices } from '@interface/genre.interface.ts'
import { GenreRepository } from '@repositories/genre.repositories.ts'

export class GenreServices implements IGenreServices {
  private repository: GenreRepository
  constructor() {
    this.repository = new GenreRepository()
  }

  async getAllGenres(): Promise<TGenre[]> {
    const generes: TGenre[] = await this.repository.getAll()
    return generes
  }
  async createGenre(data: NewGenre): Promise<TGenre> {
    const genreExists: TGenre = await this.repository.getByName(data.name)
    if (genreExists) {
      throw new ConflitError('Genre already exists')
    }
    const genre = await this.repository.create(data)
    return genre
  }

  async getGenreById(id: number): Promise<TGenre> {
    const genre: TGenre = await this.repository.getById(id)
    if (!genre) {
      throw new NotFoundError('Genre not found')
    }
    return genre
  }

  async updateGenre(id: number, data: NewGenre): Promise<TGenre> {
    const genreExists: TGenre = await this.repository.getById(id)
    if (!genreExists) {
      throw new NotFoundError('Genre not found')
    }
    const genre: TGenre = await this.repository.update(id, data)
    return genre
  }

  async deleteGenre(id: number): Promise<{ message: string }> {
    const genreExists: TGenre = await this.repository.getById(id)
    if (!genreExists) {
      throw new NotFoundError('Genre not found')
    }
    try {
      const genre: TGenre = await this.repository.delete(id)
      return { message: 'Genre deleted successfully' }
    } catch (error) {
      throw new Error('Error deleting genre')
    }
  }
}
