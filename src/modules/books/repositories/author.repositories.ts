import type { NewAuthor, TAuthor } from '@/@types/ebooks.ts'
import { db } from '@/db/index.ts'
import { authors } from '@/db/schema/books.ts'
import { authorsSelectSchema } from '@/schema/authors.schema.ts'
import { eq } from 'drizzle-orm'
import type { IAuthorRepository } from '../interface/authors.interface.ts'

export class AuthorRepository implements IAuthorRepository {
  async create(data: NewAuthor): Promise<TAuthor> {
    const author: TAuthor[] = await db.insert(authors).values(data).returning()
    return author[0]
  }

  async findAuthorById(id: number): Promise<TAuthor> {
    const authorExists: TAuthor[] = await db
      .select()
      .from(authors)
      .where(eq(authors.authorId, id))
    const result = authorsSelectSchema.safeParse(authorExists)
    if (!result.success) {
      throw new Error(result.error.message)
    }
    return result.data
  }

  async getAllAuthors(): Promise<TAuthor[]> {
    const autores: TAuthor[] = await db.select().from(authors)
    const result = authorsSelectSchema.array().safeParse(autores)
    if (!result.success) {
      throw new Error(result.error.message)
    }
    return result.data
  }
  async findAuthorByName(name: string): Promise<TAuthor[]> {
    const authorExists: TAuthor[] = await db
      .select()
      .from(authors)
      .where(eq(authors.first_name, name))
    const result = authorsSelectSchema.array().safeParse(authorExists)
    if (!result.success) {
      throw new Error(result.error.message)
    }
    return result.data
  }

  async updateAuthor(id: number, data: NewAuthor): Promise<TAuthor> {
    const author: TAuthor[] = await db
      .update(authors)
      .set(data)
      .where(eq(authors.authorId, id))
      .returning()
    return author[0]
  }

  async deleteAuthor(id: number): Promise<TAuthor> {
    const author: TAuthor[] = await db
      .delete(authors)
      .where(eq(authors.authorId, id))
      .returning()
    return author[0]
  }
}
