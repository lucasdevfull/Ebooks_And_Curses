import { z } from 'zod'

export const curseSchema = z.object({
  curseId: z.number(),
  title: z.string(),
  price: z.string().transform(val => Number(val).toFixed(2)),
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

export const curseInsertSchema = z
  .object({
    curseId: z.number().positive(),
    title: z.string(),
    price: z.string().transform(val => Number(val).toFixed(2)),
    professorId: z.number().positive(),
  })
  .extend({
    category: z.union([z.number().positive(), z.number().positive().array()]),
  })

export const curseSelectSchema = z.object({
  curseId: z.number().positive(),
  title: z.string(),
  professorId: z.number().positive(),
  price: z.string().transform(val => Number(val).toFixed(2)),
})
