import {
  cursoInsertSchema,
  cursoSchema,
  cursoSelectSchema,
} from '@/schema/curso.schema.ts'
import { httpSchema } from '@/schema/http.schema.ts'
import type { RouteShorthandOptions } from 'fastify'
import { z } from 'zod'

export const getAllCursosRouterOptions: RouteShorthandOptions = {
  schema: {
    response: {
      200: cursoSchema.array(),
      500: httpSchema,
    },
  },
}

export const getCursoByIdRouterOptions: RouteShorthandOptions = {
  schema: {
    params: z.object({
      id: z.string(),
    }),
    response: {
      200: cursoSchema,
      404: httpSchema,
      500: httpSchema,
    },
  },
}

export const createCursosRouterOptions: RouteShorthandOptions = {
  schema: {
    body: cursoInsertSchema,
    response: {
      200: cursoSelectSchema,
      500: httpSchema,
    },
  },
}

export const updateCursosRouterOptions: RouteShorthandOptions = {
  schema: {
    params: z.object({
      id: z.string(),
    }),
    body: cursoInsertSchema,
    response: {
      200: cursoSelectSchema,
      500: httpSchema,
    },
  },
}

export const deleteCursosRouterOptions: RouteShorthandOptions = {
  schema: {
    params: z.object({
      id: z.string(),
    }),
    body: cursoInsertSchema,
    response: {
      200: z.object({
        message: z.string(),
      }),
      500: httpSchema,
    },
  },
}
