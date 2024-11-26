import type { Login, Token, Users } from '@/@types/user.ts'
import { UserRepository } from '@/modules/user/repositories/user.repositories.ts'
import { createToken } from '@/utils/create-token.ts'
import { compare } from 'bcrypt'
import type { IAuthServices } from '../interface/auth.interface.ts'

export class AuthServices implements IAuthServices {
  private repository: UserRepository
  constructor() {
    this.repository = new UserRepository()
  }
  async authenticate({ username, password }: Login): Promise<Token> {
    const userExists: Users = await this.repository.findUserByUsername(username)
    if (!userExists) {
      throw new Error('Usuário não encontrado')
    }
    const validPassword: boolean = await compare(password, userExists.password)

    if (!validPassword) {
      throw new Error('Senha inválida')
    }

    const { refreshtoken, acessToken }: Token = createToken(userExists)

    return { refreshtoken, acessToken }
  }
}
