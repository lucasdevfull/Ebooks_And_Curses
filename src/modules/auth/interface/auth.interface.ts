import type { Login, Token } from '@/types/user.types.ts'
import type {
  FastifyReply,
  FastifyRequest,
  RouteGenericInterface,
} from 'fastify'

export interface IAuthController {
  login: (
    request: FastifyRequest<LoginRequest>,
    reply: FastifyReply
  ) => Promise<Token>
}
export interface IAuthServices {
  authenticate({ username, password }: Login): Promise<Token>
}

export interface LoginRequest extends RouteGenericInterface {
  Body: Login
}
