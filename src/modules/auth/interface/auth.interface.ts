import type { Login, Token } from '@/@types/user.ts'
import type { FastifyReply, FastifyRequest } from 'fastify'

export interface IAuthController {
  login: (request: FastifyRequest, reply: FastifyReply) => Promise<Token>
}
export interface IAuthServices {
  authenticate({ username, password }: Login): Promise<Token>
}
