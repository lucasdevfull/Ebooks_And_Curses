import type {
  FastifyReply,
  FastifyRequest,
  RouteGenericInterface,
} from 'fastify'
import type {
  Curse,
  NewCurse,
  TCategoryCurse,
  TCurse,
} from '@/types/curse.types.ts'

export interface CursoRequest extends RouteGenericInterface {
  Params: {
    id: string
  }
}

export interface CursoBodyRequest extends CursoRequest {
  Body: NewCurse
}

export interface CategoriaCursoRequest extends RouteGenericInterface {
  Params: {
    categoriaId: number
    cursoId: number
  }
}
export interface ICursoController {
  getAllCurses(request: FastifyRequest, reply: FastifyReply): Promise<Curse[]>
  getCursesById(
    request: FastifyRequest<CursoRequest>,
    reply: FastifyReply
  ): Promise<Curse | Error>
  createCurses(
    request: FastifyRequest<CursoBodyRequest>,
    reply: FastifyReply
  ): Promise<TCurse>
  updateCurses(
    request: FastifyRequest<CursoBodyRequest>,
    reply: FastifyReply
  ): Promise<TCurse>
  deleteCurses(
    request: FastifyRequest<CursoRequest>,
    reply: FastifyReply
  ): Promise<{ message: string }>
}
export interface ICursoServices {
  getAllCurses(): Promise<Curse[]>
  getCursesById(id: number): Promise<Curse>
  createCurses(data: NewCurse): Promise<TCurse>
  updateCurses(id: number, data: NewCurse): Promise<TCurse>
  deleteCurses(id: number): Promise<{ message: string }>
}

export interface ICursoRepository {
  getAll(): Promise<Curse[]>
  getById(id: number): Promise<Curse>
  getByName(nome: string): Promise<TCurse>
  create(data: NewCurse): Promise<TCurse>
  update(id: number, data: NewCurse): Promise<TCurse>
  delete(id: number): Promise<TCategoryCurse>
}
