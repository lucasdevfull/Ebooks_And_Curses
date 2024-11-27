import { curso } from '@/db/schema/cursos.ts'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

const categoriaSchema = z.object({
  categoriaId: z.number(),
  name: z.string(),
})
const professorSchema = z.object({
  professorId: z.number(),
  name: z.string(),
})

export const cursoSchema = z.object({
  cursoId: z.number(),
  titulo: z.string(),
  valor: z.string(),
  categoria: categoriaSchema,
  professor: professorSchema,
})

export const cursoInsertSchema = createInsertSchema(curso)

export const cursoSelectSchema = createSelectSchema(curso)
