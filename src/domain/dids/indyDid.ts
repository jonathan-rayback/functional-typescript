import Did from '../dids/did'
import MethodType from '../methodType'
import ParsedIndyDid from '../parsedDids/parsedIndyDid'

export default interface IndyDid extends Did {
  readonly methodType: MethodType.INDY
  readonly parsedDid: ParsedIndyDid
}
