import { genres } from '@db/index.ts'
import { eq } from 'drizzle-orm'
import type { Repository } from '@/common/base/repository.ts'
import { db } from '@/db/index.ts'
import type { NewGenre, TGenre } from '@/types/ebooks.types.ts'

export class GenreRepository implements Repository<TGenre, NewGenre> {
  async getAll(): Promise<TGenre[]> {
    const generes: TGenre[] = await db.select().from(genres)
    return generes
  }

  async create(data: NewGenre): Promise<TGenre> {
    const genre: TGenre[] = await db.insert(genres).values(data).returning()
    return genre[0]
  }

  async getById(id: number): Promise<TGenre> {
    const genre: TGenre[] = await db
      .select()
      .from(genres)
      .where(eq(genres.genreId, id))
    return genre[0]
  }

  async getByName(nome: string): Promise<TGenre> {
    const genre: TGenre[] = await db
      .select()
      .from(genres)
      .where(eq(genres.name, nome))
    return genre[0]
  }

  async update(id: number, data: NewGenre): Promise<TGenre> {
    const genre: TGenre[] = await db
      .update(genres)
      .set(data)
      .where(eq(genres.genreId, id))
      .returning()
    return genre[0]
  }

  async delete(id: number): Promise<TGenre> {
    const genre: TGenre[] = await db
      .delete(genres)
      .where(eq(genres.genreId, id))
      .returning()
    return genre[0]
  }
}
