import * as schema from '@/db/schema/index.ts'
import { DATABASE_URL } from '@/infra/env.ts'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

export const db = drizzle(postgres(DATABASE_URL), { schema })
