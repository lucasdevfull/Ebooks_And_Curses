import type { NewGenre, TGenre } from '@/@types/ebooks.ts'
import { db } from '@/db/index.ts'
import { genres } from '@/db/schema/books.ts'
import { genreSelectSchema } from '@/schema/genre.schema.ts'
import { eq } from 'drizzle-orm'
import type { IGenreRepository } from '../interface/genre.interface.ts'

export class GenreRepository implements IGenreRepository {
  async getAll(): Promise<TGenre[]> {
    const generes = await db.select().from(genres)
    const result = genreSelectSchema.array().safeParse(generes)
    if (!result.success) {
      throw new Error(result.error.message)
    }
    return result.data
  }

  async create(data: NewGenre): Promise<TGenre> {
    const genre = await db.insert(genres).values(data).returning()
    const result = genreSelectSchema.safeParse(genre)
    if (!result.success) {
      throw new Error(result.error.message)
    }
    return result.data
  }

  async getById(id: number): Promise<TGenre> {
    const genre = await db.select().from(genres).where(eq(genres.genreId, id))
    const result = genreSelectSchema.safeParse(genre)
    if (!result.success) {
      throw new Error(result.error.message)
    }
    return result.data
  }

  async getByName(nome: string): Promise<TGenre> {
    const genre = await db.select().from(genres).where(eq(genres.name, nome))
    const result = genreSelectSchema.safeParse(genre)
    if (!result.success) {
      throw new Error(result.error.message)
    }
    return result.data
  }

  async update(id: number, data: NewGenre): Promise<TGenre> {
    const genre = await db
      .update(genres)
      .set(data)
      .where(eq(genres.genreId, id))
      .returning()
    return genre[0]
  }

  async delete(id: number): Promise<TGenre> {
    const genre = await db
      .delete(genres)
      .where(eq(genres.genreId, id))
      .returning()
    return genre[0]
  }
}
