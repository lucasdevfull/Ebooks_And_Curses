import { HttpException } from '../base/error.ts'
import { HttpStatus } from '../enum/http.ts'

export class ConflitError extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.CONFLICT)
    this.name = 'Conflit'
  }
}
