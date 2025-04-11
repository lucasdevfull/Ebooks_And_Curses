import { FastifyServer } from '@/infra/server.ts'
import { routes } from '@/infra/router.ts'

function bootstrap() {
  const server = new FastifyServer(routes)
  server.run()
}

bootstrap()
