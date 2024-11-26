import type { NewProfessor } from '@/@types/cursos.ts'
import type { FastifyReply, FastifyRequest } from 'fastify'
import type { Professor } from '../entities/professor.entities.ts'
import type { IProfessorController } from '../interface/professor.interface.ts'
import { ProfessorServices } from '../services/professor.services.ts'

export class ProfessorController implements IProfessorController {
  private service: ProfessorServices
  constructor() {
    this.service = new ProfessorServices()
  }

  getAllProfessors = async (
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<Professor[]> => {
    const professors = await this.service.getAllProfessors()
    return reply.status(200).send(professors)
  }

  getProfessorById = async (
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<Professor> => {
    const { id } = request.params as { id: string }
    const professor = await this.service.getProfessorById(Number(id))
    if (!professor) {
      return reply.status(404).send({
        statusCode: 404,
        error: 'Not Found',
        message: 'Professor not found',
      })
    }
    return reply.status(200).send(professor)
  }

  createProfessor = async (
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<Professor> => {
    try {
      const professor = request.body as NewProfessor
      const result = await this.service.createProfessor(professor)
      return reply.status(201).send(result)
    } catch (error) {
      return reply.status(500).send(error)
    }
  }

  updateProfessor = async (
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<Professor> => {
    try {
      const { id } = request.params as { id: string }
      const professor = request.body as NewProfessor
      const result = await this.service.updateProfessor(Number(id), professor)
      return reply.status(200).send(result)
    } catch (error) {
      return reply.status(500).send(error)
    }
  }

  deleteProfessor = async (
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<{ message: string }> => {
    try {
      const { id } = request.params as { id: string }
      const result = await this.service.deleteProfessor(Number(id))
      return reply.status(204).send(result)
    } catch (error) {
      return reply.status(500).send(error)
    }
  }
}
