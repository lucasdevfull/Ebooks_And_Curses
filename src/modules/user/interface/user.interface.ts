import type {
  FastifyReply,
  FastifyRequest,
  RouteGenericInterface,
} from 'fastify'
import type { NewUser, Users } from '@/types/user.types.ts'

export interface UserRequest extends RouteGenericInterface {
  Params: {
    id: string
  }
}

export interface UserBodyRequest extends UserRequest {
  Body: NewUser
}
export interface IUserController {
  getUser: (
    request: FastifyRequest<UserRequest>,
    reply: FastifyReply
  ) => Promise<Users>
  getUsers: (request: FastifyRequest, reply: FastifyReply) => Promise<Users[]>
  createUser: (
    request: FastifyRequest<UserBodyRequest>,
    reply: FastifyReply
  ) => Promise<Users>
}

export interface IUserServices {
  getUserById(id: number): Promise<Users>
  getAll(): Promise<Users[]>
  create(user: NewUser): Promise<Users>
}
