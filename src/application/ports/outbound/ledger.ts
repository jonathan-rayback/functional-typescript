import { Did } from '../../../domain/core/did'
import { DidDocument } from '../../../domain/core/didDocument'

// Spec for DID resolvers is found at https://www.w3.org/TR/did-core/#did-resolution

export type Ledger = {
  readonly lookup: (did: Did) => Promise<DidDocument>
}
