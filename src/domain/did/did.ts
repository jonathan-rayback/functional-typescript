export enum Type {
  Core = 'CORE',
  Indy = 'INDY'
}

export interface Did {
  readonly methodName: string
  readonly methodSpecificId: string
}

export interface CoreDid extends Did {}

export interface IndyDid extends Did {
  readonly indyNamespace: string
}

export class MalformedCoreDidError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'MalformedCoreDidError'
  }
}

export class MalformedIndyDidError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'MalformedIndyDidError'
  }
}
