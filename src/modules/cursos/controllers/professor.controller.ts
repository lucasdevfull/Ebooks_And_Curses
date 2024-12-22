import { NotFoundError } from '@/errors/not-found.ts'
import type { NewProfessor, TProfessor } from '@/types/cursos.types.ts'
import type {
  IProfessorController,
  ProfessorBodyRequest,
  ProfessorRequest,
} from '@interface/professor.interface.ts'
import { ProfessorServices } from '@services/professor.services.ts'
import type { FastifyReply, FastifyRequest } from 'fastify'

export class ProfessorController implements IProfessorController {
  private service: ProfessorServices
  constructor() {
    this.service = new ProfessorServices()
  }

  getAllProfessors = async (
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<TProfessor[]> => {
    const professors = await this.service.getAllProfessors()
    return reply.status(200).send(professors)
  }

  getProfessorById = async (
    request: FastifyRequest<ProfessorRequest>,
    reply: FastifyReply
  ): Promise<TProfessor | Error> => {
    const { id } = request.params
    const professor = await this.service.getProfessorById(Number(id))
    if (!professor) {
      return new NotFoundError('Professor not found')
    }
    return reply.status(200).send(professor)
  }

  createProfessor = async (
    request: FastifyRequest<ProfessorBodyRequest>,
    reply: FastifyReply
  ): Promise<TProfessor> => {
    try {
      const professor: NewProfessor = request.body
      const result = await this.service.createProfessor(professor)
      return reply.status(201).send(result)
    } catch (error) {
      return reply.send(error)
    }
  }

  updateProfessor = async (
    request: FastifyRequest<ProfessorBodyRequest>,
    reply: FastifyReply
  ): Promise<TProfessor> => {
    try {
      const { id } = request.params
      const professor: NewProfessor = request.body
      const result = await this.service.updateProfessor(Number(id), professor)
      return reply.status(200).send(result)
    } catch (error) {
      return reply.send(error)
    }
  }

  deleteProfessor = async (
    request: FastifyRequest<ProfessorRequest>,
    reply: FastifyReply
  ): Promise<{ message: string }> => {
    try {
      const { id } = request.params
      const result = await this.service.deleteProfessor(Number(id))
      return reply.status(204).send(result)
    } catch (error) {
      return reply.send(error)
    }
  }
}
