export class ErrorNotFound extends Error {
    constructor(public message: string) {
        super(message)
    }
  }
  export class BadRequest extends Error {
    constructor(public message: string) {
        super(message)
    }
  }