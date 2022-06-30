export interface ParsedDid {
  readonly methodName: string
  readonly methodSpecificId: string
}

export interface ParsedIndyDid extends ParsedDid {
  readonly indyNamespace: string
}
