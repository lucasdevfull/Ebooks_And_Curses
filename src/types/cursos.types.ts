import type { categoria, curso, professor } from '@/db/schema/cursos.ts'
import type { cursoSchema } from '@/schema/curso.schema.ts'
import type { z } from 'zod'

export type NewCurso = typeof curso.$inferInsert

export type TCurso = typeof curso.$inferSelect

export type NewProfessor = typeof professor.$inferInsert

export type TProfessor = typeof professor.$inferSelect

export type NewCategoria = typeof categoria.$inferInsert

export type TCategoria = typeof categoria.$inferSelect

export type Curso = z.infer<typeof cursoSchema>

export interface Cursos {
  cursoId: number
  titulo: string
  valor: string
  categoriaId: number
  categoriaName: string
  professorId: number
  professorName: string
}
