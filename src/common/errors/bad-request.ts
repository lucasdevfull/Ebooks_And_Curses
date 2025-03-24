import { HttpException } from '../base/error.ts'
import { HttpStatus } from '../enum/http.ts'

export class BadRequestError extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.NOT_FOUND)
    this.name = 'BadRequestError'
  }
}
