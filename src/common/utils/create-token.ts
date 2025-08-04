import type { JWT } from '@fastify/jwt'
import { env } from '@/infra/env.ts'
import type { Users } from '@/types/user.types.ts'

export function createToken(jwt: JWT, { userId, email }: Users) {
  return {
    refreshtoken: jwt.sign(
      { userId, email },
      {
        expiresIn: env.REFRESH_EXPIRES_IN,
      }
    ),
    acessToken: jwt.sign({ userId, email }),
  }
}
