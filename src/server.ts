import type { IncomingMessage, Server, ServerResponse } from 'node:http'
import { env } from '@/env.ts'
import fastifyCors from '@fastify/cors'
import fastifyHelmet from '@fastify/helmet'
import fastifyJwt from '@fastify/jwt'
import fastify, { type FastifyInstance } from 'fastify'
import {
  type ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import type { IServer } from './@types/server.ts'
import { authRoutes } from './routes/auth/auth.router.ts'
import { authorsRoutes } from './routes/authors/authors.router.ts'
import { categoryRoutes } from './routes/category/category.router.ts'
import { cursoRouter } from './routes/curso/curso.router.ts'
import { genreRoutes } from './routes/genre/genre.routes.ts'
import { professorRoutes } from './routes/professor/professor.router.ts'
import { userRoutes } from './routes/user/user.router.ts'

class FastifyServer implements IServer {
  instance: FastifyInstance<Server, IncomingMessage, ServerResponse>
  constructor() {
    this.instance = fastify({ logger: true })
    this.plugins()
    this.routes()
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
  routes(): void {
    this.instance.register(userRoutes)
    this.instance.register(authRoutes)
    this.instance.register(genreRoutes)
    this.instance.register(authorsRoutes)
    this.instance.register(categoryRoutes)
    this.instance.register(professorRoutes)
    this.instance.register(cursoRouter)
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

export const server = new FastifyServer()
server.run()
