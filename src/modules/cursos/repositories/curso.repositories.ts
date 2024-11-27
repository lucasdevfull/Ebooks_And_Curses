import type { Curso, NewCurso, TCurso } from '@/@types/cursos.ts'
import { db } from '@/db/index.ts'
import {
  categoria,
  categoriaCursos,
  curso,
  professor,
} from '@/db/schema/cursos.ts'
import { eq } from 'drizzle-orm'
import type { ICursoRepository } from '../interface/curso.interface.ts'
import { curseResponse } from '@/utils/curso-response.ts'

export class CursoRepository implements ICursoRepository {
  async getAll(): Promise<Curso[]> {
    const cursos = await db
      .select({
        cursoId: curso.cursoId,
        titulo: curso.titulo,
        valor: curso.valor,
        categoriaId: categoriaCursos.categoriaId,
        categoriaName: categoria.name,
        professorId: curso.professorId,
        professorName: professor.name,
      })
      .from(categoriaCursos)
      .innerJoin(curso, eq(categoriaCursos.cursoId, curso.cursoId))
      .innerJoin(professor, eq(curso.professorId, professor.professorId))
      .innerJoin(
        categoria,
        eq(categoriaCursos.categoriaId, categoria.categoriaId)
      )
    const response = curseResponse(cursos)
    return response
  }

  async getById(id: number): Promise<Curso> {
    const curse = await db
      .select({
        cursoId: curso.cursoId,
        titulo: curso.titulo,
        valor: curso.valor,
        categoriaId: categoriaCursos.categoriaId,
        categoriaName: categoria.name,
        professorId: curso.professorId,
        professorName: professor.name,
      })
      .from(categoriaCursos)
      .where(eq(categoriaCursos.cursoId, id))
      .innerJoin(curso, eq(categoriaCursos.cursoId, curso.cursoId))
      .innerJoin(professor, eq(curso.professorId, professor.professorId))
      .innerJoin(
        categoria,
        eq(categoriaCursos.categoriaId, categoria.categoriaId)
      )
      const response = curseResponse(curse)
    return response[0]
  }

  async getByName(name: string): Promise<TCurso> {
    const curse = await db.select().from(curso).where(eq(curso.titulo, name))
    return curse[0]
  }
  async create(data: NewCurso): Promise<TCurso> {
    const curse = await db.insert(curso).values(data).returning()
    const categoryCurses = await db
      .insert(categoriaCursos)
      .values({
        categoriaId: curse[0].categoriaid,
        cursoId: curse[0].cursoId,
      })
      .returning()
    return curse[0]
  }

  async update(id: number, data: NewCurso): Promise<TCurso> {
    const curse = await db
      .update(curso)
      .set(data)
      .where(eq(curso.cursoId, id))
      .returning()
    return curse[0]
  }

  async delete(id: number): Promise<TCurso> {
    const curse = await db
      .delete(curso)
      .where(eq(curso.cursoId, id))
      .returning()
    return curse[0]
  }
}
