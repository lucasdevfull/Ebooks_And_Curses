import { users } from '@/db/schema/tables/user.ts'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

export const userInsertSchema = createInsertSchema(users, {
  username: schema =>
    schema.min(1, {
      message: 'O username deve ter pelo menos 1 caracteres',
    }),
  email: schema => schema.email({ message: 'O email deve ser valido' }),
  password: schema =>
    schema.min(8, {
      message: 'A senha deve ter pelo menos 8 caracteres',
    }),
})
  .extend({
    confirmPassword: z
      .string()
      .min(8, { message: 'A senha deve ter pelo menos 8 caracteres' }),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'As senhas devem ser iguais',
    path: ['confirmPassword'],
  })

export const userSelectSchema = createSelectSchema(users, {
  userId: schema => schema.positive(),
  username: schema =>
    schema.min(1, {
      message: 'O username deve ter pelo menos 1 caracteres',
    }),
  email: schema =>
    schema.email({
      message: 'O email deve ser valido',
    }),
  password: schema =>
    schema.min(8, {
      message: 'A senha deve ter pelo menos 8 caracteres',
    }),
})

export const loginSchema = userInsertSchema._def.schema.pick({
  username: true,
  password: true,
})
