import { authors } from '@db/index.ts'
import { eq } from 'drizzle-orm'
import type { Repository } from '@/common/base/repository.ts'
import { db } from '@/db/index.ts'
import type { NewAuthor, TAuthor } from '@/types/ebooks.types.ts'

export class AuthorRepository implements Repository<TAuthor, NewAuthor> {
  async create(data: NewAuthor): Promise<TAuthor> {
    const author: TAuthor[] = await db.insert(authors).values(data).returning()
    return author[0]
  }

  async getById(id: number): Promise<TAuthor> {
    const authorExists: TAuthor[] = await db
      .select()
      .from(authors)
      .where(eq(authors.authorId, id))
    return authorExists[0]
  }

  async getAll(): Promise<TAuthor[]> {
    const autores: TAuthor[] = await db.select().from(authors)
    //const result = authorsSelectSchema.array().safeParse(autores)
    return autores
  }
  async findAuthorByName(name: string): Promise<TAuthor[]> {
    const authorExists: TAuthor[] = await db
      .select()
      .from(authors)
      .where(eq(authors.first_name, name))
    return authorExists
  }

  async update(id: number, data: NewAuthor): Promise<TAuthor> {
    const author: TAuthor[] = await db
      .update(authors)
      .set(data)
      .where(eq(authors.authorId, id))
      .returning()
    return author[0]
  }

  async delete(id: number): Promise<TAuthor> {
    const author: TAuthor[] = await db
      .delete(authors)
      .where(eq(authors.authorId, id))
      .returning()
    return author[0]
  }
}
