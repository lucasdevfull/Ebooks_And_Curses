import type {
  category,
  categoryCurses,
  curse,
  professor,
} from '@/db/schema/index.ts'
import type { curseInsertSchema, curseSchema } from '@/schema/curso.schema.ts'
import type { z } from 'zod'

export type NewCurse = z.infer<typeof curseInsertSchema>

export type TCurse = typeof curse.$inferSelect

export type NewProfessor = typeof professor.$inferInsert

export type TProfessor = typeof professor.$inferSelect

export type NewCategory = typeof category.$inferInsert

export type TCategory = typeof category.$inferSelect

export type Curse = z.infer<typeof curseSchema>

export interface Curses {
  curseId: number
  titulo: string
  valor: string
  professorId: number
  professorName: string
}

export type TCategoryCurse = typeof categoryCurses.$inferSelect
