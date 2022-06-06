export enum Type {
  Core = 'CORE',
  Indy = 'INDY'
}

export interface DidScheme {
  readonly methodName: string
  readonly methodSpecificId: string
}

export interface Did {
  readonly scheme: DidScheme
}
