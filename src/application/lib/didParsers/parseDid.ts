import { Did, DidParser, ValidDidString } from '../../../domain/domain'

export class DidParsingError extends Error {
  constructor (didString: string, message: string) {
    super(message)
    this.name = 'DidParsingError'
    this.didString = didString
  }

  didString: string
}

export default (parser: DidParser) =>
  (didString: ValidDidString): Did => {
    return parser.parse(didString)
  }
