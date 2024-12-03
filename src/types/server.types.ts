import type { FastifyInstance, FastifyPluginOptions } from 'fastify'

export interface Routes {
  router: (fastify: FastifyInstance, opts: FastifyPluginOptions) => void
}

export interface IServer {
  plugins(): void
  routes(routers: Routes[]): void
  run(): void
}
