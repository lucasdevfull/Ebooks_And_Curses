import { tokenSchema } from '@/schema/auth.schema.ts'
import { httpSchema } from '@/schema/http.schema.ts'
import { loginSchema } from '@/schema/user.schema.ts'
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
