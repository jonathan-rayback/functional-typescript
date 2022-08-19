import {
  CoreDid,
  validateDidString,
  ValidDidString
} from '../../../../domain/domain'
import { DidParsingError } from '../parseDid'
import { createParser, Parser } from 'heket'

const abnfString = `
  did                = "did:" methodname ":" methodspecificid
  methodname        = 1*methodchar
  methodchar        = %x61-7A / DIGIT
  methodspecificid = *( *idchar ":" ) 1*idchar
  idchar             = ALPHA / DIGIT / "." / "-" / "_" / pctencoded
  pctencoded        = "%" HEXDIG HEXDIG
`

export default {
  parse (didString: ValidDidString) {
    const abnfParser: Parser = createParser(abnfString)
    let match
    try {
      match = abnfParser.parse(didString)
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Can't Parse DID String"
      throw new DidParsingError(didString, message)
    }
    const did: CoreDid = {
      raw: validateDidString(didString) as ValidDidString,
      methodName: match?.get('methodname') ?? 'empty',
      methodSpecificId: match?.get('methodspecificid') ?? 'empty'
    }
    return did
  }
}
