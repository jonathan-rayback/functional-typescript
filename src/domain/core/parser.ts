import { Did } from './did'
import { ParsedDid } from './parsedDid'

export type DidParser = {
  readonly parse: (did: Did) => ParsedDid
}
