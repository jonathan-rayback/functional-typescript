import { Did, ParsedDid } from '../../../domain/core'
import { DidParser } from '../../../domain/didParser'

export class DidParsingError extends Error {
  constructor (didString: string, message: string) {
    super(message)
    this.name = 'DidParsingError'
    this.didString = didString
  }

  didString: string
}

const makeParseDid =
  (parser: DidParser) =>
    (did: Did): ParsedDid => {
      return parser.parse(did)
    }

export default makeParseDid
