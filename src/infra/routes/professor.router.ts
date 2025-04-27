import { verifyToken } from '@/common/hooks/verify-token.ts'
import { httpSchema } from '@/schema/http.schema.ts'
import {
  professorInsertSchema,
  professorSelectSchema,
} from '@/schema/professor.schema.ts'
import type { FastifyInstanceZod } from '@/types/server.types.ts'
import { ProfessorController } from '@controllers/professor.controller.ts'
import type { FastifyPluginOptions } from 'fastify'
import { z } from 'zod'

export function professorRoutes(
  fastify: FastifyInstanceZod,
  opts: FastifyPluginOptions
) {
  const professorController = new ProfessorController()

  fastify.get(
    '/professor',
    {
      schema: {
        tags: ['professors'],
        description: 'Get all professors',
        response: {
          200: professorSelectSchema.array(),
          500: httpSchema,
        },
      },
      onRequest: verifyToken,
    },
    professorController.getAllProfessors
  )

  fastify.get(
    '/professor/:id',
    {
      schema: {
        tags: ['professors'],
        description: 'Get professor by id',
        params: z.object({
          id: z.string(),
        }),
        response: {
          200: professorSelectSchema,
          404: httpSchema,
          500: httpSchema,
        },
      },
      onRequest: verifyToken,
    },
    professorController.getProfessorById
  )

  fastify.post(
    '/professor',
    {
      schema: {
        tags: ['professors'],
        description: 'Create professor',
        body: professorInsertSchema,
        response: {
          200: professorSelectSchema,
          400: httpSchema,
          500: httpSchema,
        },
      },
      onRequest: verifyToken,
    },
    professorController.createProfessor
  )

  fastify.put(
    '/professor/:id',
    {
      schema: {
        tags: ['professors'],
        description: 'Update professor',
        params: z.object({
          id: z.string(),
        }),
        body: professorInsertSchema,
        response: {
          200: professorSelectSchema,
          400: httpSchema,
          500: httpSchema,
        },
      },
      onRequest: verifyToken,
    },
    professorController.updateProfessor
  )

  fastify.delete(
    '/professor/:id',
    {
      schema: {
        tags: ['professors'],
        description: 'Delete professor',
        params: z.object({
          id: z.string(),
        }),
        response: {
          204: z.object({
            message: z.string(),
          }),
          404: httpSchema,
          500: httpSchema,
        },
      },
      onRequest: verifyToken,
    },
    professorController.deleteProfessor
  )
}
