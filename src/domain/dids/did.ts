import DidMethodType from '../didMethodTypes'
import ParsedDid from '../parsedDids/parsedDid'

export default interface Did {
  readonly methodType: DidMethodType
  readonly parsedDid: ParsedDid
}
