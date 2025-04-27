import { routes } from '@/infra/router.ts'
import { FastifyServer } from '@/infra/server.ts'

function bootstrap() {
  const server = new FastifyServer(routes)
  server.run()
}

bootstrap()
