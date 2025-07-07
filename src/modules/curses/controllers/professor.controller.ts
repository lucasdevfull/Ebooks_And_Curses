import type {
  IProfessorController,
  ProfessorBodyRequest,
  ProfessorRequest,
} from '@interface/professor.interface.ts'
import type { ProfessorServices } from '@services/professor.services.ts'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { HttpStatus } from '@/common/enum/http.ts'
import type { TProfessor } from '@/types/curse.types.ts'

export class ProfessorController implements IProfessorController {
  constructor(private service: ProfessorServices) {
    this.service = service
  }

  getAllProfessors = async (
    _request: FastifyRequest,
    reply: FastifyReply
  ): Promise<TProfessor[]> => {
    const professors = await this.service.getAllProfessors()
    return reply.status(HttpStatus.OK).send(professors)
  }

  getProfessorById = async (
    { params: { id } }: FastifyRequest<ProfessorRequest>,
    reply: FastifyReply
  ): Promise<TProfessor> => {
    const professor = await this.service.getProfessorById(Number(id))
    return reply.status(HttpStatus.OK).send(professor)
  }

  createProfessor = async (
    { body }: FastifyRequest<ProfessorBodyRequest>,
    reply: FastifyReply
  ): Promise<TProfessor> => {
    const result = await this.service.createProfessor(body)
    return reply.status(HttpStatus.CREATED).send(result)
  }

  updateProfessor = async (
    { body, params: { id } }: FastifyRequest<ProfessorBodyRequest>,
    reply: FastifyReply
  ): Promise<TProfessor> => {
    const result = await this.service.updateProfessor(Number(id), body)
    return reply.status(HttpStatus.OK).send(result)
  }

  deleteProfessor = async (
    { params: { id } }: FastifyRequest<ProfessorRequest>,
    reply: FastifyReply
  ): Promise<{ message: string }> => {
    const result = await this.service.deleteProfessor(Number(id))
    return reply.status(HttpStatus.NO_CONTENT).send(result)
  }
}
