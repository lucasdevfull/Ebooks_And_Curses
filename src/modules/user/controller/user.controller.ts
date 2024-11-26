import type { NewUser, Users } from '@/@types/user.ts'
import type { FastifyReply, FastifyRequest } from 'fastify'
import type { IUserController } from '../interface/user.interface.ts'
import { UserServices } from '../services/user.services.ts'

export class UserController implements IUserController {
  private service: UserServices
  constructor() {
    this.service = new UserServices()
  }
  getUsers = async (
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<Users[]> => {
    const users = await this.service.getAll()
    return reply.status(200).send(users)
  }

  getUser = async (
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<Users> => {
    const { id } = request.params as { id: string }
    const user: Users = await this.service.getUserById(Number(id))
    if (!user) {
      return reply.status(404).send({
        statusCode: 404,
        error: 'Not Found',
        message: 'User not found',
      })
    }
    return reply.status(200).send(user)
  }

  createUser = async (
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<Users | never> => {
    try {
      const user = request.body as NewUser
      const result = await this.service.create(user)
      return reply.status(201).send(result)
    } catch (error) {
      return reply.status(500).send(error)
    }
  }
}
