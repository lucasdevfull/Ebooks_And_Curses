import { category } from '@db/index.ts'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const categoryInsertSchema = createInsertSchema(category, {
  name: schema =>
    schema.min(1, { message: 'O nome deve ter pelo menos 1 caracteres' }),
})

export const categorySelectSchema = createSelectSchema(category)
