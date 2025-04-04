import { z } from 'zod'

export const httpSchema = z.object({
  statusCode: z.number(),
  error: z.string(),
  message: z.string(),
})
