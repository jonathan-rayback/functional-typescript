import * as Heket from 'heket'
import { multi, method } from '@arrows/multimethod'
import * as Did from '../../../domain/did/did'
import { matchABNF } from '../../lib/parsers/abnf'

type DidFactory = (didString: string) => Did.Did
type DidParserErrorHandler = (errorMessage: string) => void

const coreABNFString: string = `
  did                = "did:" methodname ":" methodspecificid
  methodname        = 1*methodchar
  methodchar        = %x61-7A / DIGIT
  methodspecificid = *( *idchar ":" ) 1*idchar
  idchar             = ALPHA / DIGIT / "." / "-" / "_" / pctencoded
  pctencoded        = "%" HEXDIG HEXDIG
`
const coreABNFParser: Heket.Parser = Heket.createParser(coreABNFString)

// The base58char rule from the Indy Did spec uses characters to represent the allowed values.
// Since ABNF is inherently case insensitive, denoting the rule that way doesn't work.
// Instead use the ASCII values in the format %d[ascii-decimal].
// To omit '0', 'O', 'I', and 'l", as per the Indy Did spec, be sure to leave out
// %d48, %d73, %d79, and %d108, respectively.
const indyABNFString: string = `
  did                = "did:indy:" namespace nsidstring
  namespace          = namestring (":" namestring) ":"
  namestring         = lowercase *(lowercase / DIGIT / "_" / "-")
  lowercase          = %x61-7A ; a-z
  nsidstring         = 21*22(base58char)
  base58char         = %d49 / %d50 / %d51 / %d52 / %d53 / %d54 / %d55 / %d56 / %d57 / %d65 / %d66 / %d67
                     / %d68 / %d69 / %d70 / %d71 / %d72 / %d74 / %d75 / %d76 / %d77 / %d78 / %d80 / %d81
                     / %d82 / %d83 / %d84 / %d85 / %d86 / %d87 / %d88 / %d89 / %d90 / %d97 / %d98 / %d99
                     / %d100 / %d101 / %d102 / %d103 / %d104 / %d105 / %d106 / %d107 / %d109 / %d110 / %d111 / %d112
                     / %d113 / %d114 / %d115 / %d116 / %d117 / %d118 / %d119 / %d120 / %d121 / %d122
`

const indyABNFParser: Heket.Parser = Heket.createParser(indyABNFString)

const coreDidParser: DidFactory = (didString: string): Did.CoreDid => {
  // Must allow for the possibility that no Match object is returned
  // or else TypeScript compiler won't allow me to access later.
  let match: Heket.Match | undefined
  try {
    match = matchABNF(coreABNFParser, didString)
  } catch (e) {
    if (e instanceof Error) coreDidParseErrorHandler(e.message)
  }

  // Optional chaining to ensure the Match was assigned in the Try block above.
  // Nullish coalescing to return a default string if result is 'undefined' or 'null'.
  const name: string = match?.get('methodname') ?? 'empty' // TODO: 'empty' is surely the wrong default string
  const id: string = match?.get('methodspecificid') ?? 'empty'
  return {
    methodName: name,
    methodSpecificId: id
  }
}

const coreDidParseErrorHandler: DidParserErrorHandler = (message: string): void => {
  throw new Did.MalformedCoreDidError(message)
}

const indyDidParser: DidFactory = (didString: string): Did.IndyDid => {
  // Must allow for the possibility that no Match object is returned
  // or else TypeScript compiler won't allow me to access later.
  let match: Heket.Match | undefined
  try {
    match = matchABNF(indyABNFParser, didString)
  } catch (e) {
    if (e instanceof Error) indyDidParseErrorHandler(e.message)
  }

  const name: string = 'indy'

  // Optional chaining to ensure the Match was assigned in the Try block above.
  // Nullish coalescing to return a default string if result is 'undefined' or 'null'.
  const namespace: string = match?.get('namespace') ?? 'empty' // TODO: 'empty' is surely the wrong default string
  const id: string = match?.get('nsidstring') ?? 'empty'
  return {
    methodName: name,
    methodSpecificId: id,
    indyNamespace: namespace
  }
}

const indyDidParseErrorHandler: DidParserErrorHandler = (message: string): void => {
  throw new Did.MalformedIndyDidError(message)
}

export const ParseDid = (type: Did.Type, didString: string): Did.Did => {
  // This multi-method lets me change which parser to send the DID string to based
  // on the DID type passed in.
  return multi(
    () => type,
    method(Did.Type.Core, coreDidParser),
    method(Did.Type.Indy, indyDidParser)
  )(didString)
}
