export interface Did {
  methodName: string
  methodSpecificId: string
}

export type DidChecker = (rawDid: string) => Did

export class MalformedDidError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'MalformedDidError'
  }
}
