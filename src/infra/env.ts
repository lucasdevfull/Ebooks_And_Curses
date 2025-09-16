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
  EMAIL: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_KEY: z.string(),

  REFRESH_TOKEN: z.string(),
})

export const env = envSchema.parse(process.env)
