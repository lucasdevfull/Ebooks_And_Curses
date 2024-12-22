import { db } from '@/db/index.ts'
import { professor } from '@/db/schema/index.ts'
import type { NewProfessor, TProfessor } from '@/types/cursos.types.ts'
import type { IProfessorRepository } from '@interface/professor.interface.ts'
import { professorSelectSchema } from '@schema/professor.schema.ts'
import { eq } from 'drizzle-orm'

export class ProfessorRepository implements IProfessorRepository {
  async getAll(): Promise<TProfessor[]> {
    const professors: TProfessor[] = await db.select().from(professor)
    const result = professorSelectSchema.array().safeParse(professors)
    if (!result.success) {
      throw new Error(result.error.message)
    }
    return result.data
  }

  async create(data: NewProfessor): Promise<TProfessor> {
    const prof: TProfessor[] = await db
      .insert(professor)
      .values(data)
      .returning()
    return prof[0]
  }

  async getById(id: number): Promise<TProfessor> {
    const prof: TProfessor[] = await db
      .select()
      .from(professor)
      .where(eq(professor.professorId, id))
    const result = professorSelectSchema.array().safeParse(prof)
    if (!result.success) {
      throw new Error(result.error.message)
    }
    return result.data[0]
  }

  async update(id: number, data: NewProfessor): Promise<TProfessor> {
    const prof: TProfessor[] = await db
      .update(professor)
      .set(data)
      .where(eq(professor.professorId, id))
      .returning()
    return prof[0]
  }

  async delete(id: number): Promise<TProfessor> {
    const prof: TProfessor[] = await db
      .delete(professor)
      .where(eq(professor.professorId, id))
      .returning()
    return prof[0]
  }
}
