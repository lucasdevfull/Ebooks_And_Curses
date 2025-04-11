import { HttpStatus } from '@/common/enum/http.ts'
import { BadRequestError } from '@errors/bad-request.ts'
import { ConflitError } from '@errors/conflit.ts'
import { NotFoundError } from '@errors/not-found.ts'
import type { FastifyError, FastifyReply, FastifyRequest } from 'fastify'

export const errorHandler = (
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) => {
  if (error instanceof ConflitError) {
    return reply.status(HttpStatus.CONFLICT).send({
      statusCode: error.statusCode,
      error: error.name,
      message: error.message,
    })
  }
  if (error instanceof NotFoundError) {
    return reply.status(HttpStatus.NOT_FOUND).send({
      statusCode: error.statusCode,
      error: error.name,
      message: error.message,
    })
  }

  if (error instanceof BadRequestError || error instanceof Error) {
    return reply.status(HttpStatus.BAD_REQUEST).send({
      statusCode: error.statusCode,
      error: error.name,
      message: error.message,
    })
  }
}
