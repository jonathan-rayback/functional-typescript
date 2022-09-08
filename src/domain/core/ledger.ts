import { Did } from './did'
import { DidDocument } from './didDocument'
// Spec for DID resolvers is found at https://www.w3.org/TR/did-core/#did-resolution

export type Ledger = {
  readonly name: string
  readonly lookup: (did: Did) => Promise<DidDocument>
}
