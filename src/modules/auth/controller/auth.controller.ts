import { HttpStatus } from '@/common/enum/http.ts'
import type {
  IAuthController,
  LoginRequest,
} from '@interface/auth.interface.ts'
import { AuthServices } from '@services/auth.services.ts'
import type { FastifyReply, FastifyRequest } from 'fastify'

export class AuthController implements IAuthController {
  private service: AuthServices
  constructor() {
    this.service = new AuthServices()
  }

  login = async (
    { body: user, server: { jwt } }: FastifyRequest<LoginRequest>,
    reply: FastifyReply
  ) => {
    const result = await this.service.authenticate(user, jwt)
    return reply.status(HttpStatus.OK).send(result)
  }
}
