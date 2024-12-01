import type { NewUser, Users } from '@/@types/user.ts'
import type {
  FastifyReply,
  FastifyRequest,
  RouteGenericInterface,
} from 'fastify'

export interface UserRequest extends RouteGenericInterface {
  Params: {
    id: string
  }
}

export interface IUserController {
  getUser: (
    request: FastifyRequest<UserRequest>,
    reply: FastifyReply
  ) => Promise<Users>
  getUsers: (request: FastifyRequest, reply: FastifyReply) => Promise<Users[]>
  createUser: (
    request: FastifyRequest,
    reply: FastifyReply
  ) => Promise<Users | never>
}

export interface IUserServices {
  getUserById(id: number): Promise<Users>
  getAll(): Promise<Users[]>
  create(user: NewUser): Promise<Users>
}

export interface IUserRepository {
  create(user: NewUser): Promise<Users>
  findUserByEmail(email: string): Promise<Users>
  findUserById(userId: number): Promise<Users>
  findUserByUsername(username: string): Promise<Users>
}
