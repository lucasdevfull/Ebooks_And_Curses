import { db } from '@/db/index.ts'
import { users } from '@db/index.ts'
import { userSelectSchema } from '@schema/user.schema.ts'
import type { NewUser, Users } from '@/types/user.types.ts'
import type { IUserRepository } from '@interface/user.interface.ts'
import { eq } from 'drizzle-orm'

export class UserRepository implements IUserRepository {
  async getAllUsers(): Promise<Users[]> {
    const usuarios: Users[] = await db.select().from(users)
    const result = userSelectSchema.array().safeParse(usuarios)
    if (!result.success) {
      throw new Error(result.error.message)
    }
    return result.data
  }
  async create(user: NewUser): Promise<Users> {
    const newUser: Users[] = await db.insert(users).values(user).returning({
      userId: users.userId,
      username: users.username,
      email: users.email,
      password: users.password,
      createdAt: users.createdAt,
    })
    return newUser[0]
  }

  async findUserById(id: number): Promise<Users> {
    const userExists: Users[] = await db
      .select()
      .from(users)
      .where(eq(users.userId, id))
    const result = userSelectSchema.array().safeParse(userExists)
    if (!result.success) {
      throw new Error(result.error.message)
    }
    return result.data[0]
  }

  async findUserByEmail(userEmail: string): Promise<Users> {
    const userExists: Users[] = await db
      .select()
      .from(users)
      .where(eq(users.email, userEmail))
    const result = userSelectSchema.array().safeParse(userExists)
    if (!result.success) {
      throw new Error(result.error.message)
    }

    return result.data[0]
  }

  async findUserByUsername(userName: string): Promise<Users> {
    const userExists: Users[] = await db
      .select()
      .from(users)
      .where(eq(users.username, userName))
    const result = userSelectSchema.array().safeParse(userExists)
    if (!result.success) {
      throw new Error(result.error.message)
    }
    return result.data[0]
  }
}
