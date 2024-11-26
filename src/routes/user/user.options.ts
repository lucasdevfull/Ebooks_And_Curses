import { httpSchema } from '@/schema/http.schema.ts'
import { userInsertSchema, userSelectSchema } from '@/schema/user.schema.ts'
import type { RouteShorthandOptions } from 'fastify'
import { z } from 'zod'

export const getUsersRouterOptions: RouteShorthandOptions = {
  schema: {
    response: {
      200: userSelectSchema.omit({ password: true }).array(),
    },
  },
}

export const getUserRouterOptions: RouteShorthandOptions = {
  schema: {
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
    body: userInsertSchema,
    response: {
      201: userSelectSchema,
      500: httpSchema,
    },
  },
}
