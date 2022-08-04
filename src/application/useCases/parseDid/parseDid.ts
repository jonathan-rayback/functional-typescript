import MethodType from '../../../domain/methodType'
import ParsedDid from '../../../domain/parsedDids/parsedDid'
import ParsedIndyDid from '../../../domain/parsedDids/parsedIndyDid'
import { createParser, Match, Parser } from 'heket'
import { multi, method } from '@arrows/multimethod'
// import { multi, method, Multi } from '@arrows/multimethod'

const DidABNFStrings: Map<MethodType, string> = new Map()

DidABNFStrings.set(
  MethodType.DEFAULT,
  `
  did                = "did:" methodname ":" methodspecificid
  methodname        = 1*methodchar
  methodchar        = %x61-7A / DIGIT
  methodspecificid = *( *idchar ":" ) 1*idchar
  idchar             = ALPHA / DIGIT / "." / "-" / "_" / pctencoded
  pctencoded        = "%" HEXDIG HEXDIG
`
)
DidABNFStrings.set(
  MethodType.INDY,
  // The base58char rule from the Indy Did spec uses characters to represent the allowed values.
  // Since ABNF is inherently case insensitive, denoting the rule that way doesn't work.
  // Instead use the ASCII values in the format %d[ascii-decimal].
  // To omit '0', 'O', 'I', and 'l", as per the Indy Did spec, be sure to leave out
  // %d48, %d73, %d79, and %d108, respectively.
  `
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
)

type DidParser = (didString: string) => ParsedDid

const tryParsingDid = (type: MethodType, didString: string): Match => {
  const rulesString: string = DidABNFStrings.get(type) ?? ''
  const parser: Parser = createParser(rulesString)
  let match: Match
  try {
    match = parser.parse(didString)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown Error'
    throw new DidParsingError(didString, type, message)
  }
  return match
}

// Factory function
export default (type: MethodType): DidParser =>
  (didString: string): ParsedDid => {
    const match: Match = tryParsingDid(type, didString)
    return multi(
      () => type,
      method(MethodType.DEFAULT, (): ParsedDid => {
        const parsedDid: ParsedDid = {
          methodName: match?.get('methodname') ?? 'empty',
          methodSpecificId: match?.get('methodspecificid') ?? 'empty'
        }
        return parsedDid
      }),
      method(MethodType.INDY, (): ParsedIndyDid => {
        const parsedDid = {
          methodName: 'indy',
          indyNamespace: match?.get('namespace') ?? 'empty',
          methodSpecificId: match?.get('nsidstring') ?? 'empty'
        }
        return parsedDid
      })
    )() // execute the multi-method to be sure to return the parsedDid
  }

export class DidParsingError extends Error {
  constructor (didString: string, methodType: MethodType, message: string) {
    super(message)
    this.name = 'DidParsingError'
    this.didString = didString
    this.methodType = methodType
  }

  didString: string
  methodType: MethodType
}
