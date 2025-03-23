import type { Curse, TCurse } from '@/types/curse.types.ts'
import type {
  CategoriaCursoRequest,
  CursoBodyRequest,
  CursoRequest,
  ICursoController,
} from '@interface/curse.interface.ts'
import { CursoServices } from '@services/curse.services.ts'
import type { FastifyReply, FastifyRequest } from 'fastify'

export class CursoController implements ICursoController {
  private service: CursoServices
  constructor() {
    this.service = new CursoServices()
  }
  getAllCurses = async (
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<Curse[]> => {
    const cursos = await this.service.getAllCurses()
    return reply.status(200).send(cursos)
  }

  getCursesById = async (
    request: FastifyRequest<CursoRequest>,
    reply: FastifyReply
  ): Promise<Curse | Error> => {
    const { id } = request.params
    const curso = await this.service.getCursesById(Number(id))
    
    return reply.status(200).send(curso)
  }

  createCurses = async (
    request: FastifyRequest<CursoBodyRequest>,
    reply: FastifyReply
  ): Promise<TCurse> => {
    const { body } = request
    const result = await this.service.createCurses(body)
    return reply.status(201).send(result)
  }

  updateCurses = async (
    request: FastifyRequest<CursoBodyRequest>,
    reply: FastifyReply
  ): Promise<TCurse> => {
    const {
      body,
      params: { id },
    } = request
    const result = await this.service.updateCurses(Number(id), body)
    return reply.status(200).send(result)
  }

  deleteCurses = async (
    { params: { id } }: FastifyRequest<CursoRequest>,
    reply: FastifyReply
  ): Promise<{ message: string }> => {
    //const { id } = params
    const result = await this.service.deleteCurses(Number(id))
    return reply.status(200).send(result)
  }

  deleteCategory = async (
    { params: { cursoId, categoriaId } }: FastifyRequest<CategoriaCursoRequest>,
    reply: FastifyReply
  ) => {
    //const { cursoId, categoriaId } = params
    const result = await this.service.deleteCategoryInCurse(
      Number(cursoId),
      Number(categoriaId)
    )
    return reply.status(204).send(result)
  }
}
