import { curso } from '@/db/schema/cursos.ts'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

export const cursoSchema = z.object({
  cursoId: z.number(),
  titulo: z.string(),
  valor: z.string(),
  categoriaId: z.number(),
  categoriaName: z.string(),
  professorId: z.number(),
  professorName: z.string(),
})

export const cursoInsertSchema = createInsertSchema(curso)

export const cursoSelectSchema = createSelectSchema(curso)
