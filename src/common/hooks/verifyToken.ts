import type { FastifyReply, FastifyRequest } from 'fastify'

export const verifyToken = (
  request: FastifyRequest,
  reply: FastifyReply,
  done: () => void
) => {
  const token = request.headers.authorization?.split(' ')[1]
  if (!token) {
    return reply.status(401).send({
      statusCode: 401,
      error: 'Unauthorized',
      message: 'Token not provided',
    })
  }
  const tokenAcepted = request.jwtVerify()
  if (!tokenAcepted) {
    return reply.status(401).send({
      statusCode: 401,
      error: 'Unauthorized',
      message: 'Invalid token',
    })
  }
  done()
}
