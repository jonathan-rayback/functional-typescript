export enum Type {
  Core = 'CORE',
  Indy = 'INDY'
}

export interface Did {
  methodName: string
  methodSpecificId: string
}

export interface CoreDid extends Did {}

export interface IndyDid extends Did {
  indyNamespace: string
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
