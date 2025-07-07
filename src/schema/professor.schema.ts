import z from 'zod'

export const professorInsertSchema = z.object({
  name: z.string().min(1, {
    message: 'O nome deve ter pelo menos 1 caracteres',
  }),
  email: z.string().email({ message: 'O email deve ser valido' }),
})

export const professorSelectSchema = z.object({
  professorId: z.number().positive(),
  name: z
    .string()
    .min(1, { message: 'O nome deve ter pelo menos 1 caracteres' }),
  email: z.string().email({ message: 'O email deve ser valido' }),
})
