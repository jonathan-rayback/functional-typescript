import { MethodType } from '../methodType'
import ParsedDid from '../parsedDids/parsedDid'

export default interface Did {
  readonly methodType: MethodType
  readonly parsedDid: ParsedDid
}
