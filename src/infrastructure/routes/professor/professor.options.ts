import { verifyToken } from '@/common/hooks/verify-token.ts'
import {
  httpSchema,
  professorInsertSchema,
  professorSelectSchema,
} from '@schema/index.schema.ts'
import type { RouteShorthandOptions } from 'fastify'
import { z } from 'zod'

export const getAllProfessorsRouterOptions: RouteShorthandOptions = {
  schema: {
    tags: ['professors'],
    description: 'Get all professors',
    response: {
      200: professorSelectSchema.array(),
      500: httpSchema,
    },
  },
  onRequest: verifyToken,
}

export const getProfessorByIdRouterOptions: RouteShorthandOptions = {
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
}

export const createProfessorRouterOptions: RouteShorthandOptions = {
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
}

export const updateProfessorRouterOptions: RouteShorthandOptions = {
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
}

export const deleteProfessorRouterOptions: RouteShorthandOptions = {
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
}
