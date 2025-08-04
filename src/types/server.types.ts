import type {
  FastifyBaseLogger,
  FastifyInstance,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
} from 'fastify'
import type { FastifyPluginCallbackZod, ZodTypeProvider } from 'fastify-type-provider-zod'

export interface Routes {
  router: FastifyPluginCallbackZod
}

export interface Server {
  plugins(): void
  routes(routers: Routes[]): void
  run(): void
}

export type FastifyInstanceZod = FastifyInstance<
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  FastifyBaseLogger,
  ZodTypeProvider
>
