import { REFRESH_EXPIRES_IN } from '@/infra/env.ts'
import type { Users } from '@/types/user.types.ts'
import type { JWT } from '@fastify/jwt'

export function createToken(jwt: JWT, { userId, email }: Users) {
  return {
    refreshtoken: jwt.sign(
      { userId, email },
      {
        expiresIn: REFRESH_EXPIRES_IN,
      }
    ),
    acessToken: jwt.sign({ userId, email }),
  }
}
