import { FastifyServer } from "@/infrastructure/server.ts"
import { routes } from '@/infrastructure/router.ts'


function bootstrap() {
    const server = new FastifyServer(routes)
    return server.run()    
}

bootstrap()