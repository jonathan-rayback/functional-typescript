import { Did } from '../did'
import { DidScheme } from '../../didScheme/didScheme'

export const coreABNFString: string = `
  did                = "did:" methodname ":" methodspecificid
  methodname        = 1*methodchar
  methodchar        = %x61-7A / DIGIT
  methodspecificid = *( *idchar ":" ) 1*idchar
  idchar             = ALPHA / DIGIT / "." / "-" / "_" / pctencoded
  pctencoded        = "%" HEXDIG HEXDIG
`

export interface CoreDidScheme extends DidScheme {}
export interface CoreDid extends Did {
  readonly scheme: CoreDidScheme
}

export const MakeCoreDidScheme = (
  methodName: string,
  methodSpecificId: string
): CoreDidScheme => {
  return {
    methodName: methodName,
    methodSpecificId: methodSpecificId
  }
}

export class MalformedCoreDidSchemeError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'MalformedCoreDidError'
  }
}
