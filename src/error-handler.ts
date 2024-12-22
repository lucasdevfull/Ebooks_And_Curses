import type { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { BadRequestError } from './errors/bad-request.ts'
import { ConflitError } from './errors/conflit.ts'
import { NotFoundError } from './errors/not-found.ts'

export const errorHandler = (
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) => {
  if (error instanceof ConflitError) {
    return reply.status(409).send({
      statusCode: error.statusCode,
      error: error.name,
      message: error.message,
    })
  }
  if (error instanceof NotFoundError) {
    return reply.status(404).send({
      statusCode: error.statusCode,
      error: error.name,
      message: error.message,
    })
  }

  if (error instanceof BadRequestError) {
    return reply.status(400).send({
      statusCode: error.statusCode,
      error: error.name,
      message: error.message,
    })
  }
}
