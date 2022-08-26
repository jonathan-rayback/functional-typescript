import { isValidDid, ParsedCoreDid } from '../core'

export type IndyDid = string & { __brand: 'IndyDid' }

export function makeIndyDid (didString: string): IndyDid | undefined {
  // regex derived from abnf rules in spec
  const re =
    /^did:indy:([a-z]([_a-z0-9]|-)*)(:([a-z]([_a-z0-9]|-)*)):((1|2|3|4|5|6|7|8|9|[AaBbCc]|[DdEe]|[FfGgHh]|[Jj]|[KkLlMm]|[NnPp]|[QqRrSs]|[Tt]|[UuVvWw]|[XxYy]|[ZzAaBb]|[Cc]|[DdEeFf]|[GgHh]|[IiJjKk]|[Mm]|[NnOoPp]|[QqRr]|[SsTtUu]|[Vv]|[WwXxYyZz])){21,22}$/
  return isValidDid(didString) && re.test(didString)
    ? (didString as IndyDid)
    : undefined
}

export type ParsedIndyDid = {
  readonly indyNamespace: string
} & ParsedCoreDid
