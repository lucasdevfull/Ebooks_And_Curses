import type {
  FastifyReply,
  FastifyRequest,
  RouteGenericInterface,
} from 'fastify'
import type { NewProfessor, TProfessor } from '@/types/curse.types.ts'

export interface ProfessorRequest extends RouteGenericInterface {
  Params: {
    id: string
  }
}

export interface ProfessorBodyRequest extends ProfessorRequest {
  Body: NewProfessor
}

export interface IProfessorController {
  getAllProfessors(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<TProfessor[]>
  getProfessorById(
    request: FastifyRequest<ProfessorRequest>,
    reply: FastifyReply
  ): Promise<TProfessor | Error>
  createProfessor(
    request: FastifyRequest<ProfessorBodyRequest>,
    reply: FastifyReply
  ): Promise<TProfessor>
  updateProfessor(
    request: FastifyRequest<ProfessorBodyRequest>,
    reply: FastifyReply
  ): Promise<TProfessor>
  deleteProfessor(
    request: FastifyRequest<ProfessorRequest>,
    reply: FastifyReply
  ): Promise<{ message: string }>
}
export interface IProfessorServices {
  getAllProfessors(): Promise<TProfessor[]>
  getProfessorById(id: number): Promise<TProfessor>
  createProfessor(data: NewProfessor): Promise<TProfessor>
  updateProfessor(id: number, data: NewProfessor): Promise<TProfessor>
  deleteProfessor(id: number): Promise<{ message: string }>
}
