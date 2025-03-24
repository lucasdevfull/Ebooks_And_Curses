import type { FastifyReply, FastifyRequest } from 'fastify'
import { HttpStatus } from '../enum/http.ts'

export const verifyToken = (
  { headers: { authorization }, jwtVerify }: FastifyRequest,
  reply: FastifyReply,
  done: () => void
) => {
  const token = authorization?.split(' ')[1]
  if (!token) {
    return reply.status(HttpStatus.UNAUTHORIZED).send({
      statusCode: HttpStatus.UNAUTHORIZED,
      error: 'Unauthorized',
      message: 'Token not provided',
    })
  }
  const tokenAcepted = jwtVerify()
  if (!tokenAcepted) {
    return reply.status(HttpStatus.UNAUTHORIZED).send({
      statusCode: HttpStatus.UNAUTHORIZED,
      error: 'Unauthorized',
      message: 'Invalid token',
    })
  }
  done()
}
