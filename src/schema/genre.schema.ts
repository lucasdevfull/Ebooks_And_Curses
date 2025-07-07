import z from 'zod'

export const genreIsertSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'O nome deve ter pelo menos 1 caracteres' }),
})

export const genreSelectSchema = z.object({
  genreId: z.number().positive(),
  name: z
    .string()
    .min(1, { message: 'O nome deve ter pelo menos 1 caracteres' }),
})
