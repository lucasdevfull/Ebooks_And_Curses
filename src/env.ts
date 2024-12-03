import { config } from 'dotenv'
import { z } from 'zod'

export const envSchema = z.object({
  DATABASE_URL: z.string(),
  PORT: z
    .string()
    .default('3000')
    .transform(val => Number(val)),
  JWT_SECRET: z.string(),
})

config()
export const env = envSchema.parse(process.env)
