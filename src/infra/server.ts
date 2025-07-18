import path from 'node:path'
import fastifyCors from '@fastify/cors'
import fastifyHelmet from '@fastify/helmet'
import fastifyJwt from '@fastify/jwt'
import fastifyMultipart from '@fastify/multipart'
import fastifyStatic from '@fastify/static'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { v4 } from 'uuid'
import { env } from '@/infra/env.ts'
import type {
  FastifyInstanceZod,
  Routes,
  Server,
} from '@/types/server.types.ts'
import { errorHandler } from './error-handler.ts'

export class FastifyServer implements Server {
  private instance: FastifyInstanceZod
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
      sign: {
        expiresIn: env.EXPIRES_IN,
        jti: v4(),
      },
    })

    this.instance.register(fastifyHelmet)
    this.instance.register(fastifyCors, {
      origin: true,
    })

    this.instance.register(fastifyMultipart, {
      attachFieldsToBody: true,
      throwFileSizeLimit: false,
    })

    this.instance.register(fastifyStatic, {
      root: path.resolve('media'),
    })

    if (env.NODE_ENV === 'development') {
      this.instance.register(fastifySwagger, {
        openapi: {
          info: {
            title: 'Fastify API',
            description: 'Fastify API documentation',
            version: '1.0.0',
          },
          servers: [
            {
              url: env.SERVER_URL,
            },
          ],
        },
        transform: jsonSchemaTransform,
      })

      this.instance.register(fastifySwaggerUi, {
        routePrefix: '/docs',
      })
    }
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
