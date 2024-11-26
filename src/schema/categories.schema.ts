import { categoria } from '@/db/schema/cursos.ts'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const categoryInsertSchema = createInsertSchema(categoria, {
  name: schema =>
    schema.name.min(1, { message: 'O nome deve ter pelo menos 1 caracteres' }),
})

export const categorySelectSchema = createSelectSchema(categoria)
