import { httpSchema, loginSchema, tokenSchema } from '@schema/index.schema.ts'
import type { RouteShorthandOptions } from 'fastify'

export const loginAuthRouterOptions: RouteShorthandOptions = {
  schema: {
    body: loginSchema,
    response: {
      200: tokenSchema,
      400: httpSchema,
      500: httpSchema,
    },
  },
}
