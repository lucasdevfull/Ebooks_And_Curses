import type { Login } from '@/types/user.types.ts'
import type { IAuthController } from '@interface/auth.interface.ts'
import { AuthServices } from '@services/auth.services.ts'
import type { FastifyReply, FastifyRequest } from 'fastify'

export class AuthController implements IAuthController {
  private service: AuthServices
  constructor() {
    this.service = new AuthServices()
  }

  login = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const user = request.body as Login
      const result = await this.service.authenticate(user)
      return reply.status(200).send(result)
    } catch (error) {
      return reply.status(400).send(error)
    }
  }
}
