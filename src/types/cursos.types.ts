import type {
  categoria,
  categoriaCursos,
  curso,
  professor,
} from '@/db/schema/cursos.ts'
import type { cursoInsertSchema, cursoSchema } from '@/schema/curso.schema.ts'
import type { z } from 'zod'

export type NewCurso = z.infer<typeof cursoInsertSchema>

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
  professorId: number
  professorName: string
}

export type TCategoriaCurso = typeof categoriaCursos.$inferSelect
