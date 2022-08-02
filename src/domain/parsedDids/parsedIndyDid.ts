import ParsedDid from './parsedDid'

export default interface ParsedIndyDid extends ParsedDid {
  readonly indyNamespace: string
}
