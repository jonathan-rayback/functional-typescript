export enum Type {
  Core = 'CORE',
  Indy = 'INDY'
}

export interface ParsedDid {
  readonly methodName: string
  readonly methodSpecificId: string
}

export interface Did {
  readonly parsedDid: ParsedDid
}
