import { db } from '@/db/index.ts'
import type {
  Curse,
  NewCurse,
  TCategoryCurse,
  TCurse,
} from '@/types/curse.types.ts'
import { category, categoryCurses, curse, professor } from '@db/index.ts'
import type { ICursoRepository } from '@interface/curse.interface.ts'
import { and, eq, sql } from 'drizzle-orm'
import type { PgTable, TableConfig } from 'drizzle-orm/pg-core'

export class CursoRepository implements ICursoRepository {
  async getAll(): Promise<Curse[]> {
    const data = await db
      .select({
        curseId: curse.curseId,
        title: curse.title,
        price: curse.price,
        professor: sql<{
          professorId: number
          name: string
        }>`
      json_build_object(
        'professorId', professor.professor_id,
        'name', professor.professor_name
      )`,
        category: sql<
          {
            categoryId: number
            name: string
          }[]
        >`json_agg(
                jsonb_build_object(
                  'categoryId', category.category_id,
                  'name', category.category_name
                )
              )`,
      })
      .from(curse)
      .innerJoin(professor, eq(professor.professorId, curse.professorId))
      .innerJoin(categoryCurses, eq(categoryCurses.curseId, curse.curseId))
      .innerJoin(category, eq(category.categoryId, categoryCurses.categoryId))
      .groupBy(curse.curseId, professor.professorId)
    return data
  }

  async getById(id: number): Promise<Curse> {
    const { curseData, categoriesData } = await db.transaction(async tx => {
      const curseData = await tx
        .select({
          curseId: curse.curseId,
          title: curse.title,
          price: curse.price,
          professorId: curse.professorId,
          professorName: professor.name,
        })
        .from(curse)
        .where(eq(curse.curseId, id))
        .innerJoin(professor, eq(curse.professorId, professor.professorId))

      const categoriesData = []
      for (const curse of curseData) {
        const categoryData = await tx
          .select({
            categoriaId: categoryCurses.categoryId,
            categoriaName: category.name,
          })
          .from(categoryCurses)
          .where(eq(categoryCurses.curseId, curse.curseId))
          .innerJoin(
            category,
            eq(categoryCurses.categoryId, category.categoryId)
          )
        categoriesData.push(categoryData)
      }

      return { curseData, categoriesData }
    })
    const response: Curse[] = curseData.map((curse, index) => ({
      curseId: curse.curseId,
      title: curse.title,
      price: curse.price,
      category: categoriesData[index].map(category => ({
        categoryId: category.categoriaId,
        name: category.categoriaName,
      })),
      professor: {
        professorId: curse.professorId,
        name: curse.professorName,
      },
    }))
    return response[0]
  }

  async getByName(name: string): Promise<TCurse> {
    const data: TCurse[] = await db
      .select()
      .from(curse)
      .where(eq(curse.title, name))
    return data[0]
  }
  async create({ category, ...data }: NewCurse): Promise<TCurse> {
    const curseData: TCurse[] = await db.insert(curse).values(data).returning()

    await this.insert<{ categoryId: number }>(
      categoryCurses,
      curseData[0].curseId,
      category,
      'categoryId'
    )

    return curseData[0]
  }

  async update(
    id: number,
    { category, title, price }: NewCurse
  ): Promise<TCurse> {
    const { curseData } = await db.transaction(async tx => {
      const curseData: TCurse[] = await tx
        .update(curse)
        .set({ title, price })
        .where(eq(curse.curseId, id))
        .returning()

      const { curseId } = curseData[0]
      let categoryData: TCategoryCurse[] = []
      if (Array.isArray(category)) {
        for (const categoryId of category) {
          categoryData = await tx
            .insert(categoryCurses)
            .values({ categoryId, curseId })
            .returning()
        }
      } else {
        categoryData = await db
          .insert(categoryCurses)
          .values({
            categoryId: category,
            curseId,
          })
          .returning()
      }
      return { curseData, categoryData }
    })
    return curseData[0]
  }

  async delete(id: number): Promise<TCategoryCurse> {
    const result = await db.delete(curse).where(eq(curse.curseId, id))
    return result[0]
  }

  async findCategoryInCurse(categoryId: number, curseId: number) {
    const categories = await db
      .select()
      .from(categoryCurses)
      .where(
        and(
          eq(categoryCurses.curseId, curseId),
          eq(categoryCurses.categoryId, categoryId)
        )
      )
    return categories[0]
  }

  async removeCategoryInCurse(categoryId: number, curseId: number) {
    const categories = await db
      .delete(categoryCurses)
      .where(
        and(
          eq(categoryCurses.categoryId, categoryId),
          eq(categoryCurses.curseId, curseId)
        )
      )
    return categories
  }

  async insert<T>(
    table: PgTable<TableConfig>,
    curseId: number,
    relation: number | number[],
    id: keyof T
  ) {
    if (Array.isArray(relation)) {
      await db
        .insert(table)
        .values(relation.map(relationId => ({ [id]: relationId, curseId })))
    } else {
      await db.insert(table).values({ [id]: relation, curseId })
    }
  }
}
