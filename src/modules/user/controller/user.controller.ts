import type { NewUser, Users } from '@/types/user.types.ts'
import type {
  IUserController,
  UserBodyRequest,
  UserRequest,
} from '@interface/user.interface.ts'
import { UserServices } from '@services/user.services.ts'
import type { FastifyReply, FastifyRequest } from 'fastify'

export class UserController implements IUserController {
  private service: UserServices
  constructor() {
    this.service = new UserServices()
  }
  getUsers = async (
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<Users[]> => {
    const users: Users[] = await this.service.getAll()
    return reply.status(200).send(users)
  }

  getUser = async (
    { params: { id } }: FastifyRequest<UserRequest>,
    reply: FastifyReply
  ): Promise<Users> => {
    const user: Users = await this.service.getUserById(Number(id))
    return reply.status(200).send(user)
  }

  createUser = async (
    { body }: FastifyRequest<UserBodyRequest>,
    reply: FastifyReply
  ): Promise<Users | never> => {
    try {
      const result: Users = await this.service.create(body)
      return reply.status(201).send(result)
    } catch (error) {
      return reply.status(500).send(error)
    }
  }
}
