import { FastifyServer } from "@/infrastructure/server.ts"
import { routes } from '@/infrastructure/router.ts'


const server = new FastifyServer(routes)
server.run()    