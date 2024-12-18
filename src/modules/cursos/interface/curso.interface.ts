import type {
  Curso,
  NewCurso,
  TCategoriaCurso,
  TCurso,
} from '@/types/cursos.types.ts'
import type {
  FastifyReply,
  FastifyRequest,
  RouteGenericInterface,
} from 'fastify'

export interface CursoRequest extends RouteGenericInterface {
  Params: {
    id: string
  }
}

export interface CursoBodyRequest extends CursoRequest {
  Body: NewCurso
}

export interface CategoriaCursoRequest extends RouteGenericInterface {
  Params: {
    categoriaId: string
    cursoId: string
  }
}
export interface ICursoController {
  getAllCursos(request: FastifyRequest, reply: FastifyReply): Promise<Curso[]>
  getCursosById(
    request: FastifyRequest<CursoRequest>,
    reply: FastifyReply
  ): Promise<Curso | Error>
  createCursos(
    request: FastifyRequest<CursoBodyRequest>,
    reply: FastifyReply
  ): Promise<TCurso>
  updateCursos(
    request: FastifyRequest<CursoBodyRequest>,
    reply: FastifyReply
  ): Promise<TCurso>
  deleteCursos(
    request: FastifyRequest<CursoRequest>,
    reply: FastifyReply
  ): Promise<{ message: string }>
}
export interface ICursoServices {
  getAllCursos(): Promise<Curso[]>
  getCursosById(id: number): Promise<Curso>
  createCursos(data: NewCurso): Promise<TCurso>
  updateCursos(id: number, data: NewCurso): Promise<TCurso>
  deleteCursos(id: number): Promise<{ message: string }>
}

export interface ICursoRepository {
  getAll(): Promise<Curso[]>
  getById(id: number): Promise<Curso>
  getByName(nome: string): Promise<TCurso>
  create(data: NewCurso): Promise<TCurso>
  update(id: number, data: NewCurso): Promise<TCurso>
  delete(id: number): Promise<TCategoriaCurso>
}
