import { Did, ParsedDid } from './core'

export type DidParser = {
  readonly parse: (did: Did) => ParsedDid
}
