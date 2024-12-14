import { categoria, curso } from '@/db/schema/cursos.ts'
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
  valor: z.number().transform(val => val.toFixed(2)),
  categoria: z.array(
    z.object({
      categoriaId: z.number(),
      name: z.string(),
    })
  ),
  professor: z.object({
    professorId: z.number(),
    name: z.string(),
  }),
})

export const cursoInsertSchema = createInsertSchema(curso).extend({
  categoria: z.union([z.number().positive(), z.number().positive().array()]),
})

export const cursoSelectSchema = createSelectSchema(curso)
