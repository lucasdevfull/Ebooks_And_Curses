import * as schema from '@/db/schema/index.ts'
import { env } from '@/env.ts'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

export const client = postgres(env.DATABASE_URL)
export const db = drizzle(client, { schema })
