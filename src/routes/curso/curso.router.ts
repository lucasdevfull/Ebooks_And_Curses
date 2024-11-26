import { CursoController } from '@/modules/cursos/controllers/curso.controller.ts'
import type { FastifyInstance, FastifyPluginOptions } from 'fastify'
import {
  createCursosRouterOptions,
  deleteCursosRouterOptions,
  getAllCursosRouterOptions,
  getCursoByIdRouterOptions,
  updateCursosRouterOptions,
} from './curso.options.ts'

export function cursoRouter(
  fastify: FastifyInstance,
  opts: FastifyPluginOptions
) {
  const cursoController = new CursoController()

  fastify.get(
    '/cursos',
    getAllCursosRouterOptions,
    cursoController.getAllCursos
  )
  fastify.post(
    '/cursos',
    createCursosRouterOptions,
    cursoController.createCursos
  )
  fastify.get(
    '/cursos/:id',
    getCursoByIdRouterOptions,
    cursoController.getCursosById
  )
  fastify.put(
    '/cursos/:id',
    updateCursosRouterOptions,
    cursoController.updateCursos
  )
  fastify.delete(
    '/cursos/:id',
    deleteCursosRouterOptions,
    cursoController.deleteCursos
  )
}
