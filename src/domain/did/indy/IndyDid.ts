import { Did } from '../did'
import { DidScheme } from '../../didScheme/didScheme'

// The base58char rule from the Indy Did spec uses characters to represent the allowed values.
// Since ABNF is inherently case insensitive, denoting the rule that way doesn't work.
// Instead use the ASCII values in the format %d[ascii-decimal].
// To omit '0', 'O', 'I', and 'l", as per the Indy Did spec, be sure to leave out
// %d48, %d73, %d79, and %d108, respectively.
export const indyABNFString: string = `
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
export interface IndyDidScheme extends DidScheme {
  readonly indyNamespace: string
}
export interface IndyDid extends Did {
  readonly scheme: IndyDidScheme
}

export const MakeIndyDidScheme = (
  methodName: string,
  indyNamespace: string,
  methodSpecificId: string
): IndyDidScheme => {
  return {
    methodName: methodName,
    indyNamespace: indyNamespace,
    methodSpecificId: methodSpecificId
  }
}

export class MalformedIndyDidSchemeError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'MalformedIndyDidError'
  }
}
