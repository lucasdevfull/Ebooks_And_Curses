import type { Repository } from '@/common/base/repository.ts'
import { db } from '@/db/index.ts'
import type { NewProfessor, TProfessor } from '@/types/curse.types.ts'
import { professor } from '@db/index.ts'
import { eq } from 'drizzle-orm'

export class ProfessorRepository
  implements Repository<TProfessor, NewProfessor>
{
  async getAll(): Promise<TProfessor[]> {
    const data: TProfessor[] = await db.select().from(professor)
    return data
  }

  async create(data: NewProfessor): Promise<TProfessor> {
    const prof: TProfessor[] = await db
      .insert(professor)
      .values(data)
      .returning()
    return prof[0]
  }

  async getById(id: number): Promise<TProfessor> {
    const data: TProfessor[] = await db
      .select()
      .from(professor)
      .where(eq(professor.professorId, id))
    return data[0]
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
