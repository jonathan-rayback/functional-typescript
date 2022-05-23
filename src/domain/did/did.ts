export enum Type {
  Generic = 'GENERIC',
  Indy = 'INDY'
}

export interface Did {
  methodName: string
  methodSpecificId: string
}

export interface GenericDid extends Did {}

export interface IndyDid extends Did {
  indyNamespace: string
}

export type DidParser = (didString: string) => Did

export class MalformedDidError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'MalformedDidError'
  }
}
