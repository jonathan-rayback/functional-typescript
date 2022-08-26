import { IndyDid, ParsedIndyDid } from './dids/IndyDid'
import { IndyDidDocument } from './didDocuments/IndyDidDocument'

export type Did = IndyDid
export type ParsedDid = ParsedIndyDid
export type DidDocument = IndyDidDocument

export type DidResolutionOptions = {
  readonly accept: string
}

export function isValidDid (didString: string): boolean {
  const re =
    /^did:[a-z0-9]+:(([A-Z.a-z0-9]|-|_|%[0-9A-Fa-f][0-9A-Fa-f])*:)*([A-Z.a-z0-9]|-|_|%[0-9A-Fa-f][0-9A-Fa-f])+$/
  return re.test(didString)
}

export type ParsedCoreDid = {
  readonly methodName: string
  readonly methodSpecificId: string
}
