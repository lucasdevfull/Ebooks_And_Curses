import * as schema from '@/db/schema/index.ts'
import { env } from '@/infrastructure/env.ts'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

export const db = drizzle(postgres(env.DATABASE_URL), { schema })
