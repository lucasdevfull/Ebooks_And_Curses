import { routes } from '@/infra/router.ts'
import { FastifyServer } from '@/infra/server.ts'

function bootstrap() {
  new FastifyServer(routes).run()
}

bootstrap()
