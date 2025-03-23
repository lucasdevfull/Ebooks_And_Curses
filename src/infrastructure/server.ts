import { env } from '@/infrastructure/env.ts'
import type {
  FastifyInstanceZod,
  Server,
  Routes,
} from '@/types/server.types.ts'
import fastifyCors from '@fastify/cors'
import fastifyHelmet from '@fastify/helmet'
import fastifyJwt from '@fastify/jwt'
import { fastify } from 'fastify'
import {
  type ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { errorHandler } from './error-handler.ts'

export class FastifyServer implements Server {
  instance: FastifyInstanceZod
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

    this.instance.register(fastifySwagger, {
      openapi: {
        info: {
          title: 'Fastify API',
          description: 'Fastify API documentation',
          version: '1.0.0',
        },
      },
      transform: jsonSchemaTransform,
    })

    this.instance.register(fastifySwaggerUi, {
      routePrefix: '/docs',
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

