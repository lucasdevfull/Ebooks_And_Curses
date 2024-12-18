import { db } from '@/db/index.ts'
import {
  categoria,
  categoriaCursos,
  curso,
  professor,
} from '@/db/schema/cursos.ts'
import type {
  Curso,
  NewCurso,
  TCategoriaCurso,
  TCurso,
} from '@/types/cursos.types.ts'
import { curseResponse } from '@/utils/curso-response.ts'
import type { ICursoRepository } from '@interface/curso.interface.ts'
import { and, eq } from 'drizzle-orm'

export class CursoRepository implements ICursoRepository {
  async getAll(): Promise<Curso[]> {
    const { curses, categories } = await db.transaction(async tx => {
      const curses = await tx
        .select({
          cursoId: curso.cursoId,
          titulo: curso.titulo,
          valor: curso.valor,
          professorId: curso.professorId,
          professorName: professor.name,
        })
        .from(curso)
        .innerJoin(professor, eq(curso.professorId, professor.professorId))

      const categories = await Promise.all(
        curses.map(async curse => {
          return await tx
            .select({
              categoriaId: categoriaCursos.categoriaId,
              categoriaName: categoria.name,
            })
            .from(categoriaCursos)
            .where(eq(categoriaCursos.cursoId, curse.cursoId))
            .innerJoin(
              categoria,
              eq(categoriaCursos.categoriaId, categoria.categoriaId)
            )
        })
      )
      return { curses, categories }
    })

    const response: Curso[] = curseResponse(curses, categories.flat())
    return response
  }

  async getById(id: number): Promise<Curso> {
    const { curse, categories } = await db.transaction(async tx => {
      const curse = await db
        .select({
          cursoId: curso.cursoId,
          titulo: curso.titulo,
          valor: curso.valor,
          professorId: curso.professorId,
          professorName: professor.name,
        })
        .from(curso)
        .where(eq(curso.cursoId, id))
        .innerJoin(professor, eq(curso.professorId, professor.professorId))

      const categories = await Promise.all(
        curse.map(async curse => {
          return await db
            .select({
              categoriaId: categoriaCursos.categoriaId,
              categoriaName: categoria.name,
            })
            .from(categoriaCursos)
            .where(eq(categoriaCursos.cursoId, curse.cursoId))
            .innerJoin(
              categoria,
              eq(categoriaCursos.categoriaId, categoria.categoriaId)
            )
        })
      )
      return { curse, categories }
    })
    const response: Curso[] = curseResponse(curse, categories.flat())
    return response[0]
  }

  async getByName(name: string): Promise<TCurso> {
    const curse: TCurso[] = await db
      .select()
      .from(curso)
      .where(eq(curso.titulo, name))
    return curse[0]
  }
  async create(data: NewCurso): Promise<TCurso> {
    const { categoria } = data
    const curse: TCurso[] = await db.insert(curso).values(data).returning()
    const { cursoId } = curse[0]
    if (Array.isArray(categoria)) {
      await db
        .insert(categoriaCursos)
        .values(categoria.map(categoriaId => ({ categoriaId, cursoId })))
    }

    await db.insert(categoriaCursos).values({
      categoriaId: Number(categoria),
      cursoId,
    })

    return curse[0]
  }

  async update(id: number, data: NewCurso): Promise<TCurso> {
    const { categoria, titulo, valor } = data
    const { curse } = await db.transaction(async tx => {
      const curse: TCurso[] = await db
        .update(curso)
        .set({ titulo, valor })
        .where(eq(curso.cursoId, id))
        .returning()
      
      const { cursoId } = curse[0]
      let category: TCategoriaCurso[] = []
      if (Array.isArray(categoria)) {
        for (const categoriaId of categoria) {
          category = await db.insert(categoriaCursos).values({ categoriaId, cursoId }).returning()
        }
      } else {
        category = await db.insert(categoriaCursos).values({
          categoriaId: categoria,
          cursoId,
        }).returning()
      }
      return { curse, category }
    })
    return curse[0]
  }

  async delete(id: number): Promise<TCategoriaCurso> {
    const curse = await db.delete(curso).where(eq(curso.cursoId, id))
    return curse[0]
  }

  async findCategoryInCurse(categoryId: number, cursoId: number) {
    const categories = await db
      .select()
      .from(categoriaCursos)
      .where(and(eq(categoriaCursos.cursoId, cursoId), eq(categoriaCursos.categoriaId, categoryId)))
    return categories[0]
  }

  async removeCategoryInCurse(categoriaId: number, cursoId: number) {
    const categories = await db.delete(categoriaCursos).where(
      and(eq(categoriaCursos.categoriaId, categoriaId), eq(categoriaCursos.cursoId, cursoId))
    )
    return categories
  }
}
