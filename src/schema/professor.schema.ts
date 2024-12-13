import { professor } from '@/db/schema/cursos.ts'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const professorInsertSchema = createInsertSchema(professor, {
  name: schema =>
    schema.min(1, {
      message: 'O nome deve ter pelo menos 1 caracteres',
    }),
  email: schema => schema.email({ message: 'O email deve ser valido' }),
})

export const professorSelectSchema = createSelectSchema(professor)
