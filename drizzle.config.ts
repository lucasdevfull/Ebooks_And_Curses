
import { DATABASE_URL } from '@/infrastructure/env.ts'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './src/db/schema/*',
  out: '.drizzle/migrations',
  dbCredentials: {
    url: DATABASE_URL,
  },
  dialect: "postgresql",
})