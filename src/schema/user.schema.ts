import { z } from 'zod'

export const userInsertSchema = z
  .object({
    username: z.string().min(1, {
      message: 'O username deve ter pelo menos 1 caracteres',
    }),
    email: z.string().email({ message: 'O email deve ser valido' }),
    password: z.string().min(8, {
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

export const userSelectSchema = z.object({
  userId: z
    .number()
    .positive({ message: 'O userId deve ser um número positivo' }),
  username: z
    .string()
    .min(1, { message: 'O username deve ter pelo menos 1 caracteres' }),
  email: z.string().email({ message: 'O email deve ser valido' }),
  password: z
    .string()
    .min(8, { message: 'A senha deve ter pelo menos 8 caracteres' }),
})

export const loginSchema = z.object({
  username: z.string().min(1, {
    message: 'O username deve ter pelo menos 1 caracteres',
  }),
  password: z.string().min(8, {
    message: 'A senha deve ter pelo menos 8 caracteres',
  })
})
