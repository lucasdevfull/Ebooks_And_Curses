import { db } from '@/db/index.ts'
import {
  categoria,
  categoriaCursos,
  curso,
  professor,
} from '@/db/schema/cursos.ts'
import type { Curso, NewCurso, TCategoriaCurso, TCurso } from '@/types/cursos.types.ts'
import { curseResponse } from '@/utils/curso-response.ts'
import type { ICursoRepository } from '@interface/curso.interface.ts'
import { eq } from 'drizzle-orm'
import { log } from 'node:console'

export class CursoRepository implements ICursoRepository {
  async getAll(): Promise<Curso[]> {
    const cursos = await db
      .select({
        cursoId: curso.cursoId,
        titulo: curso.titulo,
        valor: curso.valor,
        professorId: curso.professorId,
        professorName: professor.name,
      })
      .from(curso)
      .innerJoin(professor, eq(curso.professorId, professor.professorId))
    
    const categories = await Promise.all(cursos.map(async(curse) => { 
        return await db.select({
            categoriaId: categoriaCursos.categoriaId,
            categoriaName: categoria.name
        }).from(categoriaCursos).where(eq(categoriaCursos.cursoId, curse.cursoId))
        .innerJoin(categoria, eq(categoriaCursos.categoriaId, categoria.categoriaId))
    }))
    log(categories.flat())
    const response: Curso[] = curseResponse(cursos, categories.flat())
    return response
  }

  async getById(id: number): Promise<Curso> {
    const curse = await db
      .select({
        cursoId: curso.cursoId,
        titulo: curso.titulo,
        valor: curso.valor,
        professorId: curso.professorId,
        professorName: professor.name,
      })
      .from(curso).where(eq(curso.cursoId, id))
      .innerJoin(professor, eq(curso.professorId, professor.professorId))


      const categories = await Promise.all(curse.map(async(curse) => { 
        return await db.select({
            categoriaId: categoriaCursos.categoriaId,
            categoriaName: categoria.name
        }).from(categoriaCursos).where(eq(categoriaCursos.cursoId, curse.cursoId))
        .innerJoin(categoria, eq(categoriaCursos.categoriaId, categoria.categoriaId))
    }))
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
    const curse: TCurso[] = await db.insert(curso).values(data).returning()
    if (Array.isArray(data.categoria)) {
      await db.insert(categoriaCursos).values(data.categoria.map((id) => ({
        categoriaId: id,
        cursoId: curse[0].cursoId,
      }))
    )}

    await db.insert(categoriaCursos).values({
       categoriaId: Number(data.categoria), 
       cursoId: curse[0].cursoId 
    })
    
    return curse[0]
  }

  async update(id: number, data: NewCurso): Promise<TCurso> {
    const curse: TCurso[] = await db
      .update(curso)
      .set(data)
      .where(eq(curso.cursoId, id))
      .returning()
    return curse[0]
  }

  async delete(id: number): Promise<TCategoriaCurso> {
    let curse = await db
      .delete(categoriaCursos)
      .where(eq(categoriaCursos.cursoId, id))
      .returning()
    curse =await db.delete(curso).where(eq(curso.cursoId, id))     
    return curse[0]
  }
}
