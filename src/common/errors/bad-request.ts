import { HttpException } from '../base/error.ts'
import { HttpStatus } from '../enum/http.ts'

export class BadRequestError extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST)
    this.name = 'BadRequestError'
  }
}
