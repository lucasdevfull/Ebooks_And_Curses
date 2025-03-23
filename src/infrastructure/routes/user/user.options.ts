import {
  httpSchema,
  userInsertSchema,
  userSelectSchema,
} from '@schema/index.schema.ts'
import type { RouteShorthandOptions } from 'fastify'
import { z } from 'zod'

export const getUsersRouterOptions: RouteShorthandOptions = {
  schema: {
    tags: ['users'],
    description: 'Get all users',
    response: {
      200: userSelectSchema.omit({ password: true }).array(),
    },
  },
}

export const getUserRouterOptions: RouteShorthandOptions = {
  schema: {
    tags: ['users'],
    description: 'Get user by id',
    params: z.object({
      id: z.string(),
    }),
    response: {
      200: userSelectSchema.omit({ password: true }),
      404: httpSchema,
      500: httpSchema,
    },
  },
}

export const createUserRouterOptions: RouteShorthandOptions = {
  schema: {
    tags: ['users'],
    description: 'Create user',
    body: userInsertSchema,
    response: {
      201: userSelectSchema,
      500: httpSchema,
    },
  },
}
