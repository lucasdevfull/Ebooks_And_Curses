import z from "zod"

export const authorsInsertSchema = z.object({
  first_name: z.string().min(1, {
    message: 'O nome deve ter pelo menos 1 caracteres',
    
  }),
  last_name: z.string().min(1, {
    message: 'O sobrenome deve ter pelo menos 1 caracteres',
  }),
})

export const authorsSelectSchema = z.object({
  authorId: z.number().positive(),
  first_name: z
    .string()
    .min(1, { message: 'O nome deve ter pelo menos 1 caracteres' }),
  last_name: z
    .string()
    .min(1, { message: 'O sobrenome deve ter pelo menos 1 caracteres' }),
})
