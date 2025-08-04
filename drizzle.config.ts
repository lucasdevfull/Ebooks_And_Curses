import { defineConfig } from 'drizzle-kit'
import { env } from '@/infra/env.ts'

export default defineConfig({
  schema: './src/db/schema/*',
  out: '.drizzle/migrations',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  dialect: 'postgresql',
})
