import { ParsedDid } from '../../../../domain/domain'
import { DidParsingError } from '../parseDid'
import { createParser, Match, Parser } from 'heket'

const abnfString = `
  did                = "did:" methodname ":" methodspecificid
  methodname        = 1*methodchar
  methodchar        = %x61-7A / DIGIT
  methodspecificid = *( *idchar ":" ) 1*idchar
  idchar             = ALPHA / DIGIT / "." / "-" / "_" / pctencoded
  pctencoded        = "%" HEXDIG HEXDIG
`

export default {
  parse (didString: string) {
    const abnfParser: Parser = createParser(abnfString)
    let match: Match
    try {
      match = abnfParser.parse(didString)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown Error'
      throw new DidParsingError(didString, message)
    }
    const parsedDid: ParsedDid = {
      methodName: match?.get('methodname') ?? 'empty',
      methodSpecificId: match?.get('methodspecificid') ?? 'empty'
    }
    return parsedDid
  }
}
