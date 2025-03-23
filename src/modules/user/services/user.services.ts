import { randomInt } from 'node:crypto'
import type { NewUser, Users } from '@/types/user.types.ts'
import { passwordHash } from '@/common/utils/hash.ts'
import type { IUserServices } from '@interface/user.interface.ts'
import { UserRepository } from '@repositories/user.repositories.ts'

export class UserServices implements IUserServices {
  private repository: UserRepository
  constructor() {
    this.repository = new UserRepository()
  }
  async getAll(): Promise<Users[]> {
    const users: Users[] = await this.repository.getAll()
    return users
  }

  async getUserById(id: number): Promise<Users> {
    const user: Users = await this.repository.getById(id)
    return user
  }
  async create(user: NewUser): Promise<Users> {
    const userExists: Users = await this.repository.findUserByEmail(user.email)

    if (userExists) throw new Error('Usuário já cadastrado')

    const salt: number = randomInt(10, 16)
    const password: string = await passwordHash(user.password, salt)
    const newUser: Users = await this.repository.create({
      ...user,
      password,
    })
    return newUser
  }
}
