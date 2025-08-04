import type {
  IAuthController,
  LoginRequest,
  PasswordResetRequest,
} from '@interface/auth.interface.ts'
import type { AuthServices } from '@services/auth.services.ts'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { createTransport } from 'nodemailer'
import { HttpStatus } from '@/common/enum/http.ts'
import { env } from '@/infra/env.ts'

export class AuthController implements IAuthController {
  constructor(private service: AuthServices) {
    this.service = service
  }

  login = async (
    { body, server: { jwt } }: FastifyRequest<LoginRequest>,
    reply: FastifyReply
  ) => {
    const result = await this.service.authenticate(body, jwt)
    return reply.status(HttpStatus.OK).send(result)
  }

  passwordReset = async (
    { body }: FastifyRequest<PasswordResetRequest>,
    reply: FastifyReply
  ) => {
    const transport = createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      auth: {
        type: 'OAuth2',
        user: env.EMAIL,
        clientId: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_KEY,
        refreshToken: process.env.REFRESH_TOKEN,
      },
    })
    await transport.sendMail({
      from: env.EMAIL,
      to: body.to,
      subject: 'Teste',
      html: '<h1>Teste</h1>',
    })
    return reply.status(HttpStatus.OK).send({
      statusCode: HttpStatus.OK,
      error: '',
      message: 'Email sent',
    })
  }
}
