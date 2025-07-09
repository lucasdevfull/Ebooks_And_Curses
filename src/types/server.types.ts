import type {
  FastifyBaseLogger,
  FastifyInstance,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
} from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

export interface Routes {
  router: (fastify: FastifyInstance) => void
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
