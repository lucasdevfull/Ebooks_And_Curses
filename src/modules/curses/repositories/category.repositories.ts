import type { Repository } from '@/common/base/repository.ts'
import { db } from '@/db/index.ts'
import type { NewCategory, TCategory } from '@/types/curse.types.ts'
import { category } from '@db/index.ts'
import { eq } from 'drizzle-orm'

export class CategoryRepository implements Repository<TCategory, NewCategory> {
  async getAll(): Promise<TCategory[]> {
    const categories: TCategory[] = await db.select().from(category)
    return categories
  }

  async getById(id: number): Promise<TCategory> {
    const data: TCategory[] = await db
      .select()
      .from(category)
      .where(eq(category.categoryId, id))
    return data[0]
  }

  async create(data: NewCategory): Promise<TCategory> {
    const result: TCategory[] = await db
      .insert(category)
      .values(data)
      .returning()
    return result[0]
  }

  async getByName(name: string): Promise<TCategory> {
    const data: TCategory[] = await db
      .select()
      .from(category)
      .where(eq(category.name, name))
    return data[0]
  }

  async update(id: number, data: NewCategory): Promise<TCategory> {
    const result: TCategory[] = await db
      .update(category)
      .set(data)
      .where(eq(category.categoryId, id))
      .returning()
    return result[0]
  }

  async delete(id: number): Promise<TCategory> {
    const result: TCategory[] = await db
      .delete(category)
      .where(eq(category.categoryId, id))
      .returning()
    return result[0]
  }
}
