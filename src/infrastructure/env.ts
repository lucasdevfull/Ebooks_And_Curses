import { config } from 'dotenv'
import { z } from 'zod'

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  DATABASE_URL: z.string(),
  PORT: z
    .string()
    .default('3000')
    .transform(val => Number(val)),
  JWT_SECRET: z.string(),
})

config()
export const { PORT, NODE_ENV, DATABASE_URL, JWT_SECRET } = envSchema.parse(process.env)
