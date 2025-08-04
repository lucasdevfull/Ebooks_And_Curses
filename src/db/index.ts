import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from '@/db/schema/index.ts'
import { env } from '@/infra/env.ts'

export const db = drizzle(postgres(env.DATABASE_URL), { schema })
