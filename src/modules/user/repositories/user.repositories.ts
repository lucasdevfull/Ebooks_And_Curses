import type { Repository } from '@/common/base/repository.ts'
import { db } from '@/db/index.ts'
import type { NewUser, Users } from '@/types/user.types.ts'
import { users } from '@db/index.ts'
import { eq } from 'drizzle-orm'

export class UserRepository implements Repository<Users, NewUser> {
  async getAll(): Promise<Users[]> {
    const data: Users[] = await db.select().from(users)
    return data
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

  async getById(id: number): Promise<Users> {
    const userExists: Users[] = await db
      .select()
      .from(users)
      .where(eq(users.userId, id))
    return userExists[0]
  }

  async findUserByEmail(userEmail: string): Promise<Users> {
    const userExists: Users[] = await db
      .select()
      .from(users)
      .where(eq(users.email, userEmail))
    return userExists[0]
  }

  async findUserByUsername(userName: string): Promise<Users> {
    const userExists: Users[] = await db
      .select()
      .from(users)
      .where(eq(users.username, userName))
    return userExists[0]
  }
}
