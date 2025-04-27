import { HttpStatus } from '@/common/enum/http.ts'
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
    console.log(request.user)
    const cursos = await this.service.getAllCurses()
    return reply.status(HttpStatus.OK).send(cursos)
  }

  getCursesById = async (
    { params: { id } }: FastifyRequest<CursoRequest>,
    reply: FastifyReply
  ): Promise<Curse> => {
    const curso = await this.service.getCursesById(Number(id))
    return reply.status(HttpStatus.OK).send(curso)
  }

  createCurses = async (
    { body }: FastifyRequest<CursoBodyRequest>,
    reply: FastifyReply
  ): Promise<TCurse> => {
    const result = await this.service.createCurses(body)
    return reply.status(HttpStatus.CREATED).send(result)
  }

  updateCurses = async (
    { body, params: { id } }: FastifyRequest<CursoBodyRequest>,
    reply: FastifyReply
  ): Promise<TCurse> => {
    const result = await this.service.updateCurses(Number(id), body)
    return reply.status(HttpStatus.OK).send(result)
  }

  deleteCurses = async (
    { params: { id } }: FastifyRequest<CursoRequest>,
    reply: FastifyReply
  ): Promise<{ message: string }> => {
    const result = await this.service.deleteCurses(Number(id))
    return reply.status(HttpStatus.OK).send(result)
  }

  deleteCategory = async (
    { params: { cursoId, categoriaId } }: FastifyRequest<CategoriaCursoRequest>,
    reply: FastifyReply
  ) => {
    const result = await this.service.deleteCategoryInCurse(
      cursoId,
      categoriaId
    )
    return reply.status(HttpStatus.NO_CONTENT).send(result)
  }
}
