
import { DATABASE_URL } from '@/infra/env.ts'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './src/db/schema/*',
  out: '.drizzle/migrations',
  dbCredentials: {
    url: DATABASE_URL,
  },
  dialect: "postgresql",
})