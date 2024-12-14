import type { IncomingMessage, Server, ServerResponse } from 'node:http'
import { env } from '@/env.ts'
import { routes } from '@/router.ts'
import type { IServer, Routes } from '@/types/server.types.ts'
import fastifyCors from '@fastify/cors'
import fastifyHelmet from '@fastify/helmet'
import fastifyJwt from '@fastify/jwt'
import fastify, { type FastifyInstance } from 'fastify'
import {
  type ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
class FastifyServer implements IServer {
  instance: FastifyInstance<Server, IncomingMessage, ServerResponse>
  constructor(routes: Routes[]) {
    this.instance = fastify({ logger: true })
    this.plugins()
    this.routes(routes)
  }

  plugins(): void {
    this.instance.setValidatorCompiler(validatorCompiler)
    this.instance.setSerializerCompiler(serializerCompiler)
    this.instance.withTypeProvider<ZodTypeProvider>()
    this.instance.register(fastifyJwt, {
      secret: env.JWT_SECRET,
    })
    this.instance.register(fastifyHelmet)
    this.instance.register(fastifyCors, {
      origin: '*',
    })
  }
  routes(routers: Routes[]): void {
    for (const { router } of routers) {
      this.instance.register(router, { prefix: '/api' })
    }
  }

  run(): void {
    this.instance.listen({ port: env.PORT }, (error, adress) => {
      if (error) {
        console.error(error)
        process.exit(1)
      }
      console.log(`Server is running on port ${adress}`)
    })
  }
}

export const server = new FastifyServer(routes)
server.run()
