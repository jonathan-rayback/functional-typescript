import { ParsedDid, ParsedIndyDid } from '../parsedDid/parsedDid'

export enum MethodType {
  DEFAULT = 'DEFAULT',
  INDY = 'INDY',
}

export interface Did {
  readonly methodType: MethodType
  readonly parsedDid: ParsedDid
}

export interface IndyDid extends Did {
  readonly methodType: MethodType.INDY
  readonly parsedDid: ParsedIndyDid
}
