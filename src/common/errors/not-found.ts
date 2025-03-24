import { HttpException } from '../base/error.ts'
import { HttpStatus } from '../enum/http.ts'

export class NotFoundError extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.NOT_FOUND)
    this.name = 'Not Found'
  }
}
