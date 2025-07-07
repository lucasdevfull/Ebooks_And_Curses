import type {
  IUserController,
  UserBodyRequest,
  UserRequest,
} from '@interface/user.interface.ts'
import type { UserServices } from '@services/user.services.ts'
import type { FastifyReply, FastifyRequest } from 'fastify'
import type { Users } from '@/types/user.types.ts'

export class UserController implements IUserController {
  constructor(private service: UserServices) {
    this.service = service
  }
  getUsers = async (
    _request: FastifyRequest,
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
  ): Promise<Users> => {
    const result: Users = await this.service.create(body)
    return reply.status(201).send(result)
  }
}
