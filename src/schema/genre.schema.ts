import { genres } from '@/db/schema/books.ts'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const genreIsertSchema = createInsertSchema(genres, {
  name: schema =>
    schema.min(1, { message: 'O nome deve ter pelo menos 1 caracteres' }),
})

export const genreSelectSchema = createSelectSchema(genres)
