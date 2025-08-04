import type {
  IAuthController,
  LoginRequest,
} from '@interface/auth.interface.ts'
import type { AuthServices } from '@services/auth.services.ts'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { HttpStatus } from '@/common/enum/http.ts'

export class AuthController implements IAuthController {
  constructor(private service: AuthServices) {
    this.service = service
  }

  login = async (
    { body, server: { jwt } }: FastifyRequest<LoginRequest>,
    reply: FastifyReply
  ) => {
    const result = await this.service.authenticate(body, jwt)
    return reply.status(HttpStatus.OK).send(result)
  }
}
