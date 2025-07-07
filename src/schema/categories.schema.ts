import z from 'zod'

export const categoryInsertSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'O nome deve ter pelo menos 1 caracteres' }),
})

export const categorySelectSchema = z.object({
  categoryId: z.number().positive(),
  name: z
    .string()
    .min(1, { message: 'O nome deve ter pelo menos 1 caracteres' }),
})
