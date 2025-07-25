import { z } from 'zod'

export const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  DATABASE_URL: z.string(),
  SERVER_URL: z.string(),
  PORT: z.coerce.number().default(3000),
  JWT_SECRET: z.string(),
  EXPIRES_IN: z.string(),
  REFRESH_EXPIRES_IN: z.string(),
})

export const { DATABASE_URL, REFRESH_EXPIRES_IN, ...env } = envSchema.parse(
  process.env
)
