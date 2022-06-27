import { MethodType as DidMethodType } from '../../../../domain/did/did'
import { ParsedDid } from '../../../../domain/parsedDid/parsedDid'
import { ParsedIndyDid } from '../../../../domain/parsedDid/indy/parsedIndyDid'
import { createParser, Match } from 'heket'
import { multi, method } from '@arrows/multimethod'

const ABNFStrings: Map<DidMethodType, string> = new Map()

ABNFStrings.set(
  DidMethodType.Core,
  `
  did                = "did:" methodname ":" methodspecificid
  methodname        = 1*methodchar
  methodchar        = %x61-7A / DIGIT
  methodspecificid = *( *idchar ":" ) 1*idchar
  idchar             = ALPHA / DIGIT / "." / "-" / "_" / pctencoded
  pctencoded        = "%" HEXDIG HEXDIG
`
)
ABNFStrings.set(
  DidMethodType.Indy,
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

export class ABNFDidParsingError extends Error {
  constructor (didString: string, methodType: DidMethodType, message: string) {
    super(message)
    this.name = 'ABNFDidParsingError'
    this.didString = didString
    this.methodType = methodType
  }

  didString: string
  methodType: DidMethodType
}

export const CreateABNFParser =
  (methodType: DidMethodType) => (didString: string) => {
    const rulesString = ABNFStrings.get(methodType) ?? ''
    const parser = createParser(rulesString)
    let match: Match
    try {
      match = parser.parse(didString)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown Error'
      throw new ABNFDidParsingError(didString, DidMethodType.Core, message) // hardcoded did method type for now
    }
    return multi(
      method(DidMethodType.Core, (): ParsedDid => {
        const methodName = match?.get('methodname') ?? 'empty' // TODO: 'empty' is surely the wrong default string
        const methodSpecificId = match?.get('methodspecificid') ?? 'empty'
        return {
          methodName,
          methodSpecificId
        }
      }),
      method(DidMethodType.Indy, (): ParsedIndyDid => {
        const methodName = 'indy'
        const indyNamespace = match?.get('namespace') ?? 'empty'
        const methodSpecificId = match?.get('nsidstring') ?? 'empty'
        return {
          methodName,
          indyNamespace,
          methodSpecificId
        }
      })
    )(methodType)
  }
