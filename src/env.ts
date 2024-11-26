import { config } from 'dotenv'
import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string(),
  PORT: z.string().default('3000'),
  JWT_SECRET: z.string(),
})

config()
export const env = envSchema.parse(process.env)
