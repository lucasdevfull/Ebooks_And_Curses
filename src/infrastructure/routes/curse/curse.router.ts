import type { FastifyInstanceZod } from '@/types/server.types.ts'
import { CursoController } from '@controllers/curse.controller.ts'
import type { FastifyPluginOptions } from 'fastify'
import {
  createCursosRouterOptions,
  deleteCategoryInCurseRouterOptions,
  deleteCursosRouterOptions,
  getAllCursosRouterOptions,
  getCursoByIdRouterOptions,
  updateCursosRouterOptions,
} from './curse.options.ts'

export function cursoRoutes(
  fastify: FastifyInstanceZod,
  opts: FastifyPluginOptions
) {
  const cursoController = new CursoController()

  fastify.get(
    '/cursos',
    getAllCursosRouterOptions,
    cursoController.getAllCurses
  )
  fastify.post(
    '/cursos',
    createCursosRouterOptions,
    cursoController.createCurses
  )
  fastify.get(
    '/cursos/:id',
    getCursoByIdRouterOptions,
    cursoController.getCursesById
  )
  fastify.put(
    '/cursos/:id',
    updateCursosRouterOptions,
    cursoController.updateCurses
  )
  fastify.delete(
    '/cursos/:id',
    deleteCursosRouterOptions,
    cursoController.deleteCurses
  )
  fastify.get(
    '/cursos/:curso-id/categoria/:categoria-id',
    deleteCategoryInCurseRouterOptions,
    cursoController.deleteCategory
  )
}
