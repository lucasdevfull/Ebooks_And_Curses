import type { Curso, NewCurso, TCurso } from '@/@types/cursos.ts'
import type { FastifyReply, FastifyRequest } from 'fastify'
import type {
  CursoBodyRequest,
  CursoRequest,
  ICursoController,
} from '../interface/curso.interface.ts'
import { CursoServices } from '../services/curso.services.ts'

export class CursoController implements ICursoController {
  private service: CursoServices
  constructor() {
    this.service = new CursoServices()
  }
  getAllCursos = async (
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<Curso[]> => {
    const cursos = await this.service.getAllCursos()
    return reply.status(200).send(cursos)
  }

  getCursosById = async (
    request: FastifyRequest<CursoRequest>,
    reply: FastifyReply
  ): Promise<Curso> => {
    const { id } = request.params
    const curso = await this.service.getCursosById(Number(id))
    if (!curso) {
      return reply.status(404).send({
        statusCode: 404,
        error: 'Not Found',
        message: 'Curso not found',
      })
    }
    return reply.status(200).send(curso)
  }

  createCursos = async (
    request: FastifyRequest<CursoBodyRequest>,
    reply: FastifyReply
  ): Promise<TCurso> => {
    try {
      const curso: NewCurso = request.body
      const result = await this.service.createCursos(curso)
      return reply.status(201).send(result)
    } catch (error) {
      return reply.status(500).send(error)
    }
  }

  updateCursos = async (
    request: FastifyRequest<CursoBodyRequest>,
    reply: FastifyReply
  ): Promise<TCurso> => {
    try {
      const { id } = request.params
      const curso: NewCurso = request.body
      const result = await this.service.updateCursos(Number(id), curso)
      return reply.status(200).send(result)
    } catch (error) {
      return reply.status(500).send(error)
    }
  }

  deleteCursos = async (
    request: FastifyRequest<CursoRequest>,
    reply: FastifyReply
  ): Promise<{ message: string }> => {
    try {
      const { id } = request.params
      const result = await this.service.deleteCursos(Number(id))
      return reply.status(200).send(result)
    } catch (error) {
      return reply.status(500).send(error)
    }
  }
}
