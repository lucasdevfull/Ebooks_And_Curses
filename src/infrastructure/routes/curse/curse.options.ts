import { verifyToken } from '@/common/hooks/verify-token.ts'
import {
  curseInsertSchema,
  curseSchema,
  curseSelectSchema,
  httpSchema,
} from '@schema/index.schema.ts'
import type { RouteShorthandOptions } from 'fastify'
import { z } from 'zod'

export const getAllCursosRouterOptions: RouteShorthandOptions = {
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
}

export const getCursoByIdRouterOptions: RouteShorthandOptions = {
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
}

export const createCursosRouterOptions: RouteShorthandOptions = {
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
}

export const updateCursosRouterOptions: RouteShorthandOptions = {
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
}

export const deleteCursosRouterOptions: RouteShorthandOptions = {
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
}

export const deleteCategoryInCurseRouterOptions: RouteShorthandOptions = {
  schema: {
    tags: ['cursos'],
    description: 'Delete category in curso',
    params: z.object({
      cursoId: z.string(),
      categoriaId: z.string(),
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
}
