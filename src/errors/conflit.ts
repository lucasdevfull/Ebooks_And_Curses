export class ConflitError extends Error {
    statusCode: number
    constructor(message: string) {
        super(message)
        this.statusCode = 409;
        this.name = 'Conflit'
    }
}