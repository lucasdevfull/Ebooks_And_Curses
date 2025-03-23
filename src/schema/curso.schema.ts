import { curse } from '@db/index.ts'
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

export const curseSchema = z.object({
  curseId: z.number(),
  title: z.string(),
  price: z.number().transform(val => val.toFixed(2)),
  category: z.array(
    z.object({
      categoryId: z.number(),
      name: z.string(),
    })
  ),
  professor: z.object({
    professorId: z.number(),
    name: z.string(),
  }),
})

export const curseInsertSchema = createInsertSchema(curse).extend({
  category: z.union([z.number().positive(), z.number().positive().array()]),
})

export const curseSelectSchema = createSelectSchema(curse)
