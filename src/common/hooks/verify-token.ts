import type { FastifyReply, FastifyRequest } from 'fastify'
import { HttpStatus } from '../enum/http.ts'

export const verifyToken = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const token = request.headers.authorization?.split(' ')[1]
  if (!token) {
    return reply.status(HttpStatus.UNAUTHORIZED).send({
      statusCode: HttpStatus.UNAUTHORIZED,
      error: 'Unauthorized',
      message: 'Token not provided',
    })
  }
  const tokenAcepted = await request.jwtVerify()

  if (!tokenAcepted) {
    return reply.status(HttpStatus.UNAUTHORIZED).send({
      statusCode: HttpStatus.UNAUTHORIZED,
      error: 'Unauthorized',
      message: 'Invalid token',
    })
  }
}
