import { z } from 'zod'

export const tokenSchema = z.object({
  refreshtoken: z.string(),
  acessToken: z.string(),
})
