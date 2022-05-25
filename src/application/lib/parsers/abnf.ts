import { Parser, Match } from 'heket'

export const matchABNF = (parser: Parser, rawString: string): Match | undefined => {
  try {
    return parser.parse(rawString)
  } catch (e) {
    if (e instanceof Error) throw e
  }
}
