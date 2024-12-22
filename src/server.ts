import { env } from '@/env.ts'
import { errorHandler } from '@/error-handler.ts'
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
  instance: FastifyInstance
  constructor(routes: Routes[]) {
    this.instance = fastify({
      logger: true,
    }).withTypeProvider<ZodTypeProvider>()
    this.errors()
    this.plugins()
    this.routes(routes)
  }

  plugins(): void {
    this.instance.setValidatorCompiler(validatorCompiler)
    this.instance.setSerializerCompiler(serializerCompiler)
    this.instance.register(fastifyJwt, {
      secret: env.JWT_SECRET,
    })
    this.instance.register(fastifyHelmet)
    this.instance.register(fastifyCors, {
      origin: '*',
    })
  }

  errors(): void {
    this.instance.setErrorHandler(errorHandler)
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
