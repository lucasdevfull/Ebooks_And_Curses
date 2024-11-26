import type { NewProfessor } from '@/@types/cursos.ts'
import { ProfessorController } from '@/modules/cursos/controllers/professor.controller.ts'
import type { FastifyInstance, FastifyPluginOptions } from 'fastify'
import {
  createProfessorRouterOptions,
  deleteProfessorRouterOptions,
  getAllProfessorsRouterOptions,
  getProfessorByIdRouterOptions,
  updateProfessorRouterOptions,
} from './professor.options.ts'

export function professorRoutes(
  fastify: FastifyInstance,
  opts: FastifyPluginOptions
) {
  const professorController = new ProfessorController()
  fastify.get(
    '/professor',
    getAllProfessorsRouterOptions,
    professorController.getAllProfessors
  )
  fastify.get(
    '/professor/:id',
    getProfessorByIdRouterOptions,
    professorController.getProfessorById
  )
  fastify.post<{ Body: NewProfessor }>(
    '/professor',
    createProfessorRouterOptions,
    professorController.createProfessor
  )
  fastify.put(
    '/professor/:id',
    updateProfessorRouterOptions,
    professorController.updateProfessor
  )
  fastify.delete(
    '/professor/:id',
    deleteProfessorRouterOptions,
    professorController.deleteProfessor
  )
}
