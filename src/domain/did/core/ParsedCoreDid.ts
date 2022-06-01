import { Did, ParsedDid } from '../did'

export const coreABNFString: string = `
  did                = "did:" methodname ":" methodspecificid
  methodname        = 1*methodchar
  methodchar        = %x61-7A / DIGIT
  methodspecificid = *( *idchar ":" ) 1*idchar
  idchar             = ALPHA / DIGIT / "." / "-" / "_" / pctencoded
  pctencoded        = "%" HEXDIG HEXDIG
`

export interface ParsedCoreDid extends ParsedDid {}
export interface CoreDid extends Did {
  readonly parsedDid: ParsedCoreDid
}

export class MalformedCoreDidError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'MalformedCoreDidError'
  }
}
