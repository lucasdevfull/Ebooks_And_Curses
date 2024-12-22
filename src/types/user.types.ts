import type { users } from '@/db/schema/tables/user.ts'
import type { tokenSchema } from '@/schema/auth.schema.ts'
import type { loginSchema } from '@/schema/user.schema.ts'
import type { z } from 'zod'

export type Login = z.infer<typeof loginSchema>

export type NewUser = typeof users.$inferInsert
export type Users = typeof users.$inferSelect
export interface IUser {
  userId: number
  username: string
  email: string
  password: string
}

export type Token = z.infer<typeof tokenSchema>
