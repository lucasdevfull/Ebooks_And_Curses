import { randomInt } from 'node:crypto'
import type { IUserServices } from '@interface/user.interface.ts'
import type { UserRepository } from '@repositories/user.repositories.ts'
import { ConflitError } from '@/common/errors/conflit.ts'
import { NotFoundError } from '@/common/errors/not-found.ts'
import { passwordHash } from '@/common/utils/hash.ts'
import type { NewUser, Users } from '@/types/user.types.ts'

export class UserServices implements IUserServices {
  constructor(private repository: UserRepository) {
    this.repository = repository
  }
  async getAll(): Promise<Users[]> {
    const users: Users[] = await this.repository.getAll()
    return users
  }

  async getUserById(id: number): Promise<Users> {
    const user: Users = await this.repository.getById(id)
    if (!user) throw new NotFoundError('User not found')
    return user
  }
  async create({ email, ...user }: NewUser): Promise<Users> {
    const userExists: Users = await this.repository.findUserByEmail(email)

    if (userExists) throw new ConflitError('User already exists')

    const salt: number = randomInt(10, 16)
    const password: string = await passwordHash(user.password, salt)
    const newUser: Users = await this.repository.create({
      ...user,
      email,
      password,
    })
    return newUser
  }
}
