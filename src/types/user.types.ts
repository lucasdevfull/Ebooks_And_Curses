import type { z } from 'zod'
import type { users } from '@/db/schema/tables/user.table.ts'
import type { tokenSchema } from '@/schema/auth.schema.ts'
import type { loginSchema } from '@/schema/user.schema.ts'

export type Login = z.infer<typeof loginSchema>

export type NewUser = typeof users.$inferInsert
export type Users = typeof users.$inferSelect

export type Token = z.infer<typeof tokenSchema>
