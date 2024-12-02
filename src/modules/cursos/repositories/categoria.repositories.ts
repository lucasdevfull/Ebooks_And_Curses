import type { NewCategoria, TCategoria } from '@/@types/cursos.ts'
import { db } from '@/db/index.ts'
import { categoria } from '@/db/schema/cursos.ts'
import { categorySelectSchema } from '@/schema/categories.schema.ts'
import { eq } from 'drizzle-orm'
import type { ICategoriaRepository } from '../interface/categoria.interface.ts'

export class CategoryRepository implements ICategoriaRepository {
  async getAll(): Promise<TCategoria[]> {
    const categories: TCategoria[] = await db.select().from(categoria)
    const result = categorySelectSchema.array().safeParse(categories)
    if (!result.success) {
      throw new Error(result.error.message)
    }
    return result.data
  }

  async getById(id: number): Promise<TCategoria> {
    const category: TCategoria[] = await db
      .select()
      .from(categoria)
      .where(eq(categoria.categoriaId, id))
    const result = categorySelectSchema.array().safeParse(category)
    if (!result.success) {
      throw new Error(result.error.message)
    }
    return result.data[0]
  }

  async create(data: NewCategoria): Promise<TCategoria> {
    const category: TCategoria[] = await db
      .insert(categoria)
      .values(data)
      .returning()
    return category[0]
  }

  async getByName(nome: string): Promise<TCategoria> {
    const category: TCategoria[] = await db
      .select()
      .from(categoria)
      .where(eq(categoria.name, nome))
    const result = categorySelectSchema.safeParse(category)
    if (!result.success) {
      throw new Error(result.error.message)
    }
    return result.data
  }

  async update(id: number, data: NewCategoria): Promise<TCategoria> {
    const category: TCategoria[] = await db
      .update(categoria)
      .set(data)
      .where(eq(categoria.categoriaId, id))
      .returning()
    return category[0]
  }

  async delete(id: number): Promise<TCategoria> {
    const category: TCategoria[] = await db
      .delete(categoria)
      .where(eq(categoria.categoriaId, id))
      .returning()
    return category[0]
  }
}
