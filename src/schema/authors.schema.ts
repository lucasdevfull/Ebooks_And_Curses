import { authors } from '@/db/schema/books.ts'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const authorsInsertSchema = createInsertSchema(authors, {
  first_name: schema =>
    schema.first_name.min(1, {
      message: 'O nome deve ter pelo menos 1 caracteres',
    }),
  last_name: schema =>
    schema.last_name.min(1, {
      message: 'O sobrenome deve ter pelo menos 1 caracteres',
    }),
})

export const authorsSelectSchema = createSelectSchema(authors)
