import { verifyToken } from '@hooks/verifyToken.ts'
import {
  cursoInsertSchema,
  cursoSchema,
  cursoSelectSchema,
  httpSchema,
} from '@schema/index.schema.ts'
import type { RouteShorthandOptions } from 'fastify'
import { z } from 'zod'

export const getAllCursosRouterOptions: RouteShorthandOptions = {
  schema: {
    response: {
      200: cursoSchema.array(),
      401: httpSchema,
      500: httpSchema,
    },
  },
  onRequest: verifyToken,
}

export const getCursoByIdRouterOptions: RouteShorthandOptions = {
  schema: {
    params: z.object({
      id: z.string(),
    }),
    response: {
      200: cursoSchema,
      401: httpSchema,
      404: httpSchema,
      500: httpSchema,
    },
  },
  onRequest: verifyToken,
}

export const createCursosRouterOptions: RouteShorthandOptions = {
  schema: {
    body: cursoInsertSchema,
    response: {
      200: cursoSelectSchema,
      401: httpSchema,
      500: httpSchema,
    },
  },
  onRequest: verifyToken,
}

export const updateCursosRouterOptions: RouteShorthandOptions = {
  schema: {
    params: z.object({
      id: z.string(),
    }),
    body: cursoInsertSchema,
    response: {
      200: cursoSelectSchema,
      401: httpSchema,
      500: httpSchema,
    },
  },
  onRequest: verifyToken,
}

export const deleteCursosRouterOptions: RouteShorthandOptions = {
  schema: {
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
    params: z.object({
      cursoId: z.string(),
      categoriaId: z.string()
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