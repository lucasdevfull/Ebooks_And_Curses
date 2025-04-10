import type { FastifyInstanceZod } from '@/types/server.types.ts'
import { CursoController } from '@controllers/curse.controller.ts'
import type { FastifyPluginOptions } from 'fastify'
import { verifyToken } from '@/common/hooks/verify-token.ts'
import { httpSchema } from '@/schema/http.schema.ts'
import {
  curseInsertSchema,
  curseSchema,
  curseSelectSchema,
} from '@/schema/curse.schema.ts'
import { z } from 'zod'

export function cursoRoutes(
  fastify: FastifyInstanceZod,
  opts: FastifyPluginOptions
) {
  const cursoController = new CursoController()

  fastify.get(
    '/cursos',
    {
      schema: {
        tags: ['cursos'],
        description: 'Get all cursos',
        response: {
          200: curseSchema.array(),
          401: httpSchema,
          500: httpSchema,
        },
      },
      onRequest: verifyToken,
    },
    cursoController.getAllCurses
  )
  fastify.post(
    '/cursos',
    {
      schema: {
        tags: ['cursos'],
        description: 'Create curso',
        body: curseInsertSchema,
        response: {
          200: curseSelectSchema,
          401: httpSchema,
          500: httpSchema,
        },
      },
      onRequest: verifyToken,
    },
    cursoController.createCurses
  )
  fastify.get(
    '/cursos/:id',
    {
      schema: {
        tags: ['cursos'],
        description: 'Get curso by id',
        params: z.object({
          id: z.string(),
        }),
        response: {
          200: curseSchema,
          401: httpSchema,
          404: httpSchema,
          500: httpSchema,
        },
      },
      onRequest: verifyToken,
    },
    cursoController.getCursesById
  )
  fastify.put(
    '/cursos/:id',
    {
      schema: {
        tags: ['cursos'],
        description: 'Update curso',
        params: z.object({
          id: z.string(),
        }),
        body: curseInsertSchema,
        response: {
          200: curseSelectSchema,
          401: httpSchema,
          500: httpSchema,
        },
      },
      onRequest: verifyToken,
    },
    cursoController.updateCurses
  )
  fastify.delete(
    '/cursos/:id',
    {
      schema: {
        tags: ['cursos'],
        description: 'Delete curso',
        params: z.object({
          id: z.string(),
        }),
        response: {
          200: z.object({
            message: z.string(),
          }),
          401: httpSchema,
          500: httpSchema,
        },
      },
      onRequest: verifyToken,
    },
    cursoController.deleteCurses
  )
  fastify.get(
    '/cursos/:curso-id/categoria/:categoria-id',
    {
      schema: {
        tags: ['cursos'],
        description: 'Delete category in curso',
        params: z.object({
          cursoId: z.string().transform(val => Number(val)),
          categoriaId: z.string().transform(val => Number(val)),
        }),
        response: {
          200: z.object({
            message: z.string(),
          }),
          401: httpSchema,
          404: httpSchema,
          500: httpSchema,
        },
      },
      onRequest: verifyToken,
    },
    cursoController.deleteCategory
  )
}
