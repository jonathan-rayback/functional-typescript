export interface Did {
  readonly methodType: DidMethodType
  readonly parsedDid: ParsedDid
}

export interface IndyDid extends Did {
  readonly methodType: DidMethodType.INDY
  readonly parsedDid: ParsedIndyDid
}

export interface ParsedDid {
  readonly methodName: string
  readonly methodSpecificId: string
}

export interface ParsedIndyDid extends ParsedDid {
  readonly indyNamespace: string
}

export interface DidDocument {
  readonly id: string
  readonly key: string
}

export const enum DidMethodType {
  DEFAULT = 'DEFAULT',
  INDY = 'INDY',
}

export interface DidParser {
  readonly parse: (didString: string) => ParsedDid
}

export interface DidResolutionOptions {
  readonly accept: string
}

// Spec for DID resolvers is found at https://www.w3.org/TR/did-core/#did-resolution
export interface DidResolver {
  readonly resolve: (
    did: Did,
    resolutionOptions?: DidResolutionOptions
  ) => Promise<DidDocument>
}
