import { verifyToken } from '@hooks/verifyToken.ts'
import {
  httpSchema,
  professorInsertSchema,
  professorSelectSchema,
} from '@schema/index.schema.ts'
import type { RouteShorthandOptions } from 'fastify'
import { z } from 'zod'

export const getAllProfessorsRouterOptions: RouteShorthandOptions = {
  schema: {
    response: {
      200: professorSelectSchema.array(),
      500: httpSchema,
    },
  },
  onRequest: verifyToken,
}

export const getProfessorByIdRouterOptions: RouteShorthandOptions = {
  schema: {
    response: {
      200: professorSelectSchema,
      404: httpSchema,
      500: httpSchema,
    },
  },
  onRequest: verifyToken,
}

export const createProfessorRouterOptions: RouteShorthandOptions = {
  schema: {
    body: professorInsertSchema,
    response: {
      200: professorSelectSchema,
      400: httpSchema,
      500: httpSchema,
    },
  },
  onRequest: verifyToken,
}

export const updateProfessorRouterOptions: RouteShorthandOptions = {
  schema: {
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
}

export const deleteProfessorRouterOptions: RouteShorthandOptions = {
  schema: {
    response: {
      204: z.object({
        message: z.string(),
      }),
      404: httpSchema,
      500: httpSchema,
    },
  },
  onRequest: verifyToken,
}
