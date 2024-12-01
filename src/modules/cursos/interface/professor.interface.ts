import type { NewProfessor, TProfessor } from '@/@types/cursos.ts'
import type { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify'

export interface ProfessorRequest extends RouteGenericInterface {
  Params: {
    id: string
  }
}

export interface IProfessorController {
  getAllProfessors(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<TProfessor[]>
  getProfessorById(
    request: FastifyRequest<ProfessorRequest>,
    reply: FastifyReply
  ): Promise<TProfessor>
  createProfessor(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<TProfessor>
  updateProfessor(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<TProfessor>
  deleteProfessor(
    request: FastifyRequest,
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

export interface IProfessorRepository {
  getAll(): Promise<TProfessor[]>
  getById(id: number): Promise<TProfessor>
  create(data: NewProfessor): Promise<TProfessor>
  update(id: number, data: NewProfessor): Promise<TProfessor>
  delete(id: number): Promise<TProfessor>
}
