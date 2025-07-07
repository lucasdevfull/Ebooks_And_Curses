import { defineConfig } from 'drizzle-kit'
import { DATABASE_URL } from '@/infra/env.ts'

export default defineConfig({
  schema: './src/db/schema/*',
  out: '.drizzle/migrations',
  dbCredentials: {
    url: DATABASE_URL,
  },
  dialect: 'postgresql',
})
