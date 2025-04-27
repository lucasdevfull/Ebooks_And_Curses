import type { Users } from '@/types/user.types.ts'
import type { JWT } from '@fastify/jwt'
import { v4 } from 'uuid'

export function createToken(jwt: JWT, user: Users) {
  return {
    refreshtoken: jwt.sign(
      { id: user.userId, email: user.email },
      {
        expiresIn: '1d',
        jti: v4()
      }
    ),
    acessToken: jwt.sign(
      { id: user.userId, email: user.email },
      {
        expiresIn: '1h',
        jti: v4()
      }
    ),
  }
}
