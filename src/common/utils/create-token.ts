import type { Users } from '@/types/user.types.ts'
import type { JWT } from '@fastify/jwt'

export function createToken(jwt: JWT, user: Users) {
  return {
    refreshtoken: jwt.sign(
      { id: user.userId, email: user.email },
      {
        expiresIn: '1d',
      }
    ),
    acessToken: jwt.sign(
      { id: user.userId, email: user.email },
      {
        expiresIn: '1h',
      }
    ),
  }
}
