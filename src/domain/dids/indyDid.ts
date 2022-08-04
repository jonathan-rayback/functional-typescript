import Did from '../dids/did'
import methodType from '../didMethodTypes'
import ParsedIndyDid from '../parsedDids/parsedIndyDid'

export default interface IndyDid extends Did {
  readonly methodType: methodType.INDY
  readonly parsedDid: ParsedIndyDid
}
