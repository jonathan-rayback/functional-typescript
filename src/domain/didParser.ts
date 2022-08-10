import ParsedDid from '../domain/parsedDids/parsedDid'

export default interface didParser {
  readonly parse: (didString: string) => ParsedDid
}
