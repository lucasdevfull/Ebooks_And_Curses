import type { FastifyInstanceZod } from '@/types/server.types.ts'
import { CursoController } from '@controllers/curso.controller.ts'
import type { FastifyPluginOptions } from 'fastify'
import {
  createCursosRouterOptions,
  deleteCategoryInCurseRouterOptions,
  deleteCursosRouterOptions,
  getAllCursosRouterOptions,
  getCursoByIdRouterOptions,
  updateCursosRouterOptions,
} from './curso.options.ts'

export function cursoRoutes(
  fastify: FastifyInstanceZod,
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
  fastify.get(
    '/cursos/:curso-id/categoria/:categoria-id',
    deleteCategoryInCurseRouterOptions,
    cursoController.deleteCategory
  )
}
