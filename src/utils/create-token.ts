import type { Users } from '@/@types/user.ts'
import { server } from '@/server.ts'

export function createToken(user: Users) {
  return {
    refreshtoken: server.instance.jwt.sign(
      { id: user.userId, email: user.email },
      {
        expiresIn: '1d',
      }
    ),
    acessToken: server.instance.jwt.sign(
      { id: user.userId, email: user.email },
      {
        expiresIn: '1h',
      }
    ),
  }
}
