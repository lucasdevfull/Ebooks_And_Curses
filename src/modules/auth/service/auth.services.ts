import type { JWT } from '@fastify/jwt'
import type { IAuthServices } from '@interface/auth.interface.ts'
import { compareSync } from '@node-rs/bcrypt'
import type { UserRepository } from '@repositories/user.repositories.ts'
import { BadRequestError } from '@/common/errors/bad-request.ts'
import { createToken } from '@/common/utils/create-token.ts'
import type { Login, Token, Users } from '@/types/user.types.ts'

export class AuthServices implements IAuthServices {
  constructor(private repository: UserRepository) {
    this.repository = repository
  }
  async authenticate({ username, password }: Login, jwt: JWT): Promise<Token> {
    const userExists: Users = await this.repository.findUserByUsername(username)
    if (!userExists) {
      throw new BadRequestError('Usuário não encontrado')
    }

    if (!compareSync(password, userExists.password)) {
      throw new BadRequestError('Senha inválida')
    }

    const { refreshtoken, acessToken }: Token = createToken(jwt, userExists)

    return { refreshtoken, acessToken }
  }
}
